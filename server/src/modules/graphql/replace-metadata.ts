import { MetadataStorage } from './metadata-storage';

const _global: any = global;
_global.TypeGraphQLMetadataStorage = new MetadataStorage();
