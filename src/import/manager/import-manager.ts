import { FtdnaClient } from '../../api/ftdna.client';
import { HtmlTableExtractor } from '@app/infra/utils/table/html-table.extractor';
import { BuffImportDto } from '@app/infra/http/dto/buff-import-dto';
import { Inject, Injectable } from '@nestjs/common';
import { ImportTargetLink } from '../../utils/component/import-target-link';
import { RowProcessor } from '../../processor/row.processor';
import { MarkerRepository } from '@app/application/ftdna-import/ports/marker/marker.repository';

@Injectable()
export class ImportManager {
	constructor(
		@Inject(HtmlTableExtractor) private tableExtractor: HtmlTableExtractor,
		@Inject(FtdnaClient) private ftdnaClinet: FtdnaClient,
		@Inject(RowProcessor) private rowProcessor: RowProcessor,
		@Inject(MarkerRepository) private markerRepository: MarkerRepository,
	) {}

	async import(target: string, dto: BuffImportDto) {
		const html = await this.ftdnaClinet.post(
			new ImportTargetLink(target, {
				base_url: 'https://www.familytreedna.com',
			}).prepare(),
			dto,
		);
		const extractedTable = this.tableExtractor.extract(html);
		const markers = await this.markerRepository.findMany();

		await Promise.all(extractedTable.map((row) => this.rowProcessor.process(row, markers)));
	}

	/*
    async importAll(dto : BuffImportDto) {
        const targets = ['Tatarstan', 'arcadia', 'new-netherlanders', 'russia']
        for (const target of targets) {
            const html = await this.ftdnaClinet.post(
                new ImportTargetLink(target, {
                    base_url: 'https://www.familytreedna.com',
                }).prepare(),
                dto,
            );
            const extractedTable = this.tableExtractor.extract(html);
            const markers = await this.prismaService.marker.findMany();
            await this.buffMigrationService.addDysColumns(markers);
            for (const row of extractedTable) {
                const buff = this.tableMapper.mapToBuff(row);
                const savedBuff = await this.buffRepository.create(buff);

                const buffToMarkers = this.tableMapper.mapToBuffMarkers(row, savedBuff.buff_id, markers);
                await this.buffToMarkerRepository.createMany(
                    buffToMarkers.map((el) => {
                        return {
                            buff_id: el.buff_id,
                            value: el.value,
                            mkid: el.mkid,
                        };
                    }),
                );
                await this.buffManager.updateDynamicCol(buffToMarkers, savedBuff.buff_id);
            }

        }
    }*/
}
