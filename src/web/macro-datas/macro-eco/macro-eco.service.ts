import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { DB_CONNECTION_MACRO_ECO } from '../../../../config/MacroEcoDatabaseConfigService';
import { BomLoanQueryResult } from './dto/bom-loan-query-result.dto';
import G1Chart1CompetitorsQueryResult from './dto/g1-chart1-query-competitors.dto';
import G1Chart1QueryResult from './dto/g1-chart1-query-result.dto';
import G1Chart2CompetitorsQueryResult from './dto/g1-chart2-query-competitors.dto';
import G1Chart2QueryResult from './dto/g1-chart2-query-result.dto';
import ImpExpTreeMapQueryResult from './dto/imp-exp-tree-map-query.dto';

@Injectable()
export class MacroEcoService {
    constructor(
        @InjectConnection(DB_CONNECTION_MACRO_ECO)
        private connection: Connection,
    ) {}

    async getBoamLoan(mainId: string, level: string, levelVal: string) {
        const queryResult: [BomLoanQueryResult] = await this.connection.query(
            `SELECT year, SUM(outstand) as outstand, sum(disbur) as disbur, sum(repay) as repay FROM SECTOR_BOMLOAN WHERE level_1_id=? and ${level}=? GROUP BY 1 ORDER BY 1`,
            [mainId, levelVal],
        );

        return queryResult.map((row, index) => ({ ...row, id: index + 1 }));
    }

    async getG1Chart1(
        mainId: string,
        level: string,
        levelVal: string,
        year: number,
    ) {
        const competitors: G1Chart1CompetitorsQueryResult[] =
            await this.connection.query(
                `SELECT competitors, SUM(sales_amt) AS sales_amt FROM SECTOR_G1 WHERE level_1_id=? AND ${level}=? GROUP BY 1 ORDER BY 2 DESC LIMIT 8`,
                [mainId, levelVal],
            );

        let result: G1Chart1QueryResult[] = [];

        if (competitors.length) {
            let condition = '';
            competitors.map((comp, index, arr) => {
                condition += ` competitors="${comp.competitors}" ${
                    arr.length - 1 !== index ? 'OR' : ''
                }`;
            });

            result = await this.connection.query(
                `SELECT 
                    competitors, 
                    SUM(sales_amt) AS sales_amt, 
                    SUM(sales_q) AS sales_q, 
                    SUM(intake_amt) AS intake_amt, 
                    SUM(intake_q) AS intake_q, 
                    SUM(mshare_s_amt) AS mshare_s_amt, 
                    SUM(mshare_s_q) AS mshare_s_q, 
                    SUM(mshare_i_amt) AS mshare_i_amt, 
                    SUM(mshare_i_q) AS mshare_i_q 
                FROM SECTOR_G1 
                WHERE level_1_id=? AND ${level}=? AND year=? AND (${condition}) GROUP BY 1 ORDER BY 1`,
                [mainId, levelVal, year],
            );
        }

        return result.map((row, index) => ({ ...row, id: index + 1 }));
    }

    async getG1Chart2(mainId: string, level: string, levelVal: string) {
        const tempArr2 = [];

        const competitors: G1Chart2CompetitorsQueryResult[] =
            await this.connection.query(
                `SELECT competitors, SUM(sales_amt) AS sales_amt FROM SECTOR_G1 WHERE level_1_id=? AND ${level}=? GROUP BY 1 ORDER BY 2 LIMIT 3`,
                [mainId, levelVal],
            );

        let result: G1Chart2QueryResult[] = [];
        if (competitors.length) {
            let condition = '';
            competitors.map((comp, index, arr) => {
                condition += ` competitors="${comp.competitors}" ${
                    arr.length - 1 !== index ? 'OR' : ''
                }`;
            });

            result = await this.connection.query(
                `SELECT year, competitors, sum(sales_amt) as sales_amt, sum(sales_q) as sales_q, sum(intake_amt) as intake_amt, sum(intake_q) as intake_q, sum(mshare_s_amt) as mshare_s_amt, sum(mshare_s_q) as mshare_s_q, sum(mshare_i_amt) as mshare_i_amt, sum(mshare_i_q) as mshare_i_q FROM SECTOR_G1 WHERE level_1_id=? AND ${level}=? AND (${condition}) group by 1,2 order by 1`,
                [mainId, levelVal],
            );

            const tempArr = [];
            const keyArr = [];

            result.forEach((r) => {
                if (!keyArr.includes(r.year)) {
                    keyArr.push(r.year);
                    tempArr.push(r.year);
                }
            });

            tempArr.map((tmp) => {
                const resultObj = {};
                result.map((val) => {
                    if (tmp === val.year) {
                        resultObj['year'] = tmp;
                        resultObj[`${val.competitors} sales_amt`] =
                            val.sales_amt;
                        resultObj[`${val.competitors} sales_q`] = val.sales_q;
                        resultObj[`${val.competitors} intake_amt`] =
                            val.intake_amt;
                        resultObj[`${val.competitors} intake_q`] = val.intake_q;
                        resultObj[`${val.competitors} mshare_s_amt`] =
                            val.mshare_s_amt;
                        resultObj[`${val.competitors} mshare_s_q`] =
                            val.mshare_s_q;
                        resultObj[`${val.competitors} mshare_i_amt`] =
                            val.mshare_i_amt;
                        resultObj[`${val.competitors} mshare_i_q`] =
                            val.mshare_i_q;
                    }
                });
                tempArr2.push(resultObj);
            });
        }

        return tempArr2.map((r, index) => ({ ...r, id: index + 1 }));
    }

    async getG1Year(mainId: string, level: string, levelVal: string) {
        return await this.connection.query(
            `
            SELECT DISTINCT(year) as year FROM SECTOR_G1 WHERE level_1_id=? AND ${level}=? ORDER BY 1`,
            [mainId, levelVal],
        );
    }

    async getG2(mainId: string, level: string, levelVal: string) {
        const queryResult = await this.connection.query(
            `SELECT * FROM SECTOR_G2 WHERE level_1_id=? AND ${level}=?`,
            [mainId, levelVal],
        );

        return queryResult.map((row, index) => ({ ...row, id: index + 1 }));
    }

    async getImpExp(mainId: string, level: string, levelVal: string) {
        const tempArr2 = [];
        const countries = await this.connection.query(
            `SELECT country_code, SUM(import_amt) FROM SECTOR_IMP_EX WHERE level_1_id=? AND ${level}=? GROUP BY 1 ORDER BY 2 DESC LIMIT 2`,
            [mainId, levelVal],
        );

        if (countries.length) {
            const countriesArr = countries.map((c) => c['country_code']);

            let result = [];
            if (countriesArr.length === 2) {
                result = await this.connection.query(
                    `
                    SELECT * FROM(
                        SELECT ie.year AS year, ie.country_code, n.country_name, SUM(ie.import_amt) AS import, SUM(ie.export_amt) AS export, SUM(ie.net_amt) AS net 
                        FROM SECTOR_IMP_EX ie, SECTOR_CNTRY_NAME n
                        WHERE ie.level_1_id=? AND ie.${level}=? AND ie.country_code = n.country_code AND (ie.country_code = ? OR ie.country_code = ?)
                        GROUP BY 1,2,3 ORDER BY 1
                    ) a    
                        UNION ALL 
                    SELECT * FROM(
                        SELECT year, 'Бусад' AS country_code, 'Бусад' AS country_name, SUM(import_amt) AS import, SUM(export_amt) AS export, SUM(net_amt) AS net 
                        FROM SECTOR_IMP_EX
                        WHERE level_1_id=? AND ${level}=? AND (country_code <> ? AND country_code<> ?)
                        GROUP BY 1,2,3 ORDER BY 1
                    ) b`,
                    [
                        mainId,
                        levelVal,
                        countriesArr[0],
                        countriesArr[1],
                        mainId,
                        levelVal,
                        countriesArr[0],
                        countriesArr[1],
                    ],
                );
            } else {
                result = await this.connection.query(
                    `
                SELECT * FROM(
                    SELECT ie.year AS year, ie.country_code, n.country_name, SUM(ie.import_amt) AS import, SUM(ie.export_amt) AS export, SUM(ie.net_amt) AS net 
                    FROM SECTOR_IMP_EX ie, SECTOR_CNTRY_NAME n
                    WHERE ie.level_1_id=? AND ie.${level}=? AND ie.country_code = n.country_code AND (ie.country_code = ?)
                    GROUP BY 1,2,3 ORDER BY 1
                ) a
                
                UNION ALL
                
                SELECT  * FROM(
                    SELECT year, 'Бусад' AS country_code, 'Бусад' AS country_name, SUM(import_amt) AS import, SUM(export_amt) AS export, SUM(net_amt) AS net 
                    FROM SECTOR_IMP_EX
                    WHERE ie.level_1_id=? AND ${level}=? AND (country_code <> ?)
                    group by 1,2,3 order by 1
                ) b
            `,
                    [
                        mainId,
                        levelVal,
                        countriesArr[0],
                        mainId,
                        levelVal,
                        countriesArr[0],
                    ],
                );
            }
            const addedCountryCode = result.map((row) => {
                if (row['country_name'] !== 'Бусад') {
                    row[
                        'country_name'
                    ] = `${row['country_name']} (${row['country_code']})`;
                }
                return row;
            });

            const tempArr = [];
            const keyArr = [];

            addedCountryCode.map((r) => {
                if (!keyArr.includes(r.year)) {
                    keyArr.push(r.year);
                    tempArr.push(r.year);
                }
            });

            tempArr.map((tmp) => {
                const resObj = {};
                result.map((val) => {
                    if (tmp === val.year) {
                        resObj['year'] = tmp;
                        resObj[`${val['country_name']} импорт`] = val['import'];
                        resObj[`${val['country_name']} экспорт`] =
                            val['export'];
                        resObj[`${val['country_name']} net`] = val['net'];
                    }
                });
                tempArr2.push(resObj);
            });
        }

        return tempArr2.map((val, index) => ({ ...val, id: index + 1 }));
    }

    async getImpExpTreeMap(
        mainId: string,
        level: string,
        levelVal: string,
        year: number,
    ) {
        const queryResult: ImpExpTreeMapQueryResult[] =
            await this.connection.query(
                `SELECT ie.country_code, n.country_name, SUM(ie.import_amt) AS import, SUM(ie.export_amt) AS export, SUM(ie.net_amt) AS net
            FROM SECTOR_IMP_EX ie, SECTOR_CNTRY_NAME n
            WHERE ie.level_1_id=? AND ie.${level}=? AND ie.country_code = n.country_code AND year=?
            GROUP BY 1,2 ORDER BY 1
        `,
                [mainId, levelVal, year],
            );

        return queryResult.map((row, index) => ({ ...row, id: index + 1 }));
    }

    async getSector() {
        const data = await this.connection.query(
            'select level_1_id, level_2_id, level_3_id, `name` from SECTOR where (level_2_id<>"" and level_2_id is not null) or (level_3_id<>"" and level_3_id is not null)',
        );

        const level2Sectors = [];
        const level3Sectors = [];
        data.forEach((row) => {
            if (row.level_2_id) {
                level2Sectors.push(row.level_2_id);
            } else if (row.level_3_id) {
                level3Sectors.push(row.level_3_id);
            }
        });

        const sectorsWithValues = await this.connection.query(
            `SELECT level_2_id, level_3_id
            FROM SECTOR_SND
            WHERE
                level_2_id IN (?)
                OR
                level_3_id IN (?)
            GROUP BY level_2_id, level_3_id
            `,
            [level2Sectors, level3Sectors],
        );

        const result = data.map((sector) => {
            sector.hasValue = sectorsWithValues.some(
                (row) =>
                    sector.level_2_id === row.level_2_id ||
                    sector.level_3_id === row.level_3_id,
            );
            return sector;
        });

        return result;
    }

    async getSectorAll() {
        return await this.connection.query('select * from SECTOR');
    }

    async getSectorMain() {
        const mainSectors = await this.connection.query(
            'select * from SECTOR_MAIN order by level_1_id',
        );

        const sectorIds = mainSectors.map((sector) => sector.level_1_id);

        const sectorsWithValuesSnd = await this.connection.query(
            `SELECT DISTINCT level_1_id
            FROM SECTOR_SND
            WHERE level_1_id IN (?)`,
            [sectorIds],
        );

        const sectorsWithValuesImpEx = await this.connection.query(
            `SELECT DISTINCT level_1_id
            FROM SECTOR_IMP_EX
            WHERE level_1_id IN (?)`,
            [sectorIds],
        );

        const mergedArr = [...sectorsWithValuesSnd, ...sectorsWithValuesImpEx];
        const rowsWithData = mergedArr.filter(
            (row, index, array) =>
                array.findIndex(
                    (t) => row['level_1_id'] === t['level_1_id'],
                ) === index,
        );

        const result = mainSectors.map((sector) => {
            sector.hasValue = rowsWithData.some(
                (row) => sector.level_1_id === row.level_1_id,
            );
            return sector;
        });

        return result;
    }

    async getSnd(mainId, level, levelVal) {
        const queryResult = await this.connection.query(
            `SELECT year, SUM(prod_amt) AS prod_amt, SUM(prod_q) AS prod_q, SUM(cons_amt) AS cons_amt, SUM(cons_q) AS cons_q FROM SECTOR_SND 
            WHERE level_1_id=? AND ${level} = ? group by 1 order by 1`,
            [mainId, levelVal],
        );

        return queryResult.map((row, index) => ({ ...row, id: index + 1 }));
    }
}
