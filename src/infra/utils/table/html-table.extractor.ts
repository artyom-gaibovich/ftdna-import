import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { TableExtractor } from '@app/application/ftdna-import/ports/components/table/table.extractor';

@Injectable()
export class HtmlTableExtractor implements TableExtractor {
	constructor() {}

	extract(html: any): any {
		const $ = cheerio.load(html);
		const headers = $('thead > tr > th').map((index, element) => {
			return $(element).text().replace(/-/g, '');
		});

		const dataRows = $('[class*="AspNet-GridView"]');
		const rows = [];
		dataRows.each((j, row) => {
			let acc = [];
			for (let i = 0; i < headers.length; i++) {
				const elem = $(row).find('td').eq(i).text().trim();
				if ((i === 0 || i === 1 || i === 2) && !elem) {
					acc = [];
					break;
				}
				acc.push({ col: headers[i].replace(/-/g, ''), data: elem });
			}
			rows.push(acc);
		});
		const filteredRows = rows.filter((el) => el.length);

		return filteredRows;
	}
}
