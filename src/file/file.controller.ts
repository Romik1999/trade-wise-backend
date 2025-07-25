import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth()
  @Post()
  async saveFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    console.log({ files });
    return this.fileService.saveFiles(files, folder);
  }
}
