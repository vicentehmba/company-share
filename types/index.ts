import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    uniqueId: string;
    department: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      uniqueId: string;
      department: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uniqueId: string;
    department: string;
  }
}

export interface UserRegistration {
  fullName: string;
  email: string;
  department: string;
  password: string;
}

export interface FileUpload {
  id: string;
  name: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  department: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    fullName: string;
    uniqueId: string;
  };
}

export const DEPARTMENTS = [
  "HR",
  "IT",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Legal",
  "Engineering",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
