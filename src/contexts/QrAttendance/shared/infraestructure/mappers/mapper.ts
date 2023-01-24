interface Mapper<S, T> {

    toDomain(entity: S): T;
    toDomain(entity: S[]): T[];
    toDomain(entityOrArray: S | S[]): T | T[];

    toPersistance(entity: T): S;
    toPersistance(entity: T[]): S[];
    toPersistance(entityOrArray: T | T[]): S | S[];

    toDTO(entity: T): S;
    toDTO(entity: T[]): S[];
    toDTO(entityOrArray: T | T[]): S | S[];
}

export abstract class MapperService<S, T> implements Mapper<S, T> {

    protected abstract mapToDomain(entity: S): T;
    protected abstract mapToPersistance(entity: T): S;
    protected abstract mapToDTO(entity: T): S;
    toDomain(entity: S): T;
    toDomain(entity: S[]): T[];
    toDomain(entityOrArray: S | S[]): T | T[] {

        if (Array.isArray(entityOrArray)) {
            return entityOrArray.map((item: S) => this.mapToDomain(item));
        }

        return this.mapToDomain(entityOrArray);
    }

    toPersistance(entity: T): S;
    toPersistance(entity: T[]): S[];
    toPersistance(entityOrArray: T | T[]): S | S[] {

        if (Array.isArray(entityOrArray)) {
            return entityOrArray.map((item: T) => this.mapToPersistance(item));
        }

        return this.mapToPersistance(entityOrArray);
    }

    toDTO(entity: T): S;
    toDTO(entity: T[]): S[];
    toDTO(entityOrArray: T | T[]): S | S[] {
        if (Array.isArray(entityOrArray)) {
            return entityOrArray.map((item: T) => this.mapToDTO(item));
        }

        return this.mapToDTO(entityOrArray);
    }
}
