import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BuffManager } from '@app/application/ftdna-import/ports/buff/buff.manager';
import { PrismaBuffManager } from '@app/infra/persistence/prisma/manager/prisma-buff.manager';
import { BuffToMarkerManager } from '@app/application/ftdna-import/ports/buff-to-marker/buff-to-marker-manager';
import { PrismaBuffToMarkerManager } from '@app/infra/persistence/prisma/manager/prisma-buff-to-marker.manager';
import { MarkerRepository } from '@app/application/ftdna-import/ports/marker/marker.repository';
import { PrismaMarkerRepository } from '@app/infra/persistence/prisma/repositories/prisma-marker.repository';
import { PrismaBuffMigrator } from '@app/infra/persistence/prisma/migrator/prisma-buff-migrator';
import { BuffMigrator } from '@app/application/ftdna-import/ports/buff/buff-migrator';

@Module({
	imports: [],
	providers: [
		PrismaService,
		{
			provide: BuffManager,
			useClass: PrismaBuffManager,
		},
		{
			provide: BuffToMarkerManager,
			useClass: PrismaBuffToMarkerManager,
		},
		{
			provide: MarkerRepository,
			useClass: PrismaMarkerRepository,
		},
		{
			provide: BuffMigrator,
			useClass: PrismaBuffMigrator,
		},
	],
	exports: [PrismaService, BuffManager, BuffToMarkerManager, MarkerRepository, BuffMigrator],
})
export class PrismaModule {}
