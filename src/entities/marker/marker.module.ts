import {Module} from '@nestjs/common';
import {PrismaModule} from "../../infra/persistence/prisma/prisma.module";
import {MarkerMapper} from "./marker.mapper";

@Module({
    imports: [PrismaModule],
    providers: [MarkerMapper],
    exports: [MarkerMapper]
})
export class MarkerModule {
}
