import { Entity } from '../../core/entities/entity';

export interface MarkerProps {
	id?: number;
	mktype: number;
	mkname: string;
	mkorigname: string;
	parts: number;
	mkcmt?: string;
}

export class Marker extends Entity<MarkerProps> {
	constructor(props: MarkerProps) {
		super(props);
	}

	get id(): number {
		return this.props.id;
	}

	get mktype(): number {
		return this.props.mktype;
	}

	get mkname(): string {
		return this.props.mkname;
	}

	get parts(): number {
		return this.props.parts;
	}

	get mkcmt(): string {
		return this.props.mkcmt;
	}
}
