import { ClassType, NoExplicitTypeError } from 'type-graphql';
import {
    AuthorizedMetadata, BaseResolverMetadata, ClassMetadata, EnumMetadata, FieldMetadata,
    FieldResolverMetadata, MiddlewareMetadata, ParamMetadata, ResolverClassMetadata,
    ResolverMetadata, SubscriptionResolverMetadata, UnionMetadata, UnionMetadataWithSymbol
} from 'type-graphql/dist/metadata/definitions';
import {
    InterfaceClassMetadata
} from 'type-graphql/dist/metadata/definitions/interface-class-metadata';
import { ObjectClassMetadata } from 'type-graphql/dist/metadata/definitions/object-class-metdata';
import {
    ensureReflectMetadataExists, mapMiddlewareMetadataToArray, mapSuperFieldResolverHandlers,
    mapSuperResolverHandlers
} from 'type-graphql/dist/metadata/utils';

interface TargetMatchingMetaData {
  target: Function;
}
interface TargetAndMethodMatchingMetaData extends TargetMatchingMetaData {
  methodName: string;
}

function targetMatching<
  T extends TargetMatchingMetaData,
  K extends TargetMatchingMetaData
>(dest: T, src: K) {
  return dest.target === src.target;
}
function targetAndMethodMatching<
  T extends TargetAndMethodMatchingMetaData,
  K extends TargetAndMethodMatchingMetaData
>(dest: T, src: K) {
  return dest.target === src.target && dest.methodName === src.methodName;
}

const replaceDefinition = <T>(
  definitions: T[],
  definition: T,
  match: (definition: T, source: T) => boolean,
) => {
  let idx = -1;
  for (let i = 0; i < definitions.length; i += 1) {
    if (match(definition, definitions[i])) {
      idx = i;
      break;
    }
  }

  definitions.splice(idx, idx > -1 ? 1 : 0, definition);
};

export class MetadataStorage {
  public queries: ResolverMetadata[] = [];
  public mutations: ResolverMetadata[] = [];
  public subscriptions: SubscriptionResolverMetadata[] = [];
  public fieldResolvers: FieldResolverMetadata[] = [];
  public objectTypes: ObjectClassMetadata[] = [];
  public inputTypes: ClassMetadata[] = [];
  public argumentTypes: ClassMetadata[] = [];
  public interfaceTypes: InterfaceClassMetadata[] = [];
  public authorizedFields: AuthorizedMetadata[] = [];
  public enums: EnumMetadata[] = [];
  public unions: UnionMetadataWithSymbol[] = [];
  public middlewares: MiddlewareMetadata[] = [];

  private _queries: ResolverMetadata[] = [];
  private _mutations: ResolverMetadata[] = [];
  private _subscriptions: SubscriptionResolverMetadata[] = [];
  private _fieldResolvers: FieldResolverMetadata[] = [];
  private _objectTypes: ObjectClassMetadata[] = [];
  private _inputTypes: ClassMetadata[] = [];
  private _argumentTypes: ClassMetadata[] = [];
  private _interfaceTypes: InterfaceClassMetadata[] = [];

  private resolverClasses: ResolverClassMetadata[] = [];
  private fields: FieldMetadata[] = [];
  private params: ParamMetadata[] = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  public collectQueryHandlerMetadata(definition: ResolverMetadata) {
    replaceDefinition(this._queries, definition, targetAndMethodMatching);
  }
  public collectMutationHandlerMetadata(definition: ResolverMetadata) {
    replaceDefinition(this._mutations, definition, targetAndMethodMatching);
  }
  public collectSubscriptionHandlerMetadata(
    definition: SubscriptionResolverMetadata,
  ) {
    replaceDefinition(this._subscriptions, definition, targetAndMethodMatching);
  }
  public collectFieldResolverMetadata(definition: FieldResolverMetadata) {
    replaceDefinition(
      this._fieldResolvers,
      definition,
      targetAndMethodMatching,
    );
  }
  public collectObjectMetadata(definition: ObjectClassMetadata) {
    replaceDefinition(this._objectTypes, definition, targetMatching);
  }
  public collectInputMetadata(definition: ClassMetadata) {
    replaceDefinition(this._inputTypes, definition, targetMatching);
  }
  public collectArgsMetadata(definition: ClassMetadata) {
    replaceDefinition(this._argumentTypes, definition, targetMatching);
  }
  public collectInterfaceMetadata(definition: InterfaceClassMetadata) {
    replaceDefinition(this._interfaceTypes, definition, targetMatching);
  }
  public collectAuthorizedFieldMetadata(definition: AuthorizedMetadata) {
    this.authorizedFields.push(definition);
  }
  public collectEnumMetadata(definition: EnumMetadata) {
    this.enums.push(definition);
  }
  public collectUnionMetadata(definition: UnionMetadata) {
    const unionSymbol = Symbol(definition.name);
    this.unions.push({
      ...definition,
      symbol: unionSymbol,
    });
    return unionSymbol;
  }
  public collectMiddlewareMetadata(definition: MiddlewareMetadata) {
    this.middlewares.push(definition);
  }

  public collectResolverClassMetadata(definition: ResolverClassMetadata) {
    replaceDefinition(this.resolverClasses, definition, targetMatching);
  }
  public collectClassFieldMetadata(definition: FieldMetadata) {
    replaceDefinition(this.fields, definition, (dest, src) => {
      return dest.target === src.target && dest.name === src.name;
    });
  }
  public collectHandlerParamMetadata(definition: ParamMetadata) {
    replaceDefinition(this.params, definition, (dest, src) => {
      return targetAndMethodMatching(dest, src) && dest.index === src.index;
    });
  }

  public getClassFieldMetadata(target: () => void) {
    return this.fields.filter(field => targetMatching({ target }, field));
  }

  public build() {
    this.objectTypes = this.buildClassMetadata(this._objectTypes);
    this.inputTypes = this.buildClassMetadata(this._inputTypes);
    this.argumentTypes = this.buildClassMetadata(this._argumentTypes);
    this.interfaceTypes = this.buildClassMetadata(this._interfaceTypes);

    this.fieldResolvers = this.buildFieldResolverMetadata(this._fieldResolvers);

    this.queries = this.buildResolversMetadata(this._queries);
    this.mutations = this.buildResolversMetadata(this._mutations);
    this.subscriptions = this.buildResolversMetadata(this._subscriptions);

    this.buildExtendedResolversMetadata();
  }

  public clear() {
    this.queries = [];
    this.mutations = [];
    this.subscriptions = [];
    this.fieldResolvers = [];
    this.objectTypes = [];
    this.inputTypes = [];
    this.argumentTypes = [];
    this.interfaceTypes = [];
    this.authorizedFields = [];
    this.enums = [];
    this.unions = [];
    this.middlewares = [];

    this.resolverClasses = [];
    this.fields = [];
    this.params = [];

    this._queries = [];
    this._mutations = [];
    this._subscriptions = [];
    this._fieldResolvers = [];
    this._objectTypes = [];
    this._inputTypes = [];
    this._argumentTypes = [];
    this._interfaceTypes = [];
  }

  private buildClassMetadata(definitions: ClassMetadata[]) {
    return definitions.map(def => {
      const fields = this.fields
        .filter(field => field.target === def.target)
        .map(field => {
          return {
            ...field,
            roles: this.findFieldRoles(field.target, field.name),
            params: this.params.filter(
              param =>
                param.target === field.target &&
                field.name === param.methodName,
            ),
            middlewares: mapMiddlewareMetadataToArray(
              this.middlewares.filter(
                middleware =>
                  middleware.target === field.target &&
                  middleware.fieldName === field.name,
              ),
            ),
          };
        });

      return {
        ...def,
        fields,
      };
    });
  }

  private buildResolversMetadata(definitions: BaseResolverMetadata[]): any[] {
    return definitions.map(def => {
      const resolverClassMetadata = this.resolverClasses.find(
        resolver => resolver.target === def.target,
      )!;
      return {
        ...def,
        resolverClassMetadata,
        params: this.params.filter(
          param =>
            param.target === def.target && def.methodName === param.methodName,
        ),
        roles: this.findFieldRoles(def.target, def.methodName),
        middlewares: mapMiddlewareMetadataToArray(
          this.middlewares.filter(
            middleware =>
              middleware.target === def.target &&
              def.methodName === middleware.fieldName,
          ),
        ),
      };
    });
  }

  private buildFieldResolverMetadata(definitions: FieldResolverMetadata[]) {
    return this.buildResolversMetadata(definitions).map(def => {
      def.getObjectType =
        def.kind === 'external'
          ? def.resolverClassMetadata!.getObjectType
          : () => def.target as ClassType;
      if (def.kind === 'external') {
        const objectTypeCls = def.getObjectType!();
        const objectType = this.objectTypes.find(
          objTypeDef => objTypeDef.target === objectTypeCls,
        )!;
        const objectTypeField = objectType.fields!.find(
          fieldDef => fieldDef.name === def.methodName,
        )!;
        if (!objectTypeField) {
          if (!def.getType || !def.typeOptions) {
            throw new NoExplicitTypeError(def.target.name, def.methodName);
          }
          const fieldMetadata: FieldMetadata = {
            name: def.methodName,
            schemaName: def.schemaName,
            getType: def.getType!,
            target: objectTypeCls,
            typeOptions: def.typeOptions!,
            deprecationReason: def.deprecationReason,
            description: def.description,
            complexity: def.complexity,
            roles: def.roles!,
            middlewares: def.middlewares!,
            params: def.params!,
          };
          this.collectClassFieldMetadata(fieldMetadata);
          objectType.fields!.push(fieldMetadata);
        } else {
          objectTypeField.complexity = def.complexity;
          if (objectTypeField.params!.length === 0) {
            objectTypeField.params = def.params!;
          }
          if (def.roles) {
            objectTypeField.roles = def.roles;
          } else if (objectTypeField.roles) {
            def.roles = objectTypeField.roles;
          }
        }
      }

      return def;
    });
  }

  private buildExtendedResolversMetadata() {
    this.resolverClasses.forEach(def => {
      const target = def.target;
      let superResolver = Object.getPrototypeOf(target);

      // copy and modify metadata of resolver from parent resolver class
      while (superResolver.prototype) {
        const superResolverMetadata = this.resolverClasses.find(
          it => it.target === superResolver,
        );
        if (superResolverMetadata) {
          mapSuperResolverHandlers(this.queries, superResolver, def).forEach(
            item => {
              replaceDefinition(this.queries, item, targetAndMethodMatching);
            },
          );
          mapSuperResolverHandlers(this.mutations, superResolver, def).forEach(
            item => {
              replaceDefinition(this.mutations, item, targetAndMethodMatching);
            },
          );
          mapSuperResolverHandlers(
            this.subscriptions,
            superResolver,
            def,
          ).forEach(item => {
            replaceDefinition(
              this.subscriptions,
              item,
              targetAndMethodMatching,
            );
          });
          mapSuperFieldResolverHandlers(
            this.fieldResolvers,
            superResolver,
            def,
          ).forEach(item => {
            replaceDefinition(
              this.fieldResolvers,
              item,
              targetAndMethodMatching,
            );
          });
        }
        superResolver = Object.getPrototypeOf(superResolver);
      }
    });
  }

  private findFieldRoles(
    target: Function,
    fieldName: string,
  ): any[] | undefined {
    const authorizedField = this.authorizedFields.find(
      authField =>
        authField.target === target && authField.fieldName === fieldName,
    );
    if (!authorizedField) {
      return;
    }
    return authorizedField.roles;
  }
}
