import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {FtdnaClient} from "./ftdna.client";

@Module({
    imports: [HttpModule.register(
        {
            timeout: 5000,
        }
    )],
    providers: [FtdnaClient],
    exports: [FtdnaClient]
})
export class ApiModule {
}
