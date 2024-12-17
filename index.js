// Required dependencies
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const twilio = require("twilio");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: true, // Allow all origins in development
		credentials: true,
	}),
);

// Configure AWS S3
const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

// Configure Twilio
const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Schema Definitions
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	phoneNumber: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	officialName: { type: String, required: true },
	location: { type: String, required: true },
	review: { type: String, required: true },
	isPositive: { type: Boolean, required: true },
	imageUrl: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const otpSchema = new mongoose.Schema({
	phoneNumber: { type: String, required: true },
	otp: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
});

const User = mongoose.model("User", userSchema);
const Review = mongoose.model("Review", reviewSchema);
const OTP = mongoose.model("OTP", otpSchema);

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ error: "Access denied" });

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid token" });
		req.user = user;
		next();
	});
};

// Helper function to upload image to S3
const uploadImage = async (file) => {
	const upload = new Upload({
		client: s3Client,
		params: {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: `${Date.now().toString()}-${file.originalname}`,
			Body: file.buffer,
			ContentType: file.mimetype,
			ContentDisposition: "inline",
			CacheControl: "max-age=31536000",
			Metadata: {
				fieldName: file.fieldname,
			},
		},
	});

	try {
		const data = await upload.done();
		return data.Location;
	} catch (err) {
		console.error("Error uploading to S3:", err);
		throw err;
	}
};

// Authentication Routes
app.post("/api/auth/sendOTP", async (req, res) => {
	try {
		const { phoneNumber } = req.body;
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// Save OTP to database
		await OTP.create({ phoneNumber, otp });

		// Send OTP via Twilio
		await twilioClient.messages.create({
			body: `Your OTP for Government Official Review App is: ${otp}`,
			to: phoneNumber,
			from: process.env.TWILIO_PHONE_NUMBER,
		});

		res.json({ message: "OTP sent successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/auth/verifyOTP", async (req, res) => {
	try {
		const { phoneNumber, otp, name } = req.body;

		const otpDoc = await OTP.findOne({ phoneNumber, otp });
		if (!otpDoc) {
			return res.status(400).json({ error: "Invalid OTP" });
		}

		// Create or update user
		let user = await User.findOne({ phoneNumber });
		if (!user) {
			user = await User.create({ name, phoneNumber });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.json({ token, user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Review Routes
app.post(
	"/api/reviews",
	authenticateToken,
	upload.single("image"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({ error: "Image file is required" });
			}

			const imageUrl = await uploadImage(req.file);
			const { officialName, location, review, isPositive } = req.body;

			const newReview = await Review.create({
				userId: req.user.userId,
				officialName,
				location,
				review,
				isPositive: isPositive === "true",
				imageUrl,
			});

			res.status(201).json(newReview);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
);

app.get("/api/reviews", authenticateToken, async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;

		const reviews = await Review.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(parseInt(limit))
			.populate("userId", "name");

		const total = await Review.countDocuments();

		res.json({
			reviews,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get("/", (req, res) => {
	res.json({ message: "Server is running" });
});

// Connect to MongoDB and start server
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(process.env.PORT || 3000, () => {
			console.log(`Server running on port ${process.env.PORT || 3000}`);
		});
	})
	.catch((error) => console.error("MongoDB connection error:", error));
