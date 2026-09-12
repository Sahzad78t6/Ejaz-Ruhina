// Central configuration for Ejaz & Ruhina's Islamic Wedding Invitation

export const weddingConfig = {
  bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahEnglish: "In the name of Allah, the most Beneficent, the most Merciful",
  blessingArabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  blessingEnglish: "May Allah bless you, bless your union, and join you together in goodness.",
  
  couple: {
    groom: {
      title: "Barkhurdar",
      fullName: "Mohammed Ejaz Khan",
      displayName: "Barkhurdar Mohammed Ejaz Khan",
      callName: "Ejaz",
      grandson: "Grandson of Marhum Haji Mohammed Rahim Khan",
      parents: "Mrs. & Mr. Hajjan Mushfira Banu & Alhaj Mohammed Yusman Khan (Arif)"
    },
    bride: {
      title: "Noor-e-Chashmi",
      fullName: "Ruhina Begum",
      displayName: "Noor-e-Chashmi Ruhina Begum",
      callName: "Ruhina",
      daughter: "Elder Daughter of Mrs. & Mr. Jaheda Begum & Mohammed Hussain (Babulal)",
      location: "Amala Kutir Road, Koraput"
    },
    subtitle: "Ejaz weds Ruhina"
  },

  invitationHeading: "Solliciting Your Blessings",
  invitationText: "Mrs. & Mr. Hajjan Mushfira Banu & Alhaj Mohammed Yusman Khan (Arif) solicit your blessings and the pleasure of your company on the auspicious occasion of the wedding ceremony of our only beloved son",

  events: [
    {
      id: "nikah",
      label: "Nikah",
      arabicTitle: "النكاح",
      dateTimeLine: "Inshallah to be solemnized on Sunday, 1st November 2026, by 7:00 PM",
      dateFormatted: "Sunday, 1st November 2026",
      time: "7:00 PM",
      targetDate: "2026-11-01T19:00:00+05:30",
      venueName: "Hotel Alishan, Koraput",
      venueAddress: "Hotel Alishan, Koraput, Odisha",
      mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Alishan+Koraput",
      mapsEmbedUrl: "https://maps.google.com/maps?q=Hotel%20Alishan%20Koraput&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "walima",
      label: "Dawat-e-Walima",
      arabicTitle: "دعوة وليمة",
      dateTimeLine: "Insha Allah on Tuesday, 3rd November 2026",
      dateFormatted: "Tuesday, 3rd November 2026",
      time: "Dinner: 7:00 PM onwards",
      targetDate: "2026-11-03T19:00:00+05:30",
      venueName: "In front of Tejaswi Hotel, Rayagada",
      venueAddress: "In front of Tejaswi Hotel, Rayagada, Odisha",
      mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Tejaswi+Hotel+Rayagada",
      mapsEmbedUrl: "https://maps.google.com/maps?q=Tejaswi%20Hotel%20Rayagada&t=&z=15&ie=UTF8&iwloc=&output=embed",
      specialNote: "Special invitation from our daughter Rukhsar, Family Members & All Well Wishers"
    }
  ],

  host: {
    from: "Mohammed Yusman Khan (Arif)",
    address: "Nehru Nagar 1st Lane, Rayagada – 765001",
    phones: [
      { display: "8917423070", tel: "8917423070" },
      { display: "8917364463", tel: "8917364463" }
    ]
  },

  gallery: [
    { id: 1, title: "Pure Elegance", desc: "A journey of two souls united in faith", image: null },
    { id: 2, title: "Blissful Beginnings", desc: "Crafting beautiful memories together", image: null },
    { id: 3, title: "Sacred Covenant", desc: "With love, prayers, and gratitude to Allah", image: null }
  ]
}
