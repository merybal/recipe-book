import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
// import { PrismaClient } from '../generated/prisma'; // Asegurate que el path es correcto
import { PrismaClient } from '../../generated/prisma'; // Asegurate que el path es correcto
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
