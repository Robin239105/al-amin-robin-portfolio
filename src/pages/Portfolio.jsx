import { ScrollReveal } from '../components/ui/Animations';
import './Portfolio.css';

const projects = [
  { title: 'Soiree By M&C', imageUrl: '/media/FireShot Capture 006 - Soiree By M&C – An Event Company - soireebymc.com.webp', liveUrl: 'https://soireebymc.com/' },
  { title: 'Marler Design', imageUrl: '/media/FireShot Capture 005 - Marler Designs - marlerdesigns.com.webp', liveUrl: 'https://marlerdesigns.com/' },
  { title: 'Pellopay', imageUrl: '/media/FireShot Capture 004 - Pellopay- Best Business Funding In UK - pellopay.io.webp', liveUrl: 'https://pellopay.io/' },
  { title: 'Augusta Das Eis', imageUrl: '/media/FireShot Capture 003 - Augusta Daseis - augustadaseis.com.webp', liveUrl: 'https://augustadaseis.com/' },
  { title: 'Cali Modern Design and Construction', imageUrl: '/media/FireShot Capture 002 - Calimoderndesign - calimoderndesign2487.live-website.com.webp', liveUrl: 'https://calimoderndesign2487.live-website.com' },
  { title: 'Pro Power', imageUrl: '/media/FireShot Capture 001 - Pro Power – Professional Trash Bin Cleaning_ - darkturquoise-camel-624860.hostingersite.com.webp', liveUrl: 'https://darkturquoise-camel-624860.hostingersite.com/' },
  { title: 'Araw Supermarket', imageUrl: '/media/screencapture-arawsupermarket-gr-2025-12-09-16_58_26-scaled-e1765279408154.webp', liveUrl: 'https://arawsupermarket.gr' },
  { title: 'Baxter & Frost', imageUrl: '/media/screencapture-baxterandfrost-2025-09-28-01_16_43-scaled.webp', liveUrl: 'https://baxterandfrost.com/' },
  { title: 'Bellocorp', imageUrl: '/media/screencapture-bellocorp-ca-2023-04-08-20_55_42.webp', liveUrl: 'https://bellocorp.ca/' },
  { title: 'Best Food Recipe', imageUrl: '/media/screencapture-bestfoodrecipe-2025-09-28-00_35_40-scaled.webp', liveUrl: 'https://bestfoodrecipe.com/' },
  { title: 'Coco Bakery', imageUrl: '/media/screencapture-cocobakery-sa-2024-05-20-18_16_23.webp', liveUrl: null },
  { title: 'Crypto White Label', imageUrl: '/media/screencapture-cryptowhitelabel-co-uk-2025-10-30-20_32_06-scaled.webp', liveUrl: 'https://cryptowhitelabel.co.uk' },
  { title: 'Empa World', imageUrl: '/media/screencapture-empaworld-nl-2025-09-28-00_56_27-scaled.webp', liveUrl: 'https://www.empaworld.nl/' },
  { title: 'FL Farmacy', imageUrl: '/media/screencapture-flfarmacy-2025-12-09-17_33_16-scaled.webp', liveUrl: 'https://flfarmacy.com' },
  { title: 'FMCG Pay', imageUrl: '/media/screencapture-fmcgpay-2025-09-27-07_05_21.webp', liveUrl: 'https://fmcgpay.com/' },
  { title: 'German Visa Center', imageUrl: '/media/screencapture-germanvisacenter-2024-05-20-18_31_25.webp', liveUrl: null },
  { title: 'Hostious', imageUrl: '/media/screencapture-hostious-dk-2025-09-27-07_05_57-2-1-scaled.webp', liveUrl: 'https://hostious.dk/' },
  { title: 'ICO America', imageUrl: '/media/screencapture-ico-america-2026-01-25-20_29_07-scaled.webp', liveUrl: 'https://ico-america.com/' },
  { title: 'Jonny Winter', imageUrl: '/media/screencapture-jonnywinter-au-2024-08-28-02_54_23-scaled.webp', liveUrl: 'https://jonnywinter.com.au' },
  { title: 'Lodge Marlborough', imageUrl: '/media/screencapture-lodgesmalbrough-2026-01-26-21_37_17-scaled.webp', liveUrl: 'https://lodgesmalbrough.com' },
  { title: 'London Property', imageUrl: '/media/screencapture-london-property-devrobin-online-2023-06-28-23_38_27-1.webp', liveUrl: 'https://www.london-property-finance.com/' },
  { title: 'Mrs Garlic', imageUrl: '/media/screencapture-mrsgarlic-2025-09-28-01_04_23-scaled.webp', liveUrl: 'https://mrsgarlic.com/' },
  { title: 'Nao Sushi', imageUrl: '/media/screencapture-naosushi-dk-2024-05-20-19_28_05.webp', liveUrl: 'https://www.naosushi.dk/' },
  { title: 'North Brisbane Neurology', imageUrl: '/media/screencapture-northbrisbaneneurology-au-2024-05-20-18_24_29.webp', liveUrl: 'https://northbrisbaneneurology.com.au/' },
  { title: 'Ovest KaDeWe', imageUrl: '/media/screencapture-ovest-kadewe-de-2026-01-22-22_17_58-scaled.webp', liveUrl: 'https://ovest-kadewe.de' },
  { title: 'Patae Queso Grill', imageUrl: '/media/screencapture-pataequesogrill-2026-01-25-20_57_18-scaled.webp', liveUrl: 'https://pataequesogrill.com/' },
  { title: 'Philipay UK', imageUrl: '/media/screencapture-philipay-co-uk-2025-09-20-04_17_33-1.webp', liveUrl: 'https://philipay.co.uk' },
  { title: 'Property Finance', imageUrl: '/media/screencapture-propertyfinancechoices-2025-09-28-00_45_30-scaled.webp', liveUrl: 'https://propertyfinancechoices.com/' },
  { title: 'RGI Foods', imageUrl: '/media/screencapture-rgifoods-2025-09-28-00_24_17-1-scaled.webp', liveUrl: 'https://rgifoods.com/' },
  { title: 'Roam With Rove', imageUrl: '/media/screencapture-roamwithrove-2025-09-28-05_17_19-scaled.webp', liveUrl: null },
  { title: 'Rockview Group', imageUrl: '/media/screencapture-rockviewgroupe-2026-01-25-22_11_38-scaled.webp', liveUrl: 'https://rockviewgroupe.com/' },
  { title: 'Shedsh', imageUrl: '/media/screencapture-shedsh-2025-09-20-04_24_36.webp', liveUrl: 'https://shedsh.com' },
  { title: 'Soirée By MC', imageUrl: '/media/screencapture-soireebymc-2025-10-23-17_52_24-scaled.webp', liveUrl: 'https://soireebymc.com' },
  { title: 'Sri Lanka Lifestyle', imageUrl: '/media/screencapture-srilanka-lifestyle-2023-06-28-23_35_03-1.webp', liveUrl: null },
  { title: 'Sterling to USDT', imageUrl: '/media/screencapture-sterlingtousdt-2025-09-28-01_20_33-scaled.webp', liveUrl: 'https://sterlingtousdt.com/' },
  { title: 'Strella PA', imageUrl: '/media/screencapture-strellapa-2025-09-28-00_11_53-scaled.webp', liveUrl: 'https://strellapa.com/' },
  { title: 'The Protein Pastry', imageUrl: '/media/screencapture-theproteinpastry-2025-09-28-00_32_01-scaled.webp', liveUrl: 'https://theproteinpastry.com/' },
  { title: 'USDT Payments', imageUrl: '/media/screencapture-usdtpayments-co-uk-2025-09-20-04_22_05.webp', liveUrl: 'https://usdtpayments.co.uk' },
  { title: 'Venusia', imageUrl: '/media/screencapture-venusia-au-2024-05-20-18_18_42.webp', liveUrl: 'https://www.venusia.com.au/' },
  { title: 'Visit LFG', imageUrl: '/media/screencapture-visitlfg-2025-09-27-07_27_20-2-scaled.webp', liveUrl: 'https://visitlfg.com/' },
  { title: 'Vista Forge Design', imageUrl: '/media/screencapture-vistaforgedesign-au-2025-09-28-05_18_57-scaled.webp', liveUrl: 'https://vistaforgedesign.com.au/' },
  { title: 'Watermark Painting', imageUrl: '/media/screencapture-watermarkpainting-au-2024-08-28-02_49_48-scaled.webp', liveUrl: 'https://watermarkpainting.com.au' },
];

export default function Portfolio() {
  return (
    <div className="page-container portfolio-page">
      {/* Ambient Orbs */}
      <div className="portfolio-orb portfolio-orb-1"></div>
      <div className="portfolio-orb portfolio-orb-2"></div>

      {/* Header */}
      <section className="portfolio-hero-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <p className="portfolio-eyebrow gold-text">WEBSITE SHOWCASE</p>
            <h1 className="portfolio-hero-title">
              Selected <span className="gold-text">Masterpieces.</span>
            </h1>
            <p className="portfolio-hero-sub">
              A curated collection of premium websites crafted for clients worldwide. Click any project to visit the live site.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* MacBook Mockup Grid */}
      <section className="portfolio-showcase section-padding">
        <div className="container">
          <div className="portfolio-grid">
            {projects.map((project, index) => {
              const CardTag = project.liveUrl ? 'a' : 'div';
              const cardProps = project.liveUrl ? {
                href: project.liveUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              } : {};

              return (
                <CardTag
                  {...cardProps}
                  className="portfolio-mockup-card"
                  key={index}
                  style={{ 
                    animationDelay: `${index * 0.04}s`,
                    cursor: project.liveUrl ? 'pointer' : 'default'
                  }}
                >
                  <div className="macbook-mockup">
                    <div className="macbook-screen">
                      <div className="macbook-camera"></div>
                      <div className="macbook-display">
                        <img
                          src={project.imageUrl}
                          alt={`${project.title} full page`}
                          className="macbook-content"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="macbook-screen-blur-overlay"></div>
                      </div>
                    </div>
                    <div className="macbook-base"></div>
                  </div>
                  <h2 className="portfolio-mockup-title text-gradient">{project.title}</h2>
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


