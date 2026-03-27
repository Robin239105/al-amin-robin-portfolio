const db = require('./db');

const projects = [
  { title: 'Araw Supermarket', img: '/media/screencapture-arawsupermarket-gr-2025-12-09-16_58_26-scaled-e1765279408154.png', link: 'https://arawsupermarket.gr' },
  { title: 'Baxter & Frost', img: '/media/screencapture-baxterandfrost-2025-09-28-01_16_43-scaled.jpg', link: 'https://baxterandfrost.com/' },
  { title: 'Bellocorp', img: '/media/screencapture-bellocorp-ca-2023-04-08-20_55_42.png', link: 'https://bellocorp.ca/' },
  { title: 'Best Food Recipe', img: '/media/screencapture-bestfoodrecipe-2025-09-28-00_35_40-scaled.jpg', link: 'https://bestfoodrecipe.com/' },
  { title: 'Coco Bakery', img: '/media/screencapture-cocobakery-sa-2024-05-20-18_16_23.png', link: 'https://cocobakery.sa' },
  { title: 'Crypto White Label', img: '/media/screencapture-cryptowhitelabel-co-uk-2025-10-30-20_32_06-scaled.png', link: 'https://cryptowhitelabel.co.uk' },
  { title: 'Empa World', img: '/media/screencapture-empaworld-nl-2025-09-28-00_56_27-scaled.jpg', link: 'https://www.empaworld.nl/' },
  { title: 'Fintech One', img: '/media/screencapture-fintechone-co-2023-06-28-23_44_50-1.png', link: 'https://fintechone.co/' },
  { title: 'FL Farmacy', img: '/media/screencapture-flfarmacy-2025-12-09-17_33_16-scaled.png', link: 'https://flfarmacy.com' },
  { title: 'FMCG Pay', img: '/media/screencapture-fmcgpay-2025-09-27-07_05_21.jpg', link: 'https://fmcgpay.com/' },
  { title: 'German Visa Center', img: '/media/screencapture-germanvisacenter-2024-05-20-18_31_25.png', link: 'https://germanvisacenter.com' },
  { title: 'Hostious', img: '/media/screencapture-hostious-dk-2025-09-27-07_05_57-2-1-scaled.png', link: 'https://hostious.dk/' },
  { title: 'ICO America', img: '/media/screencapture-ico-america-2026-01-25-20_29_07-scaled.png', link: 'https://ico-america.com/' },
  { title: 'Jonny Winter', img: '/media/screencapture-jonnywinter-au-2024-08-28-02_54_23-scaled.jpg', link: 'https://jonnywinter.com.au' },
  { title: 'Lodge Marlborough', img: '/media/screencapture-lodgesmalbrough-2026-01-26-21_37_17-scaled.png', link: 'https://lodgesmalbrough.com' },
  { title: 'London Property', img: '/media/screencapture-london-property-devrobin-online-2023-06-28-23_38_27-1.png', link: 'https://www.london-property-finance.com/' },
  { title: 'Mad Over Mangoes', img: '/media/screencapture-madovermangoes-in-2023-04-08-04_28_00.png', link: 'https://madovermangoes.in' },
  { title: 'Mrs Garlic', img: '/media/screencapture-mrsgarlic-2025-09-28-01_04_23-scaled.jpg', link: 'https://mrsgarlic.com/' },
  { title: 'Nao Sushi', img: '/media/screencapture-naosushi-dk-2024-05-20-19_28_05.png', link: 'https://www.naosushi.dk/' },
  { title: 'North Brisbane Neurology', img: '/media/screencapture-northbrisbaneneurology-au-2024-05-20-18_24_29.png', link: 'https://northbrisbaneneurology.com.au/' },
  { title: 'Ovest KaDeWe', img: '/media/screencapture-ovest-kadewe-de-2026-01-22-22_17_58-scaled.png', link: 'https://ovest-kadewe.de' },
  { title: 'Party Mania', img: '/media/screencapture-partymania-usa-2023-06-28-23_43_26-1.png', link: 'https://partymania.usa' },
  { title: 'Patae Queso Grill', img: '/media/screencapture-pataequesogrill-2026-01-25-20_57_18-scaled.png', link: 'https://pataequesogrill.com/' },
  { title: 'Philipay UK', img: '/media/screencapture-philipay-co-uk-2025-09-20-04_17_33-1.jpg', link: 'https://philipay.co.uk' },
  { title: 'Property Finance', img: '/media/screencapture-propertyfinancechoices-2025-09-28-00_45_30-scaled.jpg', link: 'https://propertyfinancechoices.com/' },
  { title: 'Reflux & Swallowing', img: '/media/screencapture-refluxandswallowingcenter-au-2023-06-28-23_58_15.png', link: 'https://refluxandswallowingcenter.com.au' },
  { title: 'RGI Foods', img: '/media/screencapture-rgifoods-2025-09-28-00_24_17-1-scaled.jpg', link: 'https://rgifoods.com/' },
  { title: 'Roam With Rove', img: '/media/screencapture-roamwithrove-2025-09-28-05_17_19-scaled.jpg', link: 'https://roamwithrove.com' },
  { title: 'Rockview Group', img: '/media/screencapture-rockviewgroupe-2026-01-25-22_11_38-scaled.png', link: 'https://rockviewgroupe.com/' },
  { title: 'Shedsh', img: '/media/screencapture-shedsh-2025-09-20-04_24_36.jpg', link: 'https://shedsh.com' },
  { title: 'Soirée By MC', img: '/media/screencapture-soireebymc-2025-10-23-17_52_24-scaled.jpg', link: 'https://soireebymc.com' },
  { title: 'Sri Lanka Lifestyle', img: '/media/screencapture-srilanka-lifestyle-2023-06-28-23_35_03-1.png', link: 'https://srilanka.lifestyle' },
  { title: 'Sterling to USDT', img: '/media/screencapture-sterlingtousdt-2025-09-28-01_20_33-scaled.jpg', link: 'https://sterlingtousdt.com/' },
  { title: 'Strella PA', img: '/media/screencapture-strellapa-2025-09-28-00_11_53-scaled.jpg', link: 'https://strellapa.com/' },
  { title: 'The Protein Pastry', img: '/media/screencapture-theproteinpastry-2025-09-28-00_32_01-scaled.jpg', link: 'https://theproteinpastry.com/' },
  { title: 'USDT Payments', img: '/media/screencapture-usdtpayments-co-uk-2025-09-20-04_22_05.jpg', link: 'https://usdtpayments.co.uk' },
  { title: 'Venusia', img: '/media/screencapture-venusia-au-2024-05-20-18_18_42.png', link: 'https://www.venusia.com.au/' },
  { title: 'Visit LFG', img: '/media/screencapture-visitlfg-2025-09-27-07_27_20-2-scaled.png', link: 'https://visitlfg.com/' },
  { title: 'Vista Forge Design', img: '/media/screencapture-vistaforgedesign-au-2025-09-28-05_18_57-scaled.jpg', link: 'https://vistaforgedesign.com.au/' },
  { title: 'Watermark Painting', img: '/media/screencapture-watermarkpainting-au-2024-08-28-02_49_48-scaled.jpg', link: 'https://watermarkpainting.com.au' },
];

const insertProject = db.prepare(
  'INSERT INTO projects (title, imageUrl, liveUrl, category, order_index) VALUES (?, ?, ?, ?, ?)'
);

db.transaction(() => {
  projects.forEach((p, idx) => {
    insertProject.run(p.title, p.img, p.link, 'Website', idx);
  });
})();

const skills = [
  { name: 'Architecture', icon: 'Home' },
  { name: '3D Visualization', icon: 'Layers' },
  { name: 'Interior Design', icon: 'Layout' },
  { name: 'UI/UX Design', icon: 'Figma' },
  { name: 'Web Development', icon: 'Code' },
  { name: 'SEO Optimization', icon: 'Search' }
];

const insertSkill = db.prepare('INSERT INTO skills (name, icon, category, order_index) VALUES (?, ?, ?, ?)');
db.transaction(() => {
  skills.forEach((s, idx) => {
    insertSkill.run(s.name, s.icon, 'Core', idx);
  });
})();

const services = [
  { title: 'Architectural Visualization', description: 'Photo-realistic 3D rendering and cinematic walkthroughs.', icon: 'Camera' },
  { title: 'Premium Web Design', description: 'Ultra-luxurious portfolios and business websites.', icon: 'Palette' },
  { title: 'Full-Stack Development', description: 'Robust backend systems with custom admin dashboards.', icon: 'Server' }
];

const insertService = db.prepare('INSERT INTO services (title, description, icon, order_index) VALUES (?, ?, ?, ?)');
db.transaction(() => {
  services.forEach((s, idx) => {
    insertService.run(s.title, s.description, s.icon, idx);
  });
})();

console.log('Database seeded with projects, skills, and services!');
process.exit(0);


