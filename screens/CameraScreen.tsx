// import React, { useState, useRef, useEffect } from "react";
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
// import { Camera, CameraType } from "expo-camera";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types";

// const CameraScreen: React.FC = () => {
// 	const [type, setType] = useState<CameraType>("back");
// 	const [hasPermission, setHasPermission] = useState(false);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const cameraRef = useRef<Camera>(null);

// 	const navigation =
// 		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// 	useEffect(() => {
// 		const getPermissions = async () => {
// 			const { status } = await Camera.requestCameraPermissionsAsync();
// 			setHasPermission(status === "granted");
// 			setIsLoading(false);
// 		};

// 		getPermissions();
// 	}, []);

// 	const takePicture = async () => {
// 		if (cameraRef.current) {
// 			try {
// 				const photo = await cameraRef.current.takePictureAsync();
// 				navigation.navigate("ReviewForm", { imageUri: photo.uri });
// 			} catch (error) {
// 				console.error("Error taking picture:", error);
// 				Alert.alert("Error", "Failed to take picture");
// 			}
// 		}
// 	};

// 	if (isLoading) {
// 		return (
// 			<View style={styles.container}>
// 				<Text>Loading...</Text>
// 			</View>
// 		);
// 	}

// 	if (!hasPermission) {
// 		return (
// 			<View style={styles.container}>
// 				<Text>No access to camera</Text>
// 			</View>
// 		);
// 	}

// 	return (
// 		<View style={styles.container}>
// 			<Camera style={styles.camera} type={type} ref={cameraRef}>
// 				<View style={styles.buttonContainer}>
// 					<TouchableOpacity style={styles.button} onPress={takePicture}>
// 						<Text style={styles.text}>Take Photo</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</Camera>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	camera: {
// 		flex: 1,
// 	},
// 	buttonContainer: {
// 		flex: 1,
// 		backgroundColor: "transparent",
// 		flexDirection: "row",
// 		justifyContent: "center",
// 		margin: 20,
// 		position: "absolute",
// 		bottom: 0,
// 		width: "100%",
// 	},
// 	button: {
// 		backgroundColor: "white",
// 		borderRadius: 25,
// 		padding: 15,
// 		paddingHorizontal: 30,
// 	},
// 	text: {
// 		fontSize: 16,
// 		color: "black",
// 	},
// });

// export default CameraScreen;

// // screens/CameraScreen.tsx
// import React, { useState, useRef } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { Camera } from "expo-camera";

// const CameraScreen = ({ navigation }) => {
// 	const [hasPermission, setHasPermission] = useState(null);
// 	const cameraRef = useRef(null);

// 	React.useEffect(() => {
// 		(async () => {
// 			const { status } = await Camera.requestCameraPermissionsAsync();
// 			setHasPermission(status === "granted");
// 		})();
// 	}, []);

// 	const takePicture = async () => {
// 		if (cameraRef.current) {
// 			const photo = await cameraRef.current.takePictureAsync();
// 			navigation.navigate("WriteReview", { photo });
// 		}
// 	};

// 	if (hasPermission === null) {
// 		return <View />;
// 	}
// 	if (hasPermission === false) {
// 		return <Text>No access to camera</Text>;
// 	}

// 	return (
// 		<View className="flex-1">
// 			<Camera ref={cameraRef} className="flex-1">
// 				<View className="flex-1 justify-end p-8">
// 					<TouchableOpacity
// 						className="bg-white p-4 rounded-full self-center mb-8"
// 						onPress={takePicture}
// 					>
// 						<View className="w-16 h-16 rounded-full bg-white border-4 border-gray-300" />
// 					</TouchableOpacity>
// 				</View>
// 			</Camera>
// 		</View>
// 	);
// };

// export default CameraScreen;
