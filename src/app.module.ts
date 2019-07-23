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
import { join } from 'path';
import { GraphqlDirectivesResolver } from './graphql-directive/graphql-directives-resolver';
import { GraphqlDirectiveModule } from './graphql-directive/graphql-directive.module';
import { PostResolver } from './post/post.resolver';
import { AddPostCommand } from './post/commands/add-post.command';
import { PostStore } from './post/post.store';
import { AuthorPostsQuery } from './author/queries/author-posts.query';

@Module({
  imports: [
      CqrsModule,
      GraphQLModule.forRootAsync({
          useFactory: (graphqlDirectiveResolver: GraphqlDirectivesResolver) => {
              const directiveProviders = graphqlDirectiveResolver.explore();
              const schemaDirectives = {};
              for (const { name, instance } of directiveProviders) {
                  schemaDirectives[name] = instance.resolver();
              }

              return {
                  installSubscriptionHandlers: true,
                  debug: true,
                  playground: true,
                  schemaDirectives,
                  typePaths: ['./**/*.graphql'],
                  definitions: {
                      path: join(process.cwd(), 'src/graphql.ts'),
                      outputAs: 'class',
                  },
              };
          },
          imports: [
              GraphqlDirectiveModule,
          ],
          inject: [
              GraphqlDirectivesResolver,
          ],
      }),
  ],
  providers: [
      apolloWsPubSubProvider,

      AuthorResolver,

      AddAuthorCommand,
      DeleteAuthorCommand,

      FindAuthorQuery,
      AllAuthorsQuery,
      AuthorPostsQuery,

      AuthorDeletedHandler,
      AuthorAddedHandler,

      AuthorStore,

      PostResolver,
      PostStore,
      AddPostCommand,
  ],
})
export class AppModule {
}
