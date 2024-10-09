import {Marker} from "@app/domain/ftdna-import/marker";


export abstract class MarkerRepository {
    abstract findMany(): Promise<Marker[]>;
}
