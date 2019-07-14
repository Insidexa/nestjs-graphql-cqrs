import { AuthorAggregate } from './author-aggregate';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { AuthorById } from './queries/find-author.query';
import { AuthorsSearchParams } from './queries/all-authors.query';
import { AuthorCreateSchema, AuthorCreate, NewAuthor } from './commands/author-create';
import { v4 } from 'uuid';
import { DeleteAuthorById } from './commands/delete-author.command';
import { Inject, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from '../joi-validation.pipe';
import { PUB_SUB } from '../apollo-ws-pub-sub.provider';
import { PubSub } from 'apollo-server-express';

@Resolver(AuthorAggregate)
export class AuthorResolver {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        @Inject(PUB_SUB) private pubSub: PubSub,
    ) {
    }

    @Query(() => AuthorAggregate)
    public async author(@Args('id') id: string): Promise<AuthorAggregate> {
        return await this.queryBus.execute(
            plainToClass(AuthorById, { id }),
        );
    }

    @Query(() => [AuthorAggregate])
    public async authors(): Promise<AuthorAggregate[]> {
        return await this.queryBus.execute(
            plainToClass(
                AuthorsSearchParams,
                {},
            ),
        );
    }

    @ResolveProperty('posts')
    public posts(
        @Parent() author,
    ) {
        return [];
    }

    @UsePipes(new JoiValidationPipe(AuthorCreateSchema))
    @Mutation(() => String)
    async addAuthor(
        @Args('addAuthor') newAuthor: AuthorCreate,
    ): Promise<string> {
        const id = v4();
        const {
            firstName,
            lastName,
        } = newAuthor;
        await this.commandBus.execute(plainToClass(
            NewAuthor,
            {
                id,
                firstName,
                lastName,
            },
        ));

        return id;
    }

    @Mutation(() => Boolean)
    async removeAuthor(
        @Args('id') id: string,
    ) {
        await this.commandBus.execute(
            plainToClass(DeleteAuthorById, { id }),
        );

        return true;
    }

    @Subscription(() => String)
    authorDeleted() {
        return this.pubSub.asyncIterator('authorDeleted');
    }

    @Subscription(() => String)
    authorAdded() {
        return this.pubSub.asyncIterator('authorAdded');
    }
}
