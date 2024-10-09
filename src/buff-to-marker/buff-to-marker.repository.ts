import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma/prisma.service";
import {buff_to_marker} from "@prisma/client";

@Injectable()
export class BuffToMarkerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createMany(buffToMarker: buff_to_marker[]): Promise<void> {
        await this.prisma.buff_to_marker.createMany({ data: buffToMarker });
    }
}
