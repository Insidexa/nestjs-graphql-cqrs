import { DirectiveResolver } from './graphql-directives-resolver';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver, GraphQLField } from 'graphql';

@DirectiveResolver('hideSecretTitle')
export class SecretTitleDirectiveProvider {
    public resolver(): SchemaDirectiveVisitor {
        return class extends SchemaDirectiveVisitor {
            public visitFieldDefinition(field: GraphQLField<any, any>) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function(...args) {
                    const result = await resolve.apply(this, args);
                    if (typeof result === 'string') {
                        if (result.toLowerCase().includes('secret')) {
                            return '';
                        }
                        return result;
                    }
                    return result;
                };
            }
        };
    }
}
