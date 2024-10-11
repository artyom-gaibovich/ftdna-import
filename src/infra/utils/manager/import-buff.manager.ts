import { Inject, Injectable } from '@nestjs/common';
import { FtdnaApi } from '@app/infra/http/api/ftdna.api';
import { TableExtractor } from '@app/application/ftdna-import/ports/components/table/table.extractor';
import { MarkerRepository } from '@app/application/ftdna-import/ports/marker/marker.repository';
import { RowWriter } from '@app/infra/utils/row/row.writer';
import {ImportTargetLink} from "@app/infra/utils/link/import-target-link";
import {BuffImportDto} from "@app/infra/http/dto/buff-import-dto";

@Injectable()
export class ImportBuffManager {
	constructor(
		@Inject(FtdnaApi) private ftdnaApi: FtdnaApi,
		@Inject(TableExtractor) private tableExtractor: TableExtractor,
		@Inject(MarkerRepository) private markerRepository: MarkerRepository,
		@Inject(RowWriter) private rowWriter: RowWriter,
	) {}

	async import(target: string, dto: BuffImportDto) {
		const fetchedHTML = await this.ftdnaApi.post(
			new ImportTargetLink(target, {
				base_url: dto.base_url,
			}).prepare(),
			dto,
		);
		const extractedTable = this.tableExtractor.extract(fetchedHTML);
		const markers = await this.markerRepository.findMany();
		const result = await Promise.all(
			extractedTable.map((row) => this.rowWriter.write(row, markers)),
		);
		console.log({ rowsAdded: result.length, project: target })
		return { rowsAdded: result.length, project: target };
	}
}
