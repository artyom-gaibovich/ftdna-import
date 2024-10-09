import { buff_to_marker as PrismaBuffToMarker } from '@prisma/client';
import { BuffToMarker } from '@app/domain/ftdna-import/buff-to-marker';

export class PrismaBuffToMarkerMapper {
	static toDomain(entity: PrismaBuffToMarker): BuffToMarker {
		const model = new BuffToMarker({
			buff_id: entity.buff_id,
			mkid: entity.mkid,
			value: entity.value,
		});
		return model;
	}
}
