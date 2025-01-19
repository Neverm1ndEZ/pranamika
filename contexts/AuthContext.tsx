// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define proper types for our user object
interface User {
	_id: string;
	name: string;
	phoneNumber: string;
}

interface AuthContextType {
	token: string | null;
	setToken: (token: string | null) => void;
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Load saved authentication state when app starts
	useEffect(() => {
		const loadAuthState = async () => {
			try {
				// Load both token and user data in parallel
				const [savedToken, savedUser] = await Promise.all([
					AsyncStorage.getItem("auth_token"),
					AsyncStorage.getItem("auth_user"),
				]);

				if (savedToken) {
					setToken(savedToken);
				}
				if (savedUser) {
					setUser(JSON.parse(savedUser));
				}
			} catch (error) {
				console.error("Failed to load auth state:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadAuthState();
	}, []);

	// Save authentication state whenever it changes
	useEffect(() => {
		const saveAuthState = async () => {
			try {
				// Save both token and user data
				if (token) {
					await AsyncStorage.setItem("auth_token", token);
				} else {
					await AsyncStorage.removeItem("auth_token");
				}

				if (user) {
					await AsyncStorage.setItem("auth_user", JSON.stringify(user));
				} else {
					await AsyncStorage.removeItem("auth_user");
				}
			} catch (error) {
				console.error("Failed to save auth state:", error);
			}
		};

		saveAuthState();
	}, [token, user]);

	// Implement logout functionality
	const logout = async () => {
		try {
			// Clear both storage and state
			await Promise.all([
				AsyncStorage.removeItem("auth_token"),
				AsyncStorage.removeItem("auth_user"),
			]);
			setToken(null);
			setUser(null);
		} catch (error) {
			console.error("Failed to logout:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ token, setToken, user, setUser, isLoading, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
