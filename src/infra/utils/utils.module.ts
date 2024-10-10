import { Module } from '@nestjs/common';
import { HtmlTableExtractor } from '@app/infra/utils/table/html-table.extractor';
import { TableExtractor } from '@app/application/ftdna-import/ports/components/table/table.extractor';
import { RowWriter } from '@app/infra/utils/row/row.writer';
import { BuffDysColumnsBuilder } from '@app/infra/utils/builder/buff-dys-columns.builder';

@Module({
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
	],
	exports: [TableExtractor, RowWriter],
})
export class UtilsModule {}
