import { Inject, Injectable } from '@nestjs/common';
import { ImportTargetLink } from '../../../utils/component/import-target-link';
import { FtdnaApi } from '@app/infra/http/api/ftdna.api';
import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';
import { TableExtractor } from '@app/application/ftdna-import/ports/components/table/table.extractor';
import { MarkerRepository } from '@app/application/ftdna-import/ports/marker/marker.repository';
import { RowWriter } from '@app/infra/utils/row/row.writer';

@Injectable()
export class ImportBuffUseCase {
	constructor(
		@Inject(FtdnaApi) private ftdnaApi: FtdnaApi,
		@Inject(TableExtractor) private tableExtractor: TableExtractor,
		@Inject(MarkerRepository) private markerRepository: MarkerRepository,
		@Inject(RowWriter) private rowWriter: RowWriter,
	) {}

	async execute(target: string, dto: BuffImportDto) {
		const fetchedHTML = await this.ftdnaApi.post(
			new ImportTargetLink(target, {
				base_url: 'https://www.familytreedna.com',
			}).prepare(),
			dto,
		);
		const extractedTable = this.tableExtractor.extract(fetchedHTML);
		const markers = await this.markerRepository.findMany();
		await Promise.all(extractedTable.map((row) => this.rowWriter.write(row, markers)));

		return fetchedHTML;
	}
}
