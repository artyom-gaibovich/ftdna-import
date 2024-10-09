import { Buff as PrismaBuff } from '@prisma/client';
import { Marker } from '@app/domain/ftdna-import/marker';
import { Buff } from '@app/domain/ftdna-import/buff';

export class PrismaBuffMapper {
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
}
