import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {buff_to_marker} from "@prisma/client";

@Injectable()
export class PrismaBuffToMarkerRepository {
    constructor(private readonly prisma: PrismaService) {}
}
