// src/components/ReviewCard.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	Dimensions,
	StyleSheet,
} from "react-native";
import { Review } from "../types";
import { reviewCardStyles } from "../styles/ReviewCard.styles";

// Calculate dimensions once outside the component to avoid recalculation on re-renders
const screenWidth = Dimensions.get("window").width;
const IMAGE_PADDING = 32; // Total horizontal padding (16 on each side)
const imageWidth = screenWidth - IMAGE_PADDING;
const imageHeight = imageWidth * 0.75; // Maintain a 4:3 aspect ratio

interface Props {
	review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
	// State management for image loading and error handling
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [imageUri, setImageUri] = useState<string | null>(null);
	const [retryCount, setRetryCount] = useState(0);
	const MAX_RETRIES = 3;

	// Process and sanitize the S3 URL when the component mounts or URL changes
	useEffect(() => {
		if (review.imageUrl) {
			try {
				// Parse and encode the URL properly while preserving the structure
				const url = new URL(review.imageUrl);
				const encodedPath = url.pathname
					.split("/")
					.map((segment) => encodeURIComponent(segment))
					.join("/");
				const processedUrl = `${url.protocol}//${url.host}${encodedPath}`;
				setImageUri(processedUrl);
				setRetryCount(0); // Reset retry count when URL changes
				setHasError(false); // Reset error state
			} catch (error) {
				console.error("Error processing S3 URL:", error);
				setHasError(true);
				setIsLoading(false);
			}
		}
	}, [review.imageUrl]);

	// Get user initials for the avatar
	const getInitials = useCallback((name: string) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	}, []);

	// Handle successful image load
	const handleImageLoad = useCallback(() => {
		setIsLoading(false);
		setHasError(false);
	}, []);

	// Handle image loading error with retry logic
	const handleImageError = useCallback(() => {
		console.error(`Image load attempt ${retryCount + 1} failed:`, imageUri);

		if (retryCount < MAX_RETRIES) {
			// Increment retry count and attempt to reload
			setRetryCount((prev) => prev + 1);
			setIsLoading(true);
		} else {
			// Max retries reached, show error state
			setHasError(true);
			setIsLoading(false);
		}
	}, [imageUri, retryCount]);

	return (
		<View
			style={[
				styles.card,
				{ backgroundColor: review.isPositive ? "#e6ffe6" : "#ffe6e6" },
			]}
		>
			{/* User information header */}
			<View style={styles.header}>
				<View style={styles.avatar}>
					<Text style={styles.initials}>{getInitials(review.userId.name)}</Text>
				</View>
				<Text style={styles.userName}>{review.userId.name}</Text>
			</View>

			{/* Image section with loading and error states */}
			<View style={styles.imageContainer}>
				{isLoading && (
					<View
						style={[
							styles.imagePlaceholder,
							{ width: imageWidth, height: imageHeight },
						]}
					>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				)}

				{imageUri && !hasError && (
					<Image
						source={{
							uri: imageUri,
							// Important headers for S3 image loading
							headers: {
								Accept: "image/jpeg,image/png,image/*;q=0.8",
								"Accept-Encoding": "gzip, deflate",
								"Cache-Control": "no-cache",
							},
							// Cache settings
							cache: "reload",
						}}
						style={[
							styles.image,
							{ width: imageWidth, height: imageHeight },
							isLoading && styles.hiddenImage,
						]}
						onLoadStart={() => setIsLoading(true)}
						onLoad={handleImageLoad}
						onError={handleImageError}
						resizeMode="cover"
					/>
				)}

				{hasError && (
					<View
						style={[
							styles.errorContainer,
							{ width: imageWidth, height: imageHeight },
						]}
					>
						<Text style={styles.errorText}>
							Failed to load image
							{retryCount > 0 ? ` (${retryCount} retries)` : ""}
						</Text>
					</View>
				)}
			</View>

			{/* Review content */}
			<View style={styles.content}>
				<Text style={styles.officialName}>{review.officialName}</Text>
				<Text style={styles.location}>{review.location}</Text>
				<Text style={styles.reviewText}>{review.review}</Text>
			</View>
		</View>
	);
};

// Combine existing styles with additional ones
const styles = StyleSheet.create({
	...reviewCardStyles,
	imageContainer: {
		position: "relative",
		marginVertical: 10,
		alignItems: "center",
		backgroundColor: "#f8f9fa",
		borderRadius: 8,
		overflow: "hidden",
	},
	image: {
		borderRadius: 8,
	},
	hiddenImage: {
		opacity: 0,
	},
	imagePlaceholder: {
		position: "absolute",
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	errorContainer: {
		backgroundColor: "#f8d7da",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		padding: 16,
	},
	errorText: {
		color: "#721c24",
		fontSize: 16,
		textAlign: "center",
	},
	userName: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
});

export default ReviewCard;
