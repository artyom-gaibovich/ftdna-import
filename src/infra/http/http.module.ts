import { Module } from '@nestjs/common';
import { BuffController } from '@app/infra/http/buff.controller';
import { ImportBuffUseCase } from '@app/application/ftdna-import/use-case/import-buff';
import { UtilsModule } from '@app/infra/utils/utils.module';
import { ReadBuffLinksUseCase } from '@app/application/ftdna-import/use-case/read-buff-links';
import { ApiModule } from './api/api.module';
import { ImportBuffAllUseCase } from '@app/application/ftdna-import/use-case/import-buff-all';
import { ClearBuffUseCase } from '@app/application/ftdna-import/use-case/clear-buff';

@Module({
	imports: [UtilsModule, ApiModule],
	controllers: [BuffController],
	exports: [],
	providers: [ImportBuffUseCase, ReadBuffLinksUseCase, ImportBuffAllUseCase, ClearBuffUseCase],
})
export class HttpModule {}
