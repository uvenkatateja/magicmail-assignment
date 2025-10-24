# Email Classifier - Backend

Express.js backend server for the Email Classifier application. Handles Google OAuth authentication, Gmail API integration, and email classification using OpenRouter's GPT-4o.

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Architecture**: MVC (Model-View-Controller)
- **APIs**: 
  - Google OAuth2 API
  - Gmail API
  - OpenRouter API (GPT-4o)
- **Language**: Node.js

## 📁 Project Structure

```
backend/
├── config/
│   └── oauth.js                    # OAuth2 client configuration
├── controllers/
│   ├── authController.js           # Authentication request handlers
│   ├── emailController.js          # Email fetching handlers
│   └── classificationController.js # Email classification handlers
├── services/
│   ├── authService.js              # OAuth business logic
│   ├── emailService.js             # Gmail API integration
│   └── classificationService.js    # OpenRouter API integration
├── routes/
│   ├── authRoutes.js               # /auth/* routes
│   └── apiRoutes.js                # /api/* routes
├── .env                            # Environment variables (create this)
├── .env.example                    # Environment variables template
├── server.js                       # Application entry point
└── package.json                    # Dependencies
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google+ API
   - Gmail API
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
5. Add test user:
   - Go to "OAuth consent screen"
   - Add test user: `theindianappguy@gmail.com`
6. Copy Client ID and Client Secret

### 3. Create Environment File

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes

#### GET `/auth/google`
Generate Google OAuth URL for user authentication.

**Response:**
```json
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

#### GET `/auth/google/callback`
Handle OAuth callback from Google. Redirects to frontend with tokens.

**Query Parameters:**
- `code`: Authorization code from Google

**Redirects to:**
```
http://localhost:3000?access_token=...&refresh_token=...&user=...
```

### Email Routes

#### POST `/api/emails`
Fetch user's emails from Gmail.

**Request Body:**
```json
{
  "accessToken": "user_access_token",
  "maxResults": 15
}
```

**Response:**
```json
{
  "emails": [
    {
      "id": "email_id",
      "subject": "Email subject",
      "from": "sender@example.com",
      "date": "Mon, 1 Jan 2024 12:00:00 +0000",
      "snippet": "Email preview text..."
    }
  ]
}
```

#### POST `/api/classify`
Classify emails using GPT-4o via OpenRouter.

**Request Body:**
```json
{
  "emails": [
    {
      "id": "email_id",
      "subject": "Email subject",
      "from": "sender@example.com",
      "snippet": "Email preview..."
    }
  ],
  "openaiApiKey": "sk-or-v1-..."
}
```

**Response:**
```json
{
  "classifications": [
    { "category": "Important" },
    { "category": "Promotional" },
    { "category": "Social" }
  ]
}
```

## 🏗️ Architecture

### MVC Pattern

**Config Layer** (`config/`)
- OAuth2 client configuration
- Shared configurations

**Routes Layer** (`routes/`)
- Define API endpoints
- Map endpoints to controllers

**Controllers Layer** (`controllers/`)
- Handle HTTP requests/responses
- Validate input
- Call appropriate services
- Return formatted responses

**Services Layer** (`services/`)
- Business logic
- External API integrations
- Data processing

### Flow Example: Email Classification

```
Client Request
    ↓
apiRoutes.js (POST /api/classify)
    ↓
classificationController.js
    ↓
classificationService.js
    ↓
OpenRouter API (GPT-4o)
    ↓
Response to Client
```

## 🔧 Key Features

### 1. OAuth2 Authentication
- Secure Google OAuth flow
- Token management
- User profile retrieval

### 2. Gmail Integration
- Fetch user emails
- Parse email headers
- Extract subject, sender, date, snippet

### 3. AI Classification
- OpenRouter API integration
- GPT-4o model
- Markdown response parsing
- Error handling for JSON parsing

### 4. Error Handling
- Comprehensive try-catch blocks
- Detailed error logging
- User-friendly error messages

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### OAuth Errors
- Verify redirect URI matches exactly in Google Console
- Check that Gmail API is enabled
- Ensure test user is added

### Classification Errors
- Check OpenRouter API key is valid
- Verify backend can reach openrouter.ai
- Check console logs for detailed error messages

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "googleapis": "^128.0.0",
  "openai": "^4.20.0"
}
```

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep Google OAuth credentials secure
- Use environment variables for all sensitive data
- CORS configured to only allow frontend origin

## 📝 Development Notes

### Adding New Routes

1. Create service in `services/`
2. Create controller in `controllers/`
3. Add route in `routes/`
4. Import and use in `server.js`

### Code Style

- Use async/await for asynchronous operations
- Implement proper error handling
- Add descriptive comments
- Follow modular architecture

## 🧪 Testing

Test endpoints using curl or Postman:

```bash
# Test auth URL generation
curl http://localhost:5000/auth/google

# Test email fetching (requires valid access token)
curl -X POST http://localhost:5000/api/emails \
  -H "Content-Type: application/json" \
  -d '{"accessToken":"your_token","maxResults":5}'
```

## 📄 License

Part of MagicSlides.app Full-Stack Engineer Intern Assignment.
