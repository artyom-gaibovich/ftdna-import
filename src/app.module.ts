import { Module } from '@nestjs/common';
import { ImportModule } from './import/import.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { MarkerModule } from './entities/marker/marker.module';
import { BuffModule } from './buff/buff.module';
import { MapperModule } from './mapper/mapper.module';
import { BuffToMarkerModule } from './buff-to-marker/buff-to-marker.module';
import { ProcessorModule } from './processor/processor.module';

@Module({
	imports: [ImportModule, PrismaModule, MarkerModule, BuffModule, MapperModule, BuffToMarkerModule, ProcessorModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
