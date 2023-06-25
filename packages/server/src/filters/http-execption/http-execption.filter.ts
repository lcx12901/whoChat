import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const message = exception.message;

    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse;
    if (typeof validatorMessage.message === 'object') {
      validatorMessage = exceptionResponse.message[0];
    }

    response.status(status).send({
      code: status,
      data: {},
      message:
        typeof validatorMessage === 'string' ? validatorMessage : message,
    });
  }
}
