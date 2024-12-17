import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
	token: string | null;
	setToken: (token: string | null) => void;
	user: any | null;
	setUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<any | null>(null);

	console.log(token);

	return (
		<AuthContext.Provider value={{ token, setToken, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
