import { FtdnaClient } from '../../api/ftdna.client';
import { HtmlTableExtractor } from '../../extractor/html-table.extractor';
import { ImportDto } from '../dto/import-dto';
import { Inject, Injectable } from '@nestjs/common';
import { ImportTargetLink } from '../../utils/component/import-target-link';
import { PrismaService } from '../../database/prisma/prisma.service';
import { BuffMigrationService } from '../../buff/buff-migration.service';
import { TableMapper } from '../../mapper/table-mapper';
import { BuffToMarkerRepository } from '../../buff-to-marker/buff-to-marker.repository';
import { BuffRepository } from '../../buff/buff-repository';
import { BuffManager } from '../../buff/buff.manager';
import {RowProcessor} from "../../processor/row.processor";

@Injectable()
export class ImportManager {
	constructor(
		@Inject(HtmlTableExtractor) private tableExtractor: HtmlTableExtractor,
		@Inject(FtdnaClient) private ftdnaClinet: FtdnaClient,
		@Inject(PrismaService) private prismaService: PrismaService,
		@Inject(BuffMigrationService) private buffMigrationService: BuffMigrationService,
		@Inject(RowProcessor) private rowProcessor: RowProcessor,
	) {}

	async import(target: string, dto: ImportDto) {
		const html = await this.ftdnaClinet.post(
			new ImportTargetLink(target, {
				base_url: 'https://www.familytreedna.com',
			}).prepare(),
			dto,
		);
		const extractedTable = this.tableExtractor.extract(html);
		const markers = await this.prismaService.marker.findMany();
		await this.buffMigrationService.addDysColumns(markers);
		await Promise.all(extractedTable.map(row => this.rowProcessor.process(row, markers)));
	}




/*
	async importAll(dto : ImportDto) {
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
