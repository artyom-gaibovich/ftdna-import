import { Inject, Injectable } from '@nestjs/common';
import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';
import { ImportBuffManager } from '@app/infra/utils/manager/import-buff.manager';

@Injectable()
export class ImportBuffUseCase {
	constructor(@Inject(ImportBuffManager) private importBuffManager: ImportBuffManager) {}

	async execute(target: string, dto: BuffImportDto) {
		return this.importBuffManager.import(target, dto);
	}
}
