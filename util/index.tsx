import MdiIcon from '@mdi/react';

import {
    BuildingCode,
    CampusType,
    Classroom,
    COURSE_IDENTIFIER,
    ProfessorData,
    SeatingType,
    SectionData
} from '@ilefa/husky';

import {
    mdiAbacus,
    mdiAccountMultiple,
    mdiAccountTie,
    mdiAccountVoice,
    mdiAlphabetGreek,
    mdiAtom,
    mdiBaguette,
    mdiBarley,
    mdiBasketball,
    mdiBio,
    mdiBookMusic,
    mdiBookOpenPageVariant,
    mdiBookshelf,
    mdiBottleTonicPlus,
    mdiBrain,
    mdiCameraBurst,
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
    mdiDraw,
    mdiEarth,
    mdiEgg,
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
    mdiHammerWrench,
    mdiHandPeace,
    mdiHandshake,
    mdiHeadCog,
    mdiHeadSnowflake,
    mdiHeart,
    mdiHinduism,
    mdiHistory,
    mdiHome,
    mdiHomeCircleOutline,
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
    mdiMonitor,
    mdiMusicNote,
    mdiNewspaper,
    mdiPig,
    mdiPineTree,
    mdiPipeWrench,
    mdiPrescription,
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
];

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
];

export const ROOM_NAME_REGEX = /^[a-zA-Z]{1,}\d{2,}[a-zA-Z]*$/;
export const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export type RoomQueryMode = 'full' | 'name';
export type CompleteRoomPayload = Classroom & {
    building: {
        name: string;
        code: string;
        mapUrl: string;
    }
}

export enum BuildingAddresses {
    ABL = '1376 Storrs Road, U-4163, Storrs, CT 06269',
    ACS = '2021 Hillside Road, Storrs CT 06269',
    ADC = '830 Bolton Rd, Storrs, CT 06269',
    AES = '830 Bolton Rd, Storrs, CT 06269',
    APS = '830 Bolton Rd, Storrs, CT 06269',
    ARJ = '337 Mansfield Road, Storrs CT 06269',
    ARTB = '830 Bolton Rd, Storrs, CT 06269',
    ATWR = '61 North Eagleville Road, Unit-3089, Storrs CT 06269',
    AUST = '215 Glenbrook Road, Unit 4098, Storrs CT 06269', 
    B1 = 'Horsebarn Hill Road, Storrs CT 06269',
    B3 = 'Horsebarn Hill Road, Storrs CT 06269',
    B4_A = 'Horsebarn Hill Road, Storrs CT 06269',
    B5 = 'Horsebarn Hill Road, Storrs CT 06269',
    BCH = '354 Mansfield Road, Unit 2045, Storrs CT 06269',
    BOUS = '406 Babbidge Road, Unit 1020, Storrs CT 06269',
    BPB = '91 N. Eagleville Road, Storrs CT 06269',
    BRON = '260 Glenbrook Road, Storrs CT 06269',
    BUSN = '2100 Hillside Road, Unit 1041, Storrs CT 06269',
    CAST = '261 Glenbrook Road, Unit 2237, Storrs CT 06269',
    CHM = '55 N. Eagleville Road, Unit 3060, Storrs CT 06269',
    CRU = 'Horsebarn Hill Road, Storrs CT 06269',
    DODD = '405 Babbidge Road, Unit 1205, Storrs CT 06269',
    DRMU = '802 Bolton Road, Unit 1127, Storrs CT 06269',
    E2 = '191 Auditorium Road, Storrs CT 06269',
    FG = '1395 Storrs Road, Unit 4067, Storrs CT 06269',
    FSB = '348 Mansfield Road, Unit 2058, Storrs CT 06269',
    GAMP = '2095 Hillside Road, Unit 1173, Storrs CT 06269',
    GANT = 'Edward V. Gant Science Complex, Storrs, CT 06269',
    GC = 'Edward V. Gant Science Complex, Storrs, CT 06269',
    GENT = '249 Glenbrook Road, Unit 2064, Storrs CT 06269',
    GN = '97 N. Eagleville Road, Unit 3137, Storrs CT 06269',
    GRE = '2111 Hillside Road, Unit 3078, Storrs CT 06269',
    GS = '196 Auditorium Road, Unit 3009, Storrs CT 06269',
    GW = '2152 Hillside Road, Unit 3046, Storrs CT 06269',
    HALL = '362 Fairfield Way, Storrs CT 06269',
    HAWL = '359 Mansfield Road, Unit 2101, Storrs CT 06269',
    HBL = '369 Fairfield Way, Unit 1005, Storrs CT 06269',
    HDC = '6 Alethia Drive, Unit 1117, Storrs CT 06269',
    HEW = '69 N. Eagleville Road, Unit 3092, Storrs CT 06269',
    HJT = '2132 Hillside Road, Unit 3014, Storrs CT 06269',
    HU1 = 'Horsebarn Hill Road, Storrs CT 06269',
    HU2 = 'Horsebarn Hill Road, Storrs CT 06269',
    IMS = '97 N Eagleville Rd Unit 3137, Storrs, CT 06269',
    ITE = '371 Fairfield Way, Storrs CT 06269',
    JONS = '3624 Horsebarn Hill Road, Storrs CT 06269',
    JRB = '2006 Hillside Road, Storrs CT 06269',
    KEL = 'Horsebarn Hill Road, Storrs CT 06269',
    KLIN = 'Horsebarn Hill Road, Storrs CT 06269',
    KNS = '358 Mansfield Road, Storrs CT 06269',
    LAFA = '3384 Tower Loop Rd, Storrs, CT 06269',
    LH = 'Hillside Rd, Storrs, CT 06269',
    LSA = '75 N Eagleville Rd, Storrs, CT 06269',
    LOR = 'Horsebarn Hill Road, Storrs CT 06269',
    LU1 = 'Horsebarn Hill Road, Storrs CT 06269',
    LU2 = 'Horsebarn Hill Road, Storrs CT 06269',
    MAN = '344 Mansfield Road, Unit 2054, Storrs CT 06269',
    MCHU = 'Hillside Rd, Storrs, CT 06269',
    MONT = '341 Mansfield Road, Unit 1009, Storrs CT 06269',
    MSB = 'Auditorium Rd, Storrs, CT 06269',
    MUSB = '1295 Storrs Road, Unit 1012, Storrs CT 06269',
    MLIB = '1295 Storrs Road, Storrs CT 06269',
    OAK = '363-367 Fairfield Way, Storrs, CT 06269',
    PB = '196 Auditorium Rd, Storrs, CT 06269',
    PBB = '69 N. Eagleville Road, Unit 3092, Storrs CT 06269',
    PCSB = '2 Alethia Drive, Unit 1085, Storrs CT 06269',
    PR = 'Alumni Drive, Storrs CT 06269',
    PU1 = 'Horsebarn Hill Road, Storrs CT 06269',
    RHBA = '1380 Storrs Road, Unit 4090, Storrs CT 06269',
    ROWE = '368 Fairfield Way, Unit 2332, Storrs CT 06269',
    SCHN = '341 Mansfield Road, Unit 1240, Storrs CT 06269',
    SHA = '231 Glenbrook Rd, Storrs, CT 06269',
    SPRH = '1288 Storrs Road, Storrs CT 06269',
    SRH = '1346 Storrs Road, Storrs CT 06269',
    STRS = '231 Glenbrook Road, Unit 4026, Storrs CT 06269',
    TLS = '75 N. Eagleville Road, Unit 3043, Storrs CT 06269',
    TSK = '2131 Hillside Road, Unit 3088, Storrs CT 06269',
    UTEB = '191 Auditorium Road, Storrs CT 06269',
    VARC = '1295 Storrs Rd, Storrs, CT 06269',
    VDM = '875 Coventry Road, Unit 1128, Storrs CT 06269',
    WCB = '233 Glenbrook Road, Unit 4239, Storrs CT 06269',
    WGC = '438 Whitney Road Ext., Unit 1006, Storrs CT 06269',
    WIDM = '231 Glenbrook Road, Storrs CT 06269',
    WITE = '17 Manter Road, Storrs CT 06269',
    WOOD = '241 Glenbrook Road, Unit 2103 Storrs CT 06269',
    WSH = '234 Glenbrook Road, Unit 2011, Storrs CT 06269',
    WSRH = '626 Gilbert Road Ext., Storrs CT 06269',
    YNG = '1376 Storrs Road, Unit 4066, Storrs CT 06269'
}

export enum BuildingDescriptions {
    ABL = 'The Agricultural Biotechnology Laboratory (ABL) and the Advanced Technology Laboratory (ATL) form UConn’s Bio Science Complex (BSC). The Agricultural Biotechnology Lab features a climate-controlled greenhouse and animal research labs used by departments including molecular biology, physiology, nursing, and genetics.',
    ACS = 'The Art Ceramic Studio (ACS) is used by the Department of Art and Art History for ceramic classes and student studio space.',
    ADC = 'There is no description for this building.',
    AES = 'There is no description for this building.',
    APS = 'There is no description for this building.',
    ARJ = 'The Arjona Building (ARJ) provides dozens of classrooms and offices for Counseling and Mental Health Services, the Connecticut Institute for Brain and Cognitive Sciences, the UConn Testing Center, Employee Assistance Program and the Department of Communication.',
    ARTB = 'The Art Design Center is located in the Art Building (ARTB) 108 and provides space for students majoring in Communications Design to plan and work on professional design-related projects.',
    ATWR = 'Home to the Connecticut Veterinary Medical Diagnostic Laboratory, the Atwater Laboratory (ATWR) contains several pathology research areas for the College of Agriculture and Natural Resources.',
    AUST = 'The Philip E. Austin Building (formerly College of Liberal Arts and Sciences Building) includes numerous classrooms, two lecture halls, and faculty and administrative offices. In 2001, this facility was renovated from the former Waring Chemistry Building into the home of the University’s largest College, with more than 80 majors.',
    B1 = 'There is no description for this building.',
    B3 = 'There is no description for this building.',
    B4_A = 'There is no description for this building.',
    B5 = 'There is no description for this building.',
    BCH = 'Home to the Center for Integrative GeoSciences, Beach Hall (BCH) also houses classrooms, molecular and cell biology laboratories, and faculty offices. It is named for Charles Lewis Beach, the University’s fifth President (1908-1928).',
    BOUS = 'Home to the psychology department, one of the most popular undergraduate majors, the Bousfield Building (BOUS) features classrooms, laboratory space, and faculty offices.',
    BPB = 'The tallest building on campus and home to a cluster of research programs with overlapping interests, the Biology/Physics Building (BPB) includes the Department of Molecular and Cell Biology, facilities for the Department of Physics, laboratories, greenhouses, and a biological collection with more than 125,000 specimens ranging from birds and mammals to fish and plants.',
    BRON = 'The Bronwell Building (BRON), also known as Engineering III, is where the biomedical engineering program classrooms, student laboratories, and faculty offices are located.',
    BUSN = 'The School of Business Building (BUSN) houses classrooms as well as faculty and administrative offices for five business departments – management, marketing, accounting, finance, and operations and information management.',
    CAST = 'Also known as Engineering I, the Castleman Building (CAST) is where the dean of the School of Engineering and several engineering faculty have offices as well as classroom space.',
    CHM = 'The Chemistry Building (CHEM) includes four wings for teaching and research laboratories, lecture halls, and administrative offices, linked by a four-story atrium space. It is also home to Chem Café.',
    CRU = 'The Cattle Resource Unit (CRU) houses replacement dairy heifers for the KDC beef cows and is utilized by the department\'s teaching, research, and extension programs. Currently closed to the public due to the COVID-19 pandemic.',
    DODD = 'The Dodd Center (DODD) is the archive for University records and other special collections. The Human Rights Institute and the Center for Judaic Studies and Contemporary Jewish Life are also in this building. In 1995, the Dodd Center was dedicated by President Clinton. It is named for the late Sen. Thomas Joseph Dodd, whose son, former Sen. Christopher J. Dodd, played a crucial role in the Center’s development. doddcenter.uconn.edu',
    DRMU = 'The Drama-Music Building (DRMU) within the Fine Arts Complex (FAC) provides classroom and practice space for music and drama students.',
    E2 = 'One of five buildings on the Storrs campus dedicated to the field of engineering, Engineering II (E2) features many classrooms.',
    FG = 'The Floriculture Greenhouse (FG) includes six greenhouses for teaching, research, and production. Plant sales and self-guided greenhouse tours are available.',
    FSB = 'The Family Studies Building (FSB) is where the Department of Human Development and Family Studies holds many of its classes. It also houses Lu’s Café.',
    GAMP = 'Harry A. Gampel Pavilion (GAMP), which is an iconic landmark in the middle of campus, provides the UConn basketball and women’s volleyball programs with one of the most intimate on-campus game atmospheres in the entire nation.',
    GANT = 'There is no description for this building.',
    GC = 'The Gant Central Building (GC) was formerly the Edward V. Gant Science Complex.',
    GENT = 'Home of the Neag School of Education, the Gentry Building (GENT) houses the School’s innovative combined bachelor’s/master’s teacher education degree program as well as programs in such areas as sport management, school administration, counseling psychology, and educational technology. The building is named after former Acting President Charles Burt Gentry.',
    GN = 'The Gant North Building (GN) was formerly the Institute of Materials Sciences.',
    GRE = 'Part of the Student Recreation Facility (SRF), the Field House (GRE) features an indoor full-size track and multipurpose courts for basketball and volleyball. recreation.uconn.edu',
    GS = 'The Gant South Building (GS) was formerly the Math-Science Building.',
    GW = 'The Gant West Building (GW) was formerly the Physics Building.',
    HALL = 'There is no description for this building.',
    HAWL = 'Hawley Armory (HAWL) serves as a health and fitness training facility for the University community.',
    HBL = 'Containing more than 2.6 million books, 51,000 print and electronic periodicals, 230,000 maps, and 15,000 reference sources, the Babbidge Library (HBL) also features electronic classrooms dedicated to undergraduate instruction in library literacy. With 24-hour study lounges and computer clusters for group projects, the Babbidge Library is the intellectual center of life at UConn. Bookworms Café is located on the library’s plaza level. It is named in honor of Homer Babbidge, the University’s 12th President (1962-1972). lib.uconn.edu',
    HDC = 'The Human Development Center (HDC) houses the Child Development Labs, which provide undergraduate and graduate students with supervised experiential training in early child development. The building also houses the Nayden Rehabilitation Clinic.',
    HEW = 'There is no description for this building.',
    HJT = 'The Harriet S. Jorgensen Theatre (HJT) is the more intimate of the two stages that make up the Jorgensen Center for the Performing Arts (JORG). jorgensen.uconn.edu',
    HU1 = 'Horse Unit I is the main equine facility with 58 stalls, a club room, tack rooms, lighted outdoor arena, and training areas. The Department maintains a herd of 85 horses for teaching, lessons, research, and special programs. Currently closed to the public due to the COVID-19 pandemic.',
    HU2 = 'Horse Unit II is the main equine facility with 58 stalls, a club room, tack rooms, lighted outdoor arena, and training areas. The Department maintains a herd of 85 horses for teaching, lessons, research, and special programs. Currently closed to the public due to the COVID-19 pandemic.',
    IMS = 'There is no description for this building.',
    ITE = 'The Information Technologies Engineering Building (ITE) provides students and faculty in the School of Engineering with a high-tech, 350-seat auditorium, research labs, administrative and faculty offices, and a spacious atrium.',
    JONS = 'The Jones Building (JONS) houses the Nutritional Sciences department’s offices, research, and classroom space.',
    JRB = 'The Ryan Building (JRB) houses several offices as well as the Center for Health, Intervention, and Prevention and Center for Public Health and Health Policy.',
    KEL = 'There is no description for this building.',
    KLIN = 'The Klinck Building (KLIN) is a farm equipment storage facility.',
    KNS = 'The Department of Allied Health Sciences, offering degree programs in allied health, diagnostic genetic sciences, dietetics, and medical technology, is located in Koons Hall (KNH), named for Benjamin Franklin Koons. A professor and first President of the Storrs Agricultural College (1893-1898), Koons authorized the admission of the first women to the college.',
    LAFA = 'There is no description for this building.',
    LH = 'There is no description for this building.',
    LSA = 'There is no description for this building.',
    LOR = 'Horse Unit I is the main equine facility with 58 stalls, a club room, tack rooms, lighted outdoor arena, and training areas. The Department maintains a herd of 85 horses for teaching, lessons, research, and special programs. Currently closed to the public due to the COVID-19 pandemic.',
    LU1 = 'Livestock Unit I, which houses beef cattle and sheep, is currently closed to the public due to the COVID-19 pandemic. Livestock Unit II, which houses sheep and swine, is not open to the public. The Animal Science Department has 45 Angus and Hereford beef cows, 90 Dorset, Shropshire, and Southdown sheep and swine during select times of the year.',
    LU2 = 'Livestock Unit II, which houses beef cattle and sheep, is currently closed to the public due to the COVID-19 pandemic. Livestock Unit II, which houses sheep and swine, is not open to the public. The Animal Science Department has 45 Angus and Hereford beef cows, 90 Dorset, Shropshire, and Southdown sheep and swine during select times of the year.',
    MAN = 'The philosophy and sociology departments and the Center for Population Research are located in Manchester Hall (MAN).',
    MCHU = 'Centrally located on the academic corridor, Lawrence D. McHugh Hall (formerly Laurel Hall, Classroom Building) hosts a variety of courses in bright and modern space. The LEED Gold Certified facility has 17 technologically advanced classrooms of various sizes and two auditoria (200 and 400 seats). The ‘green’ aspects of the building include energy efficient lighting, high-performance insulation, swaths of natural light and roof plantings to reduce run off.',
    MONT = 'Monteith (MONT) is located across from Mirror Lake and serves as classroom and office space for the Department of Mathematics.',
    MSB = 'There is no description for this building.',
    MUSB = 'The Music Building (MUSB), part of the Fine Arts Complex, includes the UConn Marching Band practice space, a music library, and studio/classroom areas.',
    MLIB = 'Part of the Fine Arts Complex (FAC), the Music & Dramatic Arts Library circulates music scores, sound recordings, videos, playscripts, and stagecraft books that may be checked out during the Center’s operating hours. lib.uconn.edu',
    OAK = 'Centrally located on campus, Oak Hall (OAK) opened in August 2012 and is home to many of the University’s social sciences and humanities departments. This LEED Gold Certified facility comprises two wings interconnected by a copper façade courtyard area with both classroom and academic office space.',
    PB = 'There is no description for this building.',
    PBB = 'The Pharmacy-Biology Building (PBB) is located in the center of the University’s Science Quadrangle and provides classroom, laboratory, and office space for students and faculty in the pharmacy and biology programs. The building also has a pharmacy library for undergraduate and graduate students.',
    PCSB = 'The Phillips Communication Sciences Building (PCSB) is where students majoring in communication processes or communication disorders access faculty offices and research areas. It is also the location of the UConn Speech and Hearing Clinic and the Brain Imaging Research Center.',
    PR = 'Putnam Refectory (PR) is a resident dining hall and includes HillStop, a Grab & Go location.',
    PU1 = 'The Poultry Unit is a mix of modern and traditional poultry houses that support the Animal Science teaching, research, and extension programs in Poultry Science. The Poultry Unit currently holds commercial flocks and several varieties of show birds and supplies eggs to the UConn Dairy Bar. The Poultry Unit is not open to the public.',
    RHBA = 'The Ratcliffe Hicks Building and Arena (RHBA) include classrooms, an arena used for student clubs in the College of Agriculture and Natural Resources, a home and garden center, a meat research laboratory, and a computer lab.',
    ROWE = 'Located at the heart of the campus, the Rowe Center for Undergraduate Education (ROWE) provides a centralized place for academic support for students, as well as instructional support for faculty members and graduate students. Among the many service offices located here are the First Year Experience program, Study Abroad program, the Center for Community Outreach, the Honors Program, and the Learning Research Center to name a few. The building, formerly known as the CUE, is named for former Board of Trustee Chairman John W. Rowe.',
    SCHN = 'The Andre Schenker Lecture Hall (SCHN) is connected to the Monteith Building and used as classroom space.',
    SHA = 'There is no description for this building.',
    SPRH = 'Shippee Hall (SPRH) houses members of the Fine Arts Learning Community and Connecting With the Arts Learning Community.',
    SRH = 'There is no description for this building.',
    STRS = 'Home to the School of Nursing, Storrs Hall (STRS) includes teaching labs and classrooms, a mock hospital, and faculty offices. It is the oldest brick building on campus and the only facility named in honor of the University’s principal benefactors, Charles and Augustus Storrs.',
    TLS = 'The Torrey Life Sciences Building (TLS) houses offices for the Department of Ecology and Evolutionary Biology, the Department of Physiology and Neurobiology, the Department of Molecular and Cell Biology, and Biology Central Services.',
    TSK = 'All undergraduate applications are reviewed by the Admissions staff working in the Tasker Building (TSK). admissions.uconn.edu',
    UTEB = 'The United Technologies Engineering Building (UTEB) hosts engineering classes and faculty offices.',
    VARC = 'There is no description for this building.',
    VDM = 'A 500-seat performance space, von der Mehden Hall (VDM) is used for student, staff, and guest musical recitals as well as classroom space.',
    WCB = 'UConn’s one-stop shop for student services, the Wilbur Cross Building (WCB) is easily identifiable by its golden-domed cupola. It is home to Wilbur’s Café as well as numerous student service offices, including the Registrar, Residential Life, the Center for Students with Disabilities, the Center for Career Development, and Financial Aid, to name a few. studentservices.uconn.edu',
    WGC = 'The headquarters for UConn’s 80+ graduate programs, the Whetten Graduate Center (WGC) houses offices for graduate admissions, research, and grants. grad.uconn.edu',
    WIDM = 'There is no description for this building.',
    WITE = 'The George C. White building houses the Animal Science Department’s main office, faculty offices, classrooms, student library with computer lab, creamery and laboratories. The building is open to the public weekdays from 8 a.m. - 5 p.m. The UConn Department of Animal Science Creamery is located in the George White Building.  All of the ice cream sold in the UConn Dairy Bar is produced in the Creamery using fresh milk produced at the Kellogg Dairy Center.  The Creamery is used for dairy food research, cheese making, outreach, and teaching activities.  Creamery operations can be viewed from the public observation area in the Dairy Bar during its normal hours of operation.',
    WOOD = 'Home to the history department, Wood Hall (WOOD) has faculty offices and meeting rooms. The Office of Institutional Equity (OIE) and the Title IX Coordinator are also located on the main floor of Wood Hall.',
    WSH = 'Better known as the infirmary, Student Health Services (WSH) offers a wide range of services for students, including primary health care, mental health counseling, a laboratory, and a pharmacy. Specialized services include a women’s clinic, allergy clinic, nutritional counseling, health and wellness education, and substance abuse prevention education. shs.uconn.edu',
    WSRH = 'There is no description for this building.',
    YNG = 'The Young Building (YNG) houses many classrooms and offices of the College of Agriculture, Health and Natural Resources.'
}

export enum BuildingMaps {
    ABL = 'https://www.google.com/maps/place/Agricultural+Biotechnology+Laboratory,+Storrs,+CT+06269/@41.8136066,-72.2526353,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a305b61b13d:0xd250dbc6e9687677!8m2!3d41.8136026!4d-72.2504413',
    ACS = 'https://www.google.com/maps/place/Art+Ceramic+Studio,+Storrs,+CT+06269/@41.8136066,-72.2526353,17z/data=!4m5!3m4!1s0x89e68a3dc3d4f165:0x78adeaddda2160fe!8m2!3d41.8041681!4d-72.2531154',
    ADC = 'https://www.google.com/maps/place/Art+Bldg,+Storrs,+CT+06269/@41.8038469,-72.2478938,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a22fe861231:0xeca72d78310d1250!8m2!3d41.8038429!4d-72.2456998',
    AES = 'https://www.google.com/maps/place/Architectural+and+Engineering+Services,+Storrs,+CT+06268/@41.8038469,-72.2478938,17z/data=!4m5!3m4!1s0x89e68a4703c71513:0x72ca14a6e9f08179!8m2!3d41.811133!4d-72.2628289',
    APS = 'https://www.google.com/maps/place/Art+Bldg,+Storrs,+CT+06269/@41.8038469,-72.2478938,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a22fe861231:0xeca72d78310d1250!8m2!3d41.8038429!4d-72.2456998',
    ARJ = 'https://www.google.com/maps/place/Jaime+Homero+Arjona+Building/@41.8064452,-72.2509999,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3caf075e7d:0xda5e9038b1c5edde!8m2!3d41.8064412!4d-72.2488059',
    ARTB = 'https://www.google.com/maps/place/Art+Bldg,+Storrs,+CT+06269/@41.8064452,-72.2509999,17z/data=!4m5!3m4!1s0x89e68a22fe861231:0xeca72d78310d1250!8m2!3d41.8038429!4d-72.2456998',
    ATWR = 'https://www.google.com/maps/place/Wilbur+O.+Atwater+Laboratory/@41.8038469,-72.2478938,17z/data=!4m5!3m4!1s0x89e68a399aa4b133:0xa3873ea25ef1b74!8m2!3d41.8109326!4d-72.2551863',
    AUST = 'https://www.google.com/maps/place/Philip+E.+Austin+Building/@41.8105411,-72.2535746,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3a58f465b9:0xa5f0e244c34911f4!8m2!3d41.8105441!4d-72.2513882',
    B1 = 'https://www.google.com/maps/place/41%C2%B048\'55.9%22N+72%C2%B014\'25.1%22W/@41.8150623,-72.2412724,19z/data=!4m14!1m7!3m6!1s0x0:0x0!2zNDHCsDQ4JzUzLjgiTiA3MsKwMTQnMjcuMCJX!3b1!8m2!3d41.814948!4d-72.240845!3m5!1s0x89e68a2bdbc9a949:0xe62d640994deccec!7e2!8m2!3d41.8155196!4d-72.2403115',
    B3 = 'https://www.google.com/maps/place/41%C2%B048\'55.8%22N+72%C2%B014\'26.1%22W/@41.8150623,-72.2412724,19z/data=!4m6!3m5!1s0x89e68a2bde8f9943:0xd81fd849072e9b30!7e2!8m2!3d41.8154892!4d-72.240596',
    B4_A = 'https://www.google.com/maps/place/Center+for+Environmental+Science+and+Engineering/@41.8150623,-72.2412724,19z/data=!4m5!3m4!1s0x89e68a296359e6d7:0xe261d85d00d1b4b1!8m2!3d41.8149739!4d-72.2402231',
    B5 = 'https://www.google.com/maps/place/41%C2%B048\'54.8%22N+72%C2%B014\'28.5%22W/@41.8150623,-72.2412724,19z/data=!4m6!3m5!1s0x89e68a2958dc0f71:0x99060b3e5e2442dc!7e2!8m2!3d41.8152123!4d-72.2412387',
    BCH = 'https://www.google.com/maps/place/Charles+Lewis+Beach+Hall,+Storrs,+CT+06269/@41.8105411,-72.2535746,17z/data=!4m5!3m4!1s0x89e68a3b1e390d11:0x45f71f4c61676c90!8m2!3d41.8095173!4d-72.2500181',
    BOUS = 'https://www.google.com/maps/place/Weston+A.+Bousfield+Psychology+Building/@41.8065932,-72.2525501,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3c9abde9ef:0x2235ed76c7989a4b!8m2!3d41.8068445!4d-72.2506475',
    BPB = 'https://www.google.com/maps/place/Biology%2FPhysics+Bldg,+Storrs,+CT+06269/@41.8065932,-72.2525501,17z/data=!4m5!3m4!1s0x89e68a390540df77:0xf3c25a2c3a9979c5!8m2!3d41.80988!4d-72.2566459',
    BRON = 'https://www.google.com/maps/place/Arthur+B.+Bronwell+Building/@41.809884,-72.2588399,17z/data=!4m5!3m4!1s0x89e68a3944a6e131:0x99ad44a1fedcc925!8m2!3d41.8087046!4d-72.2548837',
    BUSN = 'https://www.google.com/maps/place/School+of+Business+Building,+2100+Hillside+Rd,+Storrs,+CT+06269/@41.8087661,-72.2571409,17z/data=!4m5!3m4!1s0x89e68a3c2536727b:0xca88a9240b464ef8!8m2!3d41.8059341!4d-72.2536754',
    CAST = 'https://www.google.com/maps/place/Francis+L.Castleman+Bldg,+Storrs,+CT+06269/@41.8081309,-72.256942,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a39517f4a07:0xa9e8b7fce525fb37!8m2!3d41.8081269!4d-72.254748',
    CHM = 'https://www.google.com/maps/place/Chemistry+Bldg,+Storrs,+CT+06269/@41.8081309,-72.256942,17z/data=!4m5!3m4!1s0x89e68a3a266f1c99:0x5c9ee21191de7c4e!8m2!3d41.810827!4d-72.2538765',
    CRU = 'https://www.google.com/maps/place/UConn+Department+of+Animal+Science/@41.8104467,-72.2579589,16z/data=!4m5!3m4!1s0x89e68a303e39996f:0xac62350d7b134e59!8m2!3d41.8131362!4d-72.2494796',
    DODD = 'https://www.google.com/maps/place/Thomas+J.+Dodd+Research+Center/@41.810831,-72.2560705,17z/data=!4m5!3m4!1s0x89e68a3cf5955555:0x1a614c48cca2a911!8m2!3d41.8056123!4d-72.250863',
    DRMU = 'https://www.google.com/maps/place/Music+Bldg,+Storrs,+CT+06269/@41.805312,-72.2472171,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a239f1ffe33:0xa751c1186677e15c!8m2!3d41.805308!4d-72.2450231',
    E2 = 'https://www.google.com/maps/place/Engineering+II,+Storrs,+CT+06269/@41.805312,-72.2472171,17z/data=!4m5!3m4!1s0x89e68a3941f9b713:0xf6f87433e0db9567!8m2!3d41.8091427!4d-72.2554',
    FG = 'https://www.google.com/maps/place/UConn+Floriculture+Greenhouses/@41.8129595,-72.2539741,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a308e9765dd:0x7b70456863391eb1!8m2!3d41.8129502!4d-72.2517885',
    FSB = 'https://www.google.com/maps/place/Family+Studies+Bldg,+Storrs,+CT+06269/@41.8129595,-72.2539741,17z/data=!4m5!3m4!1s0x89e68a3b306cbf5b:0x93786f983a15ca8b!8m2!3d41.8086503!4d-72.248935',
    GAMP = 'https://www.google.com/maps/place/Harry+A.+Gampel+Pavilion/@41.8048766,-72.2567864,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3e7e6a9b5f:0x52c2e8561692a928!8m2!3d41.8048726!4d-72.2545924',
    GANT = 'https://www.google.com/maps/place/Edward+V.Gant+Science+Complex,+Storrs,+CT+06269/@41.8096304,-72.2574926,19z/data=!4m5!3m4!1s0x89e68a391e347941:0x858760d414435db6!8m2!3d41.8095617!4d-72.2571564',
    GC = 'https://www.google.com/maps/place/Edward+V.Gant+Science+Complex,+Storrs,+CT+06269/@41.8096304,-72.2574926,19z/data=!4m5!3m4!1s0x89e68a391e347941:0x858760d414435db6!8m2!3d41.8095617!4d-72.2571564',
    GENT = 'https://www.google.com/maps/place/Charles+B.+Gentry+Bldg,+249+Glenbrook+Rd,+Storrs,+CT+06269/@41.8096304,-72.2574926,19z/data=!4m5!3m4!1s0x89e68a3be6aa9917:0xfa1c602d9c8bb3b6!8m2!3d41.8085708!4d-72.2538791',
    GN = 'https://www.google.com/maps/place/The+Institute+of+Materials+Science/@41.8094306,-72.2572221,18.75z/data=!4m13!1m7!3m6!1s0x89e68a3be6aa9917:0xfa1c602d9c8bb3b6!2sCharles+B.+Gentry+Bldg,+249+Glenbrook+Rd,+Storrs,+CT+06269!3b1!8m2!3d41.8085708!4d-72.2538791!3m4!1s0x89e68a38fd33675b:0x1638f8b81122e0f1!8m2!3d41.8097948!4d-72.2576801',
    GRE = 'https://www.google.com/maps/place/Hillside+Rd+Hugh+S.+Greer+Field+House,+Storrs,+CT+06269/@41.8069713,-72.2583886,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3ec2f71b03:0x6400253ac65c7b0!8m2!3d41.8069673!4d-72.2561946',
    GS = 'https://www.google.com/maps/place/Math-Science+Bldg,+Storrs,+CT+06269/@41.8094306,-72.2572221,18.75z/data=!4m5!3m4!1s0x89e68a3922793eb5:0xa00b2a6a7518ef04!8m2!3d41.8092558!4d-72.256732',
    GW = 'https://www.google.com/maps/place/Physics+Bldg,+Storrs,+CT+06269/@41.809257,-72.2573843,18z/data=!4m5!3m4!1s0x89e68a38dfb090b7:0x9737382e5e735ad1!8m2!3d41.8093224!4d-72.2574084',
    HALL = 'https://www.google.com/maps/place/William+H.+Hall+Building,+362+Fairfield+Way,+Storrs,+CT+06269/@41.808151,-72.2518944,21z/data=!4m5!3m4!1s0x89e68a3b9a7a51c3:0xedd341439bc6b006!8m2!3d41.8081356!4d-72.2519522?hl=en-US',
    HAWL = 'https://www.google.com/maps/place/Willis+Nichols+Hawley+Armory,+359+Mansfield+Rd,+Storrs,+CT+06269/@41.8077043,-72.252914,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3b7af5be77:0x383b1a6225fffa85!8m2!3d41.8077003!4d-72.25072',
    HBL = 'https://www.google.com/maps/place/Homer+Babbidge+Library/@41.8077043,-72.252914,17z/data=!4m5!3m4!1s0x89e68a3c64fb01e9:0x75d1ed7d1324575e!8m2!3d41.8067715!4d-72.2514901',
    HDC = 'https://www.google.com/maps/place/Center+On+Aging+%26+Human+Dev/@41.8021551,-72.2840224,13z/data=!4m9!1m2!2m1!1shuman+development+center!3m5!1s0x0:0xccda0fbdb6d341ed!8m2!3d41.8086044!4d-72.2489164!15sChhodW1hbiBkZXZlbG9wbWVudCBjZW50ZXIiA4gBAZIBB2NvbGxlZ2U',
    HEW = 'https://www.google.com/maps/place/69+N+Eagleville+Rd,+Storrs,+CT+06269/@41.810168,-72.257375,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a39768a0eed:0x56dcd8ffdce13b30!8m2!3d41.810164!4d-72.255181?hl=en-US',
    HJT = 'https://www.google.com/maps/place/2132+Hillside+Rd,+Storrs,+CT+06268/@41.8082861,-72.2567909,119m/data=!3m1!1e3!4m12!1m6!3m5!1s0x89e68a397a05e30b:0xb26c6f4b296c85ea!2sUniversity+of+Connecticut!8m2!3d41.8077414!4d-72.2539805!3m4!1s0x89e68a3930f45b51:0x1a67cd071f7db6fd!8m2!3d41.8085776!4d-72.2561641',
    HU1 = 'https://www.google.com/maps/place/Department+of+Animal+Science+Horse+Barn-+Riding+Lessons+and+Horse+Sales/@41.814194,-72.2446937,19z/data=!3m1!4b1!4m5!3m4!1s0x89e68a2ea7c454b5:0x47a0785e4c4d510f!8m2!3d41.814193!4d-72.2441452',
    HU2 = 'https://www.google.com/maps/place/Department+of+Animal+Science+Horse+Barn-+Riding+Lessons+and+Horse+Sales/@41.814194,-72.2446937,19z/data=!3m1!4b1!4m5!3m4!1s0x89e68a2ea7c454b5:0x47a0785e4c4d510f!8m2!3d41.814193!4d-72.2441452',
    IMS = 'https://www.google.com/maps/place/The+Institute+of+Materials+Science/@41.8093224,-72.2572762,290m/data=!3m1!1e3!4m5!3m4!1s0x89e68a38fd33675b:0x1638f8b81122e0f1!8m2!3d41.8097948!4d-72.2576801',
    ITE = 'https://www.google.com/maps/place/ITE+Building/@41.8079777,-72.2559997,17.09z/data=!4m5!3m4!1s0x0:0x3148282a909c6b5b!8m2!3d41.8065778!4d-72.2527641',
    JONS = 'https://www.google.com/maps/place/Department+of+Nutritional+Sciences/@41.8137315,-72.2506478,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3029179ce1:0xc77bcf2ea869ca69!8m2!3d41.8137275!4d-72.2484538',
    JRB = 'https://www.google.com/maps/place/J.+Ray+Ryan+Building,+Storrs,+CT+06269/@41.8137315,-72.2506478,17z/data=!4m5!3m4!1s0x89e68a3d73e5de81:0xf5033e1973512917!8m2!3d41.8032572!4d-72.2507473',
    KEL = 'https://www.google.com/maps/place/Frances+E.Osborne+Kellogg+Dairy+Center,+Storrs,+CT+06269/@41.8183671,-72.2541233,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a33b796b0dd:0xb0dfe5edcc3aa92d!8m2!3d41.8183631!4d-72.2519293',
    KLIN = 'https://www.google.com/maps/place/41+Manter+Rd,+Storrs,+CT+06269/@41.8129458,-72.2498313,21z/data=!4m5!3m4!1s0x89e68a306b3ee63d:0x7aa0de7150b7f83d!8m2!3d41.8128579!4d-72.2497791?hl=en-US',
    KNS = 'https://www.google.com/maps/place/Benjamin+Franklin+Koons+Hall/@41.8077454,-72.2561745,17z/data=!4m5!3m4!1s0x89e68a3b0b2b218b:0x2353c8417d651ea3!8m2!3d41.8085091!4d-72.2510307',
    LAFA = 'https://www.google.com/maps/place/Towers+Residence+Halls,+Storrs,+CT+06269/@41.8141895,-72.2560946,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a30cdc3fc95:0x951d0be5f883f87!8m2!3d41.8140794!4d-72.2541022',
    LH = 'https://www.google.com/maps/place/Lawrence+D.+McHugh+Hall/@41.8141895,-72.2560946,17z/data=!4m5!3m4!1s0x89e68bc5b2ebdaa7:0x9d34c4b50eaae714!8m2!3d41.8070872!4d-72.2534118',
    LSA = 'https://www.google.com/maps/place/George+Safford+Torrey+Life+Science+Building/@41.8070991,-72.2556166,17z/data=!4m9!1m2!2m1!1sLife+Science+Annex+uconn!3m5!1s0x89e68a3909f43617:0x5975f222fa2ff1fc!8m2!3d41.8104616!4d-72.2565604!15sChhMaWZlIFNjaWVuY2UgQW5uZXggdWNvbm6SARV1bml2ZXJzaXR5X2RlcGFydG1lbnQ',
    LOR = 'https://www.google.com/maps/place/Arthur+L.Lorentzon+Stables/@41.8139062,-72.2463474,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a2e945f2c8d:0x5b7a0d9c7e9ade55!8m2!3d41.8140847!4d-72.2439248',
    LU1 = 'https://www.google.com/maps/place/Livestock+Unit+I,+Storrs,+CT+06268/@41.8139062,-72.2463474,17z/data=!4m5!3m4!1s0x89e68a2b8a247eeb:0x8503d4792c41b83e!8m2!3d41.8169634!4d-72.2423117',
    LU2 = 'https://www.google.com/maps/place/Livestock+Unit+II,+Storrs,+CT+06269/@41.8169465,-72.2443276,17z/data=!4m5!3m4!1s0x89e68a2ce9b34093:0xab5390e36c056310!8m2!3d41.8196121!4d-72.2443569',
    MAN = 'https://www.google.com/maps/place/Harry+Grant+Manchester+Hall,+Storrs,+CT+06269/@41.8194081,-72.2465035,17z/data=!4m5!3m4!1s0x89e68a24cab8c059:0x1694b22ad150de15!8m2!3d41.8080343!4d-72.2482919',
    MCHU = 'https://www.google.com/maps/place/Lawrence+D.+McHugh+Hall/@41.8080383,-72.2504859,17z/data=!4m5!3m4!1s0x89e68bc5b2ebdaa7:0x9d34c4b50eaae714!8m2!3d41.8070872!4d-72.2534118',
    MONT = 'https://www.google.com/maps/place/Henry+Ruthven+Monteith+Building/@41.8070912,-72.2556058,17z/data=!4m5!3m4!1s0x89e68a3ca766fdf3:0xa8737f5cfdb726d6!8m2!3d41.8070941!4d-72.2492085',
    MSB = 'https://www.google.com/maps/place/Math-Science+Bldg,+Storrs,+CT+06269/@41.8093328,-72.2575019,18.75z/data=!4m5!3m4!1s0x89e68a3922793eb5:0xa00b2a6a7518ef04!8m2!3d41.8092558!4d-72.256732',
    MUSB = 'https://www.google.com/maps/place/Music+Bldg,+Storrs,+CT+06269/@41.805312,-72.2472171,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a239f1ffe33:0xa751c1186677e15c!8m2!3d41.805308!4d-72.2450231',
    MLIB = 'https://www.google.com/maps/place/Music+%26+Dramatic+Arts+Library/@41.8046179,-72.2468528,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a23a4efc00f:0xb5ffc3143af73e22!8m2!3d41.8047011!4d-72.2444671',
    OAK = 'https://www.google.com/maps/place/Oak+Hall/@41.8046179,-72.2468528,17z/data=!4m5!3m4!1s0x89e68a3c7f7910b9:0x90f6eb98e1659a83!8m2!3d41.8074034!4d-72.2512543',
    PB = 'https://www.google.com/maps/place/Physics+Bldg,+Storrs,+CT+06269/@41.8080551,-72.256431,17z/data=!4m5!3m4!1s0x89e68a38dfb090b7:0x9737382e5e735ad1!8m2!3d41.8093224!4d-72.2574084',
    PBB = 'https://www.google.com/maps/place/Pharmacy%2FBiology+Bldg,+Storrs,+CT+06269/@41.8093264,-72.2596024,17z/data=!4m5!3m4!1s0x89e68a397711371f:0x94ffe8f7c655f81a!8m2!3d41.8100808!4d-72.2551449',
    PCSB = 'https://www.google.com/maps/place/Department+of+Communication/@41.8025089,-72.2506478,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3d5282e3a1:0xc60be076190cdbb!8m2!3d41.8025049!4d-72.2484538',
    PR = 'https://www.google.com/maps/place/Putnam+Refectory/@41.8025089,-72.2506478,17z/data=!3m1!5s0x89e68a3f9416b0d3:0x4fa606fb32492bef!4m5!3m4!1s0x89e68a3fbf8dfcc5:0xe102fa527107db81!8m2!3d41.805226!4d-72.2589772',
    PU1 = 'https://www.google.com/maps/place/Poultry+Unit+1,+Storrs,+CT+06269/@41.8178315,-72.2539835,19z/data=!4m5!3m4!1s0x89e68a33fb8fd955:0xcdfc6a453effab17!8m2!3d41.8176241!4d-72.2537862',
    RHBA = 'https://www.google.com/maps/place/Ratcliffe+Hicks+Bldg+and+Arena,+Storrs,+CT+06269/@41.8122999,-72.2516841,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a300db46525:0xe9b8cba54c7f0d9c!8m2!3d41.8122959!4d-72.2494901',
    ROWE = 'https://www.google.com/maps/place/Rowe+Center+for+Undergraduate+Education,+368+Fairfield+Way,+Storrs,+CT+06269/@41.8122999,-72.2516841,17z/data=!4m5!3m4!1s0x89e68a3bf4554131:0x7eb05ed93154bfe4!8m2!3d41.8077158!4d-72.2529098',
    SCHN = 'https://www.google.com/maps/place/Andre+Schenker+Lecture+Hall/@41.8077198,-72.2551038,17z/data=!4m5!3m4!1s0x89e68a3b60930bf3:0x6710af1808b99f59!8m2!3d41.8072126!4d-72.2499204',
    SHA = 'https://www.google.com/maps/place/Augustus+Storrs+Hall,+Storrs,+CT+06269/@41.8072534,-72.2519791,17z/data=!4m5!3m4!1s0x89e68a3bb4ca6313:0xb5ce34968b84002e!8m2!3d41.8099413!4d-72.252389',
    SPRH = 'https://www.google.com/maps/place/Lester+E.+Shippee+Residence+Hall,+Storrs,+CT+06269/@41.8099453,-72.254583,17z/data=!4m5!3m4!1s0x89e68a247bd51665:0x15148a8f1f852461!8m2!3d41.8064797!4d-72.2446908',
    SRH = 'https://www.google.com/maps/place/Uconn+East+Campus/@41.8072914,-72.2478397,17z/data=!4m5!3m4!1s0x89e68a252daed6cb:0xbffafe1166c8314d!8m2!3d41.8096551!4d-72.2480125',
    STRS = 'https://www.google.com/maps/place/Augustus+Storrs+Hall,+Storrs,+CT+06269/@41.8072534,-72.2519791,17z/data=!4m5!3m4!1s0x89e68a3bb4ca6313:0xb5ce34968b84002e!8m2!3d41.8099413!4d-72.252389',
    TLS = 'https://www.google.com/maps/place/George+Safford+Torrey+Life+Science+Building/@41.8096591,-72.2502065,17z/data=!4m5!3m4!1s0x89e68a3909f43617:0x5975f222fa2ff1fc!8m2!3d41.8104616!4d-72.2565604',
    TSK = 'https://www.google.com/maps/place/Gordon+W.Tasker+Admissions+Bldg,+Storrs,+CT+06269/@41.8076894,-72.2592462,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3ed7b9b22b:0xbb9f22d24192325f!8m2!3d41.8076854!4d-72.2570522',
    UTEB = 'https://www.google.com/maps/place/United+TECHNOLOGIES+Engineering+Bldg,+Storrs,+CT+06269/@41.8076894,-72.2592462,17z/data=!4m5!3m4!1s0x89e68a396b87162b:0xc5255f24da8f2f9e!8m2!3d41.8094215!4d-72.2555362',
    VARC = 'https://www.google.com/maps/place/Music+%26+Dramatic+Arts+Library/@41.8046179,-72.2468528,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a23a4efc00f:0xb5ffc3143af73e22!8m2!3d41.8047011!4d-72.2444671',
    VDM = 'https://www.google.com/maps/place/J.Louis+Von+Der+Mehden+Recital+Hall,+Storrs,+CT+06269/@41.8046179,-72.2468528,17z/data=!4m5!3m4!1s0x89e68a230a5776df:0x6663578dcc7d7f64!8m2!3d41.8049756!4d-72.2454514',
    WCB = 'https://www.google.com/maps/place/Wilbur+Cross+Bldg,+Storrs,+CT+06269/@41.8049796,-72.2476454,17z/data=!4m5!3m4!1s0x89e68a3baf6e52e1:0x3fa2618773a6b93f!8m2!3d41.8091716!4d-72.2518197',
    WGC = 'https://www.google.com/maps/place/Nathan+L.+Whetten+Graduate+Center,+Storrs,+CT+06269/@41.8091756,-72.2540137,17z/data=!4m5!3m4!1s0x89e68a3c4358f36d:0x198abac0879ffd32!8m2!3d41.8058983!4d-72.251975',
    WIDM = 'https://www.google.com/maps/place/Carolyn+Ladd+Widmer+Wing,+Storrs,+CT+06269/@41.810013,-72.2543968,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3a4c60a437:0x56ee377b5b441b6f!8m2!3d41.810009!4d-72.2522028',
    WITE = 'https://www.google.com/maps/place/George+C.+White+Building,+3636+Manter+Rd,+Storrs,+CT+06269/@41.810013,-72.2543968,17z/data=!4m5!3m4!1s0x89e68a303e5f8743:0xcd887ffbf226afa!8m2!3d41.8131386!4d-72.2495071',
    WOOD = 'https://www.google.com/maps/place/Walter+Childs+Wood+Hall,+241+Glenbrook+Rd,+Storrs,+CT+06269/@41.8131426,-72.2517011,17z/data=!4m5!3m4!1s0x89e68a3bc5d54603:0xa830c81157fcd6a6!8m2!3d41.8092117!4d-72.2531329',
    WSH = 'https://www.google.com/maps/place/UConn+Student+Health+and+Wellness/@41.8100773,-72.2556757,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3a6214bc31:0xe6efd2d9ea89c383!8m2!3d41.8100725!4d-72.2534795',
    WSRH = 'https://www.google.com/maps/place/Nellie+Louise+Wilson+Residence+Hall,+Storrs,+CT+06269/@41.8048368,-72.2494434,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a232519ae45:0x9b4d4d877e73787c!8m2!3d41.8048328!4d-72.2472494',
    YNG = 'https://www.google.com/maps/place/Wilfred+B.Young+Bldg,+Storrs,+CT+06269/@41.8121557,-72.2504963,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3002f0b9c5:0x86e6604eb51a5236!8m2!3d41.8121517!4d-72.2483023'
}

export const getIconForBuilding = (building: keyof typeof BuildingCode, classes = '', size = 16) => {
    switch (building) {
        case "ABL": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ACS": return <MdiIcon path={mdiShape} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ADC": return <MdiIcon path={mdiFountainPenTip} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AES": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "APS": return <MdiIcon path={mdiCameraBurst} className={`fa-fw ${classes}`} size={`${size}px`} />;
        // case "ARJ": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ARTB": return <MdiIcon path={mdiDraw} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ATWR": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "AUST": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B1": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B3": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B4_A": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "B5": return <MdiIcon path={mdiBrain} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BCH": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BOUS": return <MdiIcon path={mdiHeadSnowflake} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BPB": return <MdiIcon path={mdiSafetyGoggles} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BRON": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "BUSN": return <MdiIcon path={mdiAccountTie} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CAST": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "CHM": return <MdiIcon path={mdiFlask} className={`fa-fw ${classes}`} size={`${size}px`} />;
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
        case "HAWL": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
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
        case "JRB": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KEL": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KLIN": return <MdiIcon path={mdiSprout} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "KNS": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LAFA": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LH": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LSA": return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LOR": return <MdiIcon path={mdiHorse} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LU1": return <MdiIcon path={mdiCow} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "LU2": return <MdiIcon path={mdiPig} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MAN": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MCHU": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MONT": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MSB": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MUSB": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "MLIB": return <MdiIcon path={mdiBookMusic} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "OAK": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "GW": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PBB": return <MdiIcon path={mdiPrescription} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PCSB": return <MdiIcon path={mdiHumanGreetingProximity} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PR": return <MdiIcon path={mdiFood} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "PU1": return <MdiIcon path={mdiEgg} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "RHBA": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "ROWE": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SCHN": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SHA": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SPRH": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "SRH": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "STRS": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "TLS": return <MdiIcon path={mdiDna} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "TSK": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "UTEB": return <MdiIcon path={mdiHammerWrench} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "VARC": return <MdiIcon path={mdiDraw} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "VDM": return <MdiIcon path={mdiMusicNote} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WCB": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WGC": return <MdiIcon path={mdiSchool} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WIDM": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WITE": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WOOD": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WSH": return <MdiIcon path={mdiHeart} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "WSRH": return <MdiIcon path={mdiHome} className={`fa-fw ${classes}`} size={`${size}px`} />;
        case "YNG": return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
        default: return <MdiIcon path={mdiTeach} className={`fa-fw ${classes}`} size={`${size}px`} />;
    }
}

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

export const isValidCampus = (input: string): input is CampusType => {
    let lower = input.toLowerCase();
    return lower === 'any'
        || lower === 'storrs'
        || lower === 'hartford'
        || lower === 'stamford'
        || lower === 'waterbury'
        || lower === 'avery_point'
}

export const isValidRoomQueryMode = (input: string): input is RoomQueryMode => {
    let lower = input.toLowerCase();
    return lower === 'full' || lower === 'name';
}

export const getCampusIndicator = (campus: string) => {
    campus = campus.toLowerCase();
    if (campus === 'storrs') return 'S';
    if (campus === 'hartford') return 'H';
    if (campus === 'stamford') return 'Z';
    if (campus === 'waterbury') return 'W';
    if (campus === 'off-campus') return 'O';
    if (campus.replace(' ', '_') === 'avery_point')
        return 'A';

    return '?';
}

export const addTrailingDecimal = (int: number) => {
    if (!int.toString().includes('.'))
        return int.toString() + '.0';

    return int.toString();
}

export const getMeetingTime = (schedule: string, location: { name: string }) => {
    if (schedule.trim() === '12:00am-12:00am')
        return 'Does not meet'

    if (schedule.trim().length)
        return schedule.trim();

    if (location.name === 'No Room Required - Online')
        return 'Does not meet';

    return 'Unknown';
}

export const isValidCourseName = (name: string) => {
    return name && COURSE_IDENTIFIER.test(name);   
}

export const getEnumKeyByEnumValue = (target: any, value: string) => {
    let keys = Object.keys(target).filter((x) => target[x] == value);
    return keys.length > 0 ? keys[0] : undefined;
}

export const capitalizeFirst = (input: string) => input
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');