import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MacroDatasService } from './macro-datas.service';

@ApiTags('Macro Data')
@Controller('macro_datas')
export class MacroDatasController {
    constructor(private readonly macroDatasService: MacroDatasService) {}

    @Get('get_macro_data_balance')
    async getMacroDataBalance() {
        return this.macroDatasService.getData();
    }

    @Get('get_macro_data_budget_balance')
    async getMacroBudgetBalance() {
        return this.macroDatasService.getBudgetBalance();
    }

    @Get('get_macro_data_budget_expenditure')
    async getMacroBudgetExpenditure() {
        return this.macroDatasService.getBudgetExpenditure();
    }

    @Get('get_macro_data_budget_income')
    async getMacroBudgetIncome() {
        return this.macroDatasService.getBudgetIncome();
    }

    @Get('get_macro_data_exchange')
    async getMacroExchange() {
        return this.macroDatasService.getExchange();
    }

    @Get('get_macro_data_export')
    async getMacroExport() {
        return this.macroDatasService.getExport();
    }

    @Get('get_macro_data_gdp_exp')
    async getMacroGdpExp() {
        return this.macroDatasService.getGdpExp();
    }

    @Get('get_macro_data_gdp_exp_2010')
    async getMacroGdpExp2010() {
        return this.macroDatasService.getGdpExp2010();
    }

    @Get('get_macro_data_gdp_exp_growth_p')
    async getMacroDataGdpExpGrowthP() {
        return this.macroDatasService.getDataGdpExpGrowthP();
    }

    @Get('get_macro_data_gdp_exp_growth_r')
    async getMacroDataGdpExpGrowthR() {
        return this.macroDatasService.getDataGdpExpGrowthR();
    }

    @Get('get_macro_data_gdp_inc')
    async getMacroDataGdpInc() {
        return this.macroDatasService.getGdpInc();
    }

    @Get('get_macro_data_gdp_per_capita')
    async getMacroDataGdpPerCapita() {
        return this.macroDatasService.getGdpPerCapita();
    }

    @Get('get_macro_data_gdp_sec')
    async getMacroDataGdpSec() {
        return this.macroDatasService.getGdpSec();
    }

    @Get('get_macro_data_gdp_sec_2010')
    async getMacroDataGdpSec2010() {
        return this.macroDatasService.getGdpSec2010();
    }

    @Get('get_macro_data_gdp_sec_growth_p')
    async getMacroDataGdpSecGrowthP() {
        return this.macroDatasService.getGdpSecGrowthP();
    }

    @Get('get_macro_data_gdp_sec_growth_r')
    async getMacroDataGdpSecGrowthR() {
        return this.macroDatasService.getGdpSecGrowthR();
    }

    @Get('get_macro_data_import')
    async getMacroDataImport() {
        return this.macroDatasService.getImport();
    }

    @Get('get_macro_data_infl_nat_annual_change')
    async getMacroDataInflNatAnnualChange() {
        return this.macroDatasService.getInflNatAnnualChange();
    }

    @Get('get_macro_data_labour_total')
    async getMacroDataLabourTotal() {
        return this.macroDatasService.getDataLabourTotal();
    }

    @Get('get_macro_data_rate_lend')
    async getMacroDataRateLend() {
        return this.macroDatasService.getRateLend();
    }

    @Get('get_macro_data_rate_policy')
    async getMacroDataRatePolicy() {
        return this.macroDatasService.getRatePolicy();
    }

    @Get('get_macro_data_rate_sav')
    async getMacroDataRateSav() {
        return this.macroDatasService.getRateSav();
    }

    @Get('get_macro_data_reserve')
    async getMacroDataRateReserve() {
        return this.macroDatasService.getReserve();
    }

    @Get('get_macro_data_supply')
    async getMacroDataSupply() {
        return this.macroDatasService.getSupply();
    }

    @Get('get_macro_data_unemployed')
    async getMacroDataUnemployed() {
        return this.macroDatasService.getUnemployed();
    }

    @Get('get_macro_data_wage_total')
    async getMacroDataWageTotal() {
        return this.macroDatasService.getWageTotal();
    }
}
