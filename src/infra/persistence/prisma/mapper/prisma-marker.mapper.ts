import { Marker as PrismaMarker } from '@prisma/client';
import { Marker } from '@app/domain/ftdna-import/marker';

export class PrismaMarkerMapper {
	static toDomain(entity: PrismaMarker): Marker {
		const model = new Marker({
			id: entity.mkid,
			mkname: entity.mkname,
			mkorigname: entity.mkorigname,
			mktype: entity.mktype,
			parts: entity.parts,
			mkcmt: entity.mkcmt,
		});
		return model;
	}
}
