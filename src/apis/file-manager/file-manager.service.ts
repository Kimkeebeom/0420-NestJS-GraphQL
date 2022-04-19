import { Injectable } from '@nestjs/common';
import { CreateFileManagerInput } from './dto/create-file-manager.input';
import { UpdateFileManagerInput } from './dto/update-file-manager.input';

@Injectable()
export class FileManagerService {
  create(createFileManagerInput: CreateFileManagerInput) {
    return 'This action adds a new fileManager';
  }

  findAll() {
    return `This action returns all fileManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileManager`;
  }

  update(id: number, updateFileManagerInput: UpdateFileManagerInput) {
    return `This action updates a #${id} fileManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileManager`;
  }
}
