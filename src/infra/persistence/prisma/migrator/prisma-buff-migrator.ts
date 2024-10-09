import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/infra/persistence/prisma/prisma.service';
import { Marker } from '@app/domain/ftdna-import/marker';

@Injectable()
export class PrismaBuffMigrator {
	constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

	async createDynamicColumns(markers: Marker[]): Promise<void> {
		for (const marker of markers) {
			const columnName = marker.mkname;
			await this.prisma.$executeRawUnsafe(
				`ALTER TABLE buff ADD COLUMN IF NOT EXISTS "${columnName}" VARCHAR(255)`,
			);
		}
	}
}
