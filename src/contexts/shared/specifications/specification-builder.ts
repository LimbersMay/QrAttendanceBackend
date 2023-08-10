import {Specification} from "./specification";

export interface SpecificationBuilder<T, K> {
    buildWhereClauseFromSpecifications(specifications: T): K;
    buildComplexSpecification(specification: Specification<T>): K;
    buildWhereClauseFromSpecification(specification: Specification<T>): K;
}
