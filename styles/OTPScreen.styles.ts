// src/styles/OTPScreen.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./index";

export const otpStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: theme.spacing.lg,
		backgroundColor: theme.colors.background,
		justifyContent: "center",
	},

	title: {
		fontSize: theme.typography.title,
		fontWeight: "bold",
		marginBottom: theme.spacing.xl,
		textAlign: "center",
		color: theme.colors.text,
	},

	// OTP input specific styling
	otpInput: {
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: theme.borderRadius.md,
		padding: theme.spacing.md,
		marginBottom: theme.spacing.lg,
		fontSize: theme.typography.title,
		textAlign: "center",
		letterSpacing: 5,
	},

	// Instructions text
	instructions: {
		fontSize: theme.typography.body,
		color: theme.colors.textSecondary,
		textAlign: "center",
		marginBottom: theme.spacing.lg,
	},

	button: {
		backgroundColor: theme.colors.primary,
		padding: theme.spacing.md,
		borderRadius: theme.borderRadius.md,
		alignItems: "center",
	},

	buttonText: {
		color: theme.colors.background,
		fontSize: theme.typography.body,
		fontWeight: "bold",
	},
});
