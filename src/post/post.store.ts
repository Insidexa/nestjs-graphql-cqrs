import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PostAggregate } from '../graphql';

@Injectable()
export class PostStore {
    public data: PostAggregate[] = [
        {
            id: v4(),
            title: 'example post',
            description: null,
            authorId: 'c5d6594a-c615-4a00-963a-6300ad3e1dd4',
        },
    ];
}
