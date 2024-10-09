import { Module } from '@nestjs/common';
import { PersistenceModule } from '@app/infra/persistence/persistence.module';
import { FtdnaImportModule } from './application/ftdna-import/ftdna-import.module';
import { UtilsModule } from '@app/infra/utils/utils.module';

@Module({
	imports: [
		PersistenceModule.register({
			type: 'prisma',
			global: true,
		}),
		FtdnaImportModule,
		UtilsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
