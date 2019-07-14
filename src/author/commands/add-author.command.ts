import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthorStore } from '../author.store';
import { NewAuthor } from './author-create';
import { plainToClass } from 'class-transformer';
import { AuthorAdded } from '../events/author-added.handler';

@CommandHandler(NewAuthor)
export class AddAuthorCommand implements ICommandHandler<NewAuthor> {
    constructor(
       private authors: AuthorStore,
       private eventBus: EventBus,
    ) {
    }

    public async execute(command: NewAuthor): Promise<void> {
        this.authors.data.push(
            command,
        );
        this.eventBus.publish(
            plainToClass(
                AuthorAdded,
                { id: command.id },
            ),
        );
    }
}
