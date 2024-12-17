export type RootStackParamList = {
	Auth: undefined;
	OTP: { phoneNumber: string; name: string };
	Feed: undefined;
	Camera: undefined;
	ReviewForm: { imageUri?: string };
};

export interface Review {
	_id: string;
	userId: {
		_id: string;
		name: string;
	};
	officialName: string;
	location: string;
	review: string;
	isPositive: boolean;
	imageUrl: string;
	createdAt: string;
}
