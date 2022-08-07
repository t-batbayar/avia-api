import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import BomLoanDto from './dto/bom-loan.dto';
import G1Chart1Dto from './dto/g1-chart1.dto';
import G1Chart2Dto from './dto/g1-chart2.dto';
import G1YearDto from './dto/g1-year.dto';
import G2Dto from './dto/g2.dto';
import ImpExpDto from './dto/imp-exp.dto';
import ImpExpTreeMapDto from './dto/imp-exp-tree-map.dto';
import SndDto from './dto/snd.dto';
import { MacroEcoService } from './macro-eco.service';

@ApiTags('Macro Eco')
@Controller('macro_datas')
export class MacroEcoController {
    constructor(private readonly macroEcoService: MacroEcoService) {}

    @Get('get_macro_eco_bomloan')
    async getMacroEcoBomLoan(@Query() { mainId, level, catId }: BomLoanDto) {
        return this.macroEcoService.getBoamLoan(mainId, level, catId);
    }

    @Get('get_macro_eco_g1_chart1')
    async getMacroEcoG1Chart1(
        @Query() { mainId, level, catId, year }: G1Chart1Dto,
    ) {
        return this.macroEcoService.getG1Chart1(mainId, level, catId, +year);
    }

    @Get('get_macro_eco_g1_chart2')
    async getMacroEcoG1Chart2(@Query() { mainId, level, catId }: G1Chart2Dto) {
        return this.macroEcoService.getG1Chart2(mainId, level, catId);
    }

    @Get('get_macro_eco_g1_year')
    async getMacroEcoG1Year(@Query() { mainId, level, catId }: G1YearDto) {
        return this.macroEcoService.getG1Year(mainId, level, catId);
    }

    @Get('get_macro_eco_g2')
    async getMacroEcoG2(@Query() { mainId, level, catId }: G2Dto) {
        return this.macroEcoService.getG2(mainId, level, catId);
    }

    @Get('get_macro_eco_imp_ex')
    async getMacroEcoImpExp(@Query() { mainId, level, catId }: ImpExpDto) {
        return this.macroEcoService.getImpExp(mainId, level, catId);
    }

    @Get('get_macro_eco_imp_ex_tree_map')
    async getMacroEcoImpExTreeMap(
        @Query() { mainId, level, catId, year }: ImpExpTreeMapDto,
    ) {
        return this.macroEcoService.getImpExpTreeMap(
            mainId,
            level,
            catId,
            +year,
        );
    }

    @Get('get_macro_eco_sector')
    async getMacroEcoSector() {
        return this.macroEcoService.getSector();
    }

    @Get('get_macro_eco_sector_all')
    async getMacroEcoSectorAll() {
        return this.macroEcoService.getSectorAll();
    }

    @Get('get_macro_eco_sector_main')
    async getMacroEcoSectorMain() {
        return this.macroEcoService.getSectorMain();
    }

    @Get('get_macro_eco_snd')
    async getMacroEcoSnd(@Query() { mainId, level, catId }: SndDto) {
        return this.macroEcoService.getSnd(mainId, level, catId);
    }
}
