import { Arg, Authorized, ObjectType, Resolver } from 'type-graphql';
import Container from 'typedi';
import { PERMISSION_AUTHENTICATED } from '~base/decentralization';
import { invalidMutation, StandardMutationError } from '~base/error';
import { Field, Mutation, Query } from '~graphql/graphql-decorators';

import { File } from './file.model';
import { FileService } from './file.service';

@ObjectType()
export class FilePayload {
  @Field(() => File, { nullable: true })
  public data?: File;

  @Field({ nullable: true })
  public error?: StandardMutationError;
}

@Resolver(File)
export class FileResolver {
  constructor(private readonly service: FileService) {
    Container.set(FileResolver, this);
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Mutation(() => FilePayload)
  public async createFile(): Promise<FilePayload> {
    let data = null;

    try {
      data = await this.service.createFile();
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Query(() => FilePayload)
  public async findFileById(@Arg('id') id: string): Promise<FilePayload> {
    let data = null;

    try {
      data = await this.service.findFileById(id);
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }

  @Authorized(PERMISSION_AUTHENTICATED)
  @Mutation(() => FilePayload)
  public async removeFileById(@Arg('id') id: string): Promise<FilePayload> {
    let data = null;

    try {
      data = await this.service.removeFileById(id);
    } catch (err) {
      return invalidMutation;
    }

    return { data };
  }
}
