import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class BuffManager {
	constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
