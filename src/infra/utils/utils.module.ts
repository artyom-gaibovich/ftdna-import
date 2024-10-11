import { Module } from '@nestjs/common';
import { HtmlTableExtractor } from '@app/infra/utils/table/html-table.extractor';
import { TableExtractor } from '@app/application/ftdna-import/ports/components/table/table.extractor';
import { RowWriter } from '@app/infra/utils/row/row.writer';
import { BuffDysColumnsBuilder } from '@app/infra/utils/builder/buff-dys-columns.builder';
import { ImportBuffManager } from '@app/infra/utils/manager/import-buff.manager';
import { HttpModule } from '@app/infra/http/http.module';
import {ApiModule} from "@app/infra/http/api/api.module";

@Module({
	imports: [ApiModule],
	providers: [
		{
			provide: TableExtractor,
			useClass: HtmlTableExtractor,
		},
		{
			provide: RowWriter,
			useClass: RowWriter,
		},
		{
			provide: BuffDysColumnsBuilder,
			useClass: BuffDysColumnsBuilder,
		},
		{
			provide: ImportBuffManager,
			useClass: ImportBuffManager,
		},
	],
	exports: [TableExtractor, RowWriter, ImportBuffManager],
})
export class UtilsModule {}
