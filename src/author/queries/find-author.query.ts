import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorStore } from '../author.store';
import { AuthorAggregate } from '../author-aggregate';
import { NotFoundException } from '@nestjs/common';

export class AuthorById {
    public id: string;
}

@QueryHandler(AuthorById)
export class FindAuthorQuery implements IQueryHandler<AuthorById> {
    constructor(
        private authors: AuthorStore,
    ) {
    }

    public async execute(query: AuthorById): Promise<AuthorAggregate> {
        const author = this.authors.data.find(author => author.id === query.id);

        if (author === undefined) {
            throw new NotFoundException(query.id);
        }

        return author;
    }

}
