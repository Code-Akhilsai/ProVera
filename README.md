# ProVera

ProVera is a MERN-based Service Provider Onboarding Portal.

## Live Site

https://pro-vera.netlify.app

## Features

### Provider
- Register and login
- Complete profile
- Add service details and location
- Upload verification documents
- Review and submit application
- Track application status

### Admin
- Admin login
- View applications
- Search and filter providers
- View provider details and documents
- Approve or reject applications
- Add rejection remarks
- View application statistics

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Tailwind CSS
- Cloudinary
- Axios

## Application Flow

Register → Complete Profile → Upload Documents → Review → Submit → Admin Review → Approve/Reject

## Application Status

- Draft
- Pending Review
- Approved
- Rejected

## Environment Variables

Create a `.env` file in the backend:

PORT=3000

MONGO_URI=your_mongodb_uri 

JWT_SECRET_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## Installation

### Backend

cd backend

npm install

npm run dev

### Frontend

cd frontend

npm install

npm run dev

## Author

Akhil
