import { Module, OnModuleInit } from '@nestjs/common';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule implements OnModuleInit {
  onModuleInit() {
    const dir = join(process.cwd(), 'uploads', 'recipes');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }
}
