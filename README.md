# 🏢 CompanyShare

A secure and modern internal file-sharing application for companies, built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **Secure Authentication**: ID-based login system with unique user identification
- **Department-Level Access**: Files are only visible to users within the same department
- **File Upload & Management**: Drag-and-drop file uploads with support for various file types
- **Dark/Light Theme**: Toggle between themes with system preference support
- **Mobile Responsive**: Optimized for all devices and screen sizes
- **Modern UI**: Clean and professional interface using shadcn/ui components

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Authentication**: NextAuth.js with credentials provider
- **Database**: PostgreSQL with Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes for dark/light mode
- **File Upload**: react-dropzone

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd company-share
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database connection string and other configuration:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/companyshare"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/             # Authentication pages
│   └── register/
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── file/             # File-related components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── public/uploads/       # File upload storage
```

## 🔐 How It Works

1. **Registration**: Users register with their name, email, department, and password
2. **Unique ID Generation**: System generates a unique ID (e.g., "HR-1234") for each user
3. **Authentication**: Users login using their unique ID and password
4. **File Sharing**: Users can upload files that are automatically shared with their department
5. **Access Control**: Files are only visible to users in the same department

## 🎨 Supported File Types

- Images: PNG, JPG, JPEG, GIF
- Documents: PDF, DOC, DOCX
- Spreadsheets: XLS, XLSX
- Text: TXT, CSV

## 🌙 Theme Support

The application supports both light and dark themes with automatic system preference detection.

## 📱 Mobile Support

Fully responsive design that works seamlessly on:

- Desktop computers
- Tablets
- Mobile phones

## 🔧 Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linting
npm run lint

# Database operations
npx prisma studio          # Open database browser
npx prisma migrate dev      # Run database migrations
npx prisma generate         # Generate Prisma client
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Environment Variables

| Variable          | Description                  | Required           |
| ----------------- | ---------------------------- | ------------------ |
| `DATABASE_URL`    | PostgreSQL connection string | Yes                |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js       | Yes                |
| `NEXTAUTH_URL`    | Base URL of your application | Yes                |
| `MAX_FILE_SIZE`   | Maximum file size in bytes   | No (default: 10MB) |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication via [NextAuth.js](https://next-auth.js.org/)
