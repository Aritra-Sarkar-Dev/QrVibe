/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../utils/config.ts';

export const LocalBusinessSchema: React.FC = () => {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'QRVibe Global QR Studio',
    alternateName: 'QR Vibe',
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og-image.png`,
    description: 'Free online QR code generator and customization studio for local businesses, creators, cafes, and marketers.',
    priceRange: 'Free',
    currenciesAccepted: 'USD',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Free QR Code Generation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website URL QR Code Generation',
            description: 'Free high-resolution website link QR code with logo & gradient support.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WiFi QR Code Maker',
            description: 'Instant guest WiFi connection QR code generator.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'vCard Digital Business Card QR',
            description: 'Instant contact sharing QR code.',
          },
        },
      ],
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(localBusinessData)}</script>
    </Helmet>
  );
};
