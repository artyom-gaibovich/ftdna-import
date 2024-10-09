import {BadRequestException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Buff} from "@prisma/client";

@Injectable()
export class PrismaBuffRepository {
    constructor(private readonly prisma: PrismaService) {}

}
