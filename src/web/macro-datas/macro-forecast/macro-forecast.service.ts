import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { DB_CONNECTION_MACRO_FORECAST } from '../../../../config/MacroForecastDatabaseConfigService';

@Injectable()
export class MacroForecastService {
    constructor(
        @InjectConnection(DB_CONNECTION_MACRO_FORECAST)
        private connection: Connection,
    ) {}

    async getGrowthMacro() {
        return await this.connection.query(
            'SELECT quarter, growth_macro FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthCommerce() {
        return await this.connection.query(
            'SELECT quarter, growth_commerce FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthService() {
        return await this.connection.query(
            'SELECT quarter, growth_service FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthConstr() {
        return await this.connection.query(
            'SELECT quarter, growth_constr FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthMining() {
        return await this.connection.query(
            'SELECT quarter, growth_mining FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthAgri() {
        return await this.connection.query(
            'SELECT quarter, growth_agri FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthProcess() {
        return await this.connection.query(
            'SELECT quarter, growth_process FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdp() {
        return await this.connection.query(
            'SELECT quarter, gdp FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdpCommerce() {
        return await this.connection.query(
            'SELECT quarter, gdp_commerce FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdpService() {
        return await this.connection.query(
            'SELECT quarter, gdp_service FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdpConstr() {
        return await this.connection.query(
            'SELECT quarter, gdp_constr FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdpMining() {
        return await this.connection.query(
            'SELECT quarter, gdp_mining FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdpAgri() {
        return await this.connection.query(
            'SELECT quarter, gdp_agri FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGdpProcess() {
        return await this.connection.query(
            'SELECT quarter, gdp_process FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getInflation() {
        return await this.connection.query(
            'SELECT quarter, inflation FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getMoneySupply() {
        return await this.connection.query(
            'SELECT quarter, money_supply FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getGrowthMoneySupply() {
        return await this.connection.query(
            'SELECT quarter, growth_money_supply FROM PROJ_QUARTER ORDER BY quarter',
        );
    }

    async getUnempl() {
        return await this.connection.query(
            'SELECT year, unempl FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getCurrUsd() {
        return await this.connection.query(
            'SELECT year, curr_usd FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getImport() {
        return await this.connection.query(
            'SELECT year, import FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getImportGrowth() {
        return await this.connection.query(
            'SELECT year, import_growth FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getExport() {
        return await this.connection.query(
            'SELECT year, export FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getExportGrowth() {
        return await this.connection.query(
            'SELECT year, export_growth FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getFtradeBal() {
        return await this.connection.query(
            'SELECT year, ftrade_bal FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getCopper() {
        return await this.connection.query(
            'SELECT year, copper FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getCoal() {
        return await this.connection.query(
            'SELECT year, coal FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getFtradeInvest() {
        return await this.connection.query(
            'SELECT year, ftrade_invest FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getClearing() {
        return await this.connection.query(
            'SELECT year, clearing FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getIncPerPer() {
        return await this.connection.query(
            'SELECT year, inc_per_per FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getIncPerPerG() {
        return await this.connection.query(
            'SELECT year, inc_per_per_g FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getAvgSal() {
        return await this.connection.query(
            'SELECT year, avg_sal FROM PROJ_ANNUAL ORDER BY year',
        );
    }

    async getAvgSalG() {
        return await this.connection.query(
            'SELECT year, avg_sal_g FROM PROJ_ANNUAL ORDER BY year',
        );
    }
}
