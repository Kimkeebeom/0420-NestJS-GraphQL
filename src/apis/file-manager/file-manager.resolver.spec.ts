import { Test, TestingModule } from '@nestjs/testing';
import { FileManagerResolver } from './file-manager.resolver';
import { FileManagerService } from './file-manager.service';

describe('FileManagerResolver', () => {
  let resolver: FileManagerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileManagerResolver, FileManagerService],
    }).compile();

    resolver = module.get<FileManagerResolver>(FileManagerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
