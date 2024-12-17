import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { otpStyles } from "../styles/OTPScreen.styles";
import { RootStackParamList } from "../types";
import { API_URL } from "../config";

interface Props {
	navigation: NativeStackNavigationProp<RootStackParamList, "OTP">;
	route: RouteProp<RootStackParamList, "OTP">;
}

const OTPScreen: React.FC<Props> = ({ navigation, route }) => {
	const [otp, setOtp] = useState("");
	const { setToken, setUser } = useAuth();
	const { phoneNumber, name } = route.params;

	const handleVerify = async () => {
		try {
			const response = await axios.post(`${API_URL}/api/auth/verifyOTP`, {
				phoneNumber,
				otp,
				name,
			});

			setToken(response.data.token);
			setUser(response.data.user);
			navigation.replace("Feed");
		} catch (error) {
			console.error("Error verifying OTP:", error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enter OTP</Text>
			<TextInput
				style={styles.otpInput}
				placeholder="Enter OTP"
				value={otp}
				onChangeText={setOtp}
				keyboardType="numeric"
			/>
			<TouchableOpacity style={styles.button} onPress={handleVerify}>
				<Text style={styles.buttonText}>Verify OTP</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = otpStyles;

export default OTPScreen;
