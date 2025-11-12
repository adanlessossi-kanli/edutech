export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in minutes
  price: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  maxParticipants: number;
  currentParticipants: number;
  startDate: Date;
  endDate: Date;
  tags: string[];
  imageUrl?: string;
  isLive: boolean;
  meetingUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledWorkshops: string[];
  completedWorkshops: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  workshopId: string;
  enrolledAt: Date;
  status: 'enrolled' | 'completed' | 'cancelled';
  progress: number;
}
