import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MacroForecastService } from './macro-forecast.service';

@ApiTags('Macro Forecast')
@Controller('macro_datas')
export class MacroForecastController {
    constructor(private readonly macroForecastService: MacroForecastService) {}

    @Get('get_macro_forecast_avg_sal')
    async getMacroForecastAvgSal() {
        return this.macroForecastService.getAvgSal();
    }

    @Get('get_macro_forecast_avg_sal_g')
    async getMacroForecastAvgSalG() {
        return this.macroForecastService.getAvgSalG();
    }

    @Get('get_macro_forecast_clearing')
    async getMacroForecastClearing() {
        return this.macroForecastService.getClearing();
    }

    @Get('get_macro_forecast_coal')
    async getMacroForecastCoal() {
        return this.macroForecastService.getCoal();
    }

    @Get('get_macro_forecast_copper')
    async getMacroForecastCopper() {
        return this.macroForecastService.getCopper();
    }

    @Get('get_macro_forecast_curr_usd')
    async getMacroForecastCurrUsd() {
        return this.macroForecastService.getCurrUsd();
    }

    @Get('get_macro_forecast_export')
    async getMacroForecastExport() {
        return this.macroForecastService.getExport();
    }

    @Get('get_macro_forecast_export_growth')
    async getMacroForecastExportGrowth() {
        return this.macroForecastService.getExportGrowth();
    }

    @Get('get_macro_forecast_ftrade_bal')
    async getMacroForecastFtradeBal() {
        return this.macroForecastService.getFtradeBal();
    }

    @Get('get_macro_forecast_ftrade_invest')
    async getMacroForecastFtradeInvest() {
        return this.macroForecastService.getFtradeInvest();
    }

    @Get('get_macro_forecast_gdp')
    async getMacroForecastGdp() {
        return this.macroForecastService.getGdp();
    }

    @Get('get_macro_forecast_gdp_agri')
    async getMacroForecastGdpAgri() {
        return this.macroForecastService.getGdpAgri();
    }

    @Get('get_macro_forecast_gdp_constr')
    async getMacroForecastGdpConstr() {
        return this.macroForecastService.getGdpConstr();
    }

    @Get('get_macro_forecast_gdp_mining')
    async getMacroForecastGdpMining() {
        return this.macroForecastService.getGdpMining();
    }

    @Get('get_macro_forecast_gdp_process')
    async getMacroForecastGdpProcess() {
        return this.macroForecastService.getGdpProcess();
    }

    @Get('get_macro_forecast_gdp_service')
    async getMacroForecastGdpService() {
        return this.macroForecastService.getGdpService();
    }

    @Get('get_macro_forecast_growth_agri')
    async getMacroForecastGrowthAgri() {
        return this.macroForecastService.getGrowthAgri();
    }

    @Get('get_macro_forecast_growth_commerce')
    async getMacroForecastGrowthCommerce() {
        return this.macroForecastService.getGrowthCommerce();
    }

    @Get('get_macro_forecast_growth_constr')
    async getMacroForecastGrowthConstr() {
        return this.macroForecastService.getGrowthConstr();
    }

    @Get('get_macro_forecast_growth_macro')
    async getMacroForecastGrowthMacro() {
        return this.macroForecastService.getGrowthMacro();
    }

    @Get('get_macro_forecast_growth_mining')
    async getMacroForecastGrowthMining() {
        return this.macroForecastService.getGrowthMining();
    }

    @Get('get_macro_forecast_growth_money_supply')
    async getMacroForecastGrowthMoneySupply() {
        return this.macroForecastService.getGrowthMoneySupply();
    }

    @Get('get_macro_forecast_growth_process')
    async getMacroForecastGrowthProcess() {
        return this.macroForecastService.getGrowthProcess();
    }

    @Get('get_macro_forecast_growth_service')
    async getMacroForecastGrowthService() {
        return this.macroForecastService.getGrowthService();
    }

    @Get('get_macro_forecast_import')
    async getMacroForecastImport() {
        return this.macroForecastService.getImport();
    }

    @Get('get_macro_forecast_import_growth')
    async getMacroForecastImportGrowth() {
        return this.macroForecastService.getImportGrowth();
    }

    @Get('get_macro_forecast_inc_per_per')
    async getMacroForecastIncPerPer() {
        return this.macroForecastService.getIncPerPer();
    }

    @Get('get_macro_forecast_inc_per_per_g')
    async getMacroForecastIncPerPerG() {
        return this.macroForecastService.getIncPerPerG();
    }

    @Get('get_macro_forecast_inflation')
    async getMacroForecastInflation() {
        return this.macroForecastService.getInflation();
    }

    @Get('get_macro_forecast_money_supply')
    async getMacroForecastMoneySupply() {
        return this.macroForecastService.getMoneySupply();
    }

    @Get('get_macro_forecast_unempl')
    async getMacroForecastUnempl() {
        return this.macroForecastService.getUnempl();
    }
}
