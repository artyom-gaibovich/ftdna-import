import { Module } from '@nestjs/common';
import { BuffController } from '@app/infra/http/buff.controller';
import { ImportBuffUseCase } from '@app/application/ftdna-import/use-case/import-buff';
import {FtdnaApi} from "@app/infra/http/api/ftdna.api";
import {UtilsModule} from "@app/infra/utils/utils.module";

@Module({
	imports: [UtilsModule],
	controllers: [BuffController],
	exports: [],
	providers: [ImportBuffUseCase, FtdnaApi],
})
export class HttpModule {}
