import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Specification} from "../../../shared";
import {UserFinder} from "../../../user/application";

@ValidatorConstraint({async: true})
export class UserDoesNotExistValidator implements ValidatorConstraintInterface {

    public constructor(
        private readonly userFinder: UserFinder
    ) {}

    async validate(criteria: string, args: ValidationArguments) {
        const specifications = args.constraints[0](criteria);
        const table = await this.userFinder.execute(specifications);

        return !table;
    }
}

@ValidatorConstraint({async: true})
export class UserExistsValidator implements ValidatorConstraintInterface {

    public constructor(
        private readonly userFinder: UserFinder
    ) {}

    async validate(criteria: string, args: ValidationArguments) {
        const specifications = args.constraints[0](criteria);
        const table = await this.userFinder.execute(specifications);

        return !!table;
    }
}

export function UserWithAttributesExists(
    specificationsFactory: (propertyValue: any) => Specification<unknown> | Specification<unknown>[],
    validationOptions?: ValidationOptions
) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specificationsFactory],
            validator: UserExistsValidator,
        });
    };
}

export function UserWithAttributeDoesNotExist(
    specificationsFactory: (propertyValue: any) => Specification<unknown> | Specification<unknown>[],
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specificationsFactory],
            validator: UserDoesNotExistValidator,
        });
    };
}