import { Module } from '@nestjs/common';
import { BuffMigrationService } from './buff-migration.service';
import { BuffRepository } from './buff-repository';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaModule } from '../database/prisma/prisma.module';
import { BuffManager } from './buff.manager';

@Module({
	imports: [PrismaModule],
	providers: [BuffMigrationService, BuffRepository, BuffManager],
	exports: [BuffMigrationService, BuffRepository, BuffManager],
})
export class BuffModule {}
