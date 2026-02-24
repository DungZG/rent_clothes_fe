export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  phone?: string;
}
