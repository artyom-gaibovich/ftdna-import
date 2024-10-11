import { Buff } from '@app/domain/ftdna-import/buff';

export abstract class BuffManager {
	abstract create(buffInput: Buff): Promise<Buff>;

	abstract deleteMany(): Promise<number>;
}
