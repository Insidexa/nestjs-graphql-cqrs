import { Module } from '@nestjs/common';
import { GraphqlDirectivesResolver } from './graphql-directives-resolver';
import { UpperDirectiveProvider } from './upper-directive-provider';
import { SecretTitleDirectiveProvider } from './secret-title-directive-provider';

const providers = [
    UpperDirectiveProvider,
    GraphqlDirectivesResolver,
    SecretTitleDirectiveProvider,
];

@Module({
    providers,
    exports: providers,
})
export class GraphqlDirectiveModule {
}
