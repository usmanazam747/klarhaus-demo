// Demo content for a fictional company. Every name, price and address here is made up.

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

type Text = Record<Locale, string>;

export const nav: { href: string; label: Text }[] = [
  { href: "", label: { de: "Start", en: "Home" } },
  { href: "/leistungen", label: { de: "Leistungen & Preise", en: "Services & prices" } },
  { href: "/ueber-uns", label: { de: "Über uns", en: "About us" } },
  { href: "/angebot", label: { de: "Angebot anfragen", en: "Get a quote" } },
];

export const ui = {
  tagline: {
    de: "Gebäudereinigung in Bremen – zuverlässig, gründlich, fair.",
    en: "Cleaning services in Bremen – reliable, thorough, fair.",
  },
  heroTitle: {
    de: "Saubere Räume. Klare Preise.",
    en: "Clean spaces. Clear prices.",
  },
  heroText: {
    de: "Büro, Praxis oder Wohnung: KlarHaus reinigt mit festen Teams, umweltschonenden Mitteln und einem Angebot innerhalb von 24 Stunden.",
    en: "Office, practice or home: KlarHaus cleans with fixed teams, eco-friendly products and a quote within 24 hours.",
  },
  ctaQuote: { de: "Kostenloses Angebot", en: "Free quote" },
  ctaServices: { de: "Leistungen ansehen", en: "See services" },
  whyTitle: { de: "Warum KlarHaus?", en: "Why KlarHaus?" },
  servicesTitle: { de: "Unsere Leistungen", en: "Our services" },
  faqTitle: { de: "Häufige Fragen", en: "Frequently asked questions" },
  pricesNote: {
    de: "Richtpreise inkl. 19 % MwSt. Ihr genauer Preis hängt von Fläche, Zustand und Rhythmus ab.",
    en: "Guide prices incl. 19% VAT. Your exact price depends on size, condition and frequency.",
  },
  mapTitle: { de: "Einsatzgebiet", en: "Service area" },
  mapText: {
    de: "Bremen und Umgebung bis 30 km. Bremerhaven auf Anfrage.",
    en: "Bremen and up to 30 km around. Bremerhaven on request.",
  },
  mapButton: { de: "Karte laden (OpenStreetMap)", en: "Load map (OpenStreetMap)" },
  mapConsent: {
    de: "Beim Laden der Karte wird Ihre IP-Adresse an OpenStreetMap übertragen.",
    en: "Loading the map sends your IP address to OpenStreetMap.",
  },
  whatsapp: { de: "Per WhatsApp teilen", en: "Share via WhatsApp" },
  demoBanner: {
    de: "Demo-Projekt – KlarHaus ist ein fiktives Unternehmen. Preise, Adresse und Team sind erfunden.",
    en: "Demo project – KlarHaus is a fictional company. Prices, address and team are made up.",
  },
  builtBy: {
    de: "Gebaut mit Next.js, Tailwind CSS und Claude als Portfolio-Demo.",
    en: "Built with Next.js, Tailwind CSS and Claude as a portfolio demo.",
  },
} satisfies Record<string, Text>;

export const benefits: { title: Text; text: Text }[] = [
  {
    title: { de: "Feste Teams", en: "Fixed teams" },
    text: {
      de: "Sie sehen jede Woche dieselben Gesichter. Keine wechselnden Aushilfen.",
      en: "You see the same faces every week. No rotating temps.",
    },
  },
  {
    title: { de: "Angebot in 24 Stunden", en: "Quote within 24 hours" },
    text: {
      de: "Formular ausfüllen, wir melden uns am nächsten Werktag mit einem Festpreis.",
      en: "Fill in the form and we reply the next working day with a fixed price.",
    },
  },
  {
    title: { de: "Umweltschonend", en: "Eco-friendly" },
    text: {
      de: "Zertifizierte Reinigungsmittel und Mikrofaser statt Einweg.",
      en: "Certified cleaning products and microfibre instead of disposables.",
    },
  },
  {
    title: { de: "Versichert", en: "Insured" },
    text: {
      de: "Betriebshaftpflicht bis 5 Mio. €, inklusive Schlüsselverlust.",
      en: "Liability insurance up to €5M, including lost keys.",
    },
  },
];

export const services: { id: string; title: Text; text: Text; price: Text }[] = [
  {
    id: "buero",
    title: { de: "Büro- & Praxisreinigung", en: "Office & practice cleaning" },
    text: {
      de: "Regelmäßige Unterhaltsreinigung, abends oder am Wochenende. Fester Ansprechpartner.",
      en: "Regular maintenance cleaning, evenings or weekends. One fixed contact person.",
    },
    price: { de: "ab 29 € pro Stunde", en: "from €29 per hour" },
  },
  {
    id: "grundreinigung",
    title: { de: "Grundreinigung", en: "Deep cleaning" },
    text: {
      de: "Einmalige Tiefenreinigung von Wohnung oder Haus, inklusive Küche und Bad.",
      en: "One-off deep clean of a flat or house, including kitchen and bathroom.",
    },
    price: { de: "ab 3,50 € pro m² (mind. 150 €)", en: "from €3.50 per m² (min. €150)" },
  },
  {
    id: "fenster",
    title: { de: "Fensterreinigung", en: "Window cleaning" },
    text: {
      de: "Fenster, Rahmen und Fensterbänke innen und außen, streifenfrei.",
      en: "Windows, frames and sills inside and out, streak-free.",
    },
    price: { de: "ab 2,50 € pro Flügel (mind. 60 €)", en: "from €2.50 per pane (min. €60)" },
  },
  {
    id: "umzug",
    title: { de: "Endreinigung nach Umzug", en: "Move-out cleaning" },
    text: {
      de: "Besenrein war gestern: Übergabe-fertig mit Abnahmegarantie für den Vermieter.",
      en: "Handover-ready, with an acceptance guarantee for your landlord.",
    },
    price: { de: "ab 4,20 € pro m²", en: "from €4.20 per m²" },
  },
];

export const team: { name: string; role: Text }[] = [
  { name: "Lena Brandt", role: { de: "Gründerin & Einsatzleitung", en: "Founder & operations" } },
  { name: "Murat Yilmaz", role: { de: "Teamleiter Büroreinigung", en: "Team lead, office cleaning" } },
  { name: "Sophie Kramer", role: { de: "Kundenservice & Angebote", en: "Customer service & quotes" } },
];

export const about = {
  title: { de: "Über KlarHaus", en: "About KlarHaus" },
  text: {
    de: "KlarHaus wurde 2019 in Bremen gegründet. Heute reinigen 24 fest angestellte Mitarbeitende Büros, Praxen und Wohnungen in der Region – sozialversicherungspflichtig beschäftigt und nach Tarif bezahlt.",
    en: "KlarHaus was founded in Bremen in 2019. Today 24 permanently employed staff clean offices, practices and homes in the region – properly employed and paid according to the collective agreement.",
  },
  teamTitle: { de: "Ihr Team", en: "Your team" },
} satisfies Record<string, Text>;

// The FAQ is also the chatbot's knowledge base: one entry = one retrievable chunk.
export type FaqEntry = { id: string; q: Text; a: Text };

export const faq: FaqEntry[] = [
  {
    id: "preis-grundreinigung",
    q: { de: "Was kostet eine Grundreinigung?", en: "How much does a deep clean cost?" },
    a: {
      de: "Eine Grundreinigung kostet ab 3,50 € pro Quadratmeter inklusive MwSt., mindestens 150 €. Eine 70-m²-Wohnung liegt damit bei etwa 245 €. Starke Verschmutzung berechnen wir nach Besichtigung.",
      en: "A deep clean costs from €3.50 per square metre incl. VAT, minimum €150. A 70 m² flat comes to about €245. Heavy soiling is priced after a viewing.",
    },
  },
  {
    id: "preis-buero",
    q: { de: "Was kostet die Büroreinigung?", en: "How much does office cleaning cost?" },
    a: {
      de: "Regelmäßige Büro- und Praxisreinigung kostet ab 29 € pro Stunde inklusive MwSt. Bei wöchentlicher Reinigung erstellen wir einen monatlichen Festpreis, damit Sie genau planen können.",
      en: "Regular office and practice cleaning costs from €29 per hour incl. VAT. For weekly cleaning we set a fixed monthly price so you can plan exactly.",
    },
  },
  {
    id: "fenster",
    q: { de: "Putzt ihr auch Fenster?", en: "Do you clean windows?" },
    a: {
      de: "Ja. Fensterreinigung kostet ab 2,50 € pro Fensterflügel innen und außen, mindestens 60 €. Rahmen und Fensterbänke sind inklusive. Ab dem 3. Obergeschoss brauchen wir eine Besichtigung.",
      en: "Yes. Window cleaning costs from €2.50 per pane inside and out, minimum €60. Frames and sills are included. Above the 3rd floor we need a viewing first.",
    },
  },
  {
    id: "umzug",
    q: { de: "Was ist eure Abnahmegarantie bei der Umzugsreinigung?", en: "What is your move-out acceptance guarantee?" },
    a: {
      de: "Wenn Ihr Vermieter bei der Wohnungsübergabe etwas an der Reinigung bemängelt, kommen wir innerhalb von 48 Stunden kostenlos zurück und bessern nach. Die Endreinigung kostet ab 4,20 € pro m².",
      en: "If your landlord finds a cleaning issue at the handover, we come back within 48 hours and fix it for free. Move-out cleaning costs from €4.20 per m².",
    },
  },
  {
    id: "reinigungsmittel",
    q: { de: "Bringt ihr eigene Reinigungsmittel mit?", en: "Do you bring your own cleaning products?" },
    a: {
      de: "Ja, wir bringen alle Reinigungsmittel und Geräte mit. Wir verwenden zertifizierte, umweltschonende Mittel und Mikrofasertücher. Wenn Sie bestimmte Produkte wünschen, nutzen wir gern Ihre.",
      en: "Yes, we bring all products and equipment. We use certified, eco-friendly products and microfibre cloths. If you prefer specific products, we are happy to use yours.",
    },
  },
  {
    id: "versicherung",
    q: { de: "Seid ihr versichert?", en: "Are you insured?" },
    a: {
      de: "Ja. Unsere Betriebshaftpflicht deckt Schäden bis 5 Mio. € ab, inklusive Schlüsselverlust. Den Nachweis senden wir Ihnen auf Wunsch mit dem Angebot.",
      en: "Yes. Our liability insurance covers damage up to €5M, including lost keys. We send proof with the quote on request.",
    },
  },
  {
    id: "schluessel",
    q: { de: "Müssen wir bei der Reinigung zu Hause sein?", en: "Do we need to be home during cleaning?" },
    a: {
      de: "Nein. Viele Kunden geben uns einen Schlüssel. Schlüssel werden codiert und ohne Adresse in einem Tresor aufbewahrt. Die Übergabe dokumentieren wir schriftlich.",
      en: "No. Many customers give us a key. Keys are coded and stored without an address in a safe. We document every handover in writing.",
    },
  },
  {
    id: "einsatzgebiet",
    q: { de: "In welchem Gebiet seid ihr tätig?", en: "Which area do you cover?" },
    a: {
      de: "Wir reinigen in Bremen und im Umkreis von 30 km ohne Anfahrtskosten. Für Bremerhaven berechnen wir eine Anfahrtspauschale von 25 €.",
      en: "We clean in Bremen and within 30 km at no travel charge. For Bremerhaven we charge a flat travel fee of €25.",
    },
  },
  {
    id: "termin",
    q: { de: "Wie schnell bekomme ich einen Termin?", en: "How soon can I get an appointment?" },
    a: {
      de: "Das Angebot erhalten Sie am nächsten Werktag. Einen Termin haben wir meist innerhalb von 3 Werktagen frei. Express innerhalb von 24 Stunden ist mit 20 % Aufschlag möglich.",
      en: "You get the quote the next working day. We usually have a slot within 3 working days. Express within 24 hours is possible for a 20% surcharge.",
    },
  },
  {
    id: "storno",
    q: { de: "Kann ich einen Termin absagen?", en: "Can I cancel an appointment?" },
    a: {
      de: "Ja, bis 48 Stunden vorher kostenlos. Bei späterer Absage berechnen wir 50 % des vereinbarten Preises.",
      en: "Yes, free of charge up to 48 hours before. Later cancellations are charged at 50% of the agreed price.",
    },
  },
  {
    id: "zahlung",
    q: { de: "Wie kann ich bezahlen?", en: "How can I pay?" },
    a: {
      de: "Sie erhalten eine Rechnung nach der Reinigung, zahlbar per Überweisung innerhalb von 14 Tagen oder per SEPA-Lastschrift. Barzahlung ist nicht möglich.",
      en: "You receive an invoice after the cleaning, payable by bank transfer within 14 days or by SEPA direct debit. Cash is not accepted.",
    },
  },
  {
    id: "personal",
    q: { de: "Wer reinigt bei mir?", en: "Who will clean for me?" },
    a: {
      de: "Feste Teams aus fest angestellten Mitarbeitenden – keine Subunternehmer. Bei regelmäßiger Reinigung kommt immer dasselbe Team, Vertretungen kündigen wir vorher an.",
      en: "Fixed teams of permanently employed staff – no subcontractors. For regular cleaning the same team always comes; we announce any replacements in advance.",
    },
  },
];
