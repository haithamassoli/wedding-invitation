export const CONTENT = {
  bismillah: "بِــسْمِ اللَّهِ الرَّحْمَــنِ الرَّحِيــمِ",
  weddingInvitation: "دعــوة زفــاف",
  greetingPersonal: (name: string) => `حيّــاك الله يـا ${name}`,
  greetingGeneral: "حيّــاكم الله",
  scrollHint: "اسحب للأسفــل",

  quranVerse:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  propheticHadith: 'وقال النبي ﷺ: "تزوجوا فإِنِّي مُكاثِرٌ بكم الأمَمَ"',
  quranReference: "سورة الروم - آية 21",

  groomName: "هيثــم",
  brideName: "كريــمته",
  andWord: "و",

  dateLabel: "التــاريــخ",
  dateValue: "الجمعــة 29 مــايــو 2026",
  timeLabel: "الوقــت",
  timeValue: "من 7:30 مســاءً إلى 9:30 مســاءً",
  locationLabel: "المكــان",
  locationValue: "مجمع النقابــات المهنية - إربــد",
  locationMapUrl: "https://maps.app.goo.gl/qdsHMwzWVrqeij6C9",

  countdownDays: "يــوم",
  countdownHours: "ســاعة",
  countdownMinutes: "دقيــقة",
  countdownSeconds: "ثــانية",
  countdownExpired: "بارك الله لهما",

  instructionsTitle: "تنبيــهات",
  noMusic: "حفل إسلامي بدون موســيقى",
  noPhotography: "يُمنع التصوير في قسم النســاء",

  closingPrayer: "اللهم بــارك لهما وبــارك عليهما واجمع بينهما فــي خيــر",
  closingWish: "قال رسول الله ﷺ: يا معشر الشباب من استطاع منكم الباءة فليتزوج",
} as const;
