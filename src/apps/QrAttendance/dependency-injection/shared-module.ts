import {Container} from "inversify";
import {TYPES} from "./types";
import {SpecificationBuilder} from "../../../contexts/shared/specifications/specification-builder";
import {SequelizeSpecificationBuilder} from "../../../contexts/shared/specifications/sequelize-specification-builder";

export const sharedModule = (container: Container) => {
    // specifications
    container.bind<SpecificationBuilder<unknown, unknown>>(TYPES.SpecificationBuilder).to(SequelizeSpecificationBuilder);

}
