import {Entity} from "@app/core/entities/entity";


export interface BuffProps {
    buff_id?: number;
    kit_number?: string;
    name?: string;
    paternal_ancestor_name?: string;
    country?: string;
    haplogroup?: string;
}

export class Buff extends Entity<BuffProps> {
    constructor(props: BuffProps) {
        super(props);
    }

    get buff_id(): number {
        return this.props.buff_id;
    }

    get kit_number(): string {
        return this.props.kit_number;
    }

    get name(): string {
        return this.props.name;
    }

    get paternal_ancestor_name(): string {
        return this.props.paternal_ancestor_name;
    }

    get country(): string {
        return this.props.country;
    }

    get haplogroup(): string {
        return this.props.haplogroup;
    }

}
