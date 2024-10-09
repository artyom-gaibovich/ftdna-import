import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Marker } from '@prisma/client';

@Injectable()
export class MarkerRepository {
	constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	async findAll(): Promise<Marker[]> {
		try {
            return await this.prismaService.marker.findMany();
		} catch (e) {
			throw new BadRequestException(e.name);
		}
	}
}
