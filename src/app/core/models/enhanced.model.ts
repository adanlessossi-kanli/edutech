export interface Review {
  id: string;
  workshopId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  rating: number;
  totalStudents: number;
  specialties: string[];
}

export interface Payment {
  id: string;
  userId: string;
  workshopId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
}

export interface Progress {
  id: string;
  userId: string;
  workshopId: string;
  completionPercentage: number;
  lastAccessed: Date;
  certificateIssued?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'workshop_reminder' | 'new_workshop' | 'completion' | 'payment';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
