export const CONTENT = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  weddingInvitation: "دعوة زفاف",
  greetingPersonal: (name: string) => `حيّاك الله يا ${name}`,
  greetingGeneral: "حيّاكم الله",
  scrollHint: "اسحب للأسفل",

  quranVerse:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  propheticHadith: "وقال النبي ﷺ: \"تزوجوا فإِنِّي مُكاثِرٌ بكم الأمَمَ\"",
  quranReference: "سورة الروم - آية ٢١",

  groomName: "هيثم",
  brideName: "زوجته",
  andWord: "و",

  dateLabel: "التاريخ",
  dateValue: "الجمعة ٢٩ مايو ٢٠٢٦",
  timeLabel: "الوقت",
  timeValue: "من ٧:٣٠ مساءً إلى ٩:٣٠ مساءً",
  locationLabel: "المكان",
  locationValue: "مجمع النقابات المهنية - إربد",
  locationMapUrl: "https://maps.app.goo.gl/WB4rNVB1JYRK1Bpk6",

  countdownDays: "يوم",
  countdownHours: "ساعة",
  countdownMinutes: "دقيقة",
  countdownSeconds: "ثانية",
  countdownExpired: "بارك الله لهما",

  instructionsTitle: "تنبيهات",
  noMusic: "حفل إسلامي بدون موسيقى",
  noPhotography: "يُمنع التصوير في قسم النساء",

  closingPrayer:
    "اللهم بارك لهما وبارك عليهما واجمع بينهما في خير",
  closingWish: "قال رسول الله ﷺ: يا معشر الشباب من استطاع منكم الباءة فليتزوج",
} as const;
