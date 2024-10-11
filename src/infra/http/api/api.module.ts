import { Module } from '@nestjs/common';
import { FtdnaApi } from '@app/infra/http/api/ftdna.api';

@Module({
	providers: [FtdnaApi],
	exports: [FtdnaApi],
})
export class ApiModule {}
