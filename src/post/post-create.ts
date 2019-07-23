import { Field, InputType } from 'type-graphql';
import * as Joi from '@hapi/joi';

export class NewPost {
    public id: string;

    public title: string;

    public description: string;

    public authorId: string;
}

export const PostCreateSchema = Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).optional(),
    authorId: Joi.string().min(10).required(),
});

@InputType()
export class PostCreate {
    @Field(() => String, { nullable: false })
    public title: string;

    @Field(() => String, { nullable: false })
    public authorId: string;

    @Field(() => String, { nullable: true })
    public description?: string;
}
