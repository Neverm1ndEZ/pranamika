import { StyleSheet } from "react-native";
import { theme } from "./index";

export const authStyles = StyleSheet.create({
	// Container layout and background
	container: {
		flex: 1,
		padding: theme.spacing.lg,
		backgroundColor: theme.colors.background,
		justifyContent: "center",
	},

	// App title styling
	title: {
		fontSize: theme.typography.title,
		fontWeight: "bold",
		marginBottom: theme.spacing.xl,
		textAlign: "center",
		color: theme.colors.text,
	},

	// Input field styling
	input: {
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.md,
		padding: theme.spacing.md,
		marginBottom: theme.spacing.lg,
		fontSize: theme.typography.body,
		backgroundColor: theme.colors.background,
	},

	// Primary action button
	button: {
		backgroundColor: theme.colors.primary,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		alignItems: "center",
		marginTop: theme.spacing.sm,
	},

	buttonText: {
		color: theme.colors.background,
		fontSize: theme.typography.body,
		fontWeight: "bold",
	},
});
