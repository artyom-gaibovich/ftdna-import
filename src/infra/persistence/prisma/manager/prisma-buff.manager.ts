import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Buff } from '@app/domain/ftdna-import/buff';
import { PrismaBuffMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff.mapper';

@Injectable()
export class PrismaBuffManager {
	constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

	async create(buffInput: Buff): Promise<Buff> {
		const buff = await this.prismaService.buff.create({ data: buffInput });
		return PrismaBuffMapper.toDomain(buff);
	}


	updateDynamicCol(
		markers: {
			value: string;
			mkname: string;
		}[],
		buff_id: number,
	) {
		let values = ``;
		for (let i = 0; i < markers.length; i++) {
			values += `${markers[i].mkname} = ${markers[i].value ? `'${markers[i].value}'` : null}, `;
		}
		let query = `UPDATE buff set ${values.slice(0, -2)} where buff_id = ${buff_id};`;

		return this.prismaService.$queryRawUnsafe(query);
	}
}
