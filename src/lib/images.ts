/**
 * VERIFIED IMAGE CATALOGUE
 * ────────────────────────────────────────────────────────────────────────────
 * Every asset below was HEAD-checked against the Unsplash CDN before being
 * committed. Centralising them means a dead source is fixed in exactly one
 * place, and no component ever hard-codes a URL.
 *
 * Next/Image re-encodes these to AVIF/WebP and resizes per breakpoint, so we
 * request one generously-sized master and let the optimiser do the rest.
 */

const CDN = "https://images.unsplash.com/photo-";

/** Build a master source URL for the optimiser to consume. */
function master(id: string, w = 1920, q = 82): string {
  return `${CDN}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

/** Portrait crop — taller aspect for people and vertical editorial panels. */
function portrait(id: string, w = 1200, q = 82): string {
  return `${CDN}${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 1.25)}&q=${q}`;
}

export const IMG = {
  /* ── Architecture · exteriors ─────────────────────────────────────────── */
  exteriorWhiteVilla: master("1600596542815-ffad4c1539a9"),
  exteriorModernHouse: master("1600585154340-be6161a56a0c"),
  exteriorClassic: master("1512917774080-9991f1c4c750"),
  exteriorPoolVilla: master("1580587771525-78b9dba3b914"),
  exteriorLuxuryVilla: master("1613490493576-7fde63acd811"),
  exteriorGlassHouse: master("1568605114967-8130f3a36994"),
  exteriorDusk: master("1570129477492-45c003edd2be"),
  exteriorNight: master("1523217582562-09d0def993a6"),
  exteriorCountry: master("1502005229762-cf1b2da7c5d6"),
  exteriorGolden: master("1449844908441-8829872d2607"),
  exteriorEstate: master("1564013799919-ab600027ffc6"),
  exteriorTerrace: master("1613977257363-707ba9348227"),
  exteriorCourtyard: master("1600210492486-724fe5c67fb0"),
  exteriorFacade: master("1600047509807-ba8f99d2cdde"),

  /* ── Interiors ────────────────────────────────────────────────────────── */
  interiorLiving: master("1600607687939-ce8a6c25118c"),
  interiorKitchen: master("1600566753086-00f18fb6b3ea"),
  interiorLounge: master("1551882547-ff40c63fe5fa"),
  interiorSalon: master("1493809842364-78817add7ffb"),
  interiorMinimal: master("1616486338812-3dadae4b4ace"),
  interiorBath: master("1616594039964-ae9021a400a0"),
  interiorGallery: master("1618221195710-dd6b41faaea6"),
  interiorDining: master("1493663284031-b7e3aefcae8e"),
  interiorStair: master("1600121848594-d8644e57abab"),
  interiorSeating: master("1522708323590-d24dbb6b0267"),
  interiorBedroom: master("1505691938895-1758d7feb511"),
  interiorLight: master("1560448204-e02f11c3d0e2"),
  interiorWarm: master("1502672260266-1c1ef2d93688"),

  /* ── Cities · skylines ────────────────────────────────────────────────── */
  cityDubaiDusk: master("1512453979798-5ea266f8880c"),
  cityDubaiAerial: master("1518684079-3c830dcef090"),
  cityDubaiNight: master("1545324418-cc1a3fa10c00"),

  /* ── Water · leisure ──────────────────────────────────────────────────── */
  poolInfinity: master("1582719508461-905c673771fd"),
  poolResort: master("1571003123894-1f0594d2b5d9"),
  poolVilla: master("1540541338287-41700207dee6"),
  hotelGrand: master("1566073771259-6a8506099945"),

  /* ── Architectural abstraction ────────────────────────────────────────── */
  archConcrete: master("1449157291145-7efd050a4d0e"),
  archCurves: master("1470723710355-95304d8aece4"),
  archLines: master("1487958449943-2429e8be8625"),
  archMonolith: master("1511818966892-d7d671e672a2"),
  archGeometry: master("1439337153520-7082a56a81f4"),
  archTower: master("1486406146926-c627a92ad1ab"),

  /* ── Commercial ───────────────────────────────────────────────────────── */
  officeAtrium: master("1497366754035-f200968a6e72"),
  officeFloor: master("1497366811353-6870744d04b2"),
  officeLounge: master("1524758631624-e2822e304c36"),

  /* ── Landscape · escape ───────────────────────────────────────────────── */
  oceanCliff: master("1493246507139-91e8fad9978e"),
  beachPalm: master("1507525428034-b723cf961d3e"),
  oceanCalm: master("1505142468610-359e7d316be0"),
  beachAerialTurquoise: master("1519046904884-53103b34b206"),
  oceanHorizon: master("1502680390469-be75c86b636f"),
  aerialCoast: master("1454391304352-2bf4678b1a7a"),

  /* ── People ───────────────────────────────────────────────────────────── */
  portraitA: portrait("1507003211169-0a1dd7228f2d"),
  portraitB: portrait("1494790108377-be9c29b29330"),
  portraitC: portrait("1500648767791-00dcc994a43e"),
  portraitD: portrait("1580489944761-15a19d654956"),
  portraitE: portrait("1544005313-94ddf0286df2"),
  portraitF: portrait("1519085360753-af0119f7cbe7"),
  portraitG: portrait("1573497019940-1c28c88b4f3e"),
  portraitH: portrait("1560250097-0b93528c311a"),
  portraitI: portrait("1517841905240-472988babdf9"),
  portraitJ: portrait("1534528741775-53994a69daeb"),
} as const;

/**
 * A 1×1 obsidian pixel. Used as the blurDataURL so images fade up from the
 * page ground instead of flashing grey.
 */
export const BLUR_OBSIDIAN =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxMzEzMTciLz48L3N2Zz4=";
