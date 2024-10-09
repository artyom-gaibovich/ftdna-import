export class MarkerMapper {
	async map(columns: any, markers: any): Promise<any> {
		const markerMap = markers.reduce(
			(acc, marker) => {
				acc[marker.mkorigname] = marker;
				return acc;
			},
			{} as { [key: string]: (typeof markers)[0] },
		);

		const enrichedColumns = columns.map((column) => {
			const marker = markerMap[column];
			if (marker) {
				return {
					originalColumn: column,
					mkid: marker.mkid,
					parts: marker.parts,
					mkname: marker.mkname,
					mkcmt: marker.mkcmt,
				};
			} else {
				return {
					originalColumn: column,
					mkid: null,
					parts: null,
					mkname: null,
					mkcmt: null,
				};
			}
		});

		return enrichedColumns;
	}
    mapMarkers(collection: { col: string; data: string }[], markers: any) {

        const markerMap = markers.reduce((acc, marker) => {
            acc[marker.mkname] = marker;
            return acc;
        }, {} as { [key: string]: typeof markers[0] });

        const mappedCollection = collection.map(item => {
            const marker = markerMap[`str_${item.col}`.toLowerCase()] || null;

            return {
                ...item,
                marker,
            };
        });

        return mappedCollection;
    }
}
