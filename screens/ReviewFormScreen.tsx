// Frontend: ReviewFormScreen.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	Platform,
	Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../config";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "../types";

const ReviewFormScreen: React.FC = () => {
	const [officialName, setOfficialName] = useState("");
	const [location, setLocation] = useState("");
	const [review, setReview] = useState("");
	const [isPositive, setIsPositive] = useState(true);
	const [image, setImage] = useState<string | null>(null);
	const { token } = useAuth();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const handleSubmit = async () => {
		try {
			const formData = new FormData();
			formData.append("officialName", officialName);
			formData.append("location", location);
			formData.append("review", review);
			formData.append("isPositive", String(isPositive));

			if (image) {
				const imageFileName = image.split("/").pop() || "image.jpg";
				const match = /\.(\w+)$/.exec(imageFileName);
				const type = match ? `image/${match[1]}` : "image/jpeg";

				formData.append("image", {
					uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
					name: imageFileName,
					type,
				} as any);
			}

			const response = await axios.post(`${API_URL}/api/reviews`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});

			navigation.goBack();
		} catch (error) {
			console.error("Error submitting review:", error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Official Name"
				value={officialName}
				onChangeText={setOfficialName}
				style={styles.input}
			/>
			<TextInput
				placeholder="Location"
				value={location}
				onChangeText={setLocation}
				style={styles.input}
			/>
			<TextInput
				placeholder="Review"
				value={review}
				onChangeText={setReview}
				multiline
				style={[styles.input, styles.reviewInput]}
			/>
			<TouchableOpacity
				onPress={() => setIsPositive(!isPositive)}
				style={styles.toggleButton}
			>
				<Text>Rating: {isPositive ? "Positive" : "Negative"}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={pickImage} style={styles.imageButton}>
				<Text>Pick an image</Text>
			</TouchableOpacity>
			{image && <Image source={{ uri: image }} style={styles.preview} />}
			<TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
				<Text style={styles.submitButtonText}>Submit Review</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5,
	},
	reviewInput: {
		height: 100,
		textAlignVertical: "top" as const,
	},
	toggleButton: {
		padding: 10,
		backgroundColor: "#f0f0f0",
		borderRadius: 5,
		marginBottom: 15,
	},
	imageButton: {
		padding: 10,
		backgroundColor: "#e0e0e0",
		borderRadius: 5,
		marginBottom: 15,
		alignItems: "center" as const,
	},
	preview: {
		width: 200,
		height: 200,
		alignSelf: "center" as const,
		marginBottom: 15,
	},
	submitButton: {
		backgroundColor: "#007AFF",
		padding: 15,
		borderRadius: 5,
		alignItems: "center" as const,
	},
	submitButtonText: {
		color: "#fff",
		fontWeight: "bold" as const,
	},
};

export default ReviewFormScreen;
