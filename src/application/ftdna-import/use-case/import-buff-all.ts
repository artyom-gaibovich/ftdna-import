import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/infra/persistence/prisma/prisma.service';
import { ImportBuffManager } from '@app/infra/utils/manager/import-buff.manager';
import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';

@Injectable()
export class ImportBuffAllUseCase {
	constructor(
		@Inject(PrismaService) private prismaService: PrismaService,
		@Inject(ImportBuffManager) private importBuffManager: ImportBuffManager,
	) {}

	async execute(dto: BuffImportDto) {
		const ftdnaLinks = await this.prismaService.fTDNALinks.findMany();
		const result = await Promise.all(
			ftdnaLinks.map(async (el) => {
				/*await new Promise((resolve) => {
					setTimeout(resolve, 5000);
				});*/
				return this.importBuffManager.import(el.target, dto);
			}),
		);
		return { no_added_projects: result.filter((el) => el.rowsAdded === 0).map((el) => el.project) };
	}
}
