import { Module } from '@nestjs/common';
import { RowProcessor } from './row.processor';
import { MapperModule } from '../mapper/mapper.module';
import { BuffModule } from '../buff/buff.module';
import { BuffToMarkerModule } from '../buff-to-marker/buff-to-marker.module';

@Module({
	imports: [MapperModule, BuffModule, BuffToMarkerModule],
	exports: [RowProcessor],
	providers: [RowProcessor],
})
export class ProcessorModule {}
