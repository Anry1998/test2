"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(configService, httpAdapterHost) {
        this.configService = configService;
        this.httpAdapterHost = httpAdapterHost;
        this.logger = new common_1.Logger();
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        this.logger.error(`Exception: ${exception.message}, status: ${status}`);
        if (status == 400) {
            response.status(status).json(isProduction
                ? {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: exception.message,
                }
                : {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: exception.message,
                    stacktrace: exception.stack,
                });
        }
        else if (status == 401) {
            response.status(status).json(isProduction
                ? {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: 'Ощибка авторизации',
                }
                : {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: exception.message,
                    stacktrace: exception.stack,
                });
        }
        else {
            const { httpAdapter } = this.httpAdapterHost;
            const httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            this.logger.error(`Exception: ${exception.message}, stack: ${exception.stack}, status: ${status}`);
            const responseBody = {
                status: httpStatus,
                message: 'Internal Server error 😒',
            };
            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [config_1.ConfigService,
        core_1.HttpAdapterHost])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map