export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
    
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, APIError.prototype);
    
    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      response: this.response,
    };
  }
}