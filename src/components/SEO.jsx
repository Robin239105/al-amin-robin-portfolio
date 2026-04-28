import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogImage }) => {
  const siteName = "Al Amin Robin";
  const defaultDescription = "Premium Full Stack Website Developer specializing in Restaurant & Hospitality sites for USA-based businesses. Expert in Austin, Charlotte, Nashville, and Phoenix.";
  const defaultKeywords = "Full Stack Developer Restaurant Website, Custom Restaurant Web Design USA, Austin Web Developer, Charlotte NC Web Design, Nashville Website Expert, Phoenix AZ Full Stack, Premium WordPress Restaurant Theme, React Developer for Hospitality";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{`${title} | ${siteName} — Expert Full Stack Developer`}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || "/media/og-main.png"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || "/media/og-main.png"} />

      {/* Geo-Targeting Metadata (Optional but helpful for local SEO) */}
      <meta name="geo.region" content="US-TX, US-NC, US-TN, US-AZ" />
    </Helmet>
  );
};

export default SEO;
