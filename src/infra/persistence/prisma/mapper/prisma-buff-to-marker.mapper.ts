import { buff_to_marker as PrismaBuffToMarker, Prisma } from '@prisma/client';
import { BuffToMarker } from '@app/domain/ftdna-import/buff-to-marker';
import { Marker } from '@app/domain/ftdna-import/marker';

export class PrismaBuffToMarkerMapper {
	static toDomain(entity: PrismaBuffToMarker): BuffToMarker {
		const model = new BuffToMarker({
			buff_id: entity.buff_id,
			mkid: entity.mkid,
			value: entity.value,
		});
		return model;
	}

	static toPrisma(buffToMarker: BuffToMarker): Prisma.buff_to_markerUncheckedCreateInput {
		return {
			buff_id: buffToMarker.buff_id,
			mkid: buffToMarker.mkid,
			value: buffToMarker.value,
		};
	}

	static toPrismaTableCreateMany(
		row: any,
		buffId: number,
		markers: Marker[],
	): Prisma.buff_to_markerUncheckedCreateInput[] {
		const buffToMarkers = [];
		row.forEach((column) => {
			const marker = markers.find((m) => m.mkorigname === column.col);
			if (marker) {
				buffToMarkers.push({
					buff_id: buffId,
					mkid: marker.mkid,
					value: column.data,
					mkname: marker.mkname,
				});
			}
		});

		return buffToMarkers;
	}

	static toPrismaCreateMany(buffToMarkers: BuffToMarker[]): Prisma.buff_to_markerCreateManyInput[] {
		return buffToMarkers.map((item) => ({
			buff_id: item.buff_id,
			mkid: item.mkid,
			value: item.value,
		}));
	}
}
