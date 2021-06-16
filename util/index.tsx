import MdiIcon from '@mdi/react';

import {
    CampusType,
    getRmpReport,
    ProfessorData,
    SectionData
} from '@ilefa/husky';

import {
    mdiAbacus,
    mdiAccountMultiple,
    mdiAccountVoice,
    mdiAlphabetGreek,
    mdiAtom,
    mdiBaguette,
    mdiBarley,
    mdiBasketball,
    mdiBio,
    mdiBookOpenPageVariant,
    mdiBookshelf,
    mdiBottleTonicPlus,
    mdiBrain,
    mdiCashMultiple,
    mdiChartBellCurve,
    mdiCityVariant,
    mdiCogs,
    mdiCommaCircleOutline,
    mdiCow,
    mdiCurrencyUsd,
    mdiDiamondStone,
    mdiDna,
    mdiDomain,
    mdiDramaMasks,
    mdiEarth,
    mdiFlag,
    mdiFlask,
    mdiFlaskRoundBottom,
    mdiFlower,
    mdiFood,
    mdiFoodApple,
    mdiFountainPenTip,
    mdiGesture,
    mdiGoogleClassroom,
    mdiGrass,
    mdiHandPeace,
    mdiHandshake,
    mdiHeadCog,
    mdiHinduism,
    mdiHistory,
    mdiHomeCircleOutline,
    mdiHorse,
    mdiHospitalBox,
    mdiHospitalBuilding,
    mdiHuman,
    mdiHumanGreeting,
    mdiHumanMaleChild,
    mdiHumanQueue,
    mdiIdeogramCjk,
    mdiImageFilterHdr,
    mdiIslam,
    mdiJudaism,
    mdiLaptop,
    mdiMathIntegral,
    mdiMusicNote,
    mdiNewspaper,
    mdiPineTree,
    mdiPipeWrench,
    mdiPrescription,
    mdiResistor,
    mdiSchool,
    mdiShieldAirplane,
    mdiShieldStar,
    mdiShopping,
    mdiSlopeUphill,
    mdiSprout,
    mdiTeach,
    mdiTools,
    mdiTranslate,
    mdiVirus,
    mdiVote,
    mdiWaterPump,
    mdiWaves,
    mdiWrench
} from '@mdi/js';

export type CompleteCoursePayload = {
    name: string;
    catalogName: string;
    catalogNumber: string;
    attributes: CourseAttributes;
    grading: string;
    credits: number;
    prerequisites: string;
    description: string;
    sections: SectionData[];
    professors: ProfessorData[];
}

export type CourseAttributes = {
    lab: boolean;
    writing: boolean;
    quantitative: boolean;
    environmental: boolean;
    contentAreas: ContentArea[];
}

export enum ContentArea {
    CA1 = 'CA1',
    CA2 = 'CA2',
    CA3 = 'CA3',
    CA4 = 'CA4',
    CA4INT = 'CA4INT'
}

export enum ContentAreaNames {
    CA1 = 'Arts and Humanities',
    CA2 = 'Social Sciences',
    CA3 = 'Science and Technology',
    CA4 = 'Diversity and Multiculturalism',
    CA4INT = 'Diversity and Multiculturalism (International)'
}

export const RMP_TAG_PROS = [
    'gives good feedback',
    'respected',
    'accessible outside class',
    'inspirational',
    'clear grading criteria',
    'hilarious',
    'amazing lectures',
    'caring',
    'extra credit',
    'would take again',
    'tests? not many'
]

export const RMP_TAG_CONS = [
    'lots of homework',
    'get ready to read',
    'participation matters',
    'skip class? you won\'t pass.',
    'graded by few things',
    'test heavy',
    'beware of pop quizzes',
    'lecture heavy',
    'so many papers',
    'tough grader'
]

export const getIconForCourse = (course: string, classes = '', size = 16) => {
    let type = course.split(/\d/)[0].toUpperCase();
    switch (type) {
        case "AAAS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ACCT": return <MdiIcon path={mdiAbacus} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AFRA": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AGNR": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AH":   return <MdiIcon path={mdiBottleTonicPlus} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AIRF": return <MdiIcon path={mdiShieldAirplane} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AMST": return <MdiIcon path={mdiFlag} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ANSC": return <MdiIcon path={mdiHorse} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ANTH": return <MdiIcon path={mdiAccountMultiple} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARAB": return <MdiIcon path={mdiIslam} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARE":  return <MdiIcon path={mdiCashMultiple} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARIS": return <MdiIcon path={mdiIslam} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ART":  return <MdiIcon path={mdiGesture} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARTH": return <MdiIcon path={mdiGesture} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ASLN": return <MdiIcon path={mdiHandPeace} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BADM": return <MdiIcon path={mdiHandshake} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BIOL": return <MdiIcon path={mdiAtom} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BLAW": return <MdiIcon path={mdiBookOpenPageVariant} className={`fa-fw ${classes}`} size={`${size}px`} />;
        
        // Placeholder
        case "BME":  return <MdiIcon path={mdiBio} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BUSN": return <MdiIcon path={mdiDomain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CAMS": return <MdiIcon path={mdiAlphabetGreek} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CE":   return <MdiIcon path={mdiWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CHEG": return <MdiIcon path={mdiFlask} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CHEM": return <MdiIcon path={mdiFlask} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CHIN": return <MdiIcon path={mdiIdeogramCjk} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CLCS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "COGS": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "COMM": return <MdiIcon path={mdiAccountVoice} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CRLP": return <MdiIcon path={mdiTranslate} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CSE":  return <MdiIcon path={mdiLaptop} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "DGS":  return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "DIET": return <MdiIcon path={mdiFood} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "DMD":  return <MdiIcon path={mdiFountainPenTip} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "DRAM": return <MdiIcon path={mdiDramaMasks} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ECE":  return <MdiIcon path={mdiResistor} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ECON": return <MdiIcon path={mdiCurrencyUsd} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "EDCI": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "EDLR": return <MdiIcon path={mdiFoodApple} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "EEB":  return <MdiIcon path={mdiHomeCircleOutline} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "EGEN": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ENGL": return <MdiIcon path={mdiBookshelf} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ENGR": return <MdiIcon path={mdiPipeWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ENVE": return <MdiIcon path={mdiPineTree} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ENVS": return <MdiIcon path={mdiPineTree} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "EPSY": return <MdiIcon path={mdiHeadCog} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ES":   return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "EVST": return <MdiIcon path={mdiPineTree} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "FINA": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "FNCE": return <MdiIcon path={mdiCurrencyUsd} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "FREN": return <MdiIcon path={mdiBaguette} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GEOG": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GERM": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GPS":  return <MdiIcon path={mdiSchool} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GSCI": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HCMI": return <MdiIcon path={mdiHospitalBuilding} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HDFS": return <MdiIcon path={mdiHumanMaleChild} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HEJS": return <MdiIcon path={mdiJudaism} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HIND": return <MdiIcon path={mdiHinduism} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HIST": return <MdiIcon path={mdiHistory} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HRTS": return <MdiIcon path={mdiHuman} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ILCS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "INDS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "INTD": return <MdiIcon path={mdiCityVariant} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "IRIS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "JAPN": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "JOUR": return <MdiIcon path={mdiNewspaper} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KINS": return <MdiIcon path={mdiBasketball} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KORE": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LAND": return <MdiIcon path={mdiImageFilterHdr} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LING": return <MdiIcon path={mdiCommaCircleOutline} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LLAS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MARN": return <MdiIcon path={mdiWaves} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MAST": return <MdiIcon path={mdiWaves} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MATH": return <MdiIcon path={mdiMathIntegral} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MCB":  return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ME":   return <MdiIcon path={mdiTools} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MEM":  return <MdiIcon path={mdiCogs} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MGMT": return <MdiIcon path={mdiHandshake} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MGRK": return <MdiIcon path={mdiAlphabetGreek} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MISI": return <MdiIcon path={mdiShieldStar} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MKTG": return <MdiIcon path={mdiShopping} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MLSC": return <MdiIcon path={mdiFlaskRoundBottom} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MSE":  return <MdiIcon path={mdiDiamondStone} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MUSI": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "NRE":  return <MdiIcon path={mdiPineTree} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "NURS": return <MdiIcon path={mdiHospitalBox} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "NUSC": return <MdiIcon path={mdiFood} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "OPIM": return <MdiIcon path={mdiLaptop} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "OSH":  return <MdiIcon path={mdiBottleTonicPlus} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PERS": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PHAR": return <MdiIcon path={mdiPrescription} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PHIL": return <MdiIcon path={mdiHuman} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PHRX": return <MdiIcon path={mdiPrescription} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PHYS": return <MdiIcon path={mdiSlopeUphill} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PNB":  return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "POLS": return <MdiIcon path={mdiVote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PORT": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PP":   return <MdiIcon path={mdiVote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PSYC": return <MdiIcon path={mdiHeadCog} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PUBH": return <MdiIcon path={mdiBottleTonicPlus} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PVS":  return <MdiIcon path={mdiVirus} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SAAG": return <MdiIcon path={mdiBarley} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SAAS": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SANR": return <MdiIcon path={mdiPineTree} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SAPB": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SAPL": return <MdiIcon path={mdiFlower} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SARE": return <MdiIcon path={mdiWaterPump} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SLHS": return <MdiIcon path={mdiHeadCog} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SOCI": return <MdiIcon path={mdiHumanQueue} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SOWK": return <MdiIcon path={mdiHumanGreeting} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SPAN": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SPSS": return <MdiIcon path={mdiGrass} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "STAT": return <MdiIcon path={mdiChartBellCurve} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "TRST": return <MdiIcon path={mdiTranslate} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "UNIV": return <MdiIcon path={mdiSchool} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "URBN": return <MdiIcon path={mdiCityVariant} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WGSS": return <MdiIcon path={mdiHuman} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default:     return <MdiIcon path={mdiGoogleClassroom} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}

export const isValidCampus = (input: string): input is CampusType => {
    let lower = input.toLowerCase();
    return lower === 'any'
        || lower === 'storrs'
        || lower === 'hartford'
        || lower === 'stamford'
        || lower === 'waterbury'
        || lower === 'avery_point'
}

export const getCampusIndicator = (campus: string) => {
    campus = campus.toLowerCase();
    if (campus === 'storrs') return 'S';
    if (campus === 'hartford') return 'H';
    if (campus === 'stamford') return 'Z';
    if (campus === 'waterbury') return 'W';
    if (campus === 'avery_point'
        || campus === 'avery point') return 'A';
    if (campus === 'off-campus') return 'O';

    return '?';
}

export const addTrailingDecimal = (int: number) => {
    if (!int.toString().includes('.'))
        return int.toString() + '.0';

    return int.toString();
}