import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileManagerService } from './file-manager.service';
import { FileManager } from './entities/file-manager.entity';
import { CreateFileManagerInput } from './dto/create-file-manager.input';
import { UpdateFileManagerInput } from './dto/update-file-manager.input';

@Resolver(() => FileManager)
export class FileManagerResolver {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @Mutation(() => FileManager)
  createFileManager(@Args('createFileManagerInput') createFileManagerInput: CreateFileManagerInput) {
    return this.fileManagerService.create(createFileManagerInput);
  }

  @Query(() => [FileManager], { name: 'fileManager' })
  findAll() {
    return this.fileManagerService.findAll();
  }

  @Query(() => FileManager, { name: 'fileManager' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fileManagerService.findOne(id);
  }

  @Mutation(() => FileManager)
  updateFileManager(@Args('updateFileManagerInput') updateFileManagerInput: UpdateFileManagerInput) {
    return this.fileManagerService.update(updateFileManagerInput.id, updateFileManagerInput);
  }

  @Mutation(() => FileManager)
  removeFileManager(@Args('id', { type: () => Int }) id: number) {
    return this.fileManagerService.remove(id);
  }
}
