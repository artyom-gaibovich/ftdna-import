import { Injectable } from '@nestjs/common';
import { Buff, Marker } from '@prisma/client';

@Injectable()
export class TableMapper {
	mapToBuff(row: any[]): any {
		const buff = {
			kit_number: null,
			name: null,
			paternal_ancestor_name: null,
			country: null,
			haplogroup: null,
		};
		row.forEach((column) => {
			switch (column.col) {
				case 'Kit Number':
					buff.kit_number = column.data;
					break;
				case 'Name':
					buff.name = column.data;
					break;
				case 'Paternal Ancestor Name':
					buff.paternal_ancestor_name = column.data;
					break;
				case 'Country':
					buff.country = column.data;
					break;
				case 'Haplogroup':
					buff.haplogroup = column.data;
					break;
				default:
					break;
			}
		});

		return buff;
	}

	mapToBuffMarkers(
		row: any,
		buffId: number,
		markers: Marker[],
	): {
		buff_id: number;
		mkid: number;
		value: string;
		mkname: string;
	}[] {
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
}
