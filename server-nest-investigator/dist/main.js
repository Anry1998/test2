"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const validation_pipe_1 = require("./pipes/validation.pipe");
const http_exception_filter_1 = require("./global-filters/http-exception.filter");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("./auth/guard/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const post_guard_1 = require("./auth/guard/post.guard");
async function bootstrap() {
    const PORT = process.env.APP_PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: ['http://localhost', process.env.CLIENT_HOST]
    });
    const configServise = app.get(config_1.ConfigService);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(new jwt_1.JwtService(), configServise, new core_1.Reflector()), new post_guard_1.PostGuard(new core_1.Reflector()));
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    const hhtpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(configServise, hhtpAdapterHost));
    await app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map