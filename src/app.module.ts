import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorResolver } from './author/author.resolver';
import { AddAuthorCommand } from './author/commands/add-author.command';
import { AuthorStore } from './author/author.store';
import { FindAuthorQuery } from './author/queries/find-author.query';
import { AllAuthorsQuery } from './author/queries/all-authors.query';
import { DeleteAuthorCommand } from './author/commands/delete-author.command';
import { apolloWsPubSubProvider } from './apollo-ws-pub-sub.provider';
import { AuthorDeletedHandler } from './author/events/author-deleted.handler';
import { AuthorAddedHandler } from './author/events/author-added.handler';

@Module({
  imports: [
      CqrsModule,
      GraphQLModule.forRoot({
          installSubscriptionHandlers: true,
          debug: true,
          playground: true,
        autoSchemaFile: 'graphql.gql',
      }),
  ],
  providers: [
      apolloWsPubSubProvider,

      AuthorResolver,

      AddAuthorCommand,
      DeleteAuthorCommand,

      FindAuthorQuery,
      AllAuthorsQuery,

      AuthorDeletedHandler,
      AuthorAddedHandler,

      AuthorStore,
  ],
})
export class AppModule {}
