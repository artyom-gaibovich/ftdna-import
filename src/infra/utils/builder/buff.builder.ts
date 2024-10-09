import { Injectable } from '@nestjs/common';

@Injectable()
export class BuffBuilder {
	build(
		markers: {
			value: string;
			mkname: string;
		}[],
	): { [key: string]: string | null } {
		const dysColumns: { [key: string]: string | null } = {};
		for (let i = 0; i < markers.length; i++) {
			dysColumns[markers[i].mkname] = markers[i].value || null;
		}
		return dysColumns;
	}
}
