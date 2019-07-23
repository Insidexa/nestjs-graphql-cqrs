import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { AuthorAggregate } from '../graphql';

@Injectable()
export class AuthorStore {
    public data: AuthorAggregate[] = [
        {
            id: 'c5d6594a-c615-4a00-963a-6300ad3e1dd4',
            firstName: 'asd',
            lastName: 'la',
        },
    ];
}
