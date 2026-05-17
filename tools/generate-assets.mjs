import { mkdir, writeFile } from "node:fs/promises";

const outDir = new URL("../assets/generated/", import.meta.url);

const timeline = [
  ["2030", "elaine", "#72e5ff", "#d8b6ff"],
  ["2034", "formula", "#ffc766", "#72e5ff"],
  ["2042", "servers", "#66a6ff", "#d24343"],
  ["2068", "ai", "#66a6ff", "#ffffff"],
  ["2180", "elevator", "#72e5ff", "#ffc766"],
  ["2296", "warning", "#f2f5ff", "#72e5ff"],
  ["2350", "rift", "#d24343", "#ff8a3d"],
  ["2356", "ascension", "#66a6ff", "#ffffff"],
  ["2368", "empire", "#d24343", "#ffc766"],
  ["2384", "corona", "#ff8a3d", "#ffffff"],
  ["2410", "routes", "#36f0a4", "#ffc766"],
  ["2460", "return", "#72e5ff", "#d8b6ff"]
];

const factions = [
  ["astra", "#d24343", "#3a0d13", "city"],
  ["machine", "#66a6ff", "#e9f6ff", "server"],
  ["solar", "#ff8a3d", "#fff0b8", "temple"],
  ["skyraider", "#36f0a4", "#d24343", "ship"],
  ["guild", "#ffc766", "#7ad8ff", "port"]
];

const characters = [
  ["vera", "#d24343", "#202434", "commander"],
  ["xianyue", "#d24343", "#10131f", "blade"],
  ["reinhardt", "#d24343", "#33333e", "mech"],
  ["mira", "#66a6ff", "#eff8ff", "halo"],
  ["jinbai", "#66a6ff", "#d8efff", "sword"],
  ["ling", "#66a6ff", "#fff", "singer"],
  ["noa", "#ff8a3d", "#fff6d1", "pope"],
  ["aletheia", "#ff8a3d", "#ffe8c7", "saint"],
  ["helios", "#ff8a3d", "#3c1f12", "knight"],
  ["sancheres", "#ff8a3d", "#fff1a8", "prophet"],
  ["luolan", "#36f0a4", "#d24343", "captain"],
  ["nyx", "#36f0a4", "#11151d", "engineer"],
  ["drake", "#36f0a4", "#24302b", "legend"],
  ["ald", "#36f0a4", "#161b22", "duelist"],
  ["evelyn", "#ffc766", "#17202d", "director"],
  ["saifa", "#ffc766", "#0d2a44", "navigator"],
  ["grant", "#ffc766", "#202028", "executor"],
  ["elaine", "#72e5ff", "#1a1230", "seer"],
  ["weiyang", "#72e5ff", "#101622", "scholar"],
  ["magellan", "#72e5ff", "#253044", "admiral"]
];

const svg = (width, height, body, defs = "") => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
      <path d="M52 0H0v52" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
    </pattern>
    ${defs}
  </defs>
  ${body}
</svg>`;

const stars = (count, width, height, color = "rgba(255,255,255,.7)") =>
  Array.from({ length: count }, (_, index) => {
    const x = (index * 97) % width;
    const y = (index * 53 + 41) % height;
    const r = 0.8 + (index % 4) * 0.35;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${0.25 + (index % 5) * 0.12}"/>`;
  }).join("");

function write(name, content) {
  return writeFile(new URL(name, outDir), content, "utf8");
}

function hero() {
  const body = `
    <rect width="1920" height="1080" fill="#070913"/>
    <rect width="1920" height="1080" fill="url(#grid)" opacity=".7"/>
    ${stars(180, 1920, 1080)}
    <path d="M1280 0c-90 210-72 384 54 520s132 302 18 560h568V0z" fill="rgba(210,67,67,.22)"/>
    <path d="M1144 1080c150-214 172-408 66-582S1058 188 1240 0" fill="none" stroke="#72e5ff" stroke-width="4" opacity=".45" filter="url(#glow)"/>
    <path d="M1235 1080c150-240 164-435 42-585S1134 188 1320 0" fill="none" stroke="#ffc766" stroke-width="2" opacity=".35"/>
    <g opacity=".95">
      <path d="M210 790h680l160 92H112z" fill="rgba(8,10,18,.88)" stroke="rgba(114,229,255,.34)" stroke-width="3"/>
      <path d="M340 716h390l130 72H230z" fill="rgba(25,35,58,.86)" stroke="rgba(255,199,102,.28)" stroke-width="2"/>
      <g fill="#151a2c">
        <rect x="285" y="350" width="78" height="370"/>
        <rect x="392" y="290" width="92" height="430"/>
        <rect x="522" y="210" width="118" height="510"/>
        <rect x="678" y="405" width="80" height="315"/>
        <rect x="800" y="320" width="105" height="400"/>
      </g>
      <g stroke="#d24343" stroke-width="5" opacity=".9" filter="url(#glow)">
        <path d="M328 350v350M438 290v420M580 210v500M840 320v390"/>
      </g>
    </g>
    <g filter="url(#glow)">
      <circle cx="1320" cy="510" r="110" fill="none" stroke="#72e5ff" stroke-width="3" opacity=".7"/>
      <circle cx="1320" cy="510" r="188" fill="none" stroke="#d24343" stroke-width="2" opacity=".34"/>
      <path d="M1320 322v376M1132 510h376" stroke="#ffc766" stroke-width="2" opacity=".5"/>
    </g>`;
  return svg(1920, 1080, body);
}

function factionArt(id, primary, secondary, mode) {
  const building = (x, y, w, h, color = "#151a2c") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}" stroke="rgba(255,255,255,.13)"/>
     <path d="M${x + w * 0.2} ${y}v${h}M${x + w * 0.55} ${y}v${h}" stroke="${primary}" opacity=".35"/>`;
  const ship = `<path d="M280 540l420-180 580 90 250 150-520 98-520-42z" fill="rgba(12,18,28,.94)" stroke="${primary}" stroke-width="5"/>
    <path d="M760 408l170-150 220 196z" fill="rgba(210,67,67,.75)" stroke="${secondary}" stroke-width="3"/>
    <path d="M420 650l-160 104 255-38zM1320 614l220 84-310 12z" fill="${primary}" opacity=".55" filter="url(#glow)"/>`;
  const port = `<ellipse cx="960" cy="520" rx="530" ry="120" fill="none" stroke="${primary}" stroke-width="5" opacity=".8"/>
    <ellipse cx="960" cy="520" rx="365" ry="74" fill="none" stroke="${secondary}" stroke-width="3" opacity=".65"/>
    <g fill="rgba(235,245,255,.13)" stroke="rgba(255,255,255,.24)">
      <rect x="500" y="430" width="220" height="260" rx="10"/>
      <rect x="850" y="330" width="250" height="380" rx="10"/>
      <rect x="1210" y="455" width="205" height="235" rx="10"/>
    </g>`;
  const server = `<g transform="translate(350 220)">
      ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 132}" y="${Math.abs(4 - i) * 25}" width="82" height="${520 - Math.abs(4 - i) * 40}" rx="14" fill="rgba(240,250,255,.72)" stroke="${primary}" stroke-width="2"/>`).join("")}
      <path d="M-80 560c310-190 1040-190 1320 0" fill="none" stroke="${primary}" stroke-width="6" opacity=".6" filter="url(#glow)"/>
    </g>`;
  const temple = `<circle cx="960" cy="330" r="170" fill="${secondary}" opacity=".36" filter="url(#glow)"/>
    <path d="M580 760l120-340h520l120 340z" fill="rgba(80,28,20,.86)" stroke="${primary}" stroke-width="5"/>
    <path d="M705 420l255-175 255 175z" fill="rgba(255,138,61,.34)" stroke="${secondary}" stroke-width="3"/>
    <g stroke="${secondary}" stroke-width="4" filter="url(#glow)">${Array.from({ length: 12 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 12;
      return `<path d="M${960 + Math.cos(a) * 210} ${330 + Math.sin(a) * 210}L${960 + Math.cos(a) * 285} ${330 + Math.sin(a) * 285}"/>`;
    }).join("")}</g>`;
  const city = `<g>
      ${building(250, 330, 130, 430)}
      ${building(430, 220, 150, 540)}
      ${building(650, 90, 190, 670)}
      ${building(905, 260, 130, 500)}
      ${building(1090, 135, 180, 625)}
      ${building(1340, 360, 130, 400)}
      <path d="M120 760h1680" stroke="${primary}" stroke-width="8" filter="url(#glow)"/>
    </g>`;
  const content = { city, ship, port, server, temple }[mode];
  const body = `
    <rect width="1600" height="900" fill="#070913"/>
    <radialGradient id="bgGrad" cx="68%" cy="24%" r="70%">
      <stop offset="0" stop-color="${primary}" stop-opacity=".34"/>
      <stop offset=".52" stop-color="${secondary}" stop-opacity=".12"/>
      <stop offset="1" stop-color="#070913" stop-opacity="1"/>
    </radialGradient>
    <rect width="1600" height="900" fill="url(#bgGrad)"/>
    <rect width="1600" height="900" fill="url(#grid)" opacity=".5"/>
    ${stars(80, 1600, 900)}
    ${content}
    <path d="M0 810c280-74 488-78 724-28s494 58 876-56v174H0z" fill="rgba(5,7,12,.72)"/>`;
  return svg(1600, 900, body);
}

function timelineArt(year, mode, primary, secondary) {
  const motifs = {
    elaine: `<circle cx="420" cy="230" r="96" fill="none" stroke="${primary}" stroke-width="4" filter="url(#glow)"/><path d="M420 115v230M305 230h230" stroke="${secondary}" stroke-width="3"/><path d="M610 360c-80-150-80-260 0-330" fill="none" stroke="${primary}" stroke-width="4" opacity=".65"/>`,
    formula: `<g stroke="${primary}" stroke-width="3" fill="none" filter="url(#glow)"><path d="M170 310c130-120 250-120 360 0s230 120 350 0"/><circle cx="310" cy="250" r="72"/><rect x="612" y="200" width="150" height="110" rx="12"/></g>`,
    servers: `<g fill="rgba(235,245,255,.18)" stroke="${primary}">${Array.from({ length: 7 }, (_, i) => `<rect x="${170 + i * 105}" y="${140 + (i % 2) * 38}" width="72" height="260" rx="8"/>`).join("")}</g><path d="M120 430h760" stroke="${secondary}" stroke-width="8" filter="url(#glow)"/>`,
    ai: `<circle cx="480" cy="250" r="130" fill="none" stroke="${primary}" stroke-width="5" filter="url(#glow)"/><g stroke="${secondary}" stroke-width="3">${Array.from({ length: 10 }, (_, i) => `<path d="M480 250L${170 + i * 70} ${90 + (i % 3) * 130}"/>`).join("")}</g>`,
    elevator: `<path d="M480 60v430" stroke="${primary}" stroke-width="10" filter="url(#glow)"/><ellipse cx="480" cy="505" rx="310" ry="70" fill="none" stroke="${secondary}" stroke-width="5"/><rect x="415" y="215" width="130" height="95" fill="rgba(255,255,255,.14)" stroke="${primary}"/>`,
    warning: `<path d="M470 80l310 420H160z" fill="rgba(255,255,255,.09)" stroke="${primary}" stroke-width="6"/><path d="M470 190v150M470 390v28" stroke="${secondary}" stroke-width="18" stroke-linecap="round"/>`,
    rift: `<path d="M500 15c-120 130-86 230 10 310s88 150-80 255" fill="none" stroke="${primary}" stroke-width="18" filter="url(#glow)"/><path d="M0 480c210-90 360-92 500-15s290 76 460-10v145H0z" fill="rgba(210,67,67,.35)"/>`,
    ascension: `<path d="M180 430h620l-95 70H250z" fill="rgba(255,255,255,.14)" stroke="${primary}" stroke-width="4"/><path d="M285 420L450 90l170 330" fill="rgba(102,166,255,.14)" stroke="${secondary}" stroke-width="4"/><path d="M450 90v-70" stroke="${primary}" stroke-width="9" filter="url(#glow)"/>`,
    empire: `<g fill="rgba(40,20,26,.85)" stroke="${primary}"><rect x="220" y="170" width="120" height="330"/><rect x="390" y="90" width="170" height="410"/><rect x="620" y="220" width="130" height="280"/></g><path d="M120 500h760" stroke="${secondary}" stroke-width="5"/>`,
    corona: `<circle cx="480" cy="260" r="112" fill="${secondary}" opacity=".35" filter="url(#glow)"/><circle cx="480" cy="260" r="190" fill="none" stroke="${primary}" stroke-width="4"/><path d="M310 500h340l-55-160H365z" fill="rgba(255,138,61,.22)" stroke="${primary}" stroke-width="4"/>`,
    routes: `<g fill="none" stroke="${primary}" stroke-width="4" filter="url(#glow)"><path d="M120 410c180-210 420-210 720 0"/><path d="M145 260c240 180 470 180 690 0"/></g><path d="M350 250l170 65-170 65zM645 350l180 70-180 70z" fill="${secondary}" opacity=".75"/>`,
    return: `<circle cx="480" cy="255" r="95" fill="rgba(114,229,255,.12)" stroke="${primary}" stroke-width="4" filter="url(#glow)"/><path d="M480 88v334M350 420c60-80 200-80 260 0" stroke="${secondary}" stroke-width="5" fill="none"/><path d="M720 0c-90 180-70 310 60 500" stroke="${primary}" stroke-width="9" fill="none" opacity=".5"/>`
  };
  const body = `
    <rect width="960" height="540" fill="#070913"/>
    <radialGradient id="tg" cx="52%" cy="42%" r="75%"><stop offset="0" stop-color="${primary}" stop-opacity=".26"/><stop offset="1" stop-color="#070913"/></radialGradient>
    <rect width="960" height="540" fill="url(#tg)"/>
    <rect width="960" height="540" fill="url(#grid)" opacity=".35"/>
    ${stars(45, 960, 540)}
    ${motifs[mode]}
    <path d="M0 492h960v48H0z" fill="rgba(5,7,12,.68)"/>
    <path d="M62 494h240" stroke="${secondary}" stroke-width="4" opacity=".8"/>
  `;
  return svg(960, 540, body);
}

function characterArt(id, primary, secondary, mode) {
  const silhouette = {
    commander: `<path d="M340 280c-80 80-104 220-94 430h268c14-206-10-350-96-430z" fill="rgba(20,24,38,.95)" stroke="${primary}" stroke-width="4"/><path d="M255 430l-95 220M508 430l115 220" stroke="${primary}" stroke-width="18" stroke-linecap="round"/>`,
    blade: `<path d="M382 250c-86 92-128 250-108 460h240c18-210-22-368-100-460z" fill="rgba(12,14,24,.95)" stroke="${primary}" stroke-width="4"/><path d="M560 155L270 755" stroke="${secondary}" stroke-width="10" filter="url(#glow)"/>`,
    mech: `<rect x="250" y="265" width="260" height="440" rx="28" fill="rgba(36,38,48,.95)" stroke="${primary}" stroke-width="5"/><path d="M180 420h140M485 420h150" stroke="${primary}" stroke-width="36" stroke-linecap="round"/>`,
    halo: `<path d="M320 285c-72 92-96 242-78 425h276c18-183-6-333-78-425z" fill="rgba(235,250,255,.78)" stroke="${primary}" stroke-width="4"/><circle cx="380" cy="220" r="110" fill="none" stroke="${primary}" stroke-width="4" filter="url(#glow)"/>`,
    sword: `<path d="M328 285c-76 94-112 245-92 425h280c20-180-15-331-92-425z" fill="rgba(210,238,255,.78)" stroke="${primary}" stroke-width="4"/><path d="M590 180L212 740" stroke="${primary}" stroke-width="9" filter="url(#glow)"/>`,
    singer: `<path d="M318 300c-90 90-120 240-92 410h310c28-170-2-320-92-410z" fill="rgba(245,252,255,.78)" stroke="${primary}" stroke-width="4"/><g stroke="${primary}" stroke-width="4" fill="none" filter="url(#glow)"><path d="M185 305c-50 70-50 140 0 210"/><path d="M575 305c50 70 50 140 0 210"/></g>`,
    pope: `<path d="M315 325c-88 78-118 222-86 385h302c32-163 2-307-86-385z" fill="rgba(255,242,198,.9)" stroke="${primary}" stroke-width="4"/><path d="M380 100v120M320 160h120" stroke="${secondary}" stroke-width="9" filter="url(#glow)"/>`,
    saint: `<path d="M310 295c-92 96-128 250-94 415h328c34-165-2-319-94-415z" fill="rgba(255,231,199,.86)" stroke="${primary}" stroke-width="4"/><path d="M190 390c115-90 265-90 380 0" fill="none" stroke="${secondary}" stroke-width="7" filter="url(#glow)"/>`,
    knight: `<path d="M270 285h220l55 425H215z" fill="rgba(48,28,20,.94)" stroke="${primary}" stroke-width="5"/><path d="M380 190v-88M250 650h260" stroke="${secondary}" stroke-width="12" filter="url(#glow)"/>`,
    prophet: `<path d="M292 285c-94 110-120 255-90 425h356c30-170 4-315-90-425z" fill="rgba(255,244,180,.82)" stroke="${primary}" stroke-width="4"/><circle cx="380" cy="230" r="160" fill="none" stroke="${secondary}" stroke-width="3" opacity=".7"/>`,
    captain: `<path d="M300 285c-88 95-124 250-100 425h330c24-175-12-330-100-425z" fill="rgba(16,22,24,.95)" stroke="${primary}" stroke-width="4"/><path d="M520 230l95 45-92 32z" fill="${secondary}" filter="url(#glow)"/>`,
    engineer: `<path d="M305 310c-82 80-110 225-88 400h326c22-175-6-320-88-400z" fill="rgba(16,18,24,.95)" stroke="${primary}" stroke-width="4"/><circle cx="235" cy="455" r="58" fill="none" stroke="${secondary}" stroke-width="8"/><path d="M515 425l105-70" stroke="${primary}" stroke-width="18" stroke-linecap="round"/>`,
    legend: `<path d="M285 290c-95 102-128 255-96 420h382c32-165-1-318-96-420z" fill="rgba(24,35,31,.95)" stroke="${primary}" stroke-width="4"/><path d="M220 230h320l-60-62H280z" fill="${secondary}" opacity=".7"/>`,
    duelist: `<path d="M312 285c-86 95-116 250-92 425h320c24-175-6-330-92-425z" fill="rgba(16,20,28,.95)" stroke="${primary}" stroke-width="4"/><path d="M570 170L230 730" stroke="${primary}" stroke-width="10" filter="url(#glow)"/>`,
    director: `<path d="M302 300c-76 94-104 242-86 410h328c18-168-10-316-86-410z" fill="rgba(20,26,36,.95)" stroke="${primary}" stroke-width="4"/><path d="M240 400h280M270 470h220" stroke="${secondary}" stroke-width="4" opacity=".8"/>`,
    navigator: `<path d="M310 300c-82 88-110 240-88 410h316c22-170-6-322-88-410z" fill="rgba(12,35,55,.95)" stroke="${primary}" stroke-width="4"/><circle cx="380" cy="250" r="150" fill="none" stroke="${secondary}" stroke-width="4" filter="url(#glow)"/>`,
    executor: `<path d="M302 305c-75 90-105 235-92 405h340c13-170-17-315-92-405z" fill="rgba(28,29,38,.95)" stroke="${primary}" stroke-width="4"/><rect x="250" y="435" width="260" height="160" rx="8" fill="rgba(255,255,255,.08)" stroke="${secondary}"/>`,
    seer: `<path d="M300 292c-90 96-124 250-98 418h356c26-168-8-322-98-418z" fill="rgba(20,16,40,.94)" stroke="${primary}" stroke-width="4"/><path d="M380 105c-80 90-80 180 0 270s80 180 0 270" fill="none" stroke="${secondary}" stroke-width="6" filter="url(#glow)"/>`,
    scholar: `<path d="M300 310c-82 85-108 232-90 400h340c18-168-8-315-90-400z" fill="rgba(15,22,34,.94)" stroke="${primary}" stroke-width="4"/><path d="M225 520h310M265 560h250" stroke="${secondary}" stroke-width="5"/>`,
    admiral: `<path d="M286 295c-88 92-118 245-94 415h376c24-170-6-323-94-415z" fill="rgba(35,46,64,.94)" stroke="${primary}" stroke-width="4"/><path d="M230 250h300l-70-70H300z" fill="${secondary}" opacity=".75"/>`
  };
  const body = `
    <rect width="800" height="1000" fill="#070913"/>
    <radialGradient id="cg" cx="50%" cy="32%" r="68%">
      <stop offset="0" stop-color="${primary}" stop-opacity=".38"/>
      <stop offset=".48" stop-color="${secondary}" stop-opacity=".18"/>
      <stop offset="1" stop-color="#070913"/>
    </radialGradient>
    <rect width="800" height="1000" fill="url(#cg)"/>
    <rect width="800" height="1000" fill="url(#grid)" opacity=".36"/>
    ${stars(58, 800, 1000)}
    <ellipse cx="400" cy="860" rx="220" ry="54" fill="${primary}" opacity=".14" filter="url(#glow)"/>
    ${silhouette[mode]}
    <circle cx="380" cy="215" r="58" fill="rgba(242,247,255,.88)" stroke="${primary}" stroke-width="4"/>
    <path d="M320 210c38-72 100-72 138 0" fill="none" stroke="${secondary}" stroke-width="12" stroke-linecap="round"/>
    <path d="M255 790h250" stroke="${primary}" stroke-width="4" opacity=".65"/>
  `;
  return svg(800, 1000, body);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await write("hero-main.svg", hero());
  await Promise.all(
    factions.map(([id, primary, secondary, mode]) =>
      write(`faction-${id}.svg`, factionArt(id, primary, secondary, mode))
    )
  );
  await Promise.all(
    timeline.map(([year, mode, primary, secondary]) =>
      write(`timeline-${year}.svg`, timelineArt(year, mode, primary, secondary))
    )
  );
  await Promise.all(
    characters.map(([id, primary, secondary, mode]) =>
      write(`character-${id}.svg`, characterArt(id, primary, secondary, mode))
    )
  );
}

await main();
