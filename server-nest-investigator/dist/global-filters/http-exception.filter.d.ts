import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private configService;
    private readonly httpAdapterHost;
    private readonly logger;
    constructor(configService: ConfigService, httpAdapterHost: HttpAdapterHost);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
