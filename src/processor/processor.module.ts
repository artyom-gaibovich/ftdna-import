import { Module } from '@nestjs/common';
import { RowProcessor } from './row.processor';
import { MapperModule } from '../mapper/mapper.module';

@Module({
	imports: [MapperModule],
	exports: [RowProcessor],
	providers: [RowProcessor],
})
export class ProcessorModule {}
