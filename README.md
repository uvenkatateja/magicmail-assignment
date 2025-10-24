# Email Classifier - Full-Stack Application

A web application that classifies Gmail emails into categories using AI (GPT-4o via OpenRouter). Built as part of the MagicSlides.app Full-Stack Engineer Intern Assignment.

## 🎯 Features

- **Google OAuth Authentication**: Secure login with Google account
- **Gmail Integration**: Fetch emails directly from Gmail API
- **AI-Powered Classification**: Automatically classify emails into 6 categories using GPT-4o
- **Real-time Processing**: Instant email classification with visual feedback
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Local Storage**: API keys and classified emails stored locally in browser

## 📋 Email Categories

- **Important**: Personal or work-related emails requiring immediate attention
- **Promotional**: Sales, discounts, and marketing campaigns
- **Social**: Social networks, friends, and family
- **Marketing**: Marketing, newsletters, and notifications
- **Spam**: Unwanted or unsolicited emails
- **General**: Everything else

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **State Management**: React Hooks

### Backend
- **Framework**: Express.js
- **Architecture**: MVC pattern (Controllers, Services, Routes)
- **APIs**: Google OAuth2, Gmail API, OpenRouter API
- **Language**: Node.js

## 📁 Project Structure

```
.
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── page.tsx        # Login page (logic only)
│   │   └── dashboard/      # Dashboard page (logic only)
│   ├── components/          # Reusable UI components
│   │   ├── LoginForm.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── EmailList.tsx
│   │   └── EmailDetail.tsx
│   └── components/ui/       # shadcn/ui components
│
├── backend/                 # Express.js backend
│   ├── config/             # Configuration files
│   │   └── oauth.js        # OAuth2 client setup
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── emailController.js
│   │   └── classificationController.js
│   ├── services/           # Business logic
│   │   ├── authService.js
│   │   ├── emailService.js
│   │   └── classificationService.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   └── apiRoutes.js
│   └── server.js           # Entry point
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Console account
- OpenRouter API account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd email-classifier
```

### 2. Backend Setup

See [backend/README.md](backend/README.md) for detailed backend setup instructions.

Quick start:
```bash
cd backend
npm install
# Configure .env file (see backend README)
npm run dev
```

### 3. Frontend Setup

See [frontend/README.md](frontend/README.md) for detailed frontend setup instructions.

Quick start:
```bash
cd frontend
npm install
# Configure .env file (see frontend README)
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔑 API Keys Required

1. **Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add test user: theindianappguy@gmail.com

2. **OpenRouter API Key**
   - Sign up at [OpenRouter](https://openrouter.ai/)
   - Get your API key (starts with `sk-or-v1-`)
   - Enter it in the application login page

## 📱 How to Use

1. **Enter OpenRouter API Key**: On the login page, enter your OpenRouter API key
2. **Save API Key**: Click "Save API Key" button
3. **Sign in with Google**: Click "Sign in with Google" and authorize the app
4. **View Emails**: Emails are automatically fetched and classified
5. **Change Email Count**: Use the dropdown to fetch 5, 10, 15, 25, or 50 emails
6. **View Details**: Click on any email to see full details

## 🎨 Design Features

- **Clean UI**: Modern, minimalist design with shadcn/ui components
- **Color-Coded Categories**: Each category has a distinct color badge
- **Responsive Layout**: 
  - Mobile: Stacked layout with scrollable sections
  - Desktop: Side-by-side email list and detail view
- **Loading States**: Visual feedback during email fetching and classification
- **Empty States**: Helpful messages when no emails are available

## 🏗️ Architecture Highlights

### Frontend Architecture
- **Separation of Concerns**: Logic in page files, UI in component files
- **Component Reusability**: Modular, reusable components
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Architecture
- **MVC Pattern**: Clear separation of routes, controllers, and services
- **Service Layer**: Business logic isolated in service files
- **Error Handling**: Comprehensive error handling and logging
- **Modular Design**: Easy to extend and maintain

## 🔒 Security

- API keys stored in browser localStorage (never sent to backend)
- Environment variables for sensitive backend credentials
- OAuth2 secure authentication flow
- CORS configured for frontend-backend communication

## 📝 Assignment Requirements Checklist

✅ User Authentication with Google OAuth  
✅ OpenRouter API key stored in localStorage  
✅ Fetch emails from Gmail API  
✅ Store emails in localStorage  
✅ Classify emails using GPT-4o (via OpenRouter)  
✅ 6 categories: Important, Promotional, Social, Marketing, Spam, General  
✅ Next.js frontend with Tailwind CSS  
✅ Express.js backend  
✅ Clean, modular, well-documented code  
✅ Responsive, user-friendly interface  
✅ README with setup instructions  

## 🧪 Testing

To test the application:

1. Add `theindianappguy@gmail.com` as a test user in Google Cloud Console
2. Use your own Gmail account for testing
3. Try different email counts (5, 10, 15, 25, 50)
4. Test on different screen sizes (mobile, tablet, desktop)

## 🐛 Troubleshooting

### Common Issues

**"Authentication failed"**
- Ensure Google OAuth credentials are correct
- Check that redirect URI matches exactly
- Verify test user is added in Google Cloud Console

**"Failed to classify emails"**
- Verify OpenRouter API key is valid
- Check backend console for detailed error messages
- Ensure backend is running on port 5000

**"Failed to fetch emails"**
- Check Gmail API is enabled in Google Cloud Console
- Verify OAuth scopes include Gmail readonly access
- Check access token is valid

## 📧 Contact

For questions about this assignment:
- Email: theindianappguy@gmail.com
- Assignment: MagicSlides.app Full-Stack Engineer Intern

## 📄 License

This project is created as part of an internship assignment for MagicSlides.app.

---

**Built with ❤️ for MagicSlides.app Internship Assignment**
