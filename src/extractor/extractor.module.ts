import {Module} from '@nestjs/common';
import {HtmlTableExtractor} from "@app/infra/utils/table/html-table.extractor";
import {HtmlHeadersExtractor} from "./html-headers.extractor";

@Module({
    providers: [HtmlTableExtractor, HtmlHeadersExtractor],
    exports: [HtmlTableExtractor, HtmlHeadersExtractor]
})
export class ExtractorModule {
}
