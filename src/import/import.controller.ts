import {
	Body,
	Controller,
	Inject,
	Param,
	Post,
	UsePipes,
	Headers,
	ValidationPipe,
	Header,
	Query,
} from '@nestjs/common';
import { ImportDto } from './dto/import-dto';
import { ImportManager } from './manager/import-manager';
import * as fs from 'node:fs';
import * as readline from 'node:readline';
import * as path from 'node:path';
import { PrismaService } from '../infra/persistence/prisma/prisma.service';

@Controller('import')
export class ImportController {
	constructor(
		@Inject(PrismaService) private prismaService: PrismaService,
		@Inject(ImportManager) private importManager: ImportManager,
	) {}

	@Post()
	async import(@Body() dto: ImportDto, @Query('link') link: string): Promise<any> {
		const res = dto;
		return await this.importManager.import(link, dto);
	}


	@Post('all')
	async importAll(@Body() dto: ImportDto): Promise<any> {
		return await this.importManager.importAll(dto)
	}


	@Post('read')
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
	}
}
