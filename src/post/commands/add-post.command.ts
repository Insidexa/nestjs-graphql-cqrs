import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewPost } from '../post-create';
import { PostStore } from '../post.store';

@CommandHandler(NewPost)
export class AddPostCommand implements ICommandHandler<NewPost> {
    constructor(
       private posts: PostStore,
    ) {
    }

    public async execute(command: NewPost): Promise<void> {
        this.posts.data.push(
            command,
        );
    }
}
