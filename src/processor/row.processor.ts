import { TableMapper } from '../mapper/table-mapper';
import { BuffRepository } from '../buff/buff-repository';
import { BuffToMarkerRepository } from '../buff-to-marker/buff-to-marker.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Marker } from '@prisma/client';
import { PrismaBuffManager } from '../infra/persistence/prisma/manager/prisma-buff.manager';

@Injectable()
export class RowProcessor {
	constructor(
		@Inject(TableMapper) private tableMapper: TableMapper,
		@Inject(PrismaBuffManager) private buffManager: PrismaBuffManager,
		@Inject(BuffRepository) private buffRepository: BuffRepository,
		@Inject(BuffToMarkerRepository) private buffToMarkerRepository: BuffToMarkerRepository,
	) {}

	async process(row: any, markers: Marker[]) {
		const buffEntity = this.tableMapper.mapToBuff(row);
		const savedBuffEntity = await this.buffRepository.create(buffEntity);
		const buffToMarkersEntity = this.tableMapper.mapToBuffMarkers(
			row,
			savedBuffEntity.buff_id,
			markers,
		);
		await this.buffToMarkerRepository.createMany(
			buffToMarkersEntity.map((el) => {
				return {
					buff_id: el.buff_id,
					value: el.value,
					mkid: el.mkid,
				};
			}),
		);
		await this.buffManager.updateDynamicCol(buffToMarkersEntity, savedBuffEntity.buff_id);
	}
}
