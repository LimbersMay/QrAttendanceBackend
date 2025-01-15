import {Container} from "inversify";
import {SpecificationBuilder, SequelizeSpecificationBuilder} from "../../../contexts/QrAttendance/shared";
import {TYPES} from "./types";

export const sharedModule = (container: Container) => {
    // specifications
    container.bind<SpecificationBuilder<unknown, unknown>>(TYPES.SpecificationBuilder).to(SequelizeSpecificationBuilder);

}
