import { Entity } from '@app/core/entities/entity';

export interface BuffToMarkerProps {
	buff_id: number;
	value: string;
	mkid: number;
}

export class BuffToMarker extends Entity<BuffToMarkerProps> {
	constructor(props: BuffToMarkerProps) {
		super(props);
	}

	get buff_id(): number {
		return this.props.buff_id;
	}

	get value(): string {
		return this.props.value;
	}

	get mkid(): number {
		return this.props.mkid;
	}
}
