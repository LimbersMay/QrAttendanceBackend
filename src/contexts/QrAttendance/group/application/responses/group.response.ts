import {GroupEntity} from "../../domain/group.entity";

export class GroupResponse{
    createdAt?: Date
    id: string;
    name: string;

    constructor(id: string, name: string, createdAt?: Date) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }

    public static fromGroup(group: GroupEntity): GroupResponse {
        return new GroupResponse(
            group.groupId,
            group.name,
            group.createdAt
        )
    }

    public static fromGroups(groups: GroupEntity[]): GroupResponse[] {
        return groups.map(group => new GroupResponse(group.groupId, group.name, group.createdAt))
    }
}