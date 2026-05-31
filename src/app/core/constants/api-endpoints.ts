export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    AVATAR: '/users/avatar',
  },
  LISTINGS: {
    CREATE: '/listings',
    LIST: '/listings',
    DETAIL: (id: string) => '/listings/' + id,
  },
  COSTUMES: {
    LIST: '/costumes',
    CREATE: '/costumes',
    DETAIL: (id: string) => '/costumes/' + id,
    SEARCH: '/costumes/search',
  },
  BOOKINGS: {
    CHECKOUT: '/bookings/checkout',
    LIST: '/bookings',
    DETAIL: (id: string) => '/bookings/' + id,
    CANCEL: (id: string) => '/bookings/' + id + '/cancel',
    RESCHEDULE: (id: string) => '/bookings/' + id + '/reschedule',
  },
  SHOPS: {
    DASHBOARD: '/shops/dashboard',
    INVENTORY: '/shops/inventory',
    ANALYTICS: '/shops/analytics',
  },
} as const;
