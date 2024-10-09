import { Module } from '@nestjs/common';
import { BuffController } from '@app/infra/http/buff.controller';
import { ApiModule } from '../api/api.module';
import { ExtractorModule } from '../extractor/extractor.module';
import { ImportManager } from './manager/import-manager';
import { PrismaModule } from '../infra/persistence/prisma/prisma.module';
import { MarkerModule } from '../entities/marker/marker.module';
import { BuffModule } from '../buff/buff.module';
import { MapperModule } from '../mapper/mapper.module';
import {ProcessorModule} from "../processor/processor.module";
import {PersistenceModule} from "@app/infra/persistence/persistence.module";

@Module({
	imports: [
		ProcessorModule,
		ApiModule,
		ExtractorModule,
		MapperModule,
		PersistenceModule,
	],
	controllers: [BuffController],
	providers: [ImportManager],
})
export class ImportModule {}
