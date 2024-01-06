export class userAuthenticationModel {
  email: string;
  password: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class userDetails {
  name: string;
  email: string;
  password: string;
  number: number;
  image: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export enum validationMessage {
  forgotPassword = 'forgot-password',
  resetPassword = 'reset-password',
}

export enum errorMessage {
  email = 'You must enter a email',
  password = 'You must enter a password',
  emailNotValid = 'Not a valid email',
  verificationRequired = 'verification-required',
  enterValidEmail = 'Please enter valid email',
  enterValidOtp = 'Please enter valid otp',
  unableChangePassword = 'Unable to change your password try again',
  passwordNotMatch = 'Password do not match',
  invalidOtp = 'Invalid OTP entered',
}

export enum successMessage {
  passwordChanged = 'Password changed successfully',
  verificationSuccessfully = 'verification successfully',
}
