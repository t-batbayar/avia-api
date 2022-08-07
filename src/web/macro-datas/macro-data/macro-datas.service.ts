import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { DB_CONNECTION_MACRO_DATA } from '../../../../config/MacroDataDatabaseConfigService';

@Injectable()
export class MacroDatasService {
    constructor(
        @InjectConnection(DB_CONNECTION_MACRO_DATA)
        private connection: Connection,
    ) {}

    async getData() {
        return await this.connection.query(
            'SELECT date, balance FROM TRADE ORDER BY date',
        );
    }

    async getBudgetBalance() {
        return await this.connection.query(
            'SELECT SUBSTR(dt,1,7) as date, budget_balance FROM BUDGET ORDER BY 1',
        );
    }

    async getBudgetExpenditure() {
        return await this.connection.query(
            'SELECT SUBSTR(dt,1,7) as date, budget_expenditure FROM BUDGET ORDER BY 1',
        );
    }

    async getBudgetIncome() {
        return await this.connection.query(
            'SELECT SUBSTR(dt,1,7) as date, budget_income FROM BUDGET ORDER BY 1',
        );
    }

    async getExchange() {
        return await this.connection.query(
            'SELECT date, exch_eop, exch_monthly_avg FROM BOM ORDER BY date',
        );
    }

    async getExport() {
        return await this.connection.query(
            'SELECT date, export FROM TRADE ORDER BY date',
        );
    }

    async getGdpExp() {
        return await this.connection.query(
            'SELECT quarter, butets_huvi, annual_une, 2010_zeregtsuuleh, growth_r, growth_p FROM GDP_exp WHERE main_cat="gdp" ORDER BY 1',
        );
    }

    async getGdpExp2010() {
        return await this.connection.query(
            'SELECT main_cat, quarter, SUM(2010_zeregtsuuleh) AS 2010_zeregtsuuleh FROM GDP_exp GROUP BY 1,2 ORDER BY 1',
        );
    }

    async getDataGdpExpGrowthP() {
        return await this.connection.query(
            'select main_cat, quarter, sum(growth_p) as growth_p from GDP_exp group by 1,2 order by 1',
        );
    }

    async getDataGdpExpGrowthR() {
        return await this.connection.query(
            'select main_cat, quarter, sum(growth_r) as growth_r from GDP_exp group by 1,2 order by 1',
        );
    }

    async getGdpInc() {
        return await this.connection.query(
            'SELECT year, gdp_inc_asset, gdp_inc_prod_import_tax, gdp_inc_sal, gdp_inc_service, gdp_inc_total  FROM GDP_per_capita ORDER BY year',
        );
    }

    async getGdpPerCapita() {
        return await this.connection.query(
            'select year, annual_th, annual_atlas_usd, 2010_zeregts_th, 2010_zeregts_atlas_usd from GDP_per_capita order by 1',
        );
    }

    async getGdpSec() {
        return await this.connection.query(
            'select quarter, annual_une, 2010_zeregtsuuleh, growth_r, growth_p from GDP_sec where main_cat="gdp" order by 1',
        );
    }

    async getGdpSec2010() {
        return await this.connection.query(
            'select main_cat, quarter, sum(2010_zeregtsuuleh) as 2010_zeregtsuuleh from GDP_sec group by 1,2 order by 1',
        );
    }

    async getGdpSecGrowthP() {
        return await this.connection.query(
            'select main_cat, quarter, sum(growth_p) as growth_p from GDP_sec group by 1,2 order by 1',
        );
    }

    async getGdpSecGrowthR() {
        return await this.connection.query(
            'select main_cat, quarter, sum(growth_p) as growth_p from GDP_sec group by 1,2 order by 1',
        );
    }

    async getImport() {
        return await this.connection.query(
            'SELECT date, import FROM TRADE ORDER BY date',
        );
    }

    async getInflNatAnnualChange() {
        return await this.connection.query(
            'SELECT date, infl_nat_annual_change FROM BOM where date>"201612" ORDER BY date',
        );
    }

    async getDataLabourTotal() {
        return await this.connection.query(
            'SELECT quarter, labour_total FROM UNEMP_W_L ORDER BY quarter',
        );
    }

    async getRateLend() {
        return await this.connection.query(
            'SELECT date, rate_dom_lend, rate_for_lend FROM BOM ORDER BY date',
        );
    }

    async getRatePolicy() {
        return await this.connection.query(
            'SELECT date, rate_policy FROM BOM ORDER BY date',
        );
    }

    async getRateSav() {
        return await this.connection.query(
            'SELECT date, rate_for_sav, rate_dom_sav FROM BOM ORDER BY date',
        );
    }

    async getReserve() {
        return await this.connection.query(
            'SELECT monthly, reserve_total, fx_reserve FROM RESERVE ORDER BY monthly',
        );
    }

    async getSupply() {
        return await this.connection.query(
            'SELECT date, supply_amt FROM BOM ORDER BY date',
        );
    }

    async getUnemployed() {
        return await this.connection.query(
            'SELECT quarter, unemp_total, unemp_male, unemp_female FROM UNEMP_W_L ORDER BY quarter',
        );
    }

    async getWageTotal() {
        return await this.connection.query(
            'SELECT quarter, wage_total FROM UNEMP_W_L ORDER BY quarter',
        );
    }

    // create(createMacroDataDto: CreateMacroDataDto) {
    //     return 'This action adds a new macroData';
    // }

    // findAll() {
    //     return `This action returns all macroDatas`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} macroData`;
    // }

    // update(id: number, updateMacroDataDto: UpdateMacroDataDto) {
    //     return `This action updates a #${id} macroData`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} macroData`;
    // }
}
