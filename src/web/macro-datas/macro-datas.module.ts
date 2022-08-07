import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DB_CONNECTION_MACRO_DATA } from '../../../config/MacroDataDatabaseConfigService';
import { DB_CONNECTION_MACRO_ECO } from '../../../config/MacroEcoDatabaseConfigService';
import { DB_CONNECTION_MACRO_FORECAST } from '../../../config/MacroForecastDatabaseConfigService';
import { MacroDatasController } from './macro-data/macro-datas.controller';
import { MacroDatasService } from './macro-data/macro-datas.service';
import { MacroEcoController } from './macro-eco/macro-eco.controller';
import { MacroEcoService } from './macro-eco/macro-eco.service';
import { MacroForecastController } from './macro-forecast/macro-forecast.controller';
import { MacroForecastService } from './macro-forecast/macro-forecast.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([], DB_CONNECTION_MACRO_DATA),
        TypeOrmModule.forFeature([], DB_CONNECTION_MACRO_ECO),
        TypeOrmModule.forFeature([], DB_CONNECTION_MACRO_FORECAST),
    ],
    controllers: [
        MacroDatasController,
        MacroEcoController,
        MacroForecastController,
    ],
    providers: [MacroDatasService, MacroEcoService, MacroForecastService],
})
export class MacroDatasModule {}
