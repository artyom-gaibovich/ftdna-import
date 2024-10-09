import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {buff_to_marker} from "@prisma/client";

@Injectable()
export class PrismaBuffToMarkerManager {
    constructor(private readonly prisma: PrismaService) {}

    async createMany(buffToMarker: buff_to_marker[]): Promise<void> {
        await this.prisma.buff_to_marker.createMany({ data: buffToMarker });
    }
}
