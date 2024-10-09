import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BuffToMarker } from '@app/domain/ftdna-import/buff-to-marker';
import { PrismaBuffToMarkerMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff-to-marker.mapper';
import { BuffToMarkerManager } from '@app/application/ftdna-import/ports/buff-to-marker/buff-to-marker-manager';

@Injectable()
export class PrismaBuffToMarkerManager implements BuffToMarkerManager {
	constructor(private readonly prisma: PrismaService) {}

	async createMany(inputBuffToMarker: BuffToMarker[]): Promise<BuffToMarker[]> {
		if (inputBuffToMarker.length === 0) {
			return [];
		}
		const data = PrismaBuffToMarkerMapper.toPrismaCreateMany(inputBuffToMarker);

		const createdBuffToMarker = await this.prisma.$transaction(
			data.map((item) => this.prisma.buff_to_marker.create({ data: item })),
		);

		return createdBuffToMarker.map((item) => PrismaBuffToMarkerMapper.toDomain(item));
	}
}
