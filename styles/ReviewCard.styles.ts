// src/styles/ReviewCard.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./index";

export const reviewCardStyles = StyleSheet.create({
	// Card container with shadow
	card: {
		margin: theme.spacing.sm,
		borderRadius: theme.borderRadius.lg,
		backgroundColor: theme.colors.background,
		shadowColor: theme.colors.shadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		overflow: "hidden",
	},

	// User info header section
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: theme.spacing.md,
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
		marginRight: theme.spacing.sm,
	},

	initials: {
		color: theme.colors.background,
		fontSize: theme.typography.body,
		fontWeight: "bold",
	},

	userName: {
		fontSize: theme.typography.subtitle,
		fontWeight: "bold",
		color: theme.colors.text,
	},

	// Review image
	image: {
		width: "100%",
		height: 200,
	},

	// Review content section
	content: {
		padding: theme.spacing.md,
	},

	officialName: {
		fontSize: theme.typography.subtitle,
		fontWeight: "bold",
		marginBottom: theme.spacing.xs,
		color: theme.colors.text,
	},

	location: {
		fontSize: theme.typography.caption,
		color: theme.colors.textSecondary,
		marginBottom: theme.spacing.sm,
	},

	reviewText: {
		fontSize: theme.typography.body,
		color: theme.colors.text,
		lineHeight: 24,
	},

	// Timestamp
	timestamp: {
		fontSize: theme.typography.caption,
		color: theme.colors.textSecondary,
		marginTop: theme.spacing.sm,
	},
});
