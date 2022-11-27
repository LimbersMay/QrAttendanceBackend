import {Request, Response} from "express";
import {UserRepository} from "../interfaces/user/user.repository";
import {handleHttp} from "../utils/handleHttp";

export class UserController {
    constructor(private userRepository: UserRepository ) {}

    getUser = async ({ query }: Request, res: Response ) => {
        try{
            const { userId } = query;
            const user = await this.userRepository.findUserById(`${userId}`);

            res.status(200);
            res.send({user});
        }catch (error) {
            handleHttp(res, 'Error al obtener usuarios');
        }
    }

}
