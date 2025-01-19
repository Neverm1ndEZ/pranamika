// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthScreen from "./screens/AuthScreen";
import FeedScreen from "./screens/FeedScreen";
import OTPScreen from "./screens/OTPScreen";
import ReviewFormScreen from "./screens/ReviewFormScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Separate component for navigation to access auth context
const NavigationContent = () => {
	const { token, isLoading } = useAuth();

	// Show loading spinner while checking authentication state
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<Stack.Navigator>
			{token ? (
				// Authenticated stack
				<>
					<Stack.Screen
						name="Feed"
						component={FeedScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ReviewForm"
						component={ReviewFormScreen}
						options={{ title: "Write a Review" }}
					/>
				</>
			) : (
				// Non-authenticated stack
				<>
					<Stack.Screen
						name="Auth"
						component={AuthScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="OTP"
						component={OTPScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<NavigationContent />
			</NavigationContainer>
		</AuthProvider>
	);
}
