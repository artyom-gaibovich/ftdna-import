import { Module } from '@nestjs/common';
import { HttpModule } from '@app/infra/http/http.module';
import { UtilsModule } from '@app/infra/utils/utils.module';

@Module({
	imports: [HttpModule],

})
export class FtdnaImportModule {}
