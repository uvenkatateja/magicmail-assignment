# Email Classifier - Frontend

Next.js frontend application for the Email Classifier. Provides a responsive, user-friendly interface for Gmail email classification using AI.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Login page (logic only)
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page (logic only)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── LoginForm.tsx         # Login UI component
│   ├── DashboardHeader.tsx   # Dashboard header UI
│   ├── EmailList.tsx         # Email list UI
│   ├── EmailDetail.tsx       # Email detail UI
│   └── ui/                   # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── select.tsx
├── lib/
│   └── utils.ts              # Utility functions
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
└── package.json              # Dependencies
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Create Environment File

Create a `.env.local` file in the frontend directory:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## 🎨 Features

### Login Page
- OpenRouter API key input
- Google OAuth sign-in
- Responsive design
- Local storage for API key

### Dashboard
- Auto-fetch emails on load
- Dynamic email count selector (5, 10, 15, 25, 50)
- Real-time classification
- Color-coded category badges
- Two-panel layout (list + detail)
- Responsive mobile/desktop views

## 📱 Responsive Design

### Mobile (< 640px)
- Stacked layout
- Compact spacing
- Smaller text sizes
- Touch-friendly buttons
- Email list: 50vh max height
- Detail panel: Scrollable below

### Tablet (640px - 768px)
- Medium spacing
- Standard text sizes
- Improved touch targets

### Desktop (> 768px)
- Side-by-side panels
- Full-height layout
- Larger text and spacing
- Hover effects

## 🎨 UI Components

### LoginForm
**Props:**
- `openaiKey`: string
- `isLoading`: boolean
- `onKeyChange`: (value: string) => void
- `onSaveKey`: () => void
- `onGoogleLogin`: () => void

**Features:**
- Centered card layout
- API key input with password masking
- Save and sign-in buttons
- Responsive sizing

### DashboardHeader
**Props:**
- `user`: User object
- `maxResults`: number
- `onMaxResultsChange`: (value: number) => void
- `onLogout`: () => void
- `onClassify`: () => void
- `isClassifying`: boolean
- `hasEmails`: boolean

**Features:**
- User avatar and info
- Email count dropdown
- Logout button
- Manual classify button

### EmailList
**Props:**
- `emails`: Email[]
- `isLoading`: boolean
- `selectedEmail`: Email | null
- `onSelectEmail`: (email: Email) => void
- `categoryColors`: Record<string, string>

**Features:**
- Scrollable email list
- Category badges
- Loading state
- Empty state
- Click to select

### EmailDetail
**Props:**
- `selectedEmail`: Email | null
- `categoryColors`: Record<string, string>

**Features:**
- Full email details
- Sender information
- Subject and content
- Category badge
- Empty state

## 🎨 Category Colors

```typescript
const categoryColors = {
  Important: 'text-green-600 bg-green-50 border-green-200',
  Promotional: 'text-purple-600 bg-purple-50 border-purple-200',
  Social: 'text-blue-600 bg-blue-50 border-blue-200',
  Marketing: 'text-orange-600 bg-orange-50 border-orange-200',
  Spam: 'text-red-600 bg-red-50 border-red-200',
  General: 'text-gray-600 bg-gray-50 border-gray-200',
};
```

## 💾 Local Storage

The application uses localStorage for:

1. **openai_key**: OpenRouter API key
2. **access_token**: Google OAuth access token
3. **refresh_token**: Google OAuth refresh token
4. **user**: User profile data (JSON string)
5. **classified_emails**: Classified emails cache (JSON string)

## 🔄 Application Flow

### Login Flow
1. User enters OpenRouter API key
2. Click "Save API Key" → Stored in localStorage
3. Click "Sign in with Google" → Redirects to Google OAuth
4. Google redirects back with tokens
5. Tokens stored in localStorage
6. Redirect to dashboard

### Dashboard Flow
1. Check for access token and API key
2. Auto-fetch emails (default: 15)
3. Auto-classify emails using GPT-4o
4. Display classified emails with badges
5. User can change email count → Auto-refetch
6. User can manually re-classify
7. Click email to view details

## 🏗️ Architecture

### Separation of Concerns

**Page Files** (Logic)
- State management
- API calls
- Event handlers
- useEffect hooks
- Business logic

**Component Files** (UI)
- Visual presentation
- Props interface
- Styling
- User interactions
- No business logic

### Example: Dashboard

```
dashboard/page.tsx (Logic)
    ↓
    ├── DashboardHeader (UI)
    ├── EmailList (UI)
    └── EmailDetail (UI)
```

## 🔧 Key Features Implementation

### Auto-fetch on Load
```typescript
useEffect(() => {
  // Validate auth
  // Fetch emails automatically
  fetchEmails();
}, [router]);
```

### Auto-refetch on Count Change
```typescript
useEffect(() => {
  if (accessToken && user) {
    fetchEmails();
  }
}, [maxResults]);
```

### Email Classification
```typescript
const classifyEmails = async (emails) => {
  // Call backend API
  // Parse classifications
  // Update email objects with categories
  // Store in localStorage
};
```

## 🐛 Troubleshooting

### "Failed to fetch emails"
- Check backend is running on port 5000
- Verify NEXT_PUBLIC_API_URL is correct
- Check browser console for errors

### "Authentication failed"
- Clear localStorage and try again
- Verify Google OAuth is configured correctly
- Check that test user is added

### Styling Issues
- Run `npm install` to ensure all dependencies are installed
- Check Tailwind CSS is configured correctly
- Verify shadcn/ui components are properly installed

## 📦 Dependencies

```json
{
  "next": "14.0.4",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.294.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.1.0"
}
```

## 🎨 Styling

### Tailwind Configuration
- Custom colors via shadcn/ui
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Dark mode support (system preference)

### Component Styling
- Utility-first approach
- Responsive modifiers (sm:, md:, lg:)
- Hover and focus states
- Smooth transitions

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login page loads correctly
- [ ] API key can be saved
- [ ] Google OAuth flow works
- [ ] Dashboard loads after login
- [ ] Emails are fetched automatically
- [ ] Emails are classified correctly
- [ ] Category badges display properly
- [ ] Email count selector works
- [ ] Email detail view works
- [ ] Logout works
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Part of MagicSlides.app Full-Stack Engineer Intern Assignment.
