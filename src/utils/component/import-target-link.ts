import { TargetLinkInterface } from './target-link.interface';

export class ImportTargetLink implements TargetLinkInterface {
	constructor(
		private target: string,
		private config: {
			base_url: string;
		},
	) {}

	prepare(): string {
		const res =  `${this.config.base_url}/public/${this.target}?iframe=yresults`;
		return res
	}
}
