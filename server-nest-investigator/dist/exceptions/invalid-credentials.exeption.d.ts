import { HttpException } from "@nestjs/common";
export declare class InvalidCredentialsExeption extends HttpException {
    constructor(responce: any);
}
