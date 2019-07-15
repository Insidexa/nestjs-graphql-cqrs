import { Module } from '@nestjs/common';
import { GraphqlDirectivesResolver } from './graphql-directives-resolver';
import { UpperDirectiveProvider } from './upper-directive-provider';

const providers = [
    UpperDirectiveProvider,
    GraphqlDirectivesResolver,
];

@Module({
    providers,
    exports: providers,
})
export class GraphqlDirectiveModule {
}
