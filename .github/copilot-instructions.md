# CompanyShare - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Next.js 14 internal file sharing application for companies using TypeScript, Tailwind CSS, NextAuth.js, and Prisma.

## Key Features

- Department-based user registration with unique ID generation
- Secure authentication using unique ID + password
- File upload with department-level access control
- Dark/light theme toggle
- Mobile-responsive design
- Corporate-themed UI

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Authentication**: NextAuth.js with credentials provider
- **Database**: PostgreSQL with Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes for dark/light mode
- **File Upload**: react-dropzone with department filtering

## Code Style Guidelines

- Use TypeScript for all components and utilities
- Follow Next.js App Router patterns
- Use server components by default, client components only when needed
- Implement proper error handling and validation
- Use Tailwind CSS utility classes for styling
- Follow shadcn/ui component patterns
- Implement responsive design with mobile-first approach

## Security Considerations

- Hash all passwords using bcryptjs
- Validate all inputs with Zod schemas
- Implement proper authentication middleware
- Ensure department-level file access control
- Use environment variables for sensitive data

## File Organization

- Components in `/components` with subdirectories for ui, forms, layout, file
- App routes follow Next.js App Router structure
- Utilities in `/lib` directory
- Type definitions in `/types`
- Database schema in `/prisma`
