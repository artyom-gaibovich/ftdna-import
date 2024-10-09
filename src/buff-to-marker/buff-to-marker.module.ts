import { Module } from '@nestjs/common';
import { BuffToMarkerRepository } from './buff-to-marker.repository';
import { PrismaModule } from '../database/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [BuffToMarkerRepository],
	exports: [BuffToMarkerRepository],
})
export class BuffToMarkerModule {}
