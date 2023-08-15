import {Left, Right} from "fp-ts/Either";

export type Either<E, A> = Left<E> | Right<A>
