import {GroupEntity} from "./group.entity";

export class GroupValue implements GroupEntity{
    createdAt: Date;
    groupId: string;
    name: string;
    updatedAt: Date;
    userId: string;

    constructor({groupId, userId, name, createdAt, updatedAt}: GroupEntity) {
        this.groupId = groupId;
        this.userId = userId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
