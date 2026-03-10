// Mock data for Visit Dallas tourism site

export interface Attraction {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: string;
  priceLevel: number; // 0=free, 1=$, 2=$$, 3=$$$
  address: string;
  hours: string;
  tags: string[];
  featured?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceLevel: number;
  address: string;
  hours: string;
  tags: string[];
  featured?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  priceLevel: number;
  address: string;
  amenities: string[];
  featured?: boolean;
}

export interface DallasEvent {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  time: string;
  category: string;
  venue: string;
  neighborhood: string;
  image: string;
  description: string;
  price: string;
  tags: string[];
  featured?: boolean;
}

export interface WorldCupMatch {
  id: string;
  teams: [string, string];
  teamFlags: [string, string];
  date: string;
  time: string;
  stage: string;
  venue: string;
  preGameRecs: string[];
  postGameRecs: string[];
}

export interface FanZone {
  id: string;
  name: string;
  location: string;
  capacity: string;
  features: string[];
  hours: string;
}

export const attractions: Attraction[] = [
  {
    id: "reunion-tower",
    name: "Reunion Tower GeO-Deck",
    category: "Landmarks",
    neighborhood: "Downtown",
    image: "",
    description: "Soar 470 feet above Dallas for breathtaking 360° views from the iconic GeO-Deck observation tower. Interactive touch screens identify landmarks across the skyline.",
    rating: 4.5,
    reviewCount: 3200,
    price: "$22 adults",
    priceLevel: 1,
    address: "300 Reunion Blvd E, Dallas, TX 75207",
    hours: "Sun–Thu 10am–9pm, Fri–Sat 10am–10pm",
    tags: ["Family Friendly", "Iconic", "Views"],
    featured: true,
  },
  {
    id: "sixth-floor",
    name: "The Sixth Floor Museum",
    category: "Museums",
    neighborhood: "West End",
    image: "",
    description: "Located in the former Texas School Book Depository, this museum chronicles the life, assassination, and legacy of President John F. Kennedy.",
    rating: 4.7,
    reviewCount: 5800,
    price: "$18 adults",
    priceLevel: 1,
    address: "411 Elm St, Dallas, TX 75202",
    hours: "Tue–Sun 10am–5pm",
    tags: ["History", "Must See", "Educational"],
    featured: true,
  },
  {
    id: "dallas-arboretum",
    name: "Dallas Arboretum & Botanical Garden",
    category: "Nature",
    neighborhood: "East Dallas",
    image: "",
    description: "66 acres of magnificent gardens on the shores of White Rock Lake, featuring seasonal floral displays, a children's adventure garden, and stunning lake views.",
    rating: 4.8,
    reviewCount: 4100,
    price: "$17 adults",
    priceLevel: 1,
    address: "8525 Garland Rd, Dallas, TX 75218",
    hours: "Daily 9am–5pm",
    tags: ["Nature", "Family Friendly", "Photography"],
    featured: true,
  },
  {
    id: "perot-museum",
    name: "Perot Museum of Nature & Science",
    category: "Museums",
    neighborhood: "Downtown",
    image: "",
    description: "A world-class museum featuring 11 permanent exhibit halls covering everything from dinosaurs to space, gems, and human anatomy.",
    rating: 4.6,
    reviewCount: 3900,
    price: "$22 adults",
    priceLevel: 2,
    address: "2201 N Field St, Dallas, TX 75201",
    hours: "Mon–Sat 10am–5pm, Sun 12pm–5pm",
    tags: ["Family Friendly", "Science", "Interactive"],
  },
  {
    id: "dallas-arts",
    name: "Dallas Arts District",
    category: "Arts & Culture",
    neighborhood: "Downtown",
    image: "",
    description: "The largest contiguous urban arts district in the nation, home to the Dallas Museum of Art, Nasher Sculpture Center, AT&T Performing Arts Center, and more.",
    rating: 4.7,
    reviewCount: 2700,
    price: "Free–$15",
    priceLevel: 0,
    address: "Flora St & Pearl St, Dallas, TX 75201",
    hours: "Varies by venue",
    tags: ["Art", "Culture", "Free", "Walking"],
    featured: true,
  },
  {
    id: "klyde-warren",
    name: "Klyde Warren Park",
    category: "Parks",
    neighborhood: "Downtown",
    image: "",
    description: "A 5.2-acre deck park built over a freeway, featuring food trucks, free fitness classes, games, concerts, and a beautiful green space in the heart of downtown.",
    rating: 4.6,
    reviewCount: 4500,
    price: "Free",
    priceLevel: 0,
    address: "2012 Woodall Rodgers Fwy, Dallas, TX 75201",
    hours: "Daily 6am–11pm",
    tags: ["Free", "Food Trucks", "Outdoor", "Family Friendly"],
  },
  {
    id: "bishops-arts",
    name: "Bishop Arts District",
    category: "Neighborhoods",
    neighborhood: "Oak Cliff",
    image: "",
    description: "A vibrant, walkable neighborhood filled with eclectic boutiques, restaurants, galleries, and street art. Perfect for an afternoon of exploring and dining.",
    rating: 4.5,
    reviewCount: 1800,
    price: "Free to explore",
    priceLevel: 0,
    address: "Bishop Ave & Davis St, Dallas, TX 75208",
    hours: "Most shops 10am–6pm",
    tags: ["Shopping", "Food", "Art", "Walkable"],
  },
  {
    id: "deep-ellum",
    name: "Deep Ellum",
    category: "Neighborhoods",
    neighborhood: "Deep Ellum",
    image: "",
    description: "Dallas's most eclectic entertainment district, famous for live music venues, vibrant murals, breweries, and a thriving nightlife scene.",
    rating: 4.4,
    reviewCount: 3100,
    price: "Free to explore",
    priceLevel: 0,
    address: "Main St & Elm St, Dallas, TX 75226",
    hours: "Most venues open evening",
    tags: ["Nightlife", "Music", "Murals", "Bars"],
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "pecan-lodge",
    name: "Pecan Lodge",
    cuisine: "Texas BBQ",
    neighborhood: "Deep Ellum",
    image: "",
    description: "Legendary Texas BBQ featuring award-winning brisket, ribs, and homemade sides. Expect long lines — it's worth every minute.",
    rating: 4.7,
    reviewCount: 8200,
    priceLevel: 2,
    address: "2702 Main St, Dallas, TX 75226",
    hours: "Tue–Sun 11am–3pm",
    tags: ["BBQ", "Must Try", "Award Winning"],
    featured: true,
  },
  {
    id: "lucia",
    name: "Lucia",
    cuisine: "Italian",
    neighborhood: "Bishop Arts",
    image: "",
    description: "Intimate Italian dining featuring house-made pastas, charcuterie, and an exceptional wine list in a cozy Bishop Arts setting.",
    rating: 4.8,
    reviewCount: 1200,
    priceLevel: 3,
    address: "408 W 8th St, Dallas, TX 75208",
    hours: "Tue–Sat 5:30pm–10pm",
    tags: ["Fine Dining", "Pasta", "Romantic"],
    featured: true,
  },
  {
    id: "uchi",
    name: "Uchi Dallas",
    cuisine: "Japanese",
    neighborhood: "Oak Lawn",
    image: "",
    description: "Innovative Japanese cuisine with a Texas twist. Known for creative sushi, sashimi, and hot tastings in a sleek, modern space.",
    rating: 4.7,
    reviewCount: 2100,
    priceLevel: 3,
    address: "2817 Maple Ave, Dallas, TX 75201",
    hours: "Sun–Thu 5pm–10pm, Fri–Sat 5pm–11pm",
    tags: ["Sushi", "Upscale", "Date Night"],
  },
  {
    id: "el-bolero",
    name: "El Bolero",
    cuisine: "Mexican",
    neighborhood: "Bishop Arts",
    image: "",
    description: "Upscale Tex-Mex with tableside guacamole, premium margaritas, and stunning décor in the Bishop Arts District.",
    rating: 4.5,
    reviewCount: 1800,
    priceLevel: 2,
    address: "114 W Davis St, Dallas, TX 75208",
    hours: "Daily 11am–10pm",
    tags: ["Tex-Mex", "Margaritas", "Brunch"],
  },
  {
    id: "cattleack",
    name: "Cattleack Barbeque",
    cuisine: "Texas BBQ",
    neighborhood: "Addison",
    image: "",
    description: "Hidden gem serving some of the best brisket in Texas. Only open Thu–Sat, sells out fast. Cash or card, no reservations.",
    rating: 4.9,
    reviewCount: 3400,
    priceLevel: 2,
    address: "13628 Gamma Rd, Dallas, TX 75244",
    hours: "Thu–Sat 10:30am until sold out",
    tags: ["BBQ", "Hidden Gem", "Cash"],
  },
  {
    id: "flora-street",
    name: "Flora Street Café",
    cuisine: "New American",
    neighborhood: "Arts District",
    image: "",
    description: "Elegant dining by Stephan Pyles in the heart of the Arts District, featuring bold flavors and artistic presentation.",
    rating: 4.6,
    reviewCount: 900,
    priceLevel: 3,
    address: "2330 Flora St, Dallas, TX 75201",
    hours: "Tue–Sat 5:30pm–10pm",
    tags: ["Fine Dining", "Arts District", "Cocktails"],
    featured: true,
  },
];

export const hotels: Hotel[] = [
  {
    id: "joule",
    name: "The Joule Dallas",
    category: "Luxury",
    neighborhood: "Downtown",
    image: "",
    description: "A luxury boutique hotel in a 1920s neo-Gothic landmark, featuring a rooftop pool, world-class spa, and curated art collection.",
    rating: 4.8,
    reviewCount: 2100,
    pricePerNight: 350,
    priceLevel: 3,
    address: "1530 Main St, Dallas, TX 75201",
    amenities: ["Rooftop Pool", "Spa", "Fitness Center", "Valet Parking", "Restaurant"],
    featured: true,
  },
  {
    id: "ritz-dallas",
    name: "The Ritz-Carlton, Dallas",
    category: "Luxury",
    neighborhood: "Uptown",
    image: "",
    description: "Five-star luxury in the heart of Uptown, offering impeccable service, a world-class spa, and stunning city views.",
    rating: 4.7,
    reviewCount: 1800,
    pricePerNight: 425,
    priceLevel: 3,
    address: "2121 McKinney Ave, Dallas, TX 75201",
    amenities: ["Spa", "Pool", "Fine Dining", "Concierge", "Fitness Center"],
    featured: true,
  },
  {
    id: "adolphus",
    name: "The Adolphus Hotel",
    category: "Historic",
    neighborhood: "Downtown",
    image: "",
    description: "A Beaux-Arts masterpiece since 1912, beautifully restored with modern amenities, rooftop bar, and French brasserie.",
    rating: 4.6,
    reviewCount: 1500,
    pricePerNight: 280,
    priceLevel: 3,
    address: "1321 Commerce St, Dallas, TX 75202",
    amenities: ["Rooftop Bar", "Restaurant", "Spa", "Fitness Center", "Historic Tours"],
  },
  {
    id: "canopy-dallas",
    name: "Canopy by Hilton Dallas Uptown",
    category: "Boutique",
    neighborhood: "Uptown",
    image: "",
    description: "A vibrant, locally inspired hotel in Uptown with a rooftop pool, complimentary bikes, and proximity to Katy Trail.",
    rating: 4.4,
    reviewCount: 950,
    pricePerNight: 189,
    priceLevel: 2,
    address: "2015 N Lamar St, Dallas, TX 75202",
    amenities: ["Rooftop Pool", "Bikes", "Restaurant", "Fitness Center"],
  },
  {
    id: "nylo-dallas",
    name: "NYLO Dallas South Side",
    category: "Boutique",
    neighborhood: "Cedars",
    image: "",
    description: "Converted from a 1920s Sears warehouse, this loft-style hotel offers industrial-chic design and rooftop views.",
    rating: 4.3,
    reviewCount: 720,
    pricePerNight: 155,
    priceLevel: 2,
    address: "1325 S Lamar St, Dallas, TX 75215",
    amenities: ["Rooftop Pool", "Restaurant", "Pet Friendly", "Fitness Center"],
  },
  {
    id: "hampton-deep",
    name: "Hampton Inn & Suites Deep Ellum",
    category: "Value",
    neighborhood: "Deep Ellum",
    image: "",
    description: "Modern and affordable in the heart of Deep Ellum, steps from live music, restaurants, and nightlife.",
    rating: 4.2,
    reviewCount: 480,
    pricePerNight: 119,
    priceLevel: 1,
    address: "2605 Main St, Dallas, TX 75226",
    amenities: ["Free Breakfast", "Fitness Center", "Parking", "Pool"],
  },
];

export const events: DallasEvent[] = [
  {
    id: "state-fair",
    name: "State Fair of Texas",
    date: "2026-09-25",
    endDate: "2026-11-01",
    time: "10:00 AM – 9:00 PM",
    category: "Festival",
    venue: "Fair Park",
    neighborhood: "South Dallas",
    image: "",
    description: "The largest state fair in the country, featuring Big Tex, the famous corny dog, livestock exhibits, concerts, and thrilling rides.",
    price: "$25 adults",
    tags: ["Family", "Food", "Music", "Rides"],
    featured: true,
  },
  {
    id: "taste-dallas",
    name: "Taste of Dallas",
    date: "2026-06-12",
    endDate: "2026-06-14",
    time: "11:00 AM – 10:00 PM",
    category: "Food & Drink",
    venue: "Klyde Warren Park",
    neighborhood: "Downtown",
    image: "",
    description: "The city's premier food festival showcasing the best restaurants, food trucks, craft beverages, and live entertainment.",
    price: "$15 GA",
    tags: ["Food", "Drinks", "Live Music"],
    featured: true,
  },
  {
    id: "deep-ellum-fest",
    name: "Deep Ellum Arts Festival",
    date: "2026-04-03",
    endDate: "2026-04-05",
    time: "11:00 AM – 8:00 PM",
    category: "Arts & Culture",
    venue: "Deep Ellum Streets",
    neighborhood: "Deep Ellum",
    image: "",
    description: "Annual free outdoor arts festival featuring 200+ artists, live music on multiple stages, craft vendors, and interactive art installations.",
    price: "Free",
    tags: ["Art", "Music", "Free", "Outdoor"],
    featured: true,
  },
  {
    id: "dallas-marathon",
    name: "BMW Dallas Marathon",
    date: "2026-12-13",
    time: "7:00 AM",
    category: "Sports",
    venue: "City Hall Plaza",
    neighborhood: "Downtown",
    image: "",
    description: "One of the nation's most scenic urban marathons, winding through Dallas's most iconic neighborhoods.",
    price: "$85–$145",
    tags: ["Running", "Sports", "Fitness"],
  },
  {
    id: "holiday-parade",
    name: "Dallas Holiday Parade",
    date: "2026-12-05",
    time: "10:00 AM",
    category: "Holiday",
    venue: "Downtown Dallas",
    neighborhood: "Downtown",
    image: "",
    description: "Annual holiday parade featuring floats, marching bands, celebrities, and Santa Claus through the heart of downtown.",
    price: "Free",
    tags: ["Holiday", "Family", "Free", "Parade"],
  },
  {
    id: "cinco-oak-cliff",
    name: "Cinco de Mayo Oak Cliff",
    date: "2026-05-05",
    time: "12:00 PM – 10:00 PM",
    category: "Cultural",
    venue: "Jefferson Blvd",
    neighborhood: "Oak Cliff",
    image: "",
    description: "Vibrant Cinco de Mayo celebration with live mariachi, folklorico dance, authentic food vendors, and family activities.",
    price: "Free",
    tags: ["Cultural", "Music", "Food", "Family"],
  },
  {
    id: "dart-jazz",
    name: "Dallas Jazz Festival",
    date: "2026-07-17",
    endDate: "2026-07-19",
    time: "6:00 PM – 11:00 PM",
    category: "Music",
    venue: "Fair Park",
    neighborhood: "South Dallas",
    image: "",
    description: "Three nights of world-class jazz performances featuring Grammy-winning artists under the stars.",
    price: "$45–$125",
    tags: ["Jazz", "Music", "Outdoor", "Night"],
  },
  {
    id: "art-walk",
    name: "First Saturday Art Walk",
    date: "2026-04-04",
    time: "5:00 PM – 9:00 PM",
    category: "Arts & Culture",
    venue: "Bishop Arts District",
    neighborhood: "Oak Cliff",
    image: "",
    description: "Monthly gallery walk through Bishop Arts featuring open studios, wine tastings, and live performances.",
    price: "Free",
    tags: ["Art", "Free", "Walkable", "Monthly"],
  },
];

export const worldCupMatches: WorldCupMatch[] = [
  {
    id: "wc-1",
    teams: ["USA", "England"],
    teamFlags: ["🇺🇸", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],
    date: "2026-06-14",
    time: "4:00 PM",
    stage: "Group Stage",
    venue: "AT&T Stadium",
    preGameRecs: ["Fan Zone at Victory Park (opens 10 AM)", "Pre-game brunch at Pecan Lodge"],
    postGameRecs: ["Deep Ellum nightlife", "Celebration at Klyde Warren Park"],
  },
  {
    id: "wc-2",
    teams: ["Brazil", "Germany"],
    teamFlags: ["🇧🇷", "🇩🇪"],
    date: "2026-06-18",
    time: "7:00 PM",
    stage: "Group Stage",
    venue: "AT&T Stadium",
    preGameRecs: ["Brazilian food at Rodeo Goat", "Fan march starts at 4 PM"],
    postGameRecs: ["Post-match party at Happiest Hour", "Late-night tacos at El Bolero"],
  },
  {
    id: "wc-3",
    teams: ["Argentina", "Mexico"],
    teamFlags: ["🇦🇷", "🇲🇽"],
    date: "2026-06-22",
    time: "1:00 PM",
    stage: "Group Stage",
    venue: "AT&T Stadium",
    preGameRecs: ["Oak Cliff Cinco-style tailgate", "Pre-game at Texas Live!"],
    postGameRecs: ["Victory celebration at Bishop Arts", "Mexican food crawl"],
  },
  {
    id: "wc-4",
    teams: ["France", "Spain"],
    teamFlags: ["🇫🇷", "🇪🇸"],
    date: "2026-06-26",
    time: "4:00 PM",
    stage: "Round of 16",
    venue: "AT&T Stadium",
    preGameRecs: ["Brunch at The Adolphus", "Fan Zone opens at noon"],
    postGameRecs: ["Wine & tapas at Lucia", "Rooftop celebration at The Joule"],
  },
  {
    id: "wc-5",
    teams: ["TBD", "TBD"],
    teamFlags: ["⚽", "⚽"],
    date: "2026-07-04",
    time: "7:00 PM",
    stage: "Quarter-Final",
    venue: "AT&T Stadium",
    preGameRecs: ["July 4th festivities at Fair Park", "All-American BBQ at Cattleack"],
    postGameRecs: ["Fireworks viewing at Reunion Tower", "Victory Park block party"],
  },
  {
    id: "wc-6",
    teams: ["TBD", "TBD"],
    teamFlags: ["⚽", "⚽"],
    date: "2026-07-11",
    time: "4:00 PM",
    stage: "Semi-Final",
    venue: "AT&T Stadium",
    preGameRecs: ["VIP fan experience at Victory Park", "Uptown brunch crawl"],
    postGameRecs: ["Gala at The Ritz-Carlton", "Deep Ellum after-party"],
  },
];

export const fanZones: FanZone[] = [
  {
    id: "fz-1",
    name: "Victory Park Fan Zone",
    location: "Victory Park, Downtown Dallas",
    capacity: "15,000",
    features: ["Giant Screens", "Live Music Stage", "Food Village", "Beer Garden", "Kids Zone", "Team Merchandise"],
    hours: "Opens 4 hours before each match",
  },
  {
    id: "fz-2",
    name: "Klyde Warren World Cup Village",
    location: "Klyde Warren Park, Downtown",
    capacity: "8,000",
    features: ["Outdoor Viewing", "International Food Court", "Cultural Performances", "VR Experience"],
    hours: "Daily 10 AM – 11 PM during tournament",
  },
  {
    id: "fz-3",
    name: "Fair Park International Pavilion",
    location: "Fair Park, South Dallas",
    capacity: "20,000",
    features: ["Indoor/Outdoor Screens", "Country Pavilions", "World Food Market", "Live Entertainment", "Parking"],
    hours: "Match days + weekends 11 AM – midnight",
  },
  {
    id: "fz-4",
    name: "Bishop Arts Street Festival",
    location: "Bishop Arts District, Oak Cliff",
    capacity: "5,000",
    features: ["Street Viewing", "Local Restaurants", "Art Pop-ups", "Live DJs"],
    hours: "Match days 2 PM – 11 PM",
  },
];

export const categories = {
  attractions: ["All", "Landmarks", "Museums", "Nature", "Parks", "Arts & Culture", "Neighborhoods"],
  restaurants: ["All", "Texas BBQ", "Italian", "Japanese", "Mexican", "New American", "Seafood"],
  hotels: ["All", "Luxury", "Historic", "Boutique", "Value"],
  events: ["All", "Festival", "Food & Drink", "Arts & Culture", "Sports", "Music", "Cultural", "Holiday"],
};

export const neighborhoods = [
  "All",
  "Downtown",
  "Deep Ellum",
  "Uptown",
  "Bishop Arts",
  "Oak Cliff",
  "Oak Lawn",
  "Arts District",
  "West End",
  "East Dallas",
  "South Dallas",
  "Addison",
  "Cedars",
];

export const priceLevels = [
  { label: "All", value: -1 },
  { label: "Free", value: 0 },
  { label: "$", value: 1 },
  { label: "$$", value: 2 },
  { label: "$$$", value: 3 },
];

export const navLinks = [
  { label: "Things to Do", path: "/dallas/attractions" },
  { label: "Eat & Drink", path: "/dallas/restaurants" },
  { label: "Stay", path: "/dallas/hotels" },
  { label: "Events", path: "/dallas/events" },
  { label: "World Cup", path: "/dallas/worldcup" },
  { label: "Trip Ideas", path: "/dallas/trip-ideas" },
];
