import { Buff } from '@app/domain/ftdna-import/buff';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BuffBuilder {
	build(
		row: any,
		markers: {
			value: string;
			mkname: string;
		}[],
	): Buff {
		const dysColumns: { [key: string]: string | null } = {};
		for (let i = 0; i < markers.length; i++) {
			dysColumns[markers[i].mkname] = markers[i].value || null;
		}

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

		return new Buff({
			kit_number: buff.kit_number,
			name: buff.name,
			paternal_ancestor_name: buff.paternal_ancestor_name,
			country: buff.country,
			haplogroup: buff.haplogroup,
			...dysColumns,
		});
	}
}
