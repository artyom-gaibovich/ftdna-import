import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';
import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FtdnaApi {
	async post(url: string, dto: BuffImportDto): Promise<any> {
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
