import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../../apollo-ws-pub-sub.provider';
import { PubSub } from 'apollo-server-express';

export class AuthorDeleted {
    public id: string;
}

@EventsHandler(AuthorDeleted)
export class AuthorDeletedHandler implements IEventHandler<AuthorDeleted> {
    constructor(
        @Inject(PUB_SUB) private pubSub: PubSub,
    ) {
    }

    public handle(event: AuthorDeleted) {
        this.pubSub.publish('authorDeleted', {
            authorDeleted: event.id,
        });
    }
}
