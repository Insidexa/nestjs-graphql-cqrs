import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PostAggregate {
    @Field(() => String)
    public title: string;
}

@ObjectType()
export class AuthorAggregate {
    @Field(() => String)
    public id: string;

    @Field({ nullable: true })
    public firstName?: string;

    @Field({ nullable: true })
    public lastName?: string;

    @Field(() => [PostAggregate])
    public posts?: PostAggregate[] = [];
}
