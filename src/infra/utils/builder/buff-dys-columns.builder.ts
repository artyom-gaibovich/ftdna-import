import { Injectable } from '@nestjs/common';
import {Marker} from "@prisma/client";

@Injectable()
export class BuffDysColumnsBuilder {
	build(
		row: any,
		markers: Marker[],
	): { [key: string]: string | null } {
		const buffToMarkers = [];
		row.forEach((column) => {
			const marker = markers.find((m) => m.mkorigname === column.col);
			if (marker) {
				buffToMarkers.push({
					mkid: marker.mkid,
					value: column.data,
					mkname: marker.mkname,
				});
			}
		});
		const dysColumns: { [key: string]: string | null } = {};
		for (let i = 0; i < buffToMarkers.length; i++) {
			dysColumns[buffToMarkers[i].mkname] = buffToMarkers[i].value || null;
		}
		return dysColumns;
	}



}
