export const enum EResponseCode {
  SUCCESS = '0',

  // auth
  PASSWORD_RECENTLY_USED = 'AUTH0006',
  OTP_RESET_PASS_EXPIRED = 'AUTH0009',

  // customer
  CUSTOMER_EXPORT_FAIL = 'CUS0009',

  // scripts
  APPROACH_NOT_FOUND = 'APSCR0001',

  // categories
  CATEGORY_DUPLICATE = 'CTA0004',
}
