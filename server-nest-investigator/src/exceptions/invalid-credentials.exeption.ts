import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialsExeption extends HttpException {
    // messages;

    constructor(responce) {
        super('Invalid Credentials', HttpStatus.UNAUTHORIZED)
        // this.message = responce
    }
}