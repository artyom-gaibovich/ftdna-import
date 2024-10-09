import { firstValueFrom } from 'rxjs';
import { BadRequestException, HttpServer } from '@nestjs/common';
import axios from 'axios';
import { ImportDto } from '../import/dto/import-dto';

export class FtdnaClient {
	constructor(private readonly httpService: HttpServer) {}

	async post(url: string, dto: ImportDto): Promise<any> {
		try {
			const result = await axios.post<any>(url, dto, {
				headers: {
					'Content-Type': dto.ftdna_content_type,
				},
			});
			return result.data;
		} catch (e) {
			const message = e.message ?? '';
			const code = e.code ?? '';

			throw new BadRequestException(message, code);
		}
	}
}
