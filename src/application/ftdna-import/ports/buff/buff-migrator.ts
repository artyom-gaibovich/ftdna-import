import { Marker } from '@app/domain/ftdna-import/marker';

export abstract class BuffMigrator {
	abstract create(markers: Marker[]): Promise<void>;
}
