import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class HtmlTableExtractor {
	constructor() {}

	extract(html: any) {
		const $ = cheerio.load(html);
		const headers = $('thead > tr > th').map((index, element) => {
			return $(element).text().replace(/-/g, '');
		});

		const dataRows = $('[class*="AspNet-GridView"]');
		const rows = []
		dataRows.each((j, row) => {
			let acc = [];
			for (let i = 0; i < headers.length; i++) {
				const elem = $(row).find('td').eq(i).text().trim();
				if ((i === 0 || i === 1 || i === 2) && !elem) {
					acc = []
					break;
				}
				acc.push({ col : headers[i].replace(/-/g, ''), data : elem });
			}
			rows.push(acc)
		});
		const filteredRows = rows.filter(el => (el.length));

		return filteredRows

		/*const dataRows = $('[class*="AspNet-GridView"]');
        const results = dataRows.map((i, row) => {
            const kitNumber = $(row).find('td').eq(0).text().trim();
            const name = $(row).find('td').eq(1).text().trim();
            const country = $(row).find('td').eq(2).text().trim();
            const hg = $(row).find('td').eq(2).text().trim();

            return {kitNumber, name, country, hg};
        }).get();
        const filtered = results.filter(el => (el.name));
        return filtered;*/
	}
}
