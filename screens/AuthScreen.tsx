import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { authStyles } from "../styles/AuthScreen.styles";
import { RootStackParamList } from "../types";
import { API_URL } from "../config";

interface Props {
	navigation: NativeStackNavigationProp<RootStackParamList, "Auth">;
}

const AuthScreen: React.FC<Props> = ({ navigation }) => {
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	useEffect(() => {
		const testConnection = async () => {
			try {
				// First, let's try a simple GET request to test basic connectivity
				console.log("Testing connection to:", API_URL);
				const response = await axios.get(`${API_URL}/`);
				console.log("Connection test successful:", response.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error("Connection test failed:", {
						message: error.message,
						response: error.response?.data,
						status: error.response?.status,
						config: {
							url: error.config?.url,
							method: error.config?.method,
						},
					});
				}
			}
		};

		testConnection();
	}, []);

	const handleSubmit = async () => {
		try {
			// Add more detailed logging
			console.log("Attempting to send OTP to:", phoneNumber);
			console.log("Request URL:", `${API_URL}/api/auth/sendOTP`);

			const response = await axios.post(`${API_URL}/api/auth/sendOTP`, {
				phoneNumber,
			});

			console.log("OTP sent successfully:", response.data);
			navigation.navigate("OTP", { phoneNumber, name });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Failed to send OTP:", {
					message: error.message,
					response: error.response?.data,
					status: error.response?.status,
					config: {
						url: error.config?.url,
						method: error.config?.method,
						data: error.config?.data,
					},
				});
			}
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Pranamika - Government Official Review</Text>
			<TextInput
				style={styles.input}
				placeholder="Name"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Phone Number"
				value={phoneNumber}
				onChangeText={setPhoneNumber}
				keyboardType="phone-pad"
			/>
			<TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.buttonText}>Get OTP</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = authStyles;

export default AuthScreen;
