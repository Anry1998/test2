import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core'; 
   
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: any, host: ArgumentsHost) {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      console.log('exception', exception)
  
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(
        `Exception: ${exception.message}, stack: ${exception.stack}, status: ${exception.status}`,
      );
  
      const responseBody = {
        status: httpStatus,
        message: 'Internal Server error 😒',
      };
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }