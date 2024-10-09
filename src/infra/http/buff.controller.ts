import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';
import { ImportManager } from '../../import/manager/import-manager';
import { ImportBuffUseCase } from '@app/application/ftdna-import/use-case/import-buff';

@Controller('buff')
export class BuffController {
	constructor(@Inject(ImportBuffUseCase) private importBuffUseCase: ImportBuffUseCase) {}

	@Post('import')
	async import(@Body() dto: BuffImportDto, @Query('link') link: string): Promise<any> {
		const res = dto;
		return await this.importBuffUseCase.execute(link, dto);
	}

	/*

	@Post('all')
	async importAll(@Body() dto: BuffImportDto): Promise<any> {
		return await this.importManager.importAll(dto)
	}
*/

	/*@Post('read')
	async read() {
		const fileStream = fs.createReadStream(path.join('.', '.', 'links.txt'));
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});
		rl.on('line', async (line) => {
			console.log(`Строка из файла: ${line}`);
			const splitted_line = line.split('/')
			await this.prismaService.fTDNALinks.create({
				data: {
					url: line,
					target: splitted_line[splitted_line.length-1],
				},
			});
		});
		rl.on('close', () => {
			console.log('Чтение файла завершено');
		});
	}*/
}
