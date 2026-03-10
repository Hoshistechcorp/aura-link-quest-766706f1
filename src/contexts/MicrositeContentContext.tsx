import { createContext, useContext, useState, ReactNode } from "react";

/* ── Types ───────────────────────────────────────────── */
export interface ContentItem {
  id: string;
  [key: string]: any;
}

interface MicrositeContentContextValue {
  contentData: Record<string, ContentItem[]>;
  setContentData: React.Dispatch<React.SetStateAction<Record<string, ContentItem[]>>>;
  updateItem: (contentType: string, itemId: string, patch: Partial<ContentItem>) => void;
  addItem: (contentType: string, item: ContentItem) => void;
  deleteItem: (contentType: string, itemId: string) => void;
  getItems: (contentType: string) => ContentItem[];
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  hours: DayHours[];
  setHours: React.Dispatch<React.SetStateAction<DayHours[]>>;
  features: MicrositeFeature[];
  setFeatures: React.Dispatch<React.SetStateAction<MicrositeFeature[]>>;
  updateFeature: (id: string, patch: Partial<MicrositeFeature>) => void;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  cuisine: string;
  priceRange: string;
  capacity: string;
  established: string;
}

export interface DayHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface MicrositeFeature {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  route: string;
  visible: boolean;
  contentType: string;
}

/* ── Helpers ─────────────────────────────────────────── */
const uid = () => crypto.randomUUID();

/* ── Default business ────────────────────────────────── */
const defaultBusiness: BusinessInfo = {
  name: "Meridian Tours",
  tagline: "Premium Tour Operator · Atlanta, USA",
  description: "Meridian Tours delivers unforgettable experiences across Atlanta, from immersive cultural walks to VIP helicopter tours and exclusive foodie adventures.",
  address: "191 Peachtree St NE, Atlanta, GA 30303",
  phone: "+1 (404) 555-0192",
  email: "info@meridiantours.com",
  website: "https://meridiantours.com",
  cuisine: "Tourism & Experiences",
  priceRange: "$$$",
  capacity: "500",
  established: "2018",
};

const defaultHours: DayHours[] = [
  { day: "Monday", open: "09:00", close: "18:00", closed: false },
  { day: "Tuesday", open: "09:00", close: "18:00", closed: false },
  { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
  { day: "Thursday", open: "09:00", close: "18:00", closed: false },
  { day: "Friday", open: "09:00", close: "18:00", closed: false },
  { day: "Saturday", open: "10:00", close: "16:00", closed: false },
  { day: "Sunday", open: "10:00", close: "16:00", closed: true },
];

/* ── Default features ────────────────────────────────── */
export const defaultFeatures: MicrositeFeature[] = [
  { id: uid(), icon: "Landmark", title: "Attractions", subtitle: "Museums & sites", route: "/destination/attractions", visible: true, contentType: "attractions" },
  { id: uid(), icon: "Compass", title: "Things To Do", subtitle: "Tours & more", route: "/destination/things-to-do", visible: true, contentType: "thingsToDo" },
  { id: uid(), icon: "Calendar", title: "Events & Festivals", subtitle: "What's on", route: "/destination/events-festivals", visible: true, contentType: "events" },
  { id: uid(), icon: "UtensilsCrossed", title: "Local Cuisine", subtitle: "Food guide", route: "/microsite/menu", visible: true, contentType: "cuisine" },
  { id: uid(), icon: "Hotel", title: "Hotels & Stays", subtitle: "Book now", route: "/destination/hotels", visible: true, contentType: "hotels" },
  { id: uid(), icon: "Palette", title: "Cultural Experiences", subtitle: "Arts & culture", route: "/destination/culture", visible: true, contentType: "culture" },
  { id: uid(), icon: "TreePine", title: "Nature & Parks", subtitle: "Outdoors", route: "/destination/nature", visible: true, contentType: "nature" },
  { id: uid(), icon: "MapPin", title: "Neighborhood Guide", subtitle: "Districts", route: "/destination/neighborhoods", visible: true, contentType: "neighborhoods" },
  { id: uid(), icon: "Train", title: "Transportation", subtitle: "Getting around", route: "/destination/transportation", visible: true, contentType: "transportation" },
  { id: uid(), icon: "Users", title: "Tour Guides", subtitle: "Expert guides", route: "/microsite/staff", visible: true, contentType: "guides" },
  { id: uid(), icon: "Camera", title: "Photo Memories", subtitle: "PicPop", route: "/destination/photos", visible: true, contentType: "photos" },
  { id: uid(), icon: "Star", title: "Traveler Reviews", subtitle: "4.9 avg", route: "/microsite/reviews", visible: true, contentType: "reviews" },
  { id: uid(), icon: "Award", title: "Top Experiences", subtitle: "Must-do", route: "/microsite/popular-dishes", visible: true, contentType: "topExperiences" },
  { id: uid(), icon: "Info", title: "About Us", subtitle: "Our story", route: "/microsite/details", visible: true, contentType: "aboutUs" },
  { id: uid(), icon: "Bot", title: "AI Travel Assistant", subtitle: "Ask anything", route: "/microsite/concierge", visible: true, contentType: "aiAssistant" },
  { id: uid(), icon: "HelpingHand", title: "VIP Experiences", subtitle: "Premium", route: "/microsite/private-dining", visible: true, contentType: "vipExperiences" },
  { id: uid(), icon: "HelpCircle", title: "Travel FAQs", subtitle: "24 answers", route: "/microsite/faqs", visible: true, contentType: "faqs" },
  { id: uid(), icon: "CalendarDays", title: "Upcoming Tours", subtitle: "Book now", route: "/microsite/events", visible: true, contentType: "upcomingTours" },
  { id: uid(), icon: "Store", title: "Local Businesses", subtitle: "Shop local", route: "/destination/local-businesses", visible: true, contentType: "localBusinesses" },
  { id: uid(), icon: "Tag", title: "Deals & Packages", subtitle: "Promotions", route: "/destination/deals", visible: true, contentType: "deals" },
  { id: uid(), icon: "Megaphone", title: "Local Creators", subtitle: "Influencers", route: "/destination/creators", visible: true, contentType: "creators" },
  { id: uid(), icon: "Globe", title: "Social Links", subtitle: "Follow us", route: "/microsite/social-links", visible: true, contentType: "socialLinks" },
  { id: uid(), icon: "Gamepad2", title: "Spin & Win", subtitle: "Win prizes", route: "/microsite/freebie-game", visible: true, contentType: "spinWin" },
  { id: uid(), icon: "Link2", title: "Refer a Traveler", subtitle: "Earn rewards", route: "/microsite/referral", visible: true, contentType: "referral" },
  { id: uid(), icon: "Handshake", title: "Travel Partners", subtitle: "Affiliate", route: "/microsite/affiliate", visible: true, contentType: "partners" },
  { id: uid(), icon: "Compass", title: "Plan Your Trip", subtitle: "Itineraries", route: "/destination/plan-trip", visible: true, contentType: "planTrip" },
  { id: uid(), icon: "Bot", title: "AI Trip Planner", subtitle: "Ask AI", route: "/destination/ai-planner", visible: true, contentType: "aiPlanner" },
  { id: uid(), icon: "Leaf", title: "Sustainability", subtitle: "Eco travel", route: "/destination/sustainability", visible: true, contentType: "sustainability" },
];

/* ── Default content data ────────────────────────────── */
export const defaultContentData: Record<string, ContentItem[]> = {
  attractions: [
    { id: uid(), name: "Georgia Aquarium", category: "Aquarium", description: "The world's largest aquarium featuring whale sharks, beluga whales, and over 100,000 animals.", address: "225 Baker St NW, Atlanta, GA", price: "39.95", hours: "9am - 9pm", website: "https://georgiaaquarium.org", featured: true },
    { id: uid(), name: "Martin Luther King Jr. National Historical Park", category: "Historic Site", description: "Birthplace, church, and final resting place of Dr. Martin Luther King Jr.", address: "450 Auburn Ave NE, Atlanta, GA", price: "Free", hours: "9am - 5pm", website: "", featured: true },
    { id: uid(), name: "World of Coca-Cola", category: "Museum", description: "Interactive museum dedicated to the history of Coca-Cola.", address: "121 Baker St NW, Atlanta, GA", price: "21.00", hours: "10am - 5pm", website: "", featured: false },
    { id: uid(), name: "Atlanta Botanical Garden", category: "Park", description: "30-acre garden featuring themed gardens and a canopy walk.", address: "1345 Piedmont Ave NE", price: "24.95", hours: "9am - 7pm", website: "", featured: false },
    { id: uid(), name: "Centennial Olympic Park", category: "Park", description: "21-acre park built for the 1996 Summer Olympics.", address: "265 Park Ave W NW", price: "Free", hours: "Open 24hrs", website: "", featured: false },
    { id: uid(), name: "High Museum of Art", category: "Museum", description: "Leading art museum with over 18,000 works.", address: "1280 Peachtree St NE", price: "16.50", hours: "10am - 5pm", website: "", featured: false },
  ],
  thingsToDo: [
    { id: uid(), name: "BeltLine Walking Tour", category: "Walking Tour", description: "Explore Atlanta's famous BeltLine trail with an expert guide covering art, history, and architecture.", duration: "2.5 hours", price: "45.00", difficulty: "Easy", groupSize: "15" },
    { id: uid(), name: "Ponce City Market Food Tour", category: "Food Tour", description: "Sample 8+ dishes from Atlanta's best food hall while learning about the city's culinary evolution.", duration: "3 hours", price: "65.00", difficulty: "Easy", groupSize: "12" },
    { id: uid(), name: "Stone Mountain Hike", category: "Adventure", description: "Guided hike to the summit of Stone Mountain with panoramic views of the Atlanta skyline.", duration: "4 hours", price: "35.00", difficulty: "Moderate", groupSize: "20" },
    { id: uid(), name: "Atlanta Street Art Walk", category: "Walking Tour", description: "Discover vibrant murals and street art across Krog Street Tunnel, Old Fourth Ward, and Cabbagetown.", duration: "2 hours", price: "30.00", difficulty: "Easy", groupSize: "15" },
  ],
  events: [
    { id: uid(), name: "Atlanta Jazz Festival", category: "Festival", description: "One of the largest free jazz festivals in the country, held annually in Piedmont Park.", date: "2026-05-23", time: "12:00", venue: "Piedmont Park", price: "Free", website: "" },
    { id: uid(), name: "Dragon Con", category: "Convention", description: "Massive multi-genre pop culture convention held every Labor Day weekend in downtown Atlanta.", date: "2026-09-04", time: "10:00", venue: "Downtown Atlanta Hotels", price: "85.00", website: "" },
    { id: uid(), name: "Music Midtown", category: "Concert", description: "Major music festival featuring top artists across genres.", date: "2026-09-19", time: "12:00", venue: "Piedmont Park", price: "150.00", website: "" },
    { id: uid(), name: "Atlanta Food & Wine Festival", category: "Food Event", description: "Celebrating Southern food, drink, and culinary traditions.", date: "2026-06-05", time: "11:00", venue: "Midtown", price: "75.00", website: "" },
    { id: uid(), name: "Peachtree Road Race", category: "Sports", description: "World's largest 10K road race, a July 4th tradition since 1970.", date: "2026-07-04", time: "07:00", venue: "Peachtree Road", price: "45.00", website: "" },
  ],
  cuisine: [
    { id: uid(), name: "Southern Fried Chicken", category: "Southern Classics", description: "Crispy, golden-brown fried chicken — an Atlanta staple served with collard greens and cornbread.", price: "16.00", restaurant: "Mary Mac's Tea Room", address: "224 Ponce de Leon Ave NE", popular: true },
    { id: uid(), name: "Peach Cobbler", category: "Desserts", description: "Warm peach cobbler with vanilla ice cream — the quintessential Georgia dessert.", price: "9.00", restaurant: "Paschal's", address: "180 Northside Dr SW", popular: true },
    { id: uid(), name: "Atlanta-Style BBQ Ribs", category: "BBQ", description: "Slow-smoked ribs with tangy tomato-based sauce, a local BBQ tradition.", price: "22.00", restaurant: "Fox Bros. Bar-B-Q", address: "1238 Dekalb Ave NE", popular: true },
    { id: uid(), name: "Shrimp & Grits", category: "Southern Classics", description: "Wild-caught shrimp, stone-ground grits, andouille sausage — a Low Country classic.", price: "22.00", restaurant: "South City Kitchen", address: "1144 Crescent Ave NE", popular: true },
    { id: uid(), name: "Korean BBQ Tacos", category: "International", description: "Bulgogi beef, kimchi slaw, gochujang aioli — from the Buford Highway corridor.", price: "16.00", restaurant: "Hankook Taqueria", address: "1341 Collier Rd NW", popular: false },
    { id: uid(), name: "Pho Ga", category: "International", description: "Chicken pho with fresh herbs — Lee's Bakery on Buford Highway.", price: "14.00", restaurant: "Lee's Bakery", address: "4005 Buford Hwy NE", popular: false },
  ],
  hotels: [
    { id: uid(), name: "The Ritz-Carlton Atlanta", category: "Luxury", description: "Five-star luxury in the heart of downtown with a world-class spa and fine dining.", priceRange: "$$$$ ($400+)", rating: "5 Stars", address: "181 Peachtree St NE", website: "" },
    { id: uid(), name: "Hotel Clermont", category: "Boutique", description: "A beautifully restored boutique hotel on Ponce de Leon with a rooftop bar and retro charm.", priceRange: "$$$ ($200-$400)", rating: "4 Stars", address: "789 Ponce De Leon Ave NE", website: "" },
    { id: uid(), name: "The Burgess Hotel", category: "Business", description: "Modern hotel in Buckhead with rooftop pool and business amenities.", priceRange: "$$$ ($200-$400)", rating: "4 Stars", address: "3600 Peachtree Rd NE", website: "" },
    { id: uid(), name: "Bellyard Hotel", category: "Boutique", description: "Urban resort in West Midtown's creative hub with industrial-chic design.", priceRange: "$$$ ($200-$400)", rating: "4 Stars", address: "1170 Howell Mill Rd NW", website: "" },
  ],
  culture: [
    { id: uid(), name: "MLK Jr. Historic District Tour", category: "History", description: "Walk through the neighborhood where Dr. King was born, preached, and is laid to rest.", duration: "2 hours", price: "Free", location: "Sweet Auburn", website: "" },
    { id: uid(), name: "High Museum Art Walk", category: "Art", description: "Guided tour of the High Museum's permanent collection and visiting exhibitions.", duration: "1.5 hours", price: "25.00", location: "Midtown", website: "" },
  ],
  nature: [
    { id: uid(), name: "Piedmont Park", category: "City Park", description: "Atlanta's premier urban park offering trails, gardens, and stunning skyline views.", address: "400 Park Dr NE", difficulty: "Easy", hours: "6am - 11pm", admission: "Free" },
    { id: uid(), name: "Chattahoochee River National Recreation Area", category: "Nature Reserve", description: "48 miles of protected river corridor with hiking, fishing, and kayaking.", address: "1978 Island Ford Pkwy", difficulty: "Moderate", hours: "Dawn to dusk", admission: "Free" },
  ],
  neighborhoods: [
    { id: uid(), name: "Midtown", vibe: "Trendy", description: "Atlanta's arts district featuring the High Museum, Piedmont Park, and vibrant dining scene.", highlights: "High Museum, Piedmont Park, Fox Theatre", gettingThere: "MARTA Midtown station", bestFor: "Art lovers, foodies" },
    { id: uid(), name: "Old Fourth Ward", vibe: "Artsy", description: "Historic neighborhood with the BeltLine Eastside Trail, Ponce City Market, and street art.", highlights: "BeltLine, Ponce City Market, Krog Street", gettingThere: "BeltLine access or rideshare", bestFor: "Hipsters, foodies, art lovers" },
  ],
  transportation: [
    { id: uid(), name: "MARTA Rail", type: "Metro/Rail", description: "Atlanta's rapid transit system connecting the airport to downtown, Midtown, and Buckhead.", price: "$2.50 per ride", coverage: "Airport, Downtown, Midtown, Buckhead", website: "https://itsmarta.com" },
    { id: uid(), name: "Atlanta Streetcar", type: "Metro/Rail", description: "Free streetcar loop connecting Centennial Olympic Park to the MLK historic district.", price: "Free", coverage: "Downtown loop", website: "" },
  ],
  guides: [
    { id: uid(), name: "James Walker", specialty: "History", bio: "Born and raised in Atlanta with 12 years of experience leading Civil Rights history tours.", experience: "12", languages: "English", rating: "5.0 ⭐", pricePerHour: "75" },
    { id: uid(), name: "Elena Rodriguez", specialty: "Food & Drink", bio: "Certified food guide specializing in Southern cuisine and Atlanta's emerging food scene.", experience: "8", languages: "English, Spanish", rating: "4.9 ⭐", pricePerHour: "85" },
    { id: uid(), name: "Marcus Johnson", specialty: "History", bio: "Atlanta native, 15+ years leading civil rights and historical tours.", experience: "15", languages: "English", rating: "4.9 ⭐", pricePerHour: "80" },
    { id: uid(), name: "Sophia Chen", specialty: "Food & Drink", bio: "Certified sommelier and food historian exploring Atlanta's diverse cuisine.", experience: "6", languages: "English, Mandarin", rating: "4.8 ⭐", pricePerHour: "90" },
  ],
  photos: [
    { id: uid(), caption: "BeltLine Eastside Trail at sunset", location: "BeltLine", category: "Nature", photographer: "Meridian Tours" },
    { id: uid(), caption: "Centennial Olympic Park fountain", location: "Downtown", category: "Landmarks", photographer: "Meridian Tours" },
  ],
  reviews: [
    { id: uid(), reviewer: "Sarah M.", rating: "5 Stars ⭐⭐⭐⭐⭐", review: "The BeltLine tour was incredible! Our guide Marcus knew every hidden gem. Highly recommend Meridian Tours for anyone visiting Atlanta.", date: "2026-02-28", tour: "BeltLine Walking Tour", verified: true },
    { id: uid(), reviewer: "James L.", rating: "4 Stars ⭐⭐⭐⭐", review: "Great food tour through Ponce City Market. Would have loved a bit more time at each stop, but the guide was fantastic.", date: "2026-02-20", tour: "Food Tour", verified: true },
    { id: uid(), reviewer: "Maria G.", rating: "5 Stars ⭐⭐⭐⭐⭐", review: "The MLK Historic District tour was deeply moving and educational. Our guide brought history to life. A must-do in Atlanta!", date: "2026-02-10", tour: "MLK History Tour", verified: true },
  ],
  topExperiences: [
    { id: uid(), name: "BeltLine Art Tour", rank: "#1 Must-Do", description: "Walk the famous Eastside Trail and discover 50+ outdoor art installations.", price: "35.00", duration: "2.5 hours", bookingUrl: "" },
    { id: uid(), name: "Georgia Aquarium VIP Access", rank: "#2 Must-Do", description: "Skip the lines and get behind-the-scenes access to the world's largest aquarium.", price: "89.00", duration: "3 hours", bookingUrl: "" },
    { id: uid(), name: "MLK Historic District Tour", rank: "#3 Must-Do", description: "Walk through the birthplace and legacy of Dr. Martin Luther King Jr.", price: "35.00", duration: "2 hours", bookingUrl: "" },
  ],
  aboutUs: [
    { id: uid(), heading: "Our Story", content: "Founded in 2018, Meridian Tours is Atlanta's premier destination management company. We specialize in curated travel experiences that showcase the best of Atlanta — from its rich civil rights history to its thriving food scene and vibrant neighborhoods." },
    { id: uid(), heading: "Our Mission", content: "We believe every visitor deserves an authentic, unforgettable experience. Our expert local guides bring the city to life through immersive walks, food tours, and exclusive VIP experiences." },
  ],
  aiAssistant: [
    { id: uid(), question: "What are the best tours in Atlanta?", answer: "Our most popular tours include the BeltLine Art Walk, the Civil Rights History Tour, and the Ponce City Food Tour.", category: "Tours", priority: "High" },
  ],
  vipExperiences: [
    { id: uid(), name: "Helicopter City Tour", category: "Helicopter", description: "See Atlanta from above on a private helicopter tour covering downtown, the BeltLine, and Stone Mountain.", price: "450.00", duration: "45 min", maxGuests: "3", includes: "Champagne, aerial photos" },
    { id: uid(), name: "Private Chef's Table", category: "Chef's Table", description: "Exclusive 7-course dinner prepared by a top Atlanta chef at a secret location.", price: "250.00", duration: "3 hours", maxGuests: "8", includes: "Wine pairings, private service" },
  ],
  faqs: [
    { id: uid(), question: "How do I book a tour?", answer: "You can book directly through our website, via the AI Travel Assistant, or by calling us at (404) 555-0192. We recommend booking at least 48 hours in advance.", category: "Planning", featured: true },
    { id: uid(), question: "What's included in tour prices?", answer: "All tours include an expert guide, transportation (where specified), entrance fees, and complimentary water. Some include meals — check individual descriptions.", category: "Planning", featured: true },
    { id: uid(), question: "Do you offer private tours?", answer: "Yes! We offer customized private tours for groups of 2-50 people. Visit our VIP Experiences page or contact us for a personalized itinerary.", category: "Tours", featured: false },
    { id: uid(), question: "What's the best time to visit Atlanta?", answer: "Spring (March-May) and Fall (September-November) offer the best weather. Summer is great for outdoor adventures, winter has excellent holiday events.", category: "Planning", featured: true },
    { id: uid(), question: "Are your tours wheelchair accessible?", answer: "Most walking tours are wheelchair accessible. Contact us in advance so we can ensure proper accommodations. We also offer driving tours.", category: "Accessibility", featured: false },
    { id: uid(), question: "What's your cancellation policy?", answer: "Free cancellation up to 24 hours before tour start. Cancellations within 24 hours are subject to a 50% fee.", category: "Payments", featured: false },
  ],
  upcomingTours: [
    { id: uid(), name: "Civil Rights Heritage Walk", category: "History", description: "Guided walking tour through Atlanta's civil rights landmarks with a historian.", date: "2026-03-15", time: "09:00", price: "40.00", spotsLeft: "8", meetingPoint: "MLK Center entrance" },
    { id: uid(), name: "Atlanta Food Crawl", category: "Food", description: "Taste your way through 6 iconic Atlanta eateries with a local food guide.", date: "2026-03-18", time: "11:00", price: "65.00", spotsLeft: "5", meetingPoint: "Ponce City Market" },
    { id: uid(), name: "Sunset BeltLine Bike Tour", category: "Bike", description: "Cycle the Atlanta BeltLine at golden hour with stops at murals and art installations.", date: "2026-03-22", time: "17:00", price: "55.00", spotsLeft: "12", meetingPoint: "Krog Street Market" },
  ],
  localBusinesses: [
    { id: uid(), name: "Ponce City Market", category: "Market", description: "Historic Sears building converted into Atlanta's premier food hall and shopping destination.", address: "675 Ponce De Leon Ave NE", phone: "+1 (404) 900-7900", website: "", featured: true },
  ],
  deals: [
    { id: uid(), title: "20% Off BeltLine Tours", type: "Discount", description: "Book any BeltLine tour this month and save 20%.", discount: "20% OFF", originalPrice: "45.00", validUntil: "2026-03-31", code: "BELTLINE20" },
  ],
  creators: [
    { id: uid(), name: "@atlantafoodie", platform: "Instagram", bio: "Atlanta's top food content creator sharing the best eats in the city.", followers: "125K", niche: "Food", profileUrl: "" },
  ],
  socialLinks: [
    { id: uid(), platform: "Instagram", url: "https://instagram.com/meridiantours", handle: "@meridiantours", followers: "45K" },
    { id: uid(), platform: "TikTok", url: "https://tiktok.com/@meridiantours", handle: "@meridiantours", followers: "28K" },
    { id: uid(), platform: "YouTube", url: "https://youtube.com/meridiantours", handle: "Meridian Tours", followers: "15K" },
    { id: uid(), platform: "Facebook", url: "https://facebook.com/meridiantours", handle: "MeridianToursATL", followers: "32K" },
    { id: uid(), platform: "Twitter/X", url: "https://x.com/meridiantours", handle: "@meridian_tours", followers: "18K" },
  ],
  spinWin: [
    { id: uid(), prize: "Free Walking Tour", type: "Free Tour", description: "Win a free BeltLine Walking Tour for two!", probability: "5", quantity: "20", validDays: "30", active: true },
    { id: uid(), prize: "20% Off Any Tour", type: "Discount", description: "Save 20% on your next booking.", probability: "15", quantity: "100", validDays: "14", active: true },
  ],
  referral: [
    { id: uid(), name: "Bronze Referrer", referralsNeeded: "3", reward: "$25 Tour Credit", description: "Refer 3 friends and earn a $25 credit toward any tour.", active: true },
    { id: uid(), name: "Silver Referrer", referralsNeeded: "10", reward: "Free Tour + Merch", description: "Refer 10 friends and get a free tour plus Meridian swag.", active: true },
  ],
  partners: [
    { id: uid(), name: "Atlanta Convention & Visitors Bureau", type: "Tourism Board", description: "Official tourism partnership for coordinated visitor marketing.", commission: "12", website: "https://discoveratlanta.com", active: true },
  ],
  planTrip: [
    { id: uid(), name: "3-Day Atlanta Explorer", duration: "3 Days", description: "The perfect introduction covering history, food, and culture.", highlights: "BeltLine, Aquarium, Midtown food scene, MLK Historic Site", budget: "500", bestFor: "Couples" },
  ],
  aiPlanner: [
    { id: uid(), scenario: "First time visitor, 3 days", category: "General", suggestedPlan: "Day 1: Downtown & MLK Historic Site. Day 2: BeltLine & Ponce City Market. Day 3: Midtown museums & Piedmont Park.", tips: "Get a MARTA Breeze pass for easy transport." },
  ],
  sustainability: [
    { id: uid(), name: "Carbon-Neutral Tours", category: "Carbon Offset", description: "All walking tours are naturally carbon-neutral. For vehicle tours, we offset 100% through verified programs.", impact: "500 tons CO2 offset annually", partner: "One Tree Planted" },
  ],
};

/* ── Context ─────────────────────────────────────────── */
const MicrositeContentContext = createContext<MicrositeContentContextValue | null>(null);

export const MicrositeContentProvider = ({ children }: { children: ReactNode }) => {
  const [contentData, setContentData] = useState<Record<string, ContentItem[]>>(defaultContentData);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusiness);
  const [hours, setHours] = useState<DayHours[]>(defaultHours);
  const [features, setFeatures] = useState<MicrositeFeature[]>(defaultFeatures);

  const updateItem = (contentType: string, itemId: string, patch: Partial<ContentItem>) => {
    setContentData((prev) => ({
      ...prev,
      [contentType]: (prev[contentType] || []).map((item) =>
        item.id === itemId ? { ...item, ...patch } : item
      ),
    }));
  };

  const addItem = (contentType: string, item: ContentItem) => {
    setContentData((prev) => ({
      ...prev,
      [contentType]: [...(prev[contentType] || []), item],
    }));
  };

  const deleteItem = (contentType: string, itemId: string) => {
    setContentData((prev) => ({
      ...prev,
      [contentType]: (prev[contentType] || []).filter((item) => item.id !== itemId),
    }));
  };

  const getItems = (contentType: string) => contentData[contentType] || [];

  const updateFeature = (id: string, patch: Partial<MicrositeFeature>) => {
    setFeatures((f) => f.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  return (
    <MicrositeContentContext.Provider value={{
      contentData, setContentData, updateItem, addItem, deleteItem, getItems,
      businessInfo, setBusinessInfo, hours, setHours,
      features, setFeatures, updateFeature,
    }}>
      {children}
    </MicrositeContentContext.Provider>
  );
};

export const useMicrositeContent = () => {
  const ctx = useContext(MicrositeContentContext);
  if (!ctx) throw new Error("useMicrositeContent must be used within MicrositeContentProvider");
  return ctx;
};
