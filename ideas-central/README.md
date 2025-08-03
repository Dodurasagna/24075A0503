# 💡 Ideas Central - Smart Education Platform for Innovation

A full-stack web application designed to empower college students to submit, refine, and manage innovative project ideas while enabling faculty to view, mentor, and track student progress.

## 🌟 Features

### 👩‍🎓 Student Features
- **Account Registration & Login**: Secure authentication with bcrypt
- **Idea Submission**: Submit detailed project ideas with title, description, category, and team members
- **Dashboard**: View all submitted ideas and track their status
- **Status Tracking**: Monitor idea progress from submission to approval
- **Idea Management**: Delete submitted ideas before review

### 👨‍🏫 Faculty Features
- **Review Dashboard**: View all student-submitted ideas
- **Mentorship Tools**: Add comments and feedback to guide students
- **Status Management**: Update idea status (submitted, in progress, reviewed, approved, rejected)
- **Search & Filter**: Find ideas by status, category, or keywords

### 🔐 Security & Authentication
- Secure password hashing with bcrypt
- Session-based authentication
- Role-based access control (student/faculty)
- Protected API routes

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | bcrypt, Custom session management |
| **Styling** | Tailwind CSS, Custom components |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ideas-central
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ideas-central
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI with your Atlas connection string
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Application Structure

```
ideas-central/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── ideas/         # Ideas CRUD operations
│   │   ├── dashboard/         # Main dashboard page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable React components
│   │   ├── Navbar.tsx         # Navigation component
│   │   ├── IdeaCard.tsx       # Idea display component
│   │   ├── IdeaForm.tsx       # Idea submission form
│   │   └── FacultyModal.tsx   # Faculty review modal
│   ├── context/               # React Context
│   │   └── AuthContext.tsx    # Authentication state management
│   ├── lib/                   # Utility functions
│   │   ├── mongodb.ts         # Database connection
│   │   ├── auth.ts            # Authentication utilities
│   │   └── session.ts         # Session management
│   └── models/                # Database models
│       ├── User.ts            # User schema
│       └── Idea.ts            # Idea schema
├── .env.local                 # Environment variables
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🎯 Usage

### For Students

1. **Register an Account**
   - Visit `/register`
   - Fill in your details and select "Student" role
   - Verify your email and password

2. **Submit Ideas**
   - Log in to access your dashboard
   - Click "Submit New Idea"
   - Fill in the idea details (title, description, category, team members)
   - Submit for faculty review

3. **Track Progress**
   - View all your submitted ideas on the dashboard
   - Monitor status changes from faculty
   - Read faculty feedback and comments

### For Faculty

1. **Register as Faculty**
   - Visit `/register`
   - Select "Faculty" role during registration

2. **Review Student Ideas**
   - Access the faculty dashboard
   - Click on any idea card to open the review modal
   - Add comments and feedback
   - Update the idea status appropriately

3. **Mentor Students**
   - Provide constructive feedback
   - Guide students through the development process
   - Approve promising ideas for further development

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use interface for both students and faculty
- **Status Indicators**: Color-coded status badges for quick identification
- **Search & Filter**: Powerful filtering options for idea management

## 🔮 Future Enhancements

- **JWT Authentication**: Replace session-based auth with JWT tokens
- **Real-time Notifications**: WebSocket integration for instant updates
- **File Uploads**: Allow students to attach documents and presentations
- **Advanced Analytics**: Dashboard with charts and progress metrics
- **Email Notifications**: Automated emails for status updates
- **Collaboration Tools**: Built-in chat and commenting system
- **Project Templates**: Pre-defined templates for different project types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- Icons from various sources

---

**Ideas Central** - Fostering innovation in education, one idea at a time! 💡
