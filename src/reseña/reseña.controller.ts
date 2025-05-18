/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { ReseñaDto } from './reseña.dto';
import { ReseñaEntity } from './reseña.entity';
import { plainToInstance } from 'class-transformer';

@Controller('reseña')
export class ReseñaController {
    constructor(private readonly reseñaService: ReseñaService){}

    @Post()
    async agregarReseña(@Body() reseñaDto: ReseñaDto) {
        const reseña: ReseñaEntity = plainToInstance(ReseñaEntity, reseñaDto);
        return await this.reseñaService.agregarReseña(reseña);
    }

}
