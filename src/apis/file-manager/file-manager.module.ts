import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerResolver } from './file-manager.resolver';

@Module({
  providers: [FileManagerResolver, FileManagerService]
})
export class FileManagerModule {}
