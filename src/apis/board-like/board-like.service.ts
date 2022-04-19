import { Injectable } from '@nestjs/common';
import { CreateBoardLikeInput } from './dto/create-board-like.input';
import { UpdateBoardLikeInput } from './dto/update-board-like.input';

@Injectable()
export class BoardLikeService {
  create(createBoardLikeInput: CreateBoardLikeInput) {
    return 'This action adds a new boardLike';
  }

  findAll() {
    return `This action returns all boardLike`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boardLike`;
  }

  update(id: number, updateBoardLikeInput: UpdateBoardLikeInput) {
    return `This action updates a #${id} boardLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardLike`;
  }
}
