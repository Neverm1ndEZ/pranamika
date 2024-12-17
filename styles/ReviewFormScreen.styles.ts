// src/styles/ReviewFormScreen.styles.ts
import { StyleSheet } from "react-native";

export const reviewFormStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	imageContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 20,
		gap: 10,
	},
	imageWrapper: {
		position: "relative",
	},
	previewImage: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	removeImageButton: {
		position: "absolute",
		top: -8,
		right: -8,
		backgroundColor: "#ff4444",
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	removeImageText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	addImageButton: {
		width: 100,
		height: 100,
		borderRadius: 8,
		borderWidth: 2,
		borderStyle: "dashed",
		borderColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
	},
	addImageText: {
		color: "#666",
		fontSize: 14,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		fontSize: 16,
	},
	reviewInput: {
		height: 120,
		textAlignVertical: "top",
	},
	radioContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	radioButton: {
		flex: 1,
		padding: 12,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		marginHorizontal: 8,
		alignItems: "center",
	},
	radioSelected: {
		backgroundColor: "#e3f2fd",
		borderColor: "#2196f3",
	},
	submitButton: {
		backgroundColor: "#2196f3",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
