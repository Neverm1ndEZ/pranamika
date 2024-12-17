// src/styles/FeedScreen.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./index";

export const feedStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},

	// Header section with write review button
	header: {
		padding: theme.spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
		backgroundColor: theme.colors.background,
	},

	writeButton: {
		backgroundColor: theme.colors.primary,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		alignItems: "center",
		marginVertical: theme.spacing.sm,
	},

	buttonText: {
		color: theme.colors.background,
		fontSize: theme.typography.body,
		fontWeight: "bold",
	},

	// Feed list styling
	feedList: {
		flex: 1,
		padding: theme.spacing.sm,
	},

	emptyStateContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing.xl,
	},

	emptyStateText: {
		fontSize: theme.typography.body,
		color: theme.colors.textSecondary,
		textAlign: "center",
	},
});
