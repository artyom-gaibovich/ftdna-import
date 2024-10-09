import { Inject, Injectable } from '@nestjs/common';
import { Marker } from '@app/domain/ftdna-import/marker';
import { PrismaBuffMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff.mapper';
import { BuffManager } from '@app/application/ftdna-import/ports/buff/buff.manager';
import { BuffToMarkerManager } from '@app/application/ftdna-import/ports/buff-to-marker/buff-to-marker-manager';
import { BuffToMarker } from '@app/domain/ftdna-import/buff-to-marker';
import { PrismaBuffToMarkerMapper } from '@app/infra/persistence/prisma/mapper/prisma-buff-to-marker.mapper';
import { BuffBuilder } from '@app/infra/utils/builder/buff.builder';

@Injectable()
export class RowWriter {
	constructor(
		@Inject(BuffManager) private buffManager: BuffManager,
		@Inject(BuffToMarkerManager) private buffToMarkerManager: BuffToMarkerManager,
		@Inject(BuffBuilder) private buffBuilder: BuffBuilder,
	) {}

	async write(
		row: any,
		markers: {
			value: string;
			mkname: string;
			mkid: number;
			mkorigname: string;
		}[]
	) {
		const buffEntity = PrismaBuffMapper.toPrismaTable(row);
		const dysColumns = this.buffBuilder.build(markers);

		const mr = { ...buffEntity, ...dysColumns };
		const savedBuffEntity = await this.buffManager.create(buffEntity);

		const buffToMarkersEntity = PrismaBuffToMarkerMapper.toPrismaTableCreateMany(
			row,
			savedBuffEntity.buff_id,
			markers,
		);

		await this.buffToMarkerManager.createMany(
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
