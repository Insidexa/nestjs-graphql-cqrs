import { AuthorAggregate } from './author-aggregate';
import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorStore {
    public data: AuthorAggregate[] = [
        {
            id: v4(),
            firstName: 'asd',
            lastName: 'la',
        },
    ];
}
