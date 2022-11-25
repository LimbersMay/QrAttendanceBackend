interface Mapper<S, T> {
    toDomain(entity: S): T;
    toDomain(array: S[]): T[];
    toDomain(entityOrArray: S | S[]): T | T[];
}

export abstract class MapperService<S, T> implements Mapper<S, T> {

    protected abstract map(entity: S): T;

    toDomain(entity: S): T;
    toDomain(array: S[]): T[];
    toDomain(entityOrArray: S | S[]): T | T[] {

        if (Array.isArray(entityOrArray)) {
            return entityOrArray.map((item: S) => this.map(item));
        }

        return this.map(entityOrArray);
    }
}
