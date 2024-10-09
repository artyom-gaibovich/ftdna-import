import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Marker } from '@prisma/client';

@Injectable()
export class BuffMigrationService {
	constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

	async addDysColumns(markers: Marker[]): Promise<void> {
		for (const marker of markers) {
			const columnName = marker.mkname;
			await this.prisma.$executeRawUnsafe(
				`ALTER TABLE buff ADD COLUMN IF NOT EXISTS "${columnName}" VARCHAR(255)`,
			);
		}
	}
}
