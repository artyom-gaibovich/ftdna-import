import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Buff } from '@app/domain/ftdna-import/buff';
import { PrismaBuffMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff.mapper';
import { BuffManager } from '@app/application/ftdna-import/ports/buff/buff.manager';

@Injectable()
export class PrismaBuffManager implements BuffManager {
	constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

	async create(buffInput: Buff): Promise<Buff> {
		const data = PrismaBuffMapper.toPrisma(buffInput);
		const entity = await this.prismaService.buff.create({ data });
		return PrismaBuffMapper.toDomain(entity);
	}

	async deleteMany(): Promise<number> {
		return (await this.prismaService.buff.deleteMany()).count;
	}
}
