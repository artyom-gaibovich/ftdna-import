import * as cheerio from 'cheerio';
import { Cheerio } from 'cheerio';
import {Injectable} from "@nestjs/common";


@Injectable()
export class HtmlHeadersExtractor {
	extract(html: any): any {
		const $ = cheerio.load(html);
		const headers = $('thead > tr > th').map((index, element) => {
			return $(element).text().replace(/-/g, '');
		});
		return headers;
	}
}
