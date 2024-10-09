import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Marker } from '@app/domain/ftdna-import/marker';
import { PrismaMarkerMapper } from '@app/infra/persistence/prisma/mapper/prisma-marker.mapper';
import {MarkerRepository} from "@app/application/ftdna-import/ports/marker/marker.repository";

@Injectable()
export class PrismaMarkerRepository implements MarkerRepository{
	constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	async findMany(): Promise<Marker[]> {
		const markers = await this.prismaService.marker.findMany();
		return markers.map((item) => PrismaMarkerMapper.toDomain(item));
	}
}
