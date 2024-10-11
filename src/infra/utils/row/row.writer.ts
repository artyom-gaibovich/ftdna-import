import { Inject, Injectable } from '@nestjs/common';
import { Marker } from '@app/domain/ftdna-import/marker';
import { PrismaBuffMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff.mapper';
import { BuffManager } from '@app/application/ftdna-import/ports/buff/buff.manager';
import { BuffToMarkerManager } from '@app/application/ftdna-import/ports/buff-to-marker/buff-to-marker-manager';
import { BuffToMarker } from '@app/domain/ftdna-import/buff-to-marker';
import { PrismaBuffToMarkerMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff-to-marker.mapper';
import { BuffDysColumnsBuilder } from '@app/infra/utils/builder/buff-dys-columns.builder';

@Injectable()
export class RowWriter {
	constructor(
		@Inject(BuffManager) private buffManager: BuffManager,
		@Inject(BuffToMarkerManager) private buffToMarkerManager: BuffToMarkerManager,
		@Inject(BuffDysColumnsBuilder) private buffBuilder: BuffDysColumnsBuilder,
	) {}

	async write(row: any, markers: Marker[]) {
		const dysColumns = this.buffBuilder.build(row, markers);
		const buffEntity = PrismaBuffMapper.toPrismaTable(row, dysColumns);
		const savedBuffEntity = await this.buffManager.create(buffEntity);
		const buffToMarkersEntity = PrismaBuffToMarkerMapper.toPrismaTableCreateMany(
			row,
			savedBuffEntity.buff_id,
			markers,
		);
		return await this.buffToMarkerManager.createMany(
			buffToMarkersEntity.map(
				(el) =>
					new BuffToMarker({
						buff_id: el.buff_id,
						value: el.value,
						mkid: el.mkid,
					}),
			),
		);
	}
}
