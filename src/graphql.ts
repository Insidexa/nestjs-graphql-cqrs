
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AuthorCreate {
    firstName: string;
    lastName: string;
}

export class AuthorAggregate {
    id: string;
    firstName?: string;
    lastName?: string;
    posts?: PostAggregate[];
}

export abstract class IMutation {
    abstract addAuthor(addAuthor: AuthorCreate): string | Promise<string>;

    abstract removeAuthor(id: string): boolean | Promise<boolean>;
}

export class PostAggregate {
    title: string;
}

export abstract class IQuery {
    abstract author(id: string): AuthorAggregate | Promise<AuthorAggregate>;

    abstract authors(): AuthorAggregate[] | Promise<AuthorAggregate[]>;
}

export abstract class ISubscription {
    abstract authorDeleted(): string | Promise<string>;

    abstract authorAdded(): string | Promise<string>;
}
