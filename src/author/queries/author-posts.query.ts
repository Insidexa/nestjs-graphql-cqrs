import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostAggregate } from '../../graphql';
import { PostStore } from '../../post/post.store';

export class AuthorPostsById {
    public id: string;
}

@QueryHandler(AuthorPostsById)
export class AuthorPostsQuery implements IQueryHandler<AuthorPostsById> {
    constructor(
        private posts: PostStore,
    ) {
    }

    public async execute(query: AuthorPostsById): Promise<PostAggregate[]> {
        return this.posts.data.filter(post => post.authorId === query.id);
    }

}
