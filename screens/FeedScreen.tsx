import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import {
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import ReviewCard from "../components/ReviewCard";
import { API_URL } from "../config";
import { useAuth } from "../contexts/AuthContext";
import { feedStyles } from "../styles/FeedScreen.styles";
import { Review, RootStackParamList } from "../types";

const FeedScreen: React.FC = () => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { token } = useAuth();
	const { logout } = useAuth();

	const fetchReviews = async () => {
		try {
			setError(null);
			const response = await axios.get(`${API_URL}/api/reviews`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			});
			console.log(response);
			setReviews(response.data.reviews);
		} catch (error) {
			console.error("Error fetching reviews:", error);
			setError("Failed to load reviews. Please try again.");
		}
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchReviews().finally(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		fetchReviews().finally(() => setIsLoading(false));
	}, []);

	const handleWriteReview = () => {
		navigation.navigate("ReviewForm", {});
	};

	if (isLoading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>{error}</Text>
				<TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
					<Text style={styles.retryButtonText}>Retry</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.feedHeader}>
				<TouchableOpacity
					style={styles.writeButton}
					onPress={handleWriteReview}
				>
					<Text style={styles.buttonText}>Write a Review</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.logoutButton} onPress={logout}>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableOpacity>
			</View>

			{reviews.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No reviews yet</Text>
				</View>
			) : (
				<FlatList
					data={reviews}
					renderItem={({ item }) => <ReviewCard review={item} />}
					keyExtractor={(item) => item._id}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					contentContainerStyle={styles.listContainer}
				/>
			)}
		</View>
	);
};

const styles = {
	...feedStyles,
	feedHeader: {
		flex: 1,
		flexDirection: "row" as const,
		justifyContent: "space-between" as const,
		alignItems: "center" as const,
		padding: 15,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center" as const,
		alignItems: "center" as const,
	},
	errorText: {
		color: "#721c24",
		fontSize: 16,
		marginBottom: 16,
	},
	retryButton: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
	},
	retryButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center" as const,
		alignItems: "center" as const,
	},
	emptyText: {
		fontSize: 16,
		color: "#666",
	},
	listContainer: {
		paddingBottom: 20,
	},
};

export default FeedScreen;
