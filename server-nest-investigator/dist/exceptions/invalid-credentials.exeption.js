"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsExeption = void 0;
const common_1 = require("@nestjs/common");
class InvalidCredentialsExeption extends common_1.HttpException {
    constructor(responce) {
        super('Invalid Credentials', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidCredentialsExeption = InvalidCredentialsExeption;
//# sourceMappingURL=invalid-credentials.exeption.js.map