import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { PostAggregate } from '../graphql';
import { NewPost, PostCreate, PostCreateSchema } from './post-create';

@Resolver(PostAggregate)
export class PostResolver {
    constructor(
        private commandBus: CommandBus,
    ) {
    }

    @UsePipes(new JoiValidationPipe(PostCreateSchema))
    @Mutation(() => String)
    public async addPost(
        @Args('addPost') newPost: PostCreate,
    ) {
        const id = v4();
        const {
            title,
            description,
            authorId,
        } = newPost;
        await this.commandBus.execute(plainToClass(
            NewPost,
            {
                id,
                title,
                description,
                authorId,
            },
        ));

        return id;
    }
}
