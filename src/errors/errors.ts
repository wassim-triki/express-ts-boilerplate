class HttpError extends Error {
  public statusCode: number;
  public name: string;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 'ForbiddenError', 403);
  }
}

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 'InternalServerError', 500);
  }
}

export {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};
