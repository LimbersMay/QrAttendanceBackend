interface Mapper<S, T> {

    toDomain(entity: S): T;
    toDomain(entity: S[]): T[];
    toDomain(entityOrArray: S | S[]): T | T[];

    toDto(entity: T): S;
    toDto(entity: T[]): S[];
    toDto(entityOrArray: T | T[]): S | S[];
}

export abstract class MapperService<S, T> implements Mapper<S, T> {

    protected abstract mapToDomain(entity: S): T;
    protected abstract mapToDto(entity: T): S;
    toDomain(entity: S): T;
    toDomain(entity: S[]): T[];
    toDomain(entityOrArray: S | S[]): T | T[] {

        if (Array.isArray(entityOrArray)) {
            return entityOrArray.map((item: S) => this.mapToDomain(item));
        }

        return this.mapToDomain(entityOrArray);
    }

    toDto(entity: T): S;
    toDto(entity: T[]): S[];
    toDto(entityOrArray: T | T[]): S | S[] {

        if (Array.isArray(entityOrArray)) {
            return entityOrArray.map((item: T) => this.mapToDto(item));
        }

        return this.mapToDto(entityOrArray);
    }
}
