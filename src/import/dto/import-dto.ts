import { IsString } from 'class-validator';

export class ImportDto {
	@IsString()
	__VIEWSTATE: string;

	@IsString()
	__VIEWSTATEGENERATOR: string;

	@IsString()
	__EVENTTARGET: string;

	@IsString()
	__EVENTVALIDATION: string;

	@IsString()
	ctl00$MainContent$mtdnaResultsRSRS$tbPageSize: string;

	@IsString()
	ctl00$MainContent$mtdnaResultsRSRS$searchCategoryDropDownList: string;

	@IsString()
	ftdna_content_type: string;
}
