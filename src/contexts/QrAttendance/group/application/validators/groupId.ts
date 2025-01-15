import {IsNotEmpty, IsUUID} from "class-validator";

export class GroupIdDTO {

    @IsNotEmpty({
        message: 'Group id is required'
    })
    @IsUUID('all', {
        message: 'Group id must be an UUID'
    })
    id!: string;
}