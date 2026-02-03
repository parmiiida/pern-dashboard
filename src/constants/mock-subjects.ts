// Mock subject data for three university courses
import { BaseRecord } from "@refinedev/core";

export interface Subject extends BaseRecord {
  id: number;
  code: string;
  name: string;
  department: string;
  description: string;
  createdAt?: string;
}

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "An overview of computer science fundamentals, programming, and problem-solving techniques.",
    createdAt: Date().toString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus I",
    department: "Mathematics",
    description:
      "Differential and integral calculus of one variable with applications.",
    createdAt: Date().toString(),
  },
  {
    id: 3,
    code: "PHYS150",
    name: "General Physics",
    department: "Physics",
    description:
      "Basic principles of physics, including mechanics, heat, and sound, for science majors.",
    createdAt: Date().toString(),
  },
];
