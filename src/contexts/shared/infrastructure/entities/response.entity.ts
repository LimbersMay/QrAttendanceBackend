import {Response} from "express";

export class ResponseEntity {
    private static code: number;

    public static ok = () => {
        this.code = 200;
        return this;
    }

    public static status = (code: number) => {
        this.code = code;
        return this;
    }

    public static body = (body: any) => {
        this.body = body;
        return this;
    }

    public static send = (res: Response) => {
        return res.status(this.code).json({body: this.body});
    }
}
