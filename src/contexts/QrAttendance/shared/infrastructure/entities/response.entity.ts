import {Response} from "express";

export class ResponseEntity {
    private static code: number;
    private static data: any;

    public static ok = () => {
        this.code = 200;
        return this;
    }

    public static status = (code: number) => {
        this.code = code;
        return this;
    }

    public static body = (body: any) => {
        this.data = body;
        return this;
    }

    public static send = (res: Response) => {
        return res.status(this.code).json({body: this.data});
    }

    public static buid = () => {
        return this.data;
    }
}
