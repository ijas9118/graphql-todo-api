import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
  constructor(
    message: string,
    code: string = "INTERNAL_SERVER_ERROR",
    extensions: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code,
        ...extensions,
      },
    });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(`${resource} not found${id ? ` with ID: ${id}` : ""}`, "NOT_FOUND", {
      statusCode: 404,
    });
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "BAD_USER_INPUT", {
      statusCode: 400,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", {
      statusCode: 401,
    });
  }
}
