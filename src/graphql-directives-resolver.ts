import { flattenDeep, compact } from 'lodash';
import { Injectable, SetMetadata } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export const DIRECTIVE_RESOLVER_METADATA = '__directive-resolver-metadata__';

interface IDirectiveResolver {
    resolver(): SchemaDirectiveVisitor;
}

interface DirectiveResolverInfo {
    name: string;
    instance: IDirectiveResolver;
}

export function DirectiveResolver(name: string): ClassDecorator {
    return (target: object) => {
        SetMetadata(DIRECTIVE_RESOLVER_METADATA, { name })(
            target,
        );
    };
}

@Injectable()
export class GraphqlDirectivesResolver {
    constructor(
        private modulesContainer: ModulesContainer,
    ) {
    }

    public explore(): DirectiveResolverInfo[] {
        const components = [
            ...this.modulesContainer.values(),
        ].map(module => module.providers);

        return compact(flattenDeep(
            components.map(component =>
                [...component.values()]
                    .map(({ instance }) => this.filterCommands(instance as IDirectiveResolver)),
            ),
        ));
    }

    protected filterCommands(instance: IDirectiveResolver) {
        if (!instance) {
            return;
        }

        const metadata = Reflect.getMetadata(DIRECTIVE_RESOLVER_METADATA, instance.constructor);

        if (metadata === undefined) {
            return;
        }

        return { ...metadata, instance };
    }
}
