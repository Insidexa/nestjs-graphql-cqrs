import { Field, InputType } from 'type-graphql';
import * as Joi from '@hapi/joi';

export class NewAuthor {
    public id: string;

    public firstName: string;

    public lastName: string;
}

export const AuthorCreateSchema = Joi.object().keys({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
});

@InputType()
export class AuthorCreate {
    @Field({ nullable: false })
    firstName?: string;

    @Field(() => String)
    lastName: string;
}
