# Prep Wise - AI-Powered Interview Practice Platform


## Overview

Prep Wise is an advanced interview preparation platform that uses AI to simulate realistic interview experiences. Practice job interviews with our AI interviewer, receive detailed feedback, and improve your skills for real interviews.

## Features

- **AI-Powered Interviews**: Practice with an AI interviewer that adapts to your responses
- **Multiple Interview Types**: Technical, behavioral, and mixed interview formats
- **Voice Interaction**: Natural conversation with the AI interviewer using voice recognition
- **Comprehensive Feedback**: Receive detailed assessments with scores across multiple categories:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence and Clarity
- **Personalized Reports**: Get actionable feedback on your strengths and areas for improvement
- **Tech Stack Focus**: Practice with interviews tailored to specific technologies
- **User Dashboard**: Track your progress and view past interview results

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- Zod for schema validation

### Backend
- Node.js with Express
- Firebase Authentication
- Firestore Database
- Google Generative AI (Gemini) for feedback analysis
- Vapi.ai for voice interaction

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Google AI API key
- Vapi.ai account

### Client Setup
```bash
# Clone the repository
git clone <repository-url>
cd Interview/client

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your client `.env` file:
```
VITE_BACKEND_BASE_URL=http://localhost:5000
```

### Server Setup
```bash
cd ../server

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your server `.env` file:
```
PORT=5000
GOOGLE_GEN_AI_API_KEY=your_google_ai_api_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

## Running the Application

### Development Mode

Start the server:
```bash
cd server
npm run dev
```

Start the client:
```bash
cd client
npm run dev
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:5000`.

### Production Build

Build the client:
```bash
cd client
npm run build
```

Build the server:
```bash
cd server
npm run build
```

## Project Structure

```
Interview/
├── client/                  # Frontend React application
│   ├── constants/           # Application constants and schemas
│   ├── Firebase/            # Firebase client configuration
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # React components
│       ├── context/         # React context providers
│       ├── lib/             # Utility functions
│       └── pages/           # Main application pages
│
└── server/                  # Backend Express application
    ├── Firebase/            # Firebase admin configuration
    ├── lib/                 # Server utilities and schemas
    ├── Middleware/          # Express middleware
    ├── Public/              # Public assets for server
    └── Routes/              # API route definitions
```

## User Flow

1. **Sign Up/Sign In**: Create an account or sign in
2. **Home Dashboard**: View available interviews and past results
3. **Create Interview**: Select interview type, role, and technology stack
4. **Take Interview**: Participate in a voice-based interview with AI
5. **Receive Feedback**: Get detailed performance analysis and improvement suggestions
6. **Track Progress**: Monitor your improvement over time

## API Endpoints

### Authentication
- `POST /auth/signup`: Create a new user account
- `POST /auth/signin`: Sign in to existing account
- `GET /auth/verify`: Verify user session
- `POST /auth/logout`: Log out user

### Interviews
- `GET /vapi/getlatest`: Get latest interviews
- `POST /vapi/getinterviews`: Get user's interviews
- `GET /vapi/getinterview`: Get interview by ID
- `POST /vapi/createfeedback`: Create interview feedback

## License

MIT License

## Contributors

- [Sreejit Sadhukhan](https://github.com/sreejit-sadhukhan00)

## Acknowledgements

- The application uses [Gemini AI](https://ai.google.dev/) for generating feedback
- Voice interaction powered by [Vapi.ai](https://vapi.ai/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

---

## Future Enhancements

- Industry-specific interview templates
- Mock interview recordings
- Interview scheduling with AI
- Peer review functionality
- Resume analysis and improvement suggestions
