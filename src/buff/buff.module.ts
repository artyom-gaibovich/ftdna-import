import { Module } from '@nestjs/common';
import { BuffMigrationService } from './buff-migration.service';
import { BuffRepository } from './buff-repository';
import { PrismaService } from '../infra/persistence/prisma/prisma.service';
import { PrismaModule } from '../infra/persistence/prisma/prisma.module';
import { PrismaBuffManager } from '../infra/persistence/prisma/manager/prisma-buff.manager';

@Module({
	imports: [PrismaModule],
	providers: [BuffMigrationService, BuffRepository, PrismaBuffManager],
	exports: [BuffMigrationService, BuffRepository, PrismaBuffManager],
})
export class BuffModule {}
