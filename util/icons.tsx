import React from 'react';
import MdiIcon from '@mdi/react';

import { DiningHallStatus, DiningHallType } from '@ilefa/blueplate';
import { CompleteRoomPayload, DormHallType, DormsByType } from '.';
import { BuildingCode, Classroom, SeatingType } from '@ilefa/husky';

import {
    mdiAbacus,
    mdiAccountMultiple,
    mdiAccountQuestion,
    mdiAccountTie,
    mdiAccountVoice,
    mdiAlphabetGreek,
    mdiArrowDownThick,
    mdiArrowLeftThick,
    mdiArrowRightThick,
    mdiArrowTopLeftThick,
    mdiArrowUpThick,
    mdiAtom,
    mdiBaguette,
    mdiBarley,
    mdiBasketball,
    mdiBio,
    mdiBlender,
    mdiBookMusic,
    mdiBookOpenPageVariant,
    mdiBookshelf,
    mdiBottleTonicPlus,
    mdiBrain,
    mdiBunkBed,
    mdiCalculatorVariant,
    mdiCameraBurst,
    mdiCashMultiple,
    mdiChartBellCurve,
    mdiChessRook,
    mdiCityVariant,
    mdiClipboardPulse,
    mdiCoffee,
    mdiCogs,
    mdiCommaCircleOutline,
    mdiCookie,
    mdiCow,
    mdiCurrencyUsd,
    mdiDiamondStone,
    mdiDna,
    mdiDog,
    mdiDomain,
    mdiDramaMasks,
    mdiDraw,
    mdiEarth,
    mdiEgg,
    mdiFish,
    mdiFlag,
    mdiFlask,
    mdiFlaskRoundBottom,
    mdiFlower,
    mdiFood,
    mdiFoodApple,
    mdiFoodForkDrink,
    mdiFoodOff,
    mdiFoodSteak,
    mdiFountainPenTip,
    mdiGesture,
    mdiGoogleClassroom,
    mdiGrass,
    mdiHamburger,
    mdiHammerWrench,
    mdiHandPeace,
    mdiHandshake,
    mdiHeadCog,
    mdiHeadSnowflake,
    mdiHeart,
    mdiHinduism,
    mdiHistory,
    mdiHome,
    mdiHomeCircle,
    mdiHomeCircleOutline,
    mdiHomeCity,
    mdiHomeGroup,
    mdiHomeModern,
    mdiHorse,
    mdiHospitalBox,
    mdiHospitalBuilding,
    mdiHuman,
    mdiHumanGreeting,
    mdiHumanGreetingProximity,
    mdiHumanMaleChild,
    mdiHumanQueue,
    mdiIdeogramCjk,
    mdiImageFilterHdr,
    mdiIslam,
    mdiJudaism,
    mdiLaptop,
    mdiLibrary,
    mdiMathIntegral,
    mdiMedal,
    mdiMonitor,
    mdiMusicNote,
    mdiNewspaper,
    mdiPasta,
    mdiPig,
    mdiPineTree,
    mdiPipeWrench,
    mdiPizza,
    mdiPrescription,
    mdiQuadcopter,
    mdiResistor,
    mdiRun,
    mdiSafetyGoggles,
    mdiSchool,
    mdiShape,
    mdiShieldAirplane,
    mdiShieldStar,
    mdiShopping,
    mdiSlopeUphill,
    mdiSprout,
    mdiStadiumVariant,
    mdiTableAccount,
    mdiTeach,
    mdiTheater,
    mdiTools,
    mdiTournament,
    mdiTranslate,
    mdiVirus,
    mdiVote,
    mdiWaterPump,
    mdiWaves,
    mdiWeightLifter,
    mdiWrench
} from '@mdi/js';

/**
 * Retrieves a specialized icon for a given building.
 * 
 * @param building the building to get the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size [optional] the size of the icon
 */
 export const getIconForBuilding = (building: keyof typeof BuildingCode, classes = '', size = 16) => {
    switch (building) {
        case "ABL": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ACS": return <MdiIcon path={mdiShape} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ADC": return <MdiIcon path={mdiFountainPenTip} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AES": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "APS": return <MdiIcon path={mdiCameraBurst} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARJ": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARTB": return <MdiIcon path={mdiDraw} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ATWR": return <MdiIcon path={mdiDog} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AUST": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B1": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B3": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B4_A": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B5": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BCH": return <MdiIcon path={mdiEarth} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BISH": return <MdiIcon path={mdiCameraBurst} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BOUS": return <MdiIcon path={mdiHeadSnowflake} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BPB": return <MdiIcon path={mdiSafetyGoggles} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BRON": return <MdiIcon path={mdiBio} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BUSN": return <MdiIcon path={mdiAccountTie} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CAST": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CHEM": return <MdiIcon path={mdiFlask} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CRU": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "DODD": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "DRMU": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "E2": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "FG": return <MdiIcon path={mdiFlower} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "FSB": return <MdiIcon path={mdiHumanMaleChild} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GAMP": return <MdiIcon path={mdiStadiumVariant} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GANT": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GC": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GENT": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GN": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GRE": return <MdiIcon path={mdiTournament} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GS": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GW": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HALL": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HAWL": return <MdiIcon path={mdiWeightLifter} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HBL": return <MdiIcon path={mdiLibrary} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HDC": return <MdiIcon path={mdiHumanQueue} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HEW": return <MdiIcon path={mdiPrescription} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HH": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HJT": return <MdiIcon path={mdiDramaMasks} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HU1": return <MdiIcon path={mdiHorse} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "HU2": return <MdiIcon path={mdiHorse} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "IMS": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ITE": return <MdiIcon path={mdiMonitor} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "JONS": return <MdiIcon path={mdiFoodApple} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "JRB": return <MdiIcon path={mdiBottleTonicPlus} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KEL": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KLIN": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KNS": return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LAFA": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LH": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LSA": return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LOR": return <MdiIcon path={mdiHorse} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LU1": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LU2": return <MdiIcon path={mdiPig} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MAN": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MCHU": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MONT": return <MdiIcon path={mdiCalculatorVariant} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MSB": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MUSB": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MLIB": return <MdiIcon path={mdiBookMusic} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "OAK": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GW": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PBB": return <MdiIcon path={mdiPrescription} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PCSB": return <MdiIcon path={mdiHumanGreetingProximity} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PR": return <MdiIcon path={mdiFood} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PU1": return <MdiIcon path={mdiEgg} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "RHBA": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ROWE": return <MdiIcon path={mdiAccountQuestion} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SCHN": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SHA": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SPRH": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SRH": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "STRS": return <MdiIcon path={mdiClipboardPulse} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "TLS": return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "TSK": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "UTEB": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "VARC": return <MdiIcon path={mdiDraw} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "VDM": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WCB": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WGC": return <MdiIcon path={mdiSchool} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "STRSWW": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WITE": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WH": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WSH": return <MdiIcon path={mdiHeart} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WSRH": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "YNG": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default: return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}

/**
 * Returns a specialized icon for the given course type.
 * 
 * @param course the course to retrieve the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size [optional] the size of the icon
 */
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

/**
 * Returns the specialized icon for a given dorm hall, if it has one.
 * 
 * @param hall the dorm hall to get the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size    [optional] the size of the icon
 */
export const getIconForResHall = (hall: keyof typeof DormHallType, classes = '', size = 16) => {
    switch (hall) {
        case 'ALUMNI': return <MdiIcon path={mdiQuadcopter} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'BUCKLEY': return <MdiIcon path={mdiMedal} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'HILLTOP_HALLS': return <MdiIcon path={mdiImageFilterHdr} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'MCMAHON': return <MdiIcon path={mdiMedal} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'NORTH_CAMPUS': return <MdiIcon path={mdiArrowUpThick} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'NORTHWEST_CAMPUS': return <MdiIcon path={mdiArrowTopLeftThick} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'SHIPPEE': return <MdiIcon path={mdiDraw} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'EAST_CAMPUS': return <MdiIcon path={mdiArrowRightThick} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'TOWERS': return <MdiIcon path={mdiChessRook} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'WERTH': return <MdiIcon path={mdiAccountMultiple} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'WEST_CAMPUS': return <MdiIcon path={mdiArrowLeftThick} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'BUSBY_SUITES': return <MdiIcon path={mdiHomeCity} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'GARRIGUS_SUITES': return <MdiIcon path={mdiHomeCity} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'SOUTH_CAMPUS': return <MdiIcon path={mdiArrowDownThick} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'MANSFIELD_APARTMENTS': return <MdiIcon path={mdiHomeModern} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'HUSKY_VILLAGE': return <MdiIcon path={mdiAlphabetGreek} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'CHARTER_OAK_4P_4B':
        case 'CHARTER_OAK_4P_2B':
        case 'CHARTER_OAK_2P_2B':
        case 'HILLTOP_APTS_4P_4B':
        case 'HILLTOP_APTS_2P_2B':
        case 'HILLTOP_APTS_DOUBLE':
        case 'NORTHWOOD_APTS': return <MdiIcon path={mdiHomeGroup} className={`fa-fw ${classes}`} size={`${size}px`} />
        case 'STAMFORD': return <MdiIcon path={mdiHomeCity} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'OFF_CAMPUS_APARTMENTS': return <MdiIcon path={mdiHomeCircle} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default: return <MdiIcon path={mdiHomeCity} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}

/**
 * Returns the specialized icon for a given dorm hall type, if it has one.
 * 
 * @param hall the dorm hall type to get the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size    [optional] the size of the icon
 */
export const getIconForResHallType = (type: keyof typeof DormsByType, classes = '', size = 16) => {
    switch (type) {
        case 'TRADITIONAL': return <MdiIcon path={mdiBunkBed} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'SUITES': return <MdiIcon path={mdiHomeCity} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'APARTMENTS': return <MdiIcon path={mdiHomeGroup} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default: return <MdiIcon path={mdiHomeCity} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}

/**
 * Returns the specialized icon for a given room, if it has one.
 * 
 * @param room the room to get the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size    [optional] the size of the icon
 */
export const getIconForRoom = (room: CompleteRoomPayload | Classroom, classes = '', size = 16) => {
    switch (SeatingType[room.seatingType]) {
        case SeatingType.TABLES:
        case SeatingType.TABLES_AND_ARMCHAIRS:
        case SeatingType.TABLET_ARMCHAIRS:
        case SeatingType.FIXED_TABLES:
        case SeatingType.FIXED_LEVELED_TABLES:
            return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case SeatingType.FIXED_AUDITORIUM:
            return <MdiIcon path={mdiTheater} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case SeatingType.LAB_TABLES:
            return <MdiIcon path={mdiTableAccount} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case SeatingType.ACTIVE:
            return <MdiIcon path={mdiRun} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default:
            return <MdiIcon path={mdiGoogleClassroom} className={`fa-fw ${classes}`} size={`${size}px`} />
    }
}

/**
 * Returns the specialized icon for a given dining hall type, if it has one.
 * 
 * @param hall the dining hall type to get the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size    [optional] the size of the icon
 */
export const getIconForDiningHall = (hall: keyof typeof DiningHallType, classes = '', size = 16) => {
    switch (hall) {
        case 'BUCKLEY': return <MdiIcon path={mdiFish} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'MCMAHON': return <MdiIcon path={mdiPizza} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'NORTH': return <MdiIcon path={mdiPasta} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'NORTHWEST': return <MdiIcon path={mdiHamburger} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'PUTNAM': return <MdiIcon path={mdiBlender} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'SOUTH': return <MdiIcon path={mdiFoodSteak} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'TOWERS': return <MdiIcon path={mdiFood} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'WHITNEY': return <MdiIcon path={mdiFoodForkDrink} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default: return <MdiIcon path={mdiFood} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}

/**
 * Returns the specialized icon for a given dining hall status type, if it has one.
 * 
 * @param hall the dining hall type to get the icon for
 * @param classes [optional] the classes to add to the icon
 * @param size    [optional] the size of the icon
 */
export const getIconForDiningStatus = (status: keyof typeof DiningHallStatus, classes = '', size = 16) => {
    switch (status) {
        case 'BETWEEN_MEALS':
        case 'CLOSED':
            return <MdiIcon path={mdiFoodOff} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'BREAKFAST': return <MdiIcon path={mdiCoffee} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'BRUNCH': return <MdiIcon path={mdiEgg} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'DINNER': return <MdiIcon path={mdiFoodSteak} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'LATE_NIGHT': return <MdiIcon path={mdiCookie} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case 'LUNCH': return <MdiIcon path={mdiFoodForkDrink} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default: <MdiIcon path={mdiFoodOff} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}