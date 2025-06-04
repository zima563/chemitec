// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Default status code
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception?.message || 'Unexpected error';

    // تمنع ظهور الأخطاء في الـ console نهائيًا هنا
    // console.error(exception); // امسح أو علق هذا السطر لو موجود

    // Format response only
    response.status(status).json({
      statusCode: status,
      error: true,
      message,
    });
  }
}
