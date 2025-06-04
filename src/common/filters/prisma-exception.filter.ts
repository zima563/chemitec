import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    // Prisma Validation Error
    if (exception instanceof Prisma.PrismaClientValidationError) {
      // Detect if it's "Unknown argument" type
      if (exception.message.includes('Unknown argument')) {
        const match = exception.message.match(
          /Unknown argument `(\w+)`. Did you mean `(\w+)`/,
        );
        if (match) {
          const wrongField = match[1];
          const correctField = match[2];
          status = HttpStatus.BAD_REQUEST;
          message = `The field "${wrongField}" is invalid. Did you mean "${correctField}"?`;
        } else {
          status = HttpStatus.BAD_REQUEST;
          message =
            'There is an invalid field in your request. Please check the field names.';
        }
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = 'Validation failed. Please check your request data.';
      }
    }

    // Prisma Known Errors (زي unique, not found, ... إلخ)
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    // NestJS HttpException
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();
      message =
        typeof responseBody === 'string'
          ? responseBody
          : (responseBody as any)?.message;
    }

    // باقي الأخطاء
    else if (exception?.message) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      error: true,
      message,
    });
  }
}
