/* ==========================================================================
   SITE CONTENT — every word on the page lives in this file.
   Edit the text between the quotes; the page layout picks it up
   automatically. No HTML knowledge needed.

   Tips
   - Keep the quote marks. Use \" if you need a quote mark inside text.
   - Paragraph lists are [ "first", "second" ] — add or remove entries freely.
   - Books: add an entry to books.items and it appears as a card.
   ========================================================================== */

window.SITE_CONTENT = {
  meta: {
    title: "JM Cook | Author",
    description:
      "JM Cook writes romance with a thread of suspense and crime, from the East Coast of England. Debut novel coming soon.",
  },

  author: {
    name: "JM Cook",
    role: "Author",
  },

  logo: {
    src: "assets/images/jmcook-logo.jpeg",
    alt: "JM Cook, Author. The logo shows an open book inside a heart made of spring flowers: pink and yellow tulips, white daisies, bluebells and lavender, on a deep green background.",
  },

  nav: [
    { label: "Home", href: "#top" },
    { label: "Coming soon", href: "#coming-soon" },
    { label: "About me", href: "#about" },
    { label: "Books", href: "#books" },
    { label: "Newsletter", href: "#newsletter" },
  ],

  hero: {
    greeting: "Welcome!",
    heading: "Grab a coffee, pull up a chair and have an explore!",
    intro:
      "Romance with a little suspense, a touch of crime, and a whole lot of heart. Written from a small town on the East Coast of England.",
    cta: { label: "See what's coming soon", href: "#coming-soon" },
  },

  comingSoon: {
    heading: "Coming soon",
    kicker: "My debut novel",
    title: "Title to be announced",
    paragraphs: [
      "My first novel is nearly ready, and it's the start of a series. Expect romance, a thread of suspense, and characters you'll want to spend a few more books with.",
      "Sign up to the newsletter to be the first to hear the title, see the cover and find out the release date.",
    ],
    cta: { label: "Join the newsletter", href: "#newsletter" },
    coverLine1: "JM Cook",
    coverLine2: "Cover reveal soon",
  },

  about: {
    heading: "About me",
    intro: "A bit about me…",
    paragraphs: [
      "I am a wife of 21 years and a mother of 3 teenage and adult daughters, 4 quirky cats (one of whom likes to be involved in all admin tasks!) and a Jackawawa who thinks he's a cat, along with a furry Grandpuppy who is into everything she shouldn't be! So my day revolves around kids, animals, coffee and podcasts with a bit of writing! We live on the East Coast of England in a small town.",
      "I have always enjoyed writing since being a teenager. It became difficult after losing the rest of my vision whilst pregnant with my eldest child and becoming completely blind. Over recent years I have had the time to dedicate to my writing, learning how to write and edit and use social media, blind!! I enjoy writing romance with some suspense and crime and especially love series, and therefore have started to create one of my own! My debut novel will be coming soon.",
      "I grew up in the 80's and 90's and fell in love with 90's Country Music. That love has continued and I have been able to pass that love on to my children (or railroad them into it depending on your point of view!). I have a wide range of interests ranging from history, especially the Second World War and the medieval period, to true crime, no similarities there then! My love of reading is equally as eclectic, anything from historical books and cook books (who doesn't love a good cook book!) to romance and crime and suspense.",
    ],
    factsHeading: "The writing desk, at a glance",
    facts: [
      { label: "Fuelled by", value: "Coffee and podcasts" },
      { label: "Soundtrack", value: "90's country music" },
      { label: "Admin assistant", value: "One of four quirky cats" },
      { label: "Security team", value: "A Jackawawa who thinks he's a cat" },
      { label: "Home", value: "A small town on the East Coast of England" },
      { label: "Rabbit holes", value: "WW2, the medieval period and true crime" },
    ],
  },

  books: {
    heading: "Books",
    intro: "Every book will live here, with a blurb and where to buy it.",
    emptyMessage:
      "The shelf is empty for now, but not for long. The first book in the series is on its way.",
    // Example entry (copy, remove the // marks, and fill in):
    // { title: "Book title", series: "Series name, book 1", blurb: "Short description.",
    //   cover: "assets/images/book-1.jpg", coverAlt: "Describe the cover art here.",
    //   link: { label: "Buy on Amazon", href: "https://..." } },
    items: [],
  },

  newsletter: {
    heading: "Newsletter",
    intro:
      "News, cover reveals, release dates and the occasional cat update. No spam, just the good stuff.",
    label: "Your email address",
    hint: "I'll only use this to send you the newsletter. Unsubscribe any time.",
    button: "Sign me up",
    errorEmpty: "Please enter your email address.",
    errorInvalid: "That doesn't look like a complete email address. Please check it and try again.",
    success:
      "Thank you! This is a preview of the site, so sign-up isn't connected yet and nothing was sent.",
  },

  footer: {
    note: "Website in progress. Thanks for stopping by!",
  },
};
