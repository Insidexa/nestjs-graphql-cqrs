import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthorStore } from '../author.store';
import { AuthorAggregate } from '../../graphql';

export class AuthorsSearchParams {

}

@QueryHandler(AuthorsSearchParams)
export class AllAuthorsQuery implements IQueryHandler<AuthorsSearchParams> {
    constructor(
        private authors: AuthorStore,
    ) {
    }

    public async execute(query: AuthorsSearchParams): Promise<AuthorAggregate[]> {
        return this.authors.data;
    }

}
