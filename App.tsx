import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AuthScreen from "./screens/AuthScreen";
import FeedScreen from "./screens/FeedScreen";
import OTPScreen from "./screens/OTPScreen";
import ReviewFormScreen from "./screens/ReviewFormScreen";
import { RootStackParamList } from "./types";
// import CameraScreen from "./screens/CameraScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Auth">
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
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
