# Pranamika - A Government Official Review Application

## Overview
A mobile application built with React Native and Node.js that enables citizens to review and provide feedback about government officials. Users can submit both positive and negative reviews along with images, creating transparency and accountability in public service.

## Features
- 📱 Mobile-first approach with cross-platform support
- 🔐 Secure OTP-based phone authentication
- 📸 Camera integration for capturing photos
- 🗃️ Feed-based review system
- 🎨 Color-coded reviews (green for positive, red for negative)
- 🔄 Pull-to-refresh functionality
- 🖼️ AWS S3 image storage integration
- 📱 Persistent authentication
- 📊 Paginated data loading

## Tech Stack

### Frontend
- **React Native** - Mobile application framework
- **Expo** - Development platform for React Native
- **TypeScript** - Type-safe code
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage management
- **React Context** - State management
- **Expo Camera** - Camera functionality

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **AWS SDK** - S3 integration
- **Twilio** - SMS service for OTP
- **Multer** - File upload handling
- **Cors** - Cross-origin resource sharing

### Cloud Services
- **AWS S3** - Image storage
- **MongoDB Atlas** - Cloud database
- **Twilio** - SMS services

## API Endpoints

### Authentication
```
POST /api/auth/sendOTP
- Send OTP to phone number
- Body: { phoneNumber: string }

POST /api/auth/verifyOTP
- Verify OTP and create user
- Body: { phoneNumber: string, otp: string, name: string }
```

### Reviews
```
GET /api/reviews
- Fetch paginated reviews
- Query: { page: number, limit: number }
- Headers: Authorization Bearer Token

POST /api/reviews
- Create new review
- Body: FormData (image, officialName, location, review, isPositive)
- Headers: Authorization Bearer Token
```

## Authentication Flow
1. User enters phone number
2. Backend generates OTP and sends via Twilio
3. User enters OTP
4. Backend verifies OTP and generates JWT
5. App stores authentication state
6. Subsequent app launches check for stored auth
7. Auto-redirect to feed if authenticated

## Main Features Implementation

### Review Creation
1. User taps "Write a Review"
2. Camera opens for photo capture
3. User fills review form:
   - Official's name
   - Location
   - Review text
   - Positive/Negative selection
4. Image uploads to S3
5. Review saves to MongoDB
6. Feed updates with new review

### Feed System
- Implements infinite scroll
- Pull-to-refresh functionality
- Cached data management
- Optimized image loading
- Error handling
- Loading states

## Security Features
- JWT-based authentication
- Secure OTP system
- AWS S3 secure upload
- Input validation
- Error handling
- CORS protection

## Performance Optimizations
- Image optimization before upload
- Lazy loading for feed items
- Pagination for data fetching
- Caching mechanisms
- Optimized re-renders
- Efficient state management

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments
- React Native community
- Expo team
- AWS Documentation
- Twilio Documentation
- MongoDB Documentation
