import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../../apollo-ws-pub-sub.provider';
import { PubSub } from 'apollo-server-express';

export class AuthorAdded {
    public id: string;
}

@EventsHandler(AuthorAdded)
export class AuthorAddedHandler implements IEventHandler<AuthorAdded> {
    constructor(
        @Inject(PUB_SUB) private pubSub: PubSub,
    ) {
    }

    public handle(event: AuthorAdded) {
        this.pubSub.publish('authorAdded', {
            authorAdded: event.id,
        });
    }
}
