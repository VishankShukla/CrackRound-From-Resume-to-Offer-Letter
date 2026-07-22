# CrackRound — From Resume to Offer Letter

CrackRound turns a resume and a job description into a personalized interview prep kit. Upload your resume (or write a quick self-description), paste the job description you're targeting, and get an AI-generated report with a match score, likely interview questions, skill gaps, and a day-by-day preparation plan.

## Features

- **Resume + JD analysis** — upload a PDF resume or type a self-description, paired with a target job description
- **AI-generated interview report** powered by Google's Gemini API, including:
  - A match score (0–100) against the job description
  - Technical questions with interviewer intent and suggested answers
  - Behavioral questions with interviewer intent and suggested answers
  - Identified skill gaps, ranked by severity
  - A day-by-day preparation roadmap
- **Resume download** — re-download the original resume file from any past report
- **Report history** — every generated report is saved to your account and listed on the dashboard
- **Authentication** — email/password auth with JWT stored in an HTTP-only cookie, plus token blacklisting on logout

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication (HTTP-only cookies)
- Multer (in-memory file uploads)
- `pdf-parse` for resume text extraction
- Google Gemini API (`@google/genai`) for report generation
- Zod for structured AI output validation

## Project Structure

```
CrackRound/
├── Backend/
│   ├── server.js
│   └── src/
│       ├── app.js                  # Express app setup, CORS, middleware
│       ├── config/database.js      # MongoDB connection
│       ├── controllers/            # Route handlers (auth, interview report)
│       ├── middlewares/            # Auth guard, file upload (multer)
│       ├── models/                 # Mongoose schemas (User, InterviewReport, Blacklist)
│       ├── routes/                 # Express routers
│       └── services/ai.service.js  # Gemini prompt + schema definitions
│
└── Frontend/
    └── src/
        ├── App.jsx / App.routes.jsx
        ├── components/             # Shared UI (Navbar, etc.)
        └── features/
            ├── auth/                # Login, Register, auth context/hooks/services
            └── interviewReport/     # Dashboard, report view, context/hooks/services
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB database 
- A Google Gemini API key ([Google AI Studio])

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd CrackRound-From-Resume-to-Offer-Letter-main
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret_string
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start the server:

```bash
npm run dev
```

You should see `Server Running On Port 3000` and `Database Connected Successfuly` in the terminal.

### 3. Frontend setup

In a separate terminal:

```bash
cd Frontend
npm install
npm run dev
```

This starts the Vite dev server, usually at `http://localhost:5173`.

### 4. Open the app

Visit `http://localhost:5173`, create an account, and generate your first interview report.

> **Note:** The frontend is hardcoded to call the backend at `http://localhost:3000`, and the backend's CORS is configured to only accept requests from `http://localhost:5173`. Update both if you change either port.

## API Overview

**Auth** (`/api/auth`)

| Method | Endpoint       | Description                          | Access  |
|--------|----------------|---------------------------------------|---------|
| POST   | `/register`    | Create a new account                  | Public  |
| POST   | `/login`       | Log in, sets an HTTP-only auth cookie | Public  |
| GET    | `/logout`      | Log out, blacklists the current token | Private |
| GET    | `/get-me`      | Get the current logged-in user        | Private |

**Interview Reports** (`/api/interview`)

| Method | Endpoint                          | Description                                  | Access  |
|--------|-----------------------------------|-----------------------------------------------|---------|
| POST   | `/`                               | Generate a new interview report               | Private |
| GET    | `/`                               | List all reports for the logged-in user       | Private |
| GET    | `/report/:interviewReportId`      | Get a single report by ID                     | Private |
| GET    | `/report/:interviewReportId/resume` | Download the original resume file for a report | Private |

## Roadmap Ideas

- [ ] Password reset flow
- [ ] Export report as a PDF
- [ ] Support multiple resumes per user
- [ ] Rate limiting on report generation
