import {PrismaService} from "../database/prisma/prisma.service";
import {BadRequestException, Injectable} from "@nestjs/common";
import {Buff} from "@prisma/client";

@Injectable()
export class BuffRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(buff: Buff): Promise<Buff> {
        try {
            return this.prisma.buff.create({ data: buff });
        }
        catch (e) {
            throw new BadRequestException(e.name);
        }
    }
}
