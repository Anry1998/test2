// import { IEmployee } from "../IEmployee";

export interface AuthResponce {
    accessToken: string;
    refreshToken: string;
    id: number
    email: string
    createTime: string
    organId: IOrgan
    divisionId: IDivision
    post: IPost
}

interface IOrgan {
    id: number
    name: string
    adress: string
    createTime: string
}

interface IDivision {
    id: number
    name: string
    createTime: string
}

interface IPost {
    id: number
    value: string
    description: string
}