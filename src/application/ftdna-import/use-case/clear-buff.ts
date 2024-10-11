import { Inject, Injectable } from '@nestjs/common';
import { BuffManager } from '@app/application/ftdna-import/ports/buff/buff.manager';

@Injectable()
export class ClearBuffUseCase {
	constructor(@Inject(BuffManager) private buffManager: BuffManager) {}

	async execute() {
		return await this.buffManager.deleteMany()
	}
}
