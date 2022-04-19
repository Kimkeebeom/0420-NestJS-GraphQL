import { Test, TestingModule } from '@nestjs/testing';
import { BoardLikeResolver } from './board-like.resolver';
import { BoardLikeService } from './board-like.service';

describe('BoardLikeResolver', () => {
  let resolver: BoardLikeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardLikeResolver, BoardLikeService],
    }).compile();

    resolver = module.get<BoardLikeResolver>(BoardLikeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
