import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ApiModule } from '../api/api.module';
import { ExtractorModule } from '../extractor/extractor.module';
import { ImportManager } from './manager/import-manager';
import { PrismaModule } from '../database/prisma/prisma.module';
import { MarkerModule } from '../entities/marker/marker.module';
import { BuffModule } from '../buff/buff.module';
import { MapperModule } from '../mapper/mapper.module';
import { BuffToMarkerModule } from '../buff-to-marker/buff-to-marker.module';
import {ProcessorModule} from "../processor/processor.module";

@Module({
	imports: [
		ProcessorModule,
		ApiModule,
		ExtractorModule,
		PrismaModule,
		MarkerModule,
		BuffToMarkerModule,
		BuffModule,
		MapperModule,
	],
	controllers: [ImportController],
	providers: [ImportManager],
})
export class ImportModule {}
