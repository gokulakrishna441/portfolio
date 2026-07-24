import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Gokula Krishna A | MERN Stack Developer',
  description = 'Portfolio of Gokula Krishna A — MERN Stack Developer building full-stack apps, dashboards, and ERP solutions.',
  path = '/',
}) {
  const fullTitle = title.includes('Gokula') ? title : `${title} | Gokula Krishna A`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={path} />
    </Helmet>
  );
}
