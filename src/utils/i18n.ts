import { Language, QRType } from '../types/index.ts';

export interface Translations {
  appName: string;
  tagline: string;
  badge: string;
  nav: {
    features: string;
    generator: string;
    bulk: string;
    pricing: string;
    faq: string;
    history: string;
    goPro: string;
    installApp: string;
    installOnIos: string;
  };
  hero: {
    pill: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: {
      free: string;
      highRes: string;
      scans: string;
    };
  };
  types: Record<QRType, { label: string; desc: string }>;
  forms: {
    emptyPrompt: string;
    required: string;
    invalidUrl: string;
    tooLongWarning: string;
    chars: string;
    // Image form
    dropImage: string;
    chooseFile: string;
    useCamera: string;
    pasteClipboard: string;
    uploading: string;
    uploadSuccess: string;
    uploadFailed: string;
    retry: string;
    compressing: string;
    hostedNotice: string;
    // Common fields
    textLabel: string;
    textPlaceholder: string;
    urlLabel: string;
    urlPlaceholder: string;
    wifiSsid: string;
    wifiPass: string;
    wifiSec: string;
    wifiHidden: string;
    contactName: string;
    contactLast: string;
    contactOrg: string;
    contactTitle: string;
    contactPhone: string;
    contactEmail: string;
    contactWeb: string;
    contactAddress: string;
    waPhone: string;
    waMessage: string;
    socialUser: string;
    socialSelect: string;
    emailTo: string;
    emailSubject: string;
    emailBody: string;
    smsPhone: string;
    smsMessage: string;
    phoneNum: string;
    locLat: string;
    locLng: string;
    useMyLocation: string;
    calTitle: string;
    calStart: string;
    calEnd: string;
    calLocation: string;
    payType: string;
    payUpi: string;
    payUpiName: string;
    payAmount: string;
    payNote: string;
    payPaypal: string;
    payCustom: string;
    appType: string;
    appId: string;
  };
  studio: {
    title: string;
    generatorTitle: string;
    generatorSubtitle: string;
    tabContent: string;
    tabStyle: string;
    proceedToStyle: string;
    presets: string;
    dotStyle: string;
    cornerSquare: string;
    cornerDot: string;
    colors: string;
    solidColor: string;
    gradient: string;
    color1: string;
    color2: string;
    background: string;
    transparent: string;
    solid: string;
    centerLogo: string;
    uploadLogo: string;
    removeLogo: string;
    logoSize: string;
    errorCorrection: string;
    ecNotice: string;
    size: string;
    contrastWarning: string;
    dots: {
      rounded: string;
      dots: string;
      classy: string;
      classyRounded: string;
      square: string;
      extraRounded: string;
    };
    corners: {
      dot: string;
      square: string;
      extraRounded: string;
    };
  };
  preview: {
    title: string;
    liveIndicator: string;
    emptyTitle: string;
    emptyDesc: string;
    downloadPng: string;
    downloadSvg: string;
    downloadJpeg: string;
    downloadPdf: string;
    copyImage: string;
    copied: string;
    share: string;
    shared: string;
    shareError: string;
    watchAdHd: string;
    watermarkToggle: string;
    watermarkFree: string;
  };
  bulk: {
    title: string;
    subtitle: string;
    uploadCsv: string;
    csvFormat: string;
    freeLimitNotice: string;
    generateBtn: string;
    downloadZip: string;
    generating: string;
    sampleDownload: string;
    totalRows: string;
    emptyList: string;
  };
  history: {
    title: string;
    empty: string;
    emptyDesc: string;
    reopen: string;
    delete: string;
    clearAll: string;
    favoritesOnly: string;
    searchPlaceholder: string;
  };
  monetization: {
    adSponsored: string;
    watchAdTitle: string;
    watchAdDesc: string;
    adPlaying: string;
    secondsRemaining: string;
    unlockedHd: string;
    freeCard: {
      title: string;
      price: string;
      period: string;
      desc: string;
      features: string[];
      cta: string;
    };
    proCard: {
      badge: string;
      title: string;
      price: string;
      period: string;
      desc: string;
      features: string[];
      cta: string;
    };
    waitlistTitle: string;
    waitlistDesc: string;
    emailPlaceholder: string;
    joinWaitlist: string;
    joinedSuccess: string;
  };
  features: {
    title: string;
    subtitle: string;
    cards: {
      presetsTitle: string;
      presetsDesc: string;
      bulkTitle: string;
      bulkDesc: string;
      imgbbTitle: string;
      imgbbDesc: string;
      vectorTitle: string;
      vectorDesc: string;
      offlineTitle: string;
      offlineDesc: string;
      scannableTitle: string;
      scannableDesc: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    contact: string;
    imgNotice: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'QRVibe',
    tagline: 'Gen Z Aesthetic QR Studio',
    badge: '100% Free · No Login Required',
    nav: {
      features: 'Features',
      generator: 'Generator',
      bulk: 'Bulk QR',
      pricing: 'Pricing',
      faq: 'FAQ',
      history: 'History',
      goPro: 'Go Pro',
      installApp: 'Install App',
      installOnIos: 'Install on iOS',
    },
    hero: {
      pill: 'The #1 QR Generator for Creators',
      title1: 'Make QR codes that actually',
      titleHighlight: 'match your vibe',
      title2: 'instantly.',
      subtitle:
        'Ditch boring black-and-white grids. Create gorgeous gradient QR codes with custom dots, logos, presets, and 1024px exports in seconds.',
      primaryCta: 'Create Free QR',
      secondaryCta: 'Explore Presets',
      stats: {
        free: 'Free Forever',
        highRes: '2048px Ultra-HD',
        scans: 'Unlimited Scans',
      },
    },
    types: {
      image: { label: 'Image', desc: 'Host image & share via QR' },
      text: { label: 'Text', desc: 'Plain text or notes' },
      link: { label: 'Link', desc: 'Website or landing page' },
      wifi: { label: 'WiFi', desc: 'Scan to connect instantly' },
      contact: { label: 'Contact', desc: 'vCard 3.0 digital business card' },
      whatsapp: { label: 'WhatsApp', desc: 'Chat with pre-filled text' },
      social: { label: 'Social', desc: 'Insta, TikTok, X, YouTube' },
      email: { label: 'Email', desc: 'Pre-filled mailto address' },
      sms: { label: 'SMS', desc: 'Send text with one tap' },
      phone: { label: 'Phone', desc: 'Direct phone call dialer' },
      location: { label: 'Location', desc: 'GPS pinpoint or Google Maps' },
      calendar: { label: 'Event', desc: 'iCal calendar invite' },
      payment: { label: 'Payment', desc: 'UPI, PayPal, bKash/Nagad' },
      applink: { label: 'App Link', desc: 'App Store or Google Play' },
      bulk: { label: 'Bulk CSV', desc: 'Generate multiple QR codes' },
    },
    forms: {
      emptyPrompt: 'Enter your details above to bring your QR to life',
      required: 'This field is required',
      invalidUrl: 'Please enter a valid web URL',
      tooLongWarning: 'Warning: Very long text may be slower for some phones to scan',
      chars: 'characters',
      dropImage: 'Drag & drop an image, paste, or select',
      chooseFile: 'Choose Image File',
      useCamera: 'Open Camera',
      pasteClipboard: 'Paste Image',
      uploading: 'Uploading to cloud...',
      uploadSuccess: 'Image uploaded successfully!',
      uploadFailed: 'Upload failed',
      retry: 'Retry Upload',
      compressing: 'Optimizing image client-side...',
      hostedNotice: 'Images are hosted securely on ImgBB and accessible to anyone scanning.',
      textLabel: 'Text Content',
      textPlaceholder: 'Write anything here... lyrics, secret notes, discount codes',
      urlLabel: 'Destination Website URL',
      urlPlaceholder: 'yourbrand.com or https://myportfolio.design',
      wifiSsid: 'Network Name (SSID)',
      wifiPass: 'Network Password',
      wifiSec: 'Security Type',
      wifiHidden: 'Hidden Network',
      contactName: 'First Name',
      contactLast: 'Last Name',
      contactOrg: 'Company / Organization',
      contactTitle: 'Job Title',
      contactPhone: 'Work Phone',
      contactEmail: 'Email Address',
      contactWeb: 'Website',
      contactAddress: 'Full Address',
      waPhone: 'WhatsApp Number (with country code)',
      waMessage: 'Prefilled Message (optional)',
      socialUser: 'Username or Handle',
      socialSelect: 'Choose Platform',
      emailTo: 'Recipient Email',
      emailSubject: 'Email Subject',
      emailBody: 'Email Message Body',
      smsPhone: 'Mobile Phone Number',
      smsMessage: 'Text Message Content',
      phoneNum: 'Phone Number (with country code)',
      locLat: 'Latitude',
      locLng: 'Longitude',
      useMyLocation: 'Use My Current GPS Location',
      calTitle: 'Event Name / Title',
      calStart: 'Start Date & Time',
      calEnd: 'End Date & Time',
      calLocation: 'Location or Venue',
      payType: 'Payment Method',
      payUpi: 'UPI ID / VPA (e.g. name@upi)',
      payUpiName: 'Payee / Merchant Name',
      payAmount: 'Amount (optional)',
      payNote: 'Payment Note / Description',
      payPaypal: 'PayPal.me Username',
      payCustom: 'Payment Link (bKash, Nagad, Stripe, etc.)',
      appType: 'Platform Store',
      appId: 'App ID or Package Name',
    },
    studio: {
      title: 'Vibe Studio',
      generatorTitle: 'Create Your Vibe QR',
      generatorSubtitle: 'Select a type, enter your details, and watch your stylized QR render in real time.',
      tabContent: '1. Content & Details',
      tabStyle: '2. Style & Colors',
      proceedToStyle: 'Proceed to Style & Presets →',
      presets: 'Trendy Presets',
      dotStyle: 'Dot Pattern',
      cornerSquare: 'Corner Frame',
      cornerDot: 'Corner Center',
      colors: 'Color Style',
      solidColor: 'Solid Color',
      gradient: 'Vibrant Gradient',
      color1: 'Start Color',
      color2: 'End Color',
      background: 'Background',
      transparent: 'Transparent Canvas',
      solid: 'Solid Color',
      centerLogo: 'Center Logo',
      uploadLogo: 'Upload Brand Logo',
      removeLogo: 'Remove',
      logoSize: 'Logo Scale',
      errorCorrection: 'Scan Reliability',
      ecNotice: 'Switched to High (H) reliability automatically for center logo scan clarity.',
      size: 'Canvas Resolution',
      contrastWarning: 'Low Contrast Warning: This color combo may be difficult for phone cameras to scan.',
      dots: {
        rounded: 'Rounded',
        dots: 'Dots',
        classy: 'Classy',
        classyRounded: 'Classy Rounded',
        square: 'Square',
        extraRounded: 'Super Round',
      },
      corners: {
        dot: 'Circle',
        square: 'Square',
        extraRounded: 'Squircle',
      },
    },
    preview: {
      title: 'Live QR Preview',
      liveIndicator: 'Live Updated',
      emptyTitle: 'No QR Code Yet',
      emptyDesc: 'Fill in the information on the left to watch your custom QR come to life.',
      downloadPng: 'Download PNG',
      downloadSvg: 'Vector SVG',
      downloadJpeg: 'Download JPEG',
      downloadPdf: 'Export PDF',
      copyImage: 'Copy Image',
      copied: 'Copied to Clipboard!',
      share: 'Share QR',
      shared: 'Shared successfully!',
      shareError: 'Web Share not supported on this browser. Link copied instead!',
      watchAdHd: 'Watch Ad for 2048px Ultra-HD',
      watermarkToggle: 'Include QRVibe watermark badge',
      watermarkFree: 'Watermark included on Free plan',
    },
    bulk: {
      title: 'Bulk QR Generator',
      subtitle: 'Upload a CSV spreadsheet and generate batches in one click.',
      uploadCsv: 'Upload CSV File',
      csvFormat: 'CSV format: One URL or text value per row (first 5 free).',
      freeLimitNotice: 'Free plan generates up to 5 QR codes. Pro unlocks 500 codes per batch.',
      generateBtn: 'Generate Batch',
      downloadZip: 'Download All as ZIP',
      generating: 'Generating ZIP archive...',
      sampleDownload: 'Download Sample CSV',
      totalRows: 'Rows detected',
      emptyList: 'No CSV data uploaded yet.',
    },
    history: {
      title: 'Saved QR Codes',
      empty: 'No QR codes saved yet',
      emptyDesc: 'Any QR you generate is automatically saved to your browser so you never lose it.',
      reopen: 'Reopen & Edit',
      delete: 'Delete',
      clearAll: 'Clear History',
      favoritesOnly: 'Favorites Only',
      searchPlaceholder: 'Search recent QRs...',
    },
    monetization: {
      adSponsored: 'Sponsored Advertisement',
      watchAdTitle: 'Watch Short Sponsor to Unlock Ultra-HD',
      watchAdDesc: 'Support QRVibe and download a lossless 2048x2048 printable QR code instantly.',
      adPlaying: 'Sponsor Message Playing...',
      secondsRemaining: 'seconds left',
      unlockedHd: 'Ultra-HD 2048px Unlocked!',
      freeCard: {
        title: 'Free Forever',
        price: '$0',
        period: 'free forever',
        desc: 'Everything you need for personal, student, and casual creator use.',
        features: [
          'Unlimited QR code generations',
          'PNG, SVG & JPEG high-res downloads',
          '8 Trendy aesthetic presets',
          'ImgBB cloud image hosting',
          '5 Bulk QR codes per batch',
          'Standard scan reliability',
        ],
        cta: 'Current Plan',
      },
      proCard: {
        badge: 'Most Popular',
        title: 'Creator Pro',
        price: '$4.99',
        period: 'per month',
        desc: 'For brands, influencers, businesses, and agency designers.',
        features: [
          'No watermark on any export',
          'Up to 500 Bulk QR codes per batch',
          'Lossless 4K print-ready vector PDF',
          'Dynamic editable destination URLs',
          'Real-time scan counter & geo analytics',
          'Priority VIP customer support',
        ],
        cta: 'Upgrade to Pro',
      },
      waitlistTitle: 'Creator Pro is Coming Soon!',
      waitlistDesc: 'Be the first to get 50% off launch pricing plus early access to dynamic QR codes.',
      emailPlaceholder: 'Enter your email address',
      joinWaitlist: 'Join VIP Waitlist',
      joinedSuccess: 'You are on the list! We will email your discount voucher shortly.',
    },
    features: {
      title: 'Built Different for the Next Generation',
      subtitle: 'Everything standard QR generators charge for, made free and beautiful.',
      cards: {
        presetsTitle: '8 Signature Vibe Presets',
        presetsDesc: 'Cyberpunk, soft pastel, neon glow, and minimalist styles ready in one click.',
        bulkTitle: 'Batch CSV Generator',
        bulkDesc: 'Upload a simple CSV list and get an organized ZIP file with every code named.',
        imgbbTitle: 'Instant Cloud Image QRs',
        imgbbDesc: 'Drop any photo, artwork, or meme up to 32MB and get a direct cloud-linked QR.',
        vectorTitle: 'Crisp Vector SVG & PDF',
        vectorDesc: 'Infinite scalability for t-shirts, posters, billboards, and merch printing.',
        offlineTitle: '100% Offline Capable PWA',
        offlineDesc: 'Install on your phone or desktop. Generate text, WiFi, and links without internet.',
        scannableTitle: 'Smart Contrast Guard',
        scannableDesc: 'Real-time WCAG contrast analyzer guarantees your stylized QR scans seamlessly.',
      },
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Three simple steps from thought to scannable aesthetic.',
      step1Title: '01. Pick & Paste',
      step1Desc: 'Select from 15 QR types—images, WiFi, social handles, payments, or links.',
      step2Title: '02. Style Your Vibe',
      step2Desc: 'Choose colors, gradients, squircle corners, dot styles, and add your brand logo.',
      step3Title: '03. Scan & Download',
      step3Desc: 'Download crystal-clear PNG, SVG, or printable PDF, or copy straight to clipboard.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about QRVibe.',
      items: [
        {
          q: 'Are the QR codes generated on QRVibe free forever?',
          a: 'Yes! All standard static QR codes generated on QRVibe are 100% free forever and never expire. They contain your payload directly with unlimited scans.',
        },
        {
          q: 'Can I use these QR codes for commercial projects and merchandise?',
          a: 'Absolutely. You have full commercial ownership of your generated QR codes for menus, packaging, billboards, merchandise, and business cards.',
        },
        {
          q: 'Where are uploaded images stored?',
          a: 'Images are hosted securely through the ImgBB cloud network via their public image hosting API, making them directly accessible via link when scanned.',
        },
        {
          q: 'Will my custom colors and gradients scan reliably?',
          a: 'Yes, as long as you maintain good contrast. QRVibe includes an automated contrast guard that alerts you if your color choices might be difficult for camera lenses to read.',
        },
        {
          q: 'Can I use QRVibe offline?',
          a: 'Yes! QRVibe is an installable Progressive Web App (PWA). Text, WiFi, contact, SMS, and link QR generators work completely offline inside your browser.',
        },
      ],
    },
    footer: {
      rights: 'All rights reserved. Made for creators worldwide.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact Support',
      imgNotice: 'Uploaded images are processed client-side and hosted via ImgBB public cloud services.',
    },
  },
  bn: {
    appName: 'কিউআরভাইব (QRVibe)',
    tagline: 'জেন জি নান্দনিক কিউআর কোড স্টুডিও',
    badge: 'সম্পূর্ণ ফ্রি · লগইন ছাড়াই ব্যবহার করুন',
    nav: {
      features: 'বৈশিষ্ট্যসমূহ',
      generator: 'জেনারেটর',
      bulk: 'বাল্ক কিউআর',
      pricing: 'মূল্যতালিকা',
      faq: 'প্রশ্নোত্তর',
      history: 'ইতিহাস',
      goPro: 'প্রো নিন',
      installApp: 'অ্যাপ ইনস্টল করুন',
      installOnIos: 'আইওএস-এ ইনস্টল',
    },
    hero: {
      pill: 'ক্রিয়েটরদের জন্য সেরা কিউআর জেনারেটর',
      title1: 'তৈরি করুন এমন কিউআর যা সত্যি আপনার',
      titleHighlight: 'ভাইবের সাথে মানায়',
      title2: 'মুহূর্তের মধ্যে।',
      subtitle:
        'বিরক্তিকর সাদাকালো কোড বাদ দিন। কাস্টম ডট, লোগো, গ্রেডিয়েন্ট ও ১০২৪ পিক্সেল হাই-রেজোলিউশন কিউআর কোড বানান নিমেষেই।',
      primaryCta: 'ফ্রি কিউআর তৈরি করুন',
      secondaryCta: 'প্রিসেট দেখুন',
      stats: {
        free: 'আজীবন ফ্রি',
        highRes: '২০৪৮ পিক্সেল আল্ট্রা-এইচডি',
        scans: 'আনলিমিটেড স্ক্যান',
      },
    },
    types: {
      image: { label: 'ছবি', desc: 'ছবি আপলোড ও শেয়ার' },
      text: { label: 'টেক্সট', desc: 'সাধারণ লেখা বা নোট' },
      link: { label: 'লিংক', desc: 'ওয়েবসাইট বা ল্যান্ডিং পেজ' },
      wifi: { label: 'ওয়াইফাই', desc: 'স্ক্যান করে সরাসরি সংযোগ' },
      contact: { label: 'যোগাযোগ', desc: 'ডিজিটাল ভি-কার্ড ৩.০' },
      whatsapp: { label: 'হোয়াটসঅ্যাপ', desc: 'বার্তা সহ সরাসরি চ্যাট' },
      social: { label: 'সোশ্যাল', desc: 'ইনস্টা, টিকটক, এক্স, ইউটিউব' },
      email: { label: 'ইমেইল', desc: 'রেডিমেড ইমেইল ড্রাফট' },
      sms: { label: 'এসএমএস', desc: 'এক ক্লিকে মেসেজ পাঠান' },
      phone: { label: 'ফোন কল', desc: 'সরাসরি ফোন ডায়ালার' },
      location: { label: 'লোকেশন', desc: 'জিপিএস বা গুগল ম্যাপস' },
      calendar: { label: 'ইভেন্ট', desc: 'ক্যালেন্ডার ইনভাইট' },
      payment: { label: 'পেমেন্ট', desc: 'ইউপিআই, পেপ্যাল, বিকাশ/নগদ' },
      applink: { label: 'অ্যাপ লিংক', desc: 'প্লে স্টোর বা অ্যাপ স্টোর' },
      bulk: { label: 'বাল্ক সিএসভি', desc: 'একসাথে একাধিক কিউআর' },
    },
    forms: {
      emptyPrompt: 'আপনার কিউআর কোড তৈরি করতে উপরের তথ্যগুলো পূরণ করুন',
      required: 'এই ঘরটি পূরণ করা আবশ্যক',
      invalidUrl: 'অনুগ্রহ করে একটি সঠিক ওয়েব লিংক দিন',
      tooLongWarning: 'সতর্কতা: খুব বড় টেক্সট স্ক্যান হতে সামান্য ধীর হতে পারে',
      chars: 'অক্ষর',
      dropImage: 'ছবি ড্র্যাগ ও ড্রপ করুন, পেস্ট করুন বা সিলেক্ট করুন',
      chooseFile: 'ছবি নির্বাচন করুন',
      useCamera: 'ক্যামেরা চালু করুন',
      pasteClipboard: 'ক্লিপবোর্ড থেকে পেস্ট',
      uploading: 'ক্লাউডে আপলোড হচ্ছে...',
      uploadSuccess: 'ছবি সফলভাবে আপলোড হয়েছে!',
      uploadFailed: 'আপলোড ব্যর্থ হয়েছে',
      retry: 'আবার চেষ্টা করুন',
      compressing: 'ছবি সাইজ অপ্টিমাইজ করা হচ্ছে...',
      hostedNotice: 'ছবিগুলো ImgBB-এর ক্লাউড সার্ভারে নিরাপদে সংরক্ষিত হয়।',
      textLabel: 'টেক্সট বা বার্তা',
      textPlaceholder: 'এখানে যা খুশি লিখুন... গান, গোপন বার্তা বা ডিসকাউন্ট কোড',
      urlLabel: 'ওয়েবসাইট লিংক',
      urlPlaceholder: 'yourbrand.com অথবা https://facebook.com',
      wifiSsid: 'নেটওয়ার্ক নাম (SSID)',
      wifiPass: 'পাসওয়ার্ড',
      wifiSec: 'সিকিউরিটি ধরন',
      wifiHidden: 'লুকানো নেটওয়ার্ক',
      contactName: 'নামের প্রথম অংশ',
      contactLast: 'নামের শেষ অংশ',
      contactOrg: 'প্রতিষ্ঠান বা কোম্পানি',
      contactTitle: 'পদবী',
      contactPhone: 'ফোন নম্বর',
      contactEmail: 'ইমেইল ঠিকানা',
      contactWeb: 'ওয়েবসাইট',
      contactAddress: 'ঠিকানা',
      waPhone: 'হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোড সহ)',
      waMessage: 'প্রিফিল্ড মেসেজ (ঐচ্ছিক)',
      socialUser: 'ইউজারনেম বা হ্যান্ডেল',
      socialSelect: 'প্ল্যাটফর্ম নির্বাচন করুন',
      emailTo: 'প্রাপকের ইমেইল',
      emailSubject: 'ইমেইলের বিষয়',
      emailBody: 'ইমেইলের মূল বক্তব্য',
      smsPhone: 'মোবাইল নম্বর',
      smsMessage: 'মেসেজ টেক্সট',
      phoneNum: 'ফোন নম্বর (কান্ট্রি কোড সহ)',
      locLat: 'অক্ষাংশ (Latitude)',
      locLng: 'দ্রাঘিমাংশ (Longitude)',
      useMyLocation: 'আমার বর্তমান জিপিএস লোকেশন নিন',
      calTitle: 'ইভেন্টের নাম',
      calStart: 'শুরুর সময় ও তারিখ',
      calEnd: 'শেষের সময় ও তারিখ',
      calLocation: 'স্থান বা ঠিকানা',
      payType: 'পেমেন্ট মাধ্যম',
      payUpi: 'ইউপিআই আইডি (যেমন name@upi)',
      payUpiName: 'ব্যক্তি বা প্রতিষ্ঠানের নাম',
      payAmount: 'টাকার পরিমাণ (ঐচ্ছিক)',
      payNote: 'পেমেন্ট বিবরণ',
      payPaypal: 'PayPal.me ইউজারনেম',
      payCustom: 'পেমেন্ট লিংক (বিকাশ, নগদ, স্ট্রাইপ ইত্যাদি)',
      appType: 'অ্যাপ স্টোর ধরন',
      appId: 'অ্যাপ আইডি বা প্যাকেজ নেম',
    },
    studio: {
      title: 'ভাইব স্টুডিও (কাস্টমাইজ)',
      generatorTitle: 'আপনার ভাইব কিউআর তৈরি করুন',
      generatorSubtitle: 'একটি ধরন নির্বাচন করুন, তথ্য লিখুন এবং সরাসরি লাইভ কিউআর দেখুন।',
      tabContent: '১. কনটেন্ট ও বিবরণ',
      tabStyle: '২. স্টাইল ও কালার',
      proceedToStyle: 'স্টাইল ও প্রিসেটে যান →',
      presets: 'ট্রেন্ডি প্রিসেট',
      dotStyle: 'ডট প্যাটার্ন',
      cornerSquare: 'কর্নার ফ্রেম',
      cornerDot: 'কর্নার সেন্টার',
      colors: 'কালার স্টাইল',
      solidColor: 'একক রঙ',
      gradient: 'ভাইব্রেন্ট গ্রেডিয়েন্ট',
      color1: 'প্রথম রঙ',
      color2: 'দ্বিতীয় রঙ',
      background: 'ব্যাকগ্রাউন্ড রঙ',
      transparent: 'স্বচ্ছ (ট্রান্সপারেন্ট)',
      solid: 'একক রঙ',
      centerLogo: 'সেন্টার লোগো',
      uploadLogo: 'লোগো আপলোড করুন',
      removeLogo: 'মুছুন',
      logoSize: 'লোগো আকার',
      errorCorrection: 'স্ক্যান নির্ভরযোগ্যতা',
      ecNotice: 'লোগোর স্পষ্টতার জন্য স্বয়ংক্রিয়ভাবে হাই (H) লেভেলে সেট করা হয়েছে।',
      size: 'ক্যানভাস সাইজ',
      contrastWarning: 'কম কনট্রাস্ট সতর্কতা: এই রঙ সমন্বয়টি ক্যামেরা দিয়ে স্ক্যান করা কঠিন হতে পারে।',
      dots: {
        rounded: 'রাউন্ডেড',
        dots: 'ডটস',
        classy: 'ক্ল্যাসি',
        classyRounded: 'ক্ল্যাসি রাউন্ডেড',
        square: 'স্কয়ার',
        extraRounded: 'সুপার রাউন্ড',
      },
      corners: {
        dot: 'বৃত্তাকার',
        square: 'চারকোনা',
        extraRounded: 'স্কোয়ার্কেল',
      },
    },
    preview: {
      title: 'লাইভ কিউআর প্রিভিউ',
      liveIndicator: 'লাইভ আপডেট',
      emptyTitle: 'কোনো কিউআর কোড নেই',
      emptyDesc: 'বাম পাশের ফর্মটি পূরণ করলে আপনার কাস্টম কিউআর কোডটি এখানে জীবন্ত হয়ে উঠবে।',
      downloadPng: 'PNG ডাউনলোড',
      downloadSvg: 'ভেক্টর SVG',
      downloadJpeg: 'JPEG ডাউনলোড',
      downloadPdf: 'PDF এক্সপোর্ট',
      copyImage: 'ছবি কপি করুন',
      copied: 'ক্লিপবোর্ডে কপি হয়েছে!',
      share: 'শেয়ার করুন',
      shared: 'সফলভাবে শেয়ার করা হয়েছে!',
      shareError: 'ব্রাউজারে শেয়ার সাপোর্ট না করায় লিংক কপি করা হয়েছে!',
      watchAdHd: 'অ্যাড দেখে ২০৪৮px আনলক করুন',
      watermarkToggle: 'QRVibe ওয়াটারমার্ক যুক্ত করুন',
      watermarkFree: 'ফ্রি প্ল্যানে ওয়াটারমার্ক অপশন রয়েছে',
    },
    bulk: {
      title: 'বাল্ক কিউআর জেনারেটর',
      subtitle: 'সিএসভি ফাইল আপলোড করে এক ক্লিকে অনেকগুলো কিউআর তৈরি করুন।',
      uploadCsv: 'CSV ফাইল আপলোড করুন',
      csvFormat: 'ফরম্যাট: প্রতি লাইনে একটি করে লিংক বা টেক্সট (প্রথম ৫টি ফ্রি)।',
      freeLimitNotice: 'ফ্রি প্ল্যানে একসাথে সর্বোচ্চ ৫টি কিউআর তৈরি সম্ভব। প্রো-তে ৫০০টি পর্যন্ত।',
      generateBtn: 'ব্যাচ তৈরি করুন',
      downloadZip: 'ZIP আকারে সব ডাউনলোড',
      generating: 'জিপ ফাইল প্রসেস হচ্ছে...',
      sampleDownload: 'নমুনা CSV ডাউনলোড',
      totalRows: 'মোট সারি পাওয়া গেছে',
      emptyList: 'এখনও কোনো সিএসভি ফাইল দেওয়া হয়নি।',
    },
    history: {
      title: 'সংরক্ষিত কিউআর কোড',
      empty: 'কোনো সংরক্ষিত কিউআর নেই',
      emptyDesc: 'আপনার তৈরি করা যেকোনো কিউআর স্বয়ংক্রিয়ভাবে ব্রাউজারে সেভ থাকে।',
      reopen: 'পুনরায় খুলুন',
      delete: 'মুছুন',
      clearAll: 'সব ক্লিয়ার করুন',
      favoritesOnly: 'শুধু পছন্দেরগুলো',
      searchPlaceholder: 'সাম্প্রতিক কিউআর খুঁজুন...',
    },
    monetization: {
      adSponsored: 'স্পন্সরড বিজ্ঞাপন',
      watchAdTitle: 'ছোট বিজ্ঞাপন দেখে আল্ট্রা-এইচডি আনলক করুন',
      watchAdDesc: 'QRVibe-কে সাপোর্ট করুন এবং প্রিন্টের জন্য ২০৪৮x২০৪৮ পিক্সেল কিউআর পান।',
      adPlaying: 'বিজ্ঞাপন চলছে...',
      secondsRemaining: 'সেকেন্ড বাকি',
      unlockedHd: 'আল্ট্রা-এইচডি ২০৪৮ পিক্সেল আনলক হয়েছে!',
      freeCard: {
        title: 'আজীবন ফ্রি',
        price: '৳০',
        period: 'আজীবন বিনামূল্যে',
        desc: 'ব্যক্তিগত, স্টুডেন্ট ও সাধারণ ব্যবহারের জন্য সেরা প্যাকেজ।',
        features: [
          'সীমাহীন কিউআর কোড জেনারেশন',
          'PNG, SVG ও JPEG হাই-রেজোলিউশন ডাউনলোড',
          '৮টি ট্রেন্ডি নান্দনিক প্রিসেট',
          'ImgBB ক্লাউড ইমেজ হোস্টিং',
          'প্রতি ব্যাচে ৫টি বাল্ক কিউআর',
          'স্ট্যান্ডার্ড স্ক্যান নির্ভরযোগ্যতা',
        ],
        cta: 'বর্তমান প্ল্যান',
      },
      proCard: {
        badge: 'জনপ্রিয়',
        title: 'ক্রিয়েটর প্রো',
        price: '$4.99',
        period: 'প্রতি মাসে',
        desc: 'ব্র্যান্ড, ইনফ্লুয়েন্সার ও বাণিজ্যিক প্রতিষ্ঠানের জন্য।',
        features: [
          'কোনো ওয়াটারমার্ক থাকবে না',
          'প্রতি ব্যাচে ৫০০টি বাল্ক কিউআর',
          'প্রিন্ট-রেডি ভেক্টর PDF এক্সপোর্ট',
          'ডায়নামিক কিউআর (পরবর্তীতে লিংক পরিবর্তন)',
          'রিয়েলটাইম স্ক্যান সংখ্যা ও অ্যানালিটিক্স',
          'ভিআইপি কাস্টমার সাপোর্ট',
        ],
        cta: 'প্রো-তে আপগ্রেড করুন',
      },
      waitlistTitle: 'ক্রিয়েটর প্রো আসছে শীঘ্রই!',
      waitlistDesc: 'লঞ্চিং অফারে ৫০% ছাড় পেতে এখনই ভিআইপি তালিকায় যুক্ত হন।',
      emailPlaceholder: 'আপনার ইমেইল ঠিকানা দিন',
      joinWaitlist: 'তালিকায় নাম লেখান',
      joinedSuccess: 'ধন্যবাদ! আপনার নাম তালিকায় যুক্ত হয়েছে। শীঘ্রই ডিসকাউন্ট কোড পাঠানো হবে।',
    },
    features: {
      title: 'নতুন প্রজন্মের জন্য বিশেষ সুবিধা',
      subtitle: 'অন্যান্য জেনারেটর যেগুলোর জন্য টাকা নেয়, আমরা সেগুলো ফ্রিতে দিচ্ছি।',
      cards: {
        presetsTitle: '৮টি ট্রেন্ডি প্রিসেট',
        presetsDesc: 'সাইবারপাংক, নিওন গ্লো, সফট প্যাস্টেল এবং মিনিমাল স্টাইল এক ক্লিকেই।',
        bulkTitle: 'ব্যাচ সিএসভি জেনারেটর',
        bulkDesc: 'সাধারণ একটি এক্সেল/সিএসভি আপলোড করে একসাথে নামসহ জিপ ফাইলে ডাউনলোড করুন।',
        imgbbTitle: 'ইনস্ট্যান্ট ক্লাউড ইমেজ কিউআর',
        imgbbDesc: 'যেকোনো ছবি বা আর্টওয়ার্ক ড্রপ করুন এবং সরাসরি ক্লাউড লিংকড কিউআর পান।',
        vectorTitle: 'ক্রিস্প ভেক্টর SVG ও PDF',
        vectorDesc: 'টি-শার্ট, ব্যানার, পোস্টার ও প্যাকেজিং প্রিন্টের জন্য নিখুঁত মান।',
        offlineTitle: '১০০% অফলাইন পিডব্লিউএ (PWA)',
        offlineDesc: 'মোবাইল বা পিসিতে ইনস্টল করে ইন্টারনেট ছাড়াই টেক্সট ও ওয়াইফাই কিউআর বানান।',
        scannableTitle: 'স্মার্ট কনট্রাস্ট গার্ড',
        scannableDesc: 'স্বয়ংক্রিয় কালার কনট্রাস্ট গার্ড নিশ্চিত করে যাতে যেকোনো ফোনে স্ক্যান করা যায়।',
      },
    },
    howItWorks: {
      title: 'কীভাবে কাজ করে',
      subtitle: 'মাত্র তিনটি সহজ ধাপে আপনার কাঙ্ক্ষিত কিউআর তৈরি করুন।',
      step1Title: '০১. তথ্য দিন',
      step1Desc: 'ছবি, ওয়াইফাই, সোশ্যাল হ্যান্ডেল, পেমেন্ট বা লিংক থেকে একটি ধরন বেছে নিন।',
      step2Title: '০২. মনের মতো সাজান',
      step2Desc: 'রঙ, গ্রেডিয়েন্ট, ডট স্টাইল ও আপনার নিজস্ব ব্র্যান্ড লোগো যুক্ত করুন।',
      step3Title: '০৩. স্ক্যান ও ডাউনলোড',
      step3Desc: 'এইচডি পিএনজি, এসভিজি বা প্রিন্ট উপযোগী পিডিএফ ডাউনলোড করুন।',
    },
    faq: {
      title: 'সাধারণ জিজ্ঞাসা (FAQ)',
      subtitle: 'QRVibe সম্পর্কিত সাধারণ তথ্যাবলী।',
      items: [
        {
          q: 'QRVibe-এ তৈরি কিউআর কোডগুলো কি আজীবন ফ্রি থাকবে?',
          a: 'হ্যাঁ! QRVibe-এ তৈরি সকল স্ট্যাটিক কিউআর আজীবন ফ্রি এবং কখনো মেয়াদোত্তীর্ণ হবে না।',
        },
        {
          q: 'আমি কি বাণিজ্যিক কাজে এই কোডগুলো ব্যবহার করতে পারব?',
          a: 'অবশ্যই। আপনার ব্যবসা, পণ্য, প্যাকেজিং বা বিজ্ঞাপনে এটি সম্পূর্ণ বিনামূল্যে ব্যবহার করতে পারেন।',
        },
        {
          q: 'আপলোড করা ছবিগুলো কোথায় জমা থাকে?',
          a: 'ছবিগুলো নিরাপদভাবে ImgBB-এর গ্লোবাল ক্লাউড সার্ভারে হোস্ট করা হয়।',
        },
        {
          q: 'কাস্টম রঙ দিলে কি ফোনের ক্যামেরায় স্ক্যান হবে?',
          a: 'হ্যাঁ, যদি রঙের কনট্রাস্ট ভালো থাকে। কিউআরভাইব-এর স্মার্ট কনট্রাস্ট গার্ড রঙ কম হলে আপনাকে সতর্ক করে দেবে।',
        },
        {
          q: 'আমি কি ইন্টারনেট ছাড়াই এটি ব্যবহার করতে পারব?',
          a: 'হ্যাঁ! এটি একটি পিডব্লিউএ (PWA) অ্যাপ। অফলাইনেও টেক্সট, ওয়াইফাই ও লিংক কিউআর কাজ করবে।',
        },
      ],
    },
    footer: {
      rights: 'সর্বস্বত্ব সংরক্ষিত। বিশ্বজুড়ে সকল ক্রিয়েটরদের জন্য তৈরি।',
      privacy: 'গোপনীয়তা নীতি',
      terms: 'ব্যবহারের শর্তাবলী',
      contact: 'যোগাযোগ ও সাপোর্ট',
      imgNotice: 'আপলোড করা ছবিগুলো ক্লায়েন্ট-সাইডে অপ্টিমাইজ হয়ে ImgBB পাবলিক ক্লাউডে সংরক্ষিত হয়।',
    },
  },
};
