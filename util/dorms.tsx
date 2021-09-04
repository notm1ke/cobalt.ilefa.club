export const RATE_MY_DORMS_ID = 'University-of-Connecticut';

export type Dorm = {
    hall: keyof typeof DormHallType;
    type: keyof typeof DormsByType;
    assets: DormAsset[];
    sources: DormAttribution[];
    ratings: DormRatings;
}

export type DormAsset = {
    url: string;
    thumbnail: string;
    width: number;
    height: number;
    author: string;
}

export type DormAttribution = {
    author: {
        name: string;
        avatar: string;
        id: string;
    },
    post: {
        id: string;
        url: string;
        created: number;
    }
}

export type DormRatings = {
    id: string;
    name: string;
    yearFreshman: number;
    yearSophomore: number;
    yearJunior: number;
    yearSenior: number;
    yearGraduateStudent: number;
    ratingOverall: number;
    ratingBathroom: number;
    ratingBuilding: number;
    ratingLocation: number;
    ratingRoom: number;
    numReviews: number;
    recommend: number;
    amenities_boolean: DormAmenities<Boolean>;
    amenities_count: DormAmenities<number>;
}

export type DormAmenities<T> = {
    "air-conditioning": T;
    "common-areas": T;
    "dining-hall": T;
    "private-bathroom": T;
    elevator: T;
    kitchen: T;
    mailroom: T;
    laundry: T;
}

export enum DormHallType {
    ALUMNI = 'Alumni',
    BUCKLEY = 'Buckley',
    HILLTOP_HALLS = 'Hilltop Halls',
    MCMAHON = 'McMahon',
    NORTH_CAMPUS = 'North Campus',
    NORTHWEST_CAMPUS = 'Northwest Campus',
    SHIPPEE = 'Shippee',
    EAST_CAMPUS = 'East Campus',
    TOWERS = 'Towers',
    WERTH = 'Werth',
    WEST_CAMPUS = 'West Campus',
    BUSBY_SUITES = 'Busby Suites',
    GARRIGUS_SUITES = 'Garrigus Suites',
    SOUTH_CAMPUS = 'South Campus',
    MANSFIELD_APARTMENTS = 'Mansfield Apartments',
    HUSKY_VILLAGE = 'Husky Village',
    CHARTER_OAK_4P_4B = 'Charter Oak (4/4)',
    CHARTER_OAK_4P_2B = 'Charter Oak (4/2)',
    CHARTER_OAK_2P_2B = 'Charter Oak (2/2)',
    HILLTOP_APTS_4P_4B = 'Hilltop Apts (4/4)',
    HILLTOP_APTS_2P_2B = 'Hilltop Apts (2/2)',
    HILLTOP_APTS_DOUBLE = 'Hilltop Apts (2x Eff)',
    NORTHWOOD_APTS = 'Northwood Apts',
    STAMFORD = 'Stamford',
    OFF_CAMPUS_APARTMENTS = 'Off-Campus Apartments'
}

export enum DormAmenityType {
    AIR_CONDITIONING = 'Air Conditioning',
    COMMON_AREAS = 'Common Areas',
    DINING_HALL = 'Dining Hall',
    PRIVATE_BATHROOM = 'Private Bathroom',
    ELEVATOR = 'Elevator',
    KITCHEN = 'Kitchen',
    MAILROOM = 'Mailroom',
    LAUNDRY = 'Laundry'
}

export enum DormType {
    TRADITIONAL, SUITES, APARTMENTS
}

export const DormsByType: Record<keyof typeof DormType, DormHallType[]> = {
    "TRADITIONAL": [
        DormHallType.ALUMNI,
        DormHallType.BUCKLEY,
        DormHallType.HILLTOP_HALLS,
        DormHallType.MCMAHON,
        DormHallType.NORTH_CAMPUS,
        DormHallType.NORTHWEST_CAMPUS,
        DormHallType.SHIPPEE,
        DormHallType.EAST_CAMPUS,
        DormHallType.TOWERS,
        DormHallType.WERTH,
        DormHallType.WEST_CAMPUS,
    ],
    "SUITES": [
        DormHallType.BUSBY_SUITES,
        DormHallType.GARRIGUS_SUITES,
        DormHallType.SOUTH_CAMPUS,
        DormHallType.STAMFORD,
    ],
    "APARTMENTS": [
        DormHallType.MANSFIELD_APARTMENTS,
        DormHallType.HUSKY_VILLAGE,
        DormHallType.CHARTER_OAK_4P_4B,
        DormHallType.CHARTER_OAK_4P_2B,
        DormHallType.CHARTER_OAK_2P_2B,
        DormHallType.HILLTOP_APTS_4P_4B,
        DormHallType.HILLTOP_APTS_2P_2B,
        DormHallType.HILLTOP_APTS_DOUBLE,
        DormHallType.NORTHWOOD_APTS
    ]
};

export enum DormHallCategory {
    TRADITIONAL = 'Traditional Dorms',
    SUITES = 'Suites',
    APARTMENTS = 'Apartments'
}

export enum DormHallRmdIds {
    ALUMNI = 'Alumni-Residence-Halls',
    BUCKLEY = 'Buckley',
    HILLTOP_HALLS = 'Hilltop',
    MCMAHON = 'McMahon',
    NORTH_CAMPUS = 'North-Campus',
    NORTHWEST_CAMPUS = 'Northwest',
    SHIPPEE = 'Shippee',
    EAST_CAMPUS_1 = 'East-Campus-Hicks-Grange',
    EAST_CAMPUS_2 = 'East-Campus-Holcomb-Sprague',
    EAST_CAMPUS_3 = 'East-Campus-Whitney',
    TOWERS = 'Towers',
    WERTH = 'Werth-Tower',
    WEST_CAMPUS = 'West-Campus',
    BUSBY_SUITES = 'Busby-Suites',
    GARRIGUS_SUITES = 'Garrigus-Suites',
    SOUTH_CAMPUS = 'South-Campus',
    MANSFIELD_APARTMENTS = 'Mansfield-Apartments',
    CHARTER_OAK_4P_4B = 'Charter-Oak-Apartments',
    CHARTER_OAK_4P_2B = 'Charter-Oak-Apartments',
    CHARTER_OAK_2P_2B = 'Charter-Oak-Apartments',
    HILLTOP_APTS_4P_4B = 'Hilltop-Apartments',
    HILLTOP_APTS_2P_2B = 'Hilltop-Apartments',
    HILLTOP_APTS_DOUBLE = 'Hilltop-Apartments',
    NORTHWOOD_APTS = 'Northwood-Apartments',
    STAMFORD = '900-Washington-Blvd'
}

export enum DormHallAbbreviation {
    ALUMNI = 'ARH',
    BUCKLEY = 'BRH',
    HILLTOP_HALLS = 'HRH',
    MCMAHON = 'MRH',
    NORTH_CAMPUS = 'NCRH',
    NORTHWEST_CAMPUS = 'NWRH',
    SHIPPEE = 'SPRH',
    EAST_CAMPUS = 'ECRH',
    TOWERS = 'TRH',
    WERTH = 'WTRH',
    WEST_CAMPUS = 'WCRH',
    BUSBY_SUITES = 'BSRH',
    GARRIGUS_SUITES = 'GSRH',
    SOUTH_CAMPUS = 'SCRH',
    MANSFIELD_APARTMENTS = 'MA',
    HUSKY_VILLAGE = 'HV',
    CHARTER_OAK_4P_4B = 'COA',
    CHARTER_OAK_4P_2B = 'COA',
    CHARTER_OAK_2P_2B = 'COA',
    HILLTOP_APTS_4P_4B = 'HAC',
    HILLTOP_APTS_2P_2B = 'HAC',
    HILLTOP_APTS_DOUBLE = 'HAC',
    NORTHWOOD_APTS = 'NWA',
    STAMFORD = 'STFD',
    OFF_CAMPUS_APARTMENTS = 'OFF'
}

export enum DormHallDescriptions {
    ALUMNI = 'The Alumni Residence Halls (ARH) provide housing for students in four buildings – Belden Hall, Brock Hall, Eddy Hall, and Watson Hall. Several Learning Communities are located here as well – Leadership, Public Health House, and Business Connections. The Quadrangle also includes the J. Ray Ryan Building (JRB).',
    BUCKLEY = 'Buckley Hall (BRH) houses first-year students in the University’s Honors Program as well as the Buckley resident dining unit.',
    HILLTOP_HALLS = 'Consisting of two high-rise towers, Ellsworth and Hale Halls, Hilltop Residence Halls (HRH) provide student housing with its own resident dining hall, Putnam Refectory (PR), and a Grab & Go location known as HillStop, as well as an outdoor recreation area. ',
    MCMAHON = 'McMahon Hall (MRH) has its own resident dining unit, piano lounge, and game room, and houses the EUROTECH and Global House Learning Communities.',
    NORTH_CAMPUS = 'One of the largest residential communities on campus, North Campus Residence Halls (NCRH) offer traditional-style double rooms for about 1,400 students as well as a resident dining unit. Eight of the 11 dormitories in the quadrangle are named for the Connecticut counties of Hartford, New Haven, New London, Fairfield, Windham, Litchfield, Middlesex, and Tolland. The other three are named after former Connecticut Govs. Baldwin, McConaughy, and Hurley.',
    NORTHWEST_CAMPUS = 'A quadrangle of traditional dormitories, Northwest Residence Halls (NWRH) primarily houses first-year students, many of whom are involved in community service, as well as first-year members of the Nursing Learning Community. Northwest consists of Hanks, Goodyear, Russell, Batterson, Terry, and Rogers Halls, which are named after 19th-century Connecticut industrialists. Northwest also has its own resident dining hall and a Grab & Go location known as West Side Wraps.',
    SHIPPEE = 'Shippee Hall (SPRH) houses members of the Fine Arts Learning Community and Connecting With the Arts Learning Community.',
    EAST_CAMPUS = 'East Campus Residence Halls (ECRH) comprise two building clusters, with three facilities on the north end – Holcomb (MHRH), Whitney (WRH), and Sprague (SRH) Halls – and two more on the south end of campus – Grange (GERH) and Hicks (EHRH) Halls.',
    TOWERS = 'Towers (TRH) has its own dining hall, Gelfenbein Commons (GC), a community center, and 16 buildings, known as Allen, Beecher, Colt, Fenwick, Hamilton, Jefferson, Keller, Kingston, Lafayette, Morgan, Sherman, Sousa, Trumbull, Vinton, Wade, and Webster.',
    WERTH = 'Peter J. Werth Residence Tower opened as Next Generation Connecticut Hall in fall 2016 and houses 727 students. It is home to eight Learning Communities: EcoHouse, Engineering House, Eurotech House, Honors to Opportunities (H2O), Innovation House, Public Health House, ScHOLA²RS House, and WiMSE House. The first completed major project of the Next Generation Connecticut initiative, this residence hall features an "Innovation Zone" with a two-story maker space; a green roof; 3D printers, scanners, and other design tools; work stations; event space; a game room and living room; gallery walls; community lounges; and an idea lab.',
    WEST_CAMPUS = 'West Campus (WCRH) features traditional-style dorms with six buildings – Alsop, Chandler, Hollister, Lancaster, Shakespeare, and Troy. The EcoHouse Learning Community is located in Hollister Hall.',
    BUSBY_SUITES = 'Busby Suites (BSRH) comprise a four-floor building with 232 bedrooms. Busby Suites are set up with two large rooms housing three students each, connected by a common bathroom.',
    GARRIGUS_SUITES = 'The Harry Lucian Garrigus Suites (GSRH) include two large three-person bedrooms connected by a private bathroom and a limited number of single rooms sharing a bathroom.',
    SOUTH_CAMPUS = 'South Campus (SCRH) consists of three state-of-the-art residence halls, a resident dining unit that includes a Grab & Go location called Millie & Maude’s, and a central commons building, known as Rome Commons (ROME). The buildings are named after the first female students to attend UConn – Nellie Louise Wilson Hall, Louisa Jane Rosebrooks Hall, and Anna Mabel Snow Hall.',
    MANSFIELD_APARTMENTS = 'Mansfield Apartments (MA) have two-bedroom apartments with a kitchen, living room, and dining room. These are serviced by the University’s free shuttle buses.',
    HUSKY_VILLAGE = 'A complex of six buildings, Husky Village (HV) houses 300 members of the University’s community of fraternities and sororities.',
    CHARTER_OAK_4P_4B = 'Each of the Charter Oak Apartments (COA) in this seven-building student housing complex features a kitchen, furnished living room, bathroom, laundry room, and air-conditioning.',
    CHARTER_OAK_4P_2B = 'Each of the Charter Oak Apartments (COA) in this seven-building student housing complex features a kitchen, furnished living room, bathroom, laundry room, and air-conditioning.',
    CHARTER_OAK_2P_2B = 'Each of the Charter Oak Apartments (COA) in this seven-building student housing complex features a kitchen, furnished living room, bathroom, laundry room, and air-conditioning.',
    HILLTOP_APTS_4P_4B = 'A 14-building complex, Hilltop Apartments (HAC) offer a range of living options. Each fully furnished apartment includes a living room, bathroom, kitchen, dining area, and laundry room. The apartments accommodate approximately 1,200 students. The apartments are named after notable women Ella Grasso, Harriet Beecher Stowe, Antonia Novello, Mildred French, Mary Ritter Beard, Susette LaFlesche, Prudence Crandall, Mary McLeod Bethune, Alice Pattison Merritt, Chien-Shiung Wu, Maude Knapp Wheeler, Sara Buek Crawford, and Chase Going Woodhouse.',
    HILLTOP_APTS_2P_2B = 'A 14-building complex, Hilltop Apartments (HAC) offer a range of living options. Each fully furnished apartment includes a living room, bathroom, kitchen, dining area, and laundry room. The apartments accommodate approximately 1,200 students. The apartments are named after notable women Ella Grasso, Harriet Beecher Stowe, Antonia Novello, Mildred French, Mary Ritter Beard, Susette LaFlesche, Prudence Crandall, Mary McLeod Bethune, Alice Pattison Merritt, Chien-Shiung Wu, Maude Knapp Wheeler, Sara Buek Crawford, and Chase Going Woodhouse.',
    HILLTOP_APTS_DOUBLE = 'A 14-building complex, Hilltop Apartments (HAC) offer a range of living options. Each fully furnished apartment includes a living room, bathroom, kitchen, dining area, and laundry room. The apartments accommodate approximately 1,200 students. The apartments are named after notable women Ella Grasso, Harriet Beecher Stowe, Antonia Novello, Mildred French, Mary Ritter Beard, Susette LaFlesche, Prudence Crandall, Mary McLeod Bethune, Alice Pattison Merritt, Chien-Shiung Wu, Maude Knapp Wheeler, Sara Buek Crawford, and Chase Going Woodhouse.',
    NORTHWOOD_APTS = 'Northwood Apartments (NWA), located just off campus on North Eagleville Road, house graduate students and are serviced by the University’s free bus shuttles.',
}

export enum DormHallAddresses {
    ALUMNI = '632 Gilbert Road, Storrs CT 06269',
    BUCKLEY = '1276 Storrs Road, Storrs CT 06269',
    HILLTOP_HALLS = '2376 Alumni Drive, Storrs CT 06269',
    MCMAHON = '2011 Hillside Road, Storrs CT 06269',
    NORTH_CAMPUS = '82 N. Eagleville Road, Storrs CT 06269',
    NORTHWEST_CAMPUS = '110 N. Eagleville Road, Storrs CT 06269',
    SHIPPEE = '1288 Storrs Road, Storrs CT 06269',
    EAST_CAMPUS = '1346 Storrs Road, Storrs CT 06269',
    TOWERS = '3384 Towers Loop Road, Storrs CT 06269',
    WERTH = '2378 Alumni Drive Storrs, CT 06269',
    WEST_CAMPUS = '2016 Hillside Road, Storrs CT 06269',
    BUSBY_SUITES = '917 Tower Court Road, Storrs CT 06269',
    GARRIGUS_SUITES = '2374 Alumni Drive, Storrs CT 06269',
    SOUTH_CAMPUS = '626 Gilbert Road Ext., Storrs CT 06269',
    MANSFIELD_APARTMENTS = '1 S. Eagleville Road, Storrs CT 06269',
    HUSKY_VILLAGE = 'Laurel Way, Storrs CT 06269',
    CHARTER_OAK_4P_4B = '916 Tower Court Road, Storrs CT 06269',
    CHARTER_OAK_4P_2B = '916 Tower Court Road, Storrs CT 06269',
    CHARTER_OAK_2P_2B = '916 Tower Court Road, Storrs CT 06269',
    HILLTOP_APTS_4P_4B = '2353 Alumni Drive, Storrs CT 06269',
    HILLTOP_APTS_2P_2B = '2353 Alumni Drive, Storrs CT 06269',
    HILLTOP_APTS_DOUBLE = '2353 Alumni Drive, Storrs CT 06269',
    NORTHWOOD_APTS = '1 Northwood Road, Storrs CT 06269',
    STAMFORD = '900 Washington Blvd, Stamford, CT 06901',
}

export enum DormHallMaps {
    ALUMNI = 'https://www.google.com/maps/place/Alumni+Residence+Halls,+Storrs,+CT+06269/@41.803286,-72.2527347,17z/data=!4m5!3m4!1s0x89e68a3d6deda537:0xa2e395c5afb6ab97!8m2!3d41.8033431!4d-72.2505395',
    BUCKLEY = 'https://www.google.com/maps/place/Buckley/@41.7960894,-72.2806512,15z/data=!4m5!3m4!1s0x89e68a2396eb8fd5:0x7b13bf0a7282fa86!8m2!3d41.805173!4d-72.244259',
    HILLTOP_HALLS = 'https://www.google.com/maps/?q=41.805776,-72.259084',
    MCMAHON = 'https://www.google.com/maps/place/Brien+McMahon+Hall/@41.8036323,-72.2546164,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3d8eed0fcb:0x18cb6a1656825fd7!8m2!3d41.803421!4d-72.2521973',
    NORTH_CAMPUS = 'https://www.google.com/maps/place/Litchfield,+North+Campus+Residence+Hall/@41.8117074,-72.2596097,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a384bce8bf7:0x9063316f747448bb!8m2!3d41.811705!4d-72.2574126',
    NORTHWEST_CAMPUS = 'https://www.google.com/maps/place/Northwest+Residence+Halls,+Storrs,+CT+06269/@41.8107356,-72.2610632,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a38884ad2f7:0xb233738989c9c209!8m2!3d41.810615!4d-72.2589553',
    SHIPPEE = 'https://www.google.com/maps/place/Lester+E.+Shippee+Residence+Hall,+Storrs,+CT+06269/@41.8107356,-72.2610632,17z/data=!4m5!3m4!1s0x89e68a247bd51665:0x15148a8f1f852461!8m2!3d41.8064797!4d-72.2446908',
    EAST_CAMPUS = 'https://www.google.com/maps/place/East+Campus+Residence+Halls,+Storrs,+CT+06268/@41.8064837,-72.2468848,17z/data=!4m5!3m4!1s0x89e68a2531b4a3f3:0x626b13243b6a0afe!8m2!3d41.8098657!4d-72.2474481',
    TOWERS = 'https://www.google.com/maps/place/Towers+Residence+Halls,+Storrs,+CT+06269/@41.8098098,-72.2497887,17z/data=!4m5!3m4!1s0x89e68a30cdc3fc95:0x951d0be5f883f87!8m2!3d41.8140794!4d-72.2541022',
    WERTH = 'https://www.google.com/maps/place/Peter+J.+Werth+Residence+Tower/@41.8062052,-72.2606011,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3f09800969:0x26c5ba3a49f7d083!8m2!3d41.8062012!4d-72.2584071',
    WEST_CAMPUS = 'https://www.google.com/maps/place/West+Campus+Residence+Halls,+Storrs,+CT+06269/@41.8062052,-72.2606011,17z/data=!4m5!3m4!1s0x89e68a3da8f11c45:0x73724f2e56803855!8m2!3d41.8043898!4d-72.2511662',
    BUSBY_SUITES = 'https://www.google.com/maps/place/Busby+Suites/@41.8142243,-72.2630681,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a4810c6e50d:0xacae1c9d4e6beac4!8m2!3d41.8142917!4d-72.2608864',
    GARRIGUS_SUITES = 'https://www.google.com/maps/place/Harry+L.+Garrigus+Suites/@41.8052328,-72.2597524,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3fb1e867f3:0x303368825d42d535!8m2!3d41.8052288!4d-72.2575584',
    SOUTH_CAMPUS = 'https://www.google.com/maps/place/South+Campus+Residence+Halls,+Storrs,+CT+06269/@41.8043362,-72.2494794,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a3d2d1a83a5:0x3a6d47efe576d731!8m2!3d41.8040283!4d-72.2484468',
    MANSFIELD_APARTMENTS = 'https://www.google.com/maps/place/Mansfield+Apartments,+Storrs,+CT+06268/@41.7997673,-72.2436153,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a18ccb2312b:0x3fbe37c9c9db4f2f!8m2!3d41.7995887!4d-72.2426709',
    HUSKY_VILLAGE = 'https://www.google.com/maps/place/Husky+Village,+Storrs,+CT+06268/@41.8162149,-72.2567054,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a36e90e4e7b:0x4780f26b2e4672c3!8m2!3d41.8160517!4d-72.2552544',
    CHARTER_OAK_4P_4B = 'https://www.google.com/maps/place/Charter+Oak+Apartments,+Storrs,+CT+06268/@41.8159556,-72.2639435,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a4856bfd565:0x1ce465eea8eaa0b4!8m2!3d41.8156634!4d-72.262286',
    CHARTER_OAK_4P_2B = 'https://www.google.com/maps/place/Charter+Oak+Apartments,+Storrs,+CT+06268/@41.8159556,-72.2639435,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a4856bfd565:0x1ce465eea8eaa0b4!8m2!3d41.8156634!4d-72.262286',
    CHARTER_OAK_2P_2B = 'https://www.google.com/maps/place/Charter+Oak+Apartments,+Storrs,+CT+06268/@41.8159556,-72.2639435,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a4856bfd565:0x1ce465eea8eaa0b4!8m2!3d41.8156634!4d-72.262286',
    HILLTOP_APTS_4P_4B = 'https://www.google.com/maps/place/Hilltop+Apartment+Complex/@41.8015405,-72.2615247,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a14debf9867:0xf1603fc9a8c4c45a!8m2!3d41.8015365!4d-72.2593307',
    HILLTOP_APTS_2P_2B = 'https://www.google.com/maps/place/Hilltop+Apartment+Complex/@41.8015405,-72.2615247,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a14debf9867:0xf1603fc9a8c4c45a!8m2!3d41.8015365!4d-72.2593307',
    HILLTOP_APTS_DOUBLE = 'https://www.google.com/maps/place/Hilltop+Apartment+Complex/@41.8015405,-72.2615247,17z/data=!3m1!4b1!4m5!3m4!1s0x89e68a14debf9867:0xf1603fc9a8c4c45a!8m2!3d41.8015365!4d-72.2593307',
    NORTHWOOD_APTS = 'https://www.google.com/maps/place/Northwood+Apartments,+Storrs,+CT+06268/@41.8048003,-72.2731237,18z/data=!3m1!4b1!4m5!3m4!1s0x89e68a67e1ebc8a9:0xdb38e18c9be1b312!8m2!3d41.8048984!4d-72.2722781',
    STAMFORD = 'https://www.google.com/maps/place/University+of+Connecticut-Stamford+Apartments/@41.0522373,-73.5447968,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2a1e417c43b41:0x29d8fe276d4991f2!8m2!3d41.0522353!4d-73.542453',
}

export const evaluateDormTokenToKey = (param: string): keyof typeof DormHallType | null => {
    switch (param.toLowerCase()) {
        case 'alumni': return 'ALUMNI';
        case 'buckley': return 'BUCKLEY';
        case 'hilltop': return 'HILLTOP_HALLS';
        case 'mcmahon': return 'MCMAHON';
        case 'north': return 'NORTH_CAMPUS';
        case 'northwest' : return 'NORTHWEST_CAMPUS';
        case 'shippee': return 'SHIPPEE';
        case 'east': return 'EAST_CAMPUS';
        case 'towers': return 'TOWERS';
        case 'werth': return 'WERTH';
        case 'west': return 'WEST_CAMPUS';
        case 'busby': return 'BUSBY_SUITES';
        case 'garrigus': return 'GARRIGUS_SUITES';
        case 'south': return 'SOUTH_CAMPUS';
        case 'mansfield': return 'MANSFIELD_APARTMENTS';
        case 'husky': return 'HUSKY_VILLAGE';
        case 'charteroak44': return 'CHARTER_OAK_4P_4B';
        case 'charteroak42': return 'CHARTER_OAK_4P_2B';
        case 'charteroak22': return 'CHARTER_OAK_2P_2B';
        case 'hilltop44': return 'HILLTOP_APTS_4P_4B';
        case 'hilltop22': return 'HILLTOP_APTS_2P_2B';
        case 'hilltopdouble': return 'HILLTOP_APTS_DOUBLE';
        case 'northwood': return 'NORTHWOOD_APTS';
        case 'stamford': return 'STAMFORD';
        default: return null; 
    }
}

export const evaluateDormKeyToToken = (param: keyof typeof DormHallType): string | null => {
    switch (param) {
        case 'ALUMNI': return 'alumni';
        case 'BUCKLEY': return 'buckley'
        case 'HILLTOP_HALLS': return 'hilltop';
        case 'MCMAHON': return 'mcmahon';
        case 'NORTH_CAMPUS': return 'north';
        case 'NORTHWEST_CAMPUS': return 'northwest';
        case 'SHIPPEE': return 'shippee';
        case 'EAST_CAMPUS': return 'east';
        case 'TOWERS': return 'towers';
        case 'WERTH': return 'werth';
        case 'WEST_CAMPUS': return 'west';
        case 'BUSBY_SUITES': return 'busby';
        case 'GARRIGUS_SUITES': return 'garrigus';
        case 'SOUTH_CAMPUS': return 'south';
        case 'MANSFIELD_APARTMENTS': return 'mansfield';
        case 'HUSKY_VILLAGE': return 'husky';
        case 'CHARTER_OAK_4P_4B': return 'charteroak44';
        case 'CHARTER_OAK_4P_2B': return 'charteroak42';
        case 'CHARTER_OAK_2P_2B': return 'charteroak22';
        case 'HILLTOP_APTS_4P_4B': return 'hilltop44';
        case 'HILLTOP_APTS_2P_2B': return 'hilltop22';
        case 'HILLTOP_APTS_DOUBLE': return 'hilltopdouble';
        case 'NORTHWOOD_APTS': return 'northwood';
        case 'STAMFORD': return 'stamford';
        default: return null;
    }
}