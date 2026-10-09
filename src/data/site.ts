export const siteUrl = 'https://mansitpltd.co.uk';

export const company = {
  legalName: 'MANSI TP LTD',
  brandName: 'MANSI TP LTD',
  number: '16864095',
  status: 'Active',
  type: 'Private Limited Company',
  incorporated: '18 November 2025',
  incorporatedISO: '2025-11-18',
  tagline: 'Fruit and vegetable wholesale.',
  email: 'mansitp90@gmail.com',
  phone: '07798804181',
  phoneDisplay: '07798 804181',
  phoneHref: 'tel:+447798804181',
  activity: {
    code: '46310',
    name: 'Wholesale of fruit and vegetables',
  },
  address: {
    line1: '71 Sandhurst Drive',
    locality: 'Ilford',
    region: 'England',
    postcode: 'IG3 9DD',
    countryName: 'United Kingdom',
    countryCode: 'GB',
  },
} as const;

export const seo = {
  title: 'MANSI TP LTD | Fruit & Vegetable Wholesale',
  description:
    'MANSI TP LTD is a UK private limited company operating in the wholesale of fruit and vegetables.',
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Produce', href: '/#produce' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const enquiryLink = { label: 'Business Enquiry', href: '/#contact' } as const;

export const footerLinks = [
  ...navLinks,
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;

export function addressLines() {
  const { line1, locality, region, postcode } = company.address;
  return [line1, locality, region, postcode];
}

export function formattedAddress(separator = ', ') {
  return addressLines().join(separator);
}

export function canonicalUrl(pathname: string) {
  if (pathname === '/') return `${siteUrl}/`;
  return `${siteUrl}${pathname.replace(/\/$/, '')}`;
}

export function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organisation`,
        name: company.legalName,
        legalName: company.legalName,
        url: `${siteUrl}/`,
        description: seo.description,
        foundingDate: company.incorporatedISO,
        identifier: {
          '@type': 'PropertyValue',
          name: 'Company Number',
          value: company.number,
        },
        email: company.email,
        telephone: '+447798804181',
        contactPoint: {
          '@type': 'ContactPoint',
          email: company.email,
          telephone: '+447798804181',
          contactType: 'customer service',
          availableLanguage: 'English',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.line1,
          addressLocality: company.address.locality,
          addressRegion: company.address.region,
          postalCode: company.address.postcode,
          addressCountry: company.address.countryCode,
        },
        knowsAbout: [company.activity.name, company.activity.code],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: company.legalName,
        description: seo.description,
        publisher: {
          '@id': `${siteUrl}/#organisation`,
        },
        inLanguage: 'en-GB',
      },
    ],
  };
}
