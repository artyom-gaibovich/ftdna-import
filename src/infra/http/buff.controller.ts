import {
	Body,
	Controller,
	Delete,
	Inject,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';
import { ImportBuffUseCase } from '@app/application/ftdna-import/use-case/import-buff';
import { ReadBuffLinksUseCase } from '@app/application/ftdna-import/use-case/read-buff-links';
import { ImportBuffAllUseCase } from '@app/application/ftdna-import/use-case/import-buff-all';
import { ClearBuffUseCase } from '@app/application/ftdna-import/use-case/clear-buff';

@Controller('buff')
export class BuffController {
	constructor(
		@Inject(ImportBuffUseCase) private importBuffUseCase: ImportBuffUseCase,
		@Inject(ImportBuffAllUseCase) private importBuffAllUseCase: ImportBuffAllUseCase,
		@Inject(ReadBuffLinksUseCase) private readBuffLinksUseCase: ReadBuffLinksUseCase,
		@Inject(ClearBuffUseCase) private clearBuffUseCase: ClearBuffUseCase,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('import')
	async import(@Body() dto: BuffImportDto, @Query('link') link: string): Promise<any> {
		const res = dto;
		return await this.importBuffUseCase.execute(link, dto);
	}

	@Post('import/all')
	async importAll(@Body() dto: BuffImportDto): Promise<any> {
		return await this.importBuffAllUseCase.execute(dto);
	}

	@Delete()
	async deleteAll() {
		return await this.clearBuffUseCase.execute();
	}

	@Post('read')
	async read() {
		await this.readBuffLinksUseCase.execute();
	}
}
