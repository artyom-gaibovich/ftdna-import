import { Module } from '@nestjs/common';
import { TableMapper } from './table-mapper';

@Module({
	providers: [TableMapper],
	exports: [TableMapper],
})
export class MapperModule {}
