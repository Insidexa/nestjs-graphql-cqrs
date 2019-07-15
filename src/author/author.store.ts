import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { AuthorAggregate } from '../graphql';

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
