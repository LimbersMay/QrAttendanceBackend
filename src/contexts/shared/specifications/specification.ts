export type Expression<T> = {
    [key in keyof T]?: string | number | boolean | Expression<T> | Expression<T>[];
};

export interface Specification<T> {
    readonly value: string | number | boolean | undefined;
    isSatisfiedBy(candidate: T): boolean;
    and(other: Specification<T>): Specification<T>;
    or(other: Specification<T>): Specification<T>;
    not(): Specification<T>;
    convertToExpression(): Expression<T>;
}

export type Criteria = Specification<unknown> | Specification<unknown>[];

export abstract class AbstractSpecification<T> implements Specification<T> {

    public readonly value: string | number | boolean | undefined;

    abstract isSatisfiedBy(candidate: T): boolean;

    public and(other: Specification<T>): Specification<T> {
        return new AndSpecification(this, other);
    }

    public or(other: Specification<T>): Specification<T> {
        return new OrSpecification(this, other);
    }

    public not(): Specification<T> {
        return new NotSpecification(this);
    }

    public abstract convertToExpression(): Expression<T>;
}

export class AndSpecification<T> extends AbstractSpecification<T> {
    public one: Specification<T>;
    public other: Specification<T>;

    public constructor(one: Specification<T>, other: Specification<T>) {
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate);
    }

    public convertToExpression(): Expression<any> {
        const oneExpression = this.one.convertToExpression();
        const otherExpression = this.other.convertToExpression();
        return { and: [oneExpression, otherExpression] };
    }
}

export class OrSpecification<T> extends AbstractSpecification<T> {
    public one: Specification<T>;
    public other: Specification<T>;

    public constructor(one: Specification<T>, other: Specification<T>) {
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate);
    }

    public convertToExpression(): Expression<any> {
        const oneExpression = this.one.convertToExpression();
        const otherExpression = this.other.convertToExpression();
        return { or: [oneExpression, otherExpression] };
    }
}

export class NotSpecification<T> extends AbstractSpecification<T> {
    public wrapped: Specification<T>;

    public constructor(wrapped: Specification<T>) {
        super();
        this.wrapped = wrapped;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return !this.wrapped.isSatisfiedBy(candidate);
    }

    public convertToExpression(): Expression<any> {
        const wrappedExpression = this.wrapped.convertToExpression();
        return { not: wrappedExpression };
    }
}