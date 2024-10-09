import {BuffToMarker} from "@app/domain/ftdna-import/buff-to-marker";

export abstract class BuffToMarkerManager {
	abstract createMany(inputBuffToMarker: BuffToMarker[]): Promise<BuffToMarker[]>;
}
