import { Inject, Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { PrismaService } from '@app/infra/persistence/prisma/prisma.service';

@Injectable()
export class ReadBuffLinksUseCase {
	constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

	async execute() {
		const fileStream = fs.createReadStream(path.join('.', '.', '.', '.', 'links.txt'));
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity,
		});
		rl.on('line', async (line) => {
			const splitted_line = line.split('/');
			const target = splitted_line[splitted_line.length - 1].split('?')[0]
			console.log(`Строка из файла: ${line}`);

			await this.prismaService.fTDNALinks.create({
				data: {
					url: line,
					target: target,
				},
			});
		});
		rl.on('close', () => {
			console.log('Чтение файла завершено');
		});
	}
}
