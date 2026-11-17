import type { Lang } from "../data/site";

/**
 * Single source of truth for all site copy. `nl` defines the shape;
 * `en` is type-checked against it, so a missing translation is a compile error.
 */
const nl = {
  nav: {
    work: "Werk",
    origins: "Ontstaan",
    about: "Over mij",
    commissions: "Commissies & Prints",
    menu: "Menu",
    instagram: "Instagram @r.os_art",
    themeDark: "Donkere modus",
    themeLight: "Lichte modus",
  },
  meta: {
    home: {
      title: "Lijnkunst van architectuur & fantasie",
      description:
        "Pen- en inkttekeningen van gebouwen en fantastische plaatsen door Rens van Os uit Woerden. Prints, originele werken en commissies via de site.",
    },
    work: {
      title: "Werk",
      description:
        "Galerie met inkttekeningen: architectuurportretten en fantasielanden, pen op papier. Bekijk de collectie van Rens van Os.",
    },
    origins: {
      title: "Ontstaan",
      description:
        "Van eerste idee tot laatste inktlijn: zo groeit een tekening van Rens van Os, stap voor stap op de tekentafel in Woerden.",
    },
    about: {
      title: "Over mij",
      description:
        "Rens van Os, tekenaar en architect uit Woerden. Over de liefde voor de lijn, gebouwen met karakter en verzonnen werelden.",
    },
    commissions: {
      title: "Commissies & Prints",
      description:
        "Prints en originelen te koop, en commissies: jouw huis of favoriete gebouw vastgelegd in pen en inkt. Vraag via de site.",
    },
    notfound: {
      title: "Pagina niet gevonden",
      description: "Deze pagina is nog niet uitgetekend.",
    },
  },
  home: {
    kicker: "Lijnkunst · Woerden",
    sub: "Gebouwen met karakter en plaatsen die alleen in de verbeelding bestaan — getekend met pen en inkt.",
    ctaWork: "Bekijk het werk",
    ctaAbout: "Over mij",
    quoteLabel: "Intentie",
    quote:
      "Ik breng architectuur tot leven met pen en inkt — van verborgen parels in Woerden en daarbuiten tot wonderlijke werelddelen die alleen op papier bestaan. Elke lijn is een uitnodiging om langer te kijken.",
    featuredEyebrow: "Uitgelicht",
    featuredTitle: "Een capriccio van torens en droomlanden",
    featuredBody:
      "In de geest van de zeventiende-eeuwse capriccio combineer ik bestaande architectuur met verzonnen constructies tot één fantastisch tafereel: een kerktoren uit Woerden die uitkomt op een zwevende stad, een brug die nergens naartoe leidt en toch precies goed is. Gewoonlijk ontstaat zo'n tekening laag voor laag, over vele weken, met fineliner en inkt.",
    featuredCta: "Meer werk bekijken",
    featuredCaption: "Uit de reeks fantastische plaatsen",
    galleryEyebrow: "Galerij",
    galleryTitle: "Recent werk",
    galleryIntroPrefix: "Een glimp van de tekentafel — de volledige collectie staat op de ",
    galleryIntroLink: "werkpagina",
    galleryIntroSuffix: ".",
    galleryMore: "Alles bekijken",
  },
  work: {
    eyebrow: "Galerij",
    title: "Het werk",
    intro: "Inkttekeningen — architectuurportretten en fantasielanden. Klik op een werk voor detail en beschikbaarheid.",
    instaEyebrow: "Tekentafel",
    instaTitle: "Vers van de tekentafel",
    instaIntroPrefix: "Werk in wording, details en processen — volg ",
    instaIntroHandle: "@r.os_art",
    instaIntroSuffix: " voor alles wat vers verschijnt.",
  },
  origins: {
    eyebrow: "Ontstaan",
    title: "Van idee tot inktlijn",
    intro:
      "Elke tekening groeit langzaam: eerst een los idee, dan potloodlijnen die zoeken, en uiteindelijk pen en inkt die zich vastleggen. Dit is de route die elk werk aflegt.",
    steps: [
      {
        title: "Het idee",
        text:
          "Alles begint met een plek die blijft hangen — een gevel in Woerden, een toren ergens op reis, of een gebouw dat alleen in mijn hoofd bestaat. Ik verzamel foto's, losse schetsen en herinneringen tot het beeld klopt.",
        image: "art/artwork-03.svg",
        alt: "Fantastisch stadsgezicht — het beginpunt van veel tekeningen",
      },
      {
        title: "De schets",
        text:
          "Met potlood zoek ik de compositie: het standpunt, de verhoudingen, de lege ruimte tussen de lijnen. Vaak liggen er drie of vier opzetjes naast elkaar voordat er één blad mag blijven.",
        image: "art/artwork-01.svg",
        alt: "Schetsmatige opzet van een architectuurttekening",
      },
      {
        title: "De lijn",
        text:
          "Dan pak ik de fineliner. Vanaf hier is alles definitief — geen gum meer, alleen durf. De buitenlijnen van het gebouw teken ik in één keer, met een rustige hand en een been op de rand van de tafel.",
        image: "art/artwork-02.svg",
        alt: "Inktlijnen die het gebouw definiëren",
      },
      {
        title: "Laag voor laag",
        text:
          "Arceringen bouwen muur op muur: kruislijnen voor schaduw, dryinge streken voor baksteen, wit dat licht blijft. Dit is het langste stuk — een werk groeit zo wekenlang, een uur per avond.",
        image: "art/artwork-04.svg",
        alt: "Detail met arcering en schaduwopbouw",
      },
      {
        title: "Getekend",
        text:
          "Als de laatste lijn droog is, signeer ik rechtsonder en zet ik het werk weg. Pas een dag later kijk ik er opnieuw naar — en dan pas zie ik of de plek uit mijn hoofd het ook op papier is geworden.",
        image: "art/artwork-06.svg",
        alt: "Afgewerkt werk met handtekening",
      },
    ],
    ctaText: "Benieuwd wat er uit deze route rolt? De volledige collectie staat op de ",
    ctaLink: "werkpagina",
    ctaSuffix: ", en voor je eigen gebouw of fantasie kun je een ",
    ctaLink2: "commissie aanvragen",
    ctaSuffix2: ".",
  },
  about: {
    portraitPlaceholder: "Foto volgt",
    eyebrow: "Over mij",
    title: "Vanuit Woerden, met pen en inkt",
    paragraphs: [
      "Hoi! Ik ben Rens, tekenaar en architect, geboren en getogen in Woerden. Mijn hart klopt voor de stad en haar geveltjes: grachten, torens, poorten — maar elk gebouw met een verhaal trekt me aan, van schuur tot kathedraal.",
      "Naast bestaande architectuur teken ik fantasielanden: capriccio's waarin werelden ontstaan die er nooit zijn geweest, maar er wel hadden kunnen zijn. Mijn tekeningen groeien laag voor laag met pen en inkt, vaak tientallen uren per werk — elk blad is een kleine liefdesverklaring aan de lijn.",
    ],
    signature: "— Rens",
  },
  commissions: {
    kicker: "Te koop & op aanvraag",
    eyebrow: "Te koop",
    title: "Commissies & Prints",
    intro: "Wil je een werk aan de muur, of juist jouw eigen gebouw in lijn vastgelegd? Beide kan.",
    printsCard: {
      heading: "Prints & originelen",
      body: "Een selectie van mijn tekeningen is verkrijgbaar als fijne art print, en regelmatig gaan ook originelen naar nieuwe eigenaren. Stuur me een bericht voor actuele beschikbaarheid en prijzen.",
      cta: "Vraag naar prints",
    },
    commissionsCard: {
      heading: "Commissies",
      body: "Laat jouw huis, favoriete gebouw of een compleet fantasielandschap in lijn vastleggen. Samen kiezen we formaat en gezichtspunt; ik neem de pen voor mijn rekening.",
      cta: "Bespreek een commissie",
    },
    form: {
      eyebrow: "Aanvraag",
      title: "Stuur een bericht",
      intro:
        "Vul het formulier in en je e-mailprogramma opent met een kant-en-klare aanvraag. Zo bereik ik zeker, en je hoeft zelf niets te kopiëren.",
      nameLabel: "Naam",
      emailLabel: "E-mailadres",
      typeLabel: "Waar gaat het om?",
      typePlaceholder: "Kies een optie…",
      typeOptions: {
        print: "Print van een bestaand werk",
        origineel: "Origineel kopen",
        commissie: "Commissie — eigen gebouw of fantasie",
        anders: "Anders / weet ik nog niet",
      },
      subjectLabel: "Gebouw of onderwerp",
      optional: "(optioneel)",
      subjectPlaceholder: "Bijv. het pand op de foto, of een zwevende stad",
      messageLabel: "Bericht",
      messagePlaceholder: "Vertel kort wat je voor ogen hebt — formaat, stijl, timing…",
      submit: "Verstuur aanvraag",
      note: "Je aanvraag gaat via je eigen e-mailprogramma; er wordt niets op een server opgeslagen.",
      errorMissing: "Vul alsjeblieft je naam, een geldig e-mailadres, een keuze en een bericht in.",
      errorEmail: "Het e-mailadres lijkt niet te kloppen — controleer hem even.",
      bodyType: "Type aanvraag",
      bodySubject: "Gebouw of onderwerp",
      bodyMessage: "Bericht",
      sentFrom: "Verzonden via rensvanos.art",
    },
  },
  footer: {
    copy: "Alle rechten voorbehouden.",
  },
  notfound: {
    title: "Pagina niet gevonden",
    message: "Deze pagina is nog niet uitgetekend.",
    body: "Misschien bestaat hij ooit nog — voorlopig loopt de lijn hier dood.",
    cta: "Terug naar de voorkant",
  },
  lightbox: {
    label: "Werk detail",
    status: {
      print: "Print beschikbaar",
      origineel: "Origineel beschikbaar",
      beide: "Print & origineel beschikbaar",
      uitverkocht: "Uitverkocht",
    },
    enquire: "Vraag naar dit werk",
    enquirySubject: "Aanvraag: ",
    close: "Sluiten",
    prev: "Vorig werk",
    next: "Volgend werk",
    soldNote: "Dit werk is uitverkocht — interessee voor iets vergelijkbaars? Mail gerust.",
  },
};

const en: typeof nl = {
  nav: {
    work: "Work",
    origins: "Origins",
    about: "About me",
    commissions: "Commissions & Prints",
    menu: "Menu",
    instagram: "Instagram @r.os_art",
    themeDark: "Dark mode",
    themeLight: "Light mode",
  },
  meta: {
    home: {
      title: "Line art of architecture & fantasy",
      description:
        "Pen and ink drawings of buildings and fantastical places by Rens van Os from Woerden. Prints, originals and commissions via the site.",
    },
    work: {
      title: "Work",
      description:
        "Gallery of ink drawings: architectural portraits and fantasy lands, pen on paper. Browse the collection of Rens van Os.",
    },
    origins: {
      title: "Origins",
      description:
        "From first idea to final ink line: how a drawing by Rens van Os grows, step by step, on the drawing table in Woerden.",
    },
    about: {
      title: "About me",
      description:
        "Rens van Os, draughtsman and architect from Woerden. About the love of the line, buildings with character and invented worlds.",
    },
    commissions: {
      title: "Commissions & Prints",
      description:
        "Prints and originals for sale, plus commissions: your home or favourite building captured in pen and ink. Enquire via the site.",
    },
    notfound: {
      title: "Page not found",
      description: "This page hasn't been drawn yet.",
    },
  },
  home: {
    kicker: "Line art · Woerden",
    sub: "Buildings with character and places that exist only in the imagination — drawn in pen and ink.",
    ctaWork: "View the work",
    ctaAbout: "About me",
    quoteLabel: "Intent",
    quote:
      "I bring architecture to life in pen and ink — from hidden gems in Woerden and beyond to wondrous worlds that exist only on paper. Every line invites you to look a little longer.",
    featuredEyebrow: "Featured",
    featuredTitle: "A capriccio of towers and dreamlands",
    featuredBody:
      "In the spirit of the seventeenth-century capriccio, I combine existing architecture with invented structures into a single fantastical scene: a church tower from Woerden arriving at a floating city, a bridge leading nowhere that still feels exactly right. A drawing like this grows layer by layer, over many weeks, in fineliner and ink.",
    featuredCta: "See more work",
    featuredCaption: "From the fantastical places series",
    galleryEyebrow: "Gallery",
    galleryTitle: "Recent work",
    galleryIntroPrefix: "A glimpse of the drawing table — the full collection lives on the ",
    galleryIntroLink: "work page",
    galleryIntroSuffix: ".",
    galleryMore: "View everything",
  },
  work: {
    eyebrow: "Gallery",
    title: "The work",
    intro: "Ink drawings — architectural portraits and fantasy lands. Click a work for detail and availability.",
    instaEyebrow: "Drawing table",
    instaTitle: "Fresh from the drawing table",
    instaIntroPrefix: "Works in progress, details and process — follow ",
    instaIntroHandle: "@r.os_art",
    instaIntroSuffix: " for everything that appears fresh off the pen.",
  },
  origins: {
    eyebrow: "Origins",
    title: "From idea to ink line",
    intro:
      "Every drawing grows slowly: first a loose idea, then pencil lines that search, and finally pen and ink that commit. This is the route every work travels.",
    steps: [
      {
        title: "The idea",
        text:
          "Everything starts with a place that sticks — a facade in Woerden, a tower from a trip, or a building that exists only in my head. I gather photos, loose sketches and memories until the picture feels right.",
        image: "art/artwork-03.svg",
        alt: "Fantastical cityscape — the starting point of many drawings",
      },
      {
        title: "The sketch",
        text:
          "In pencil I search for the composition: the viewpoint, the proportions, the emptiness between the lines. Often three or four starts lie side by side before one sheet is allowed to stay.",
        image: "art/artwork-01.svg",
        alt: "Sketchy first layout of an architectural drawing",
      },
      {
        title: "The line",
        text:
          "Then I pick up the fineliner. From here everything is final — no eraser, only commitment. I draw the outer lines of the building in one go, with a steady hand and an elbow braced on the table edge.",
        image: "art/artwork-02.svg",
        alt: "Ink lines defining the building",
      },
      {
        title: "Layer by layer",
        text:
          "Hatching builds wall upon wall: cross-strokes for shadow, dry strokes for brick, white that stays light. This is the longest stretch — a work grows like this for weeks, an hour a night.",
        image: "art/artwork-04.svg",
        alt: "Detail with hatching and shadow build-up",
      },
      {
        title: "Drawn",
        text:
          "When the last line is dry, I sign bottom-right and set the work aside. Only a day later do I look again — and only then do I see whether the place in my head truly made it onto paper.",
        image: "art/artwork-06.svg",
        alt: "Finished work with signature",
      },
    ],
    ctaText: "Curious what this route produces? The full collection lives on the ",
    ctaLink: "work page",
    ctaSuffix: ", and for your own building or fantasy you can request a ",
    ctaLink2: "commission",
    ctaSuffix2: ".",
  },
  about: {
    portraitPlaceholder: "Photo to follow",
    eyebrow: "About me",
    title: "From Woerden, in pen and ink",
    paragraphs: [
      "Hi! I'm Rens, draughtsman and architect, born and raised in Woerden, the Netherlands. My heart beats for the city and its facades: canals, towers, gates — but any building with a story draws me in, from barn to cathedral.",
      "Alongside existing architecture I draw fantasy lands: capricci in which worlds appear that never existed, yet so easily could have. My drawings grow layer by layer in pen and ink, often forty hours or more per piece — every sheet is a small love letter to the line.",
    ],
    signature: "— Rens",
  },
  commissions: {
    kicker: "For sale & on request",
    eyebrow: "For sale",
    title: "Commissions & Prints",
    intro: "Want a work on your wall, or your own building captured in line? Both are possible.",
    printsCard: {
      heading: "Prints & originals",
      body: "A selection of my drawings is available as fine art prints, and regularly originals find new homes too. Send me a message for current availability and prices.",
      cta: "Ask about prints",
    },
    commissionsCard: {
      heading: "Commissions",
      body: "Have your home, favourite building or an entire fantasy landscape captured in line. Together we choose format and viewpoint; I take care of the pen.",
      cta: "Discuss a commission",
    },
    form: {
      eyebrow: "Enquiry",
      title: "Send a message",
      intro: "Fill in the form and your email app will open with a ready-made enquiry. No copying and pasting needed.",
      nameLabel: "Name",
      emailLabel: "Email address",
      typeLabel: "What is it about?",
      typePlaceholder: "Choose an option…",
      typeOptions: {
        print: "Print of an existing work",
        origineel: "Buy an original",
        commissie: "Commission — own building or fantasy",
        anders: "Other / not sure yet",
      },
      subjectLabel: "Building or subject",
      optional: "(optional)",
      subjectPlaceholder: "E.g. the house in the photo, or a floating city",
      messageLabel: "Message",
      messagePlaceholder: "Tell me briefly what you have in mind — size, style, timing…",
      submit: "Send enquiry",
      note: "Your enquiry opens in your own email app; nothing is stored on a server.",
      errorMissing: "Please fill in your name, a valid email address, a request type and a message.",
      errorEmail: "That email address doesn't look right — please double-check it.",
      bodyType: "Request type",
      bodySubject: "Building or subject",
      bodyMessage: "Message",
      sentFrom: "Sent via rensvanos.art",
    },
  },
  footer: {
    copy: "All rights reserved.",
  },
  notfound: {
    title: "Page not found",
    message: "This page hasn't been drawn yet.",
    body: "It may exist someday — for now, the line runs out here.",
    cta: "Back to the front page",
  },
  lightbox: {
    label: "Artwork detail",
    status: {
      print: "Print available",
      origineel: "Original available",
      beide: "Print & original available",
      uitverkocht: "Sold out",
    },
    enquire: "Enquire about this work",
    enquirySubject: "Enquiry: ",
    close: "Close",
    prev: "Previous work",
    next: "Next work",
    soldNote: "This work is sold out — interested in something similar? Feel free to email.",
  },
};

export type Dictionary = typeof nl;

export const dictionaries: Record<Lang, Dictionary> = { nl, en };
