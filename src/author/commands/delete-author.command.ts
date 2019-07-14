import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthorStore } from '../author.store';
import { plainToClass } from 'class-transformer';
import { AuthorDeleted } from '../events/author-deleted.handler';

export class DeleteAuthorById {
    public id: string;
}

@CommandHandler(DeleteAuthorById)
export class DeleteAuthorCommand implements ICommandHandler<DeleteAuthorById> {
    constructor(
        private authors: AuthorStore,
        private eventBus: EventBus,
    ) {
    }

    public async execute(command: DeleteAuthorById): Promise<void> {
        this.authors.data = this.authors.data.filter(author => author.id !== command.id);
        this.eventBus.publish(
            plainToClass(
                AuthorDeleted,
                {
                    id: command.id,
                },
            ),
        );
    }
}
