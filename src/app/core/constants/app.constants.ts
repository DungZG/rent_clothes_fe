export const APP_CONSTANTS = {
  APP_NAME: 'Thuê Gì',
  APP_DESCRIPTION: 'Nền tảng cho thuê trang phục Cosplay hàng đầu Việt Nam',
  DEFAULT_PAGE_SIZE: 20,
  MAX_UPLOAD_SIZE_MB: 10,
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  CURRENCY: 'VND',
  LOCALE: 'vi-VN',
  DATE_FORMAT: 'dd/MM/yyyy',
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm',
} as const;

export const USER_ROLES = {
  RENTER: 'renter',
  SHOP_OWNER: 'shop_owner',
  STAFF: 'staff',
  ADMIN: 'admin',
} as const;
