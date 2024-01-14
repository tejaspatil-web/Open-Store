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

export class validationMessage {
  public static readonly forgotPassword = 'forgot-password'
  public static readonly resetPassword = 'reset-password'
}

export class errorMessage {
  public static readonly email = 'You must enter a email'
  public static readonly password = 'You must enter a password'
  public static readonly emailNotValid = 'Not a valid email'
  public static readonly verificationRequired = 'verification-required'
  public static readonly enterValidEmail = 'Please enter valid email'
  public static readonly enterValidOtp = 'Please enter valid otp'
  public static readonly unableChangePassword = 'Unable to change your password try again'
  public static readonly passwordNotMatch = 'Password do not match'
  public static readonly invalidOtp = 'Invalid OTP entered'
}

export class successMessage {
 public static readonly passwordChanged = 'Password changed successfully'
 public static readonly verificationSuccessfully = 'verification successfully'
}
