export interface User {
  id: string;
  email: string;
  displayName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  isVerified: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  totalBookings: number;
  totalReviews: number;
  averageRating: number;
  memberSince: string;
}
