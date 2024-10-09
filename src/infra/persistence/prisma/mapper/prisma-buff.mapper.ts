import { Buff as PrismaBuff, Prisma } from '@prisma/client';
import { Buff } from '@app/domain/ftdna-import/buff';

export class PrismaBuffMapper {
	static toPrisma(buff: Buff): Prisma.BuffUncheckedCreateInput {
		return {
			name: buff.name,
			paternal_ancestor_name: buff.paternal_ancestor_name,
			country: buff.country,
			haplogroup: buff.haplogroup,
			kit_number: buff.kit_number,
		};
	}

	static toDomain(entity: PrismaBuff): Buff {
		const model = new Buff({
			buff_id: entity.buff_id,
			kit_number: entity.kit_number,
			name: entity.name,
			paternal_ancestor_name: entity.paternal_ancestor_name,
			country: entity.country,
			haplogroup: entity.haplogroup,
		});
		return model;
	}

	static toPrismaTable(row: any): Buff {
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
			kit_number : buff.kit_number,
			name : buff.name,
			paternal_ancestor_name : buff.paternal_ancestor_name,
			country : buff.country,
			haplogroup : buff.haplogroup,
		});
	}
}
