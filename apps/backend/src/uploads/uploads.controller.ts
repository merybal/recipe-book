import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = 'uploads/recipes';
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const storage = diskStorage({
  destination: UPLOAD_DIR,
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname) || '.jpg';
    const filename = `${randomUUID()}${ext}`;
    cb(null, filename);
  },
});

@Controller('upload')
export class UploadsController {
  @Post('recipe-cover')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: MAX_SIZE_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIMES.includes(file.mimetype)) {
          cb(
            new BadRequestException(
              `Invalid file type. Allowed: ${ALLOWED_MIMES.join(', ')}`,
            ),
            false,
          );
          return;
        }
        cb(null, true);
      },
    }),
  )
  uploadRecipeCover(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return { url: `/api/uploads/recipes/${file.filename}` };
  }
}
