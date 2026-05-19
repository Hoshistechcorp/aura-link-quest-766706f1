import type { ContentItem } from "@/contexts/MicrositeContentContext";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "toggle" | "date" | "time" | "url" | "image";
  placeholder?: string;
  maxLength?: number;
  options?: string[];
  half?: boolean;
  third?: boolean;
}

export interface ModuleConfig {
  contentType: string;
  title: string;
  subtitle: string;
  itemLabel: string;
  fields: FieldConfig[];
  defaultItem: () => ContentItem;
}

const uid = () => crypto.randomUUID();

export const moduleConfigs: Record<string, ModuleConfig> = {
  attractions: {
    contentType: "attractions",
    title: "Attractions",
    subtitle: "Museums, monuments & sites visitors should not miss",
    itemLabel: "Attraction",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "e.g. Georgia Aquarium", maxLength: 80, half: true },
      { key: "category", label: "Category", type: "select", options: ["Museum", "Monument", "Park", "Historic Site", "Gallery", "Aquarium", "Zoo", "Theater"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What makes this attraction special?", maxLength: 300 },
      { key: "address", label: "Address", type: "text", placeholder: "123 Main St, Atlanta, GA", maxLength: 150, half: true },
      { key: "price", label: "Entry Price ($)", type: "text", placeholder: "25.00", maxLength: 10, half: true },
      { key: "hours", label: "Opening Hours", type: "text", placeholder: "9am - 6pm daily", maxLength: 50, half: true },
      { key: "website", label: "Website", type: "url", placeholder: "https://...", maxLength: 200, half: true },
      { key: "featured", label: "Featured", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Museum", description: "", address: "", price: "", hours: "", website: "", featured: false, image: "" }),
  },
  events: {
    contentType: "events",
    title: "Events & Festivals",
    subtitle: "Concerts, festivals, conventions and what's on",
    itemLabel: "Event",
    fields: [
      { key: "name", label: "Event Name", type: "text", placeholder: "e.g. Atlanta Jazz Festival", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Festival", "Concert", "Convention", "Sports", "Art Show", "Food Event", "Cultural", "Holiday"], half: true },
      { key: "image", label: "Event Image", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What's happening?", maxLength: 300 },
      { key: "date", label: "Date", type: "date", half: true },
      { key: "time", label: "Time", type: "time", half: true },
      { key: "venue", label: "Venue", type: "text", placeholder: "Piedmont Park", maxLength: 100, half: true },
      { key: "price", label: "Ticket Price ($)", type: "text", placeholder: "Free / 35.00", maxLength: 20, half: true },
      { key: "website", label: "Tickets URL", type: "url", placeholder: "https://...", maxLength: 200 },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Festival", description: "", date: "", time: "", venue: "", price: "", website: "", image: "" }),
  },
  cuisine: {
    contentType: "cuisine",
    title: "Dining",
    subtitle: "Local dishes, restaurants and food guides",
    itemLabel: "Dish",
    fields: [
      { key: "name", label: "Dish Name", type: "text", placeholder: "e.g. Southern Fried Chicken", maxLength: 80, half: true },
      { key: "category", label: "Category", type: "select", options: ["Southern Classics", "BBQ", "Seafood", "Soul Food", "International", "Street Food", "Desserts", "Drinks"], half: true },
      { key: "image", label: "Dish Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Describe this local favorite", maxLength: 300 },
      { key: "price", label: "Avg. Price ($)", type: "text", placeholder: "18.00", maxLength: 10, half: true },
      { key: "restaurant", label: "Where To Get It", type: "text", placeholder: "e.g. Mary Mac's Tea Room", maxLength: 100, half: true },
      { key: "address", label: "Restaurant Address", type: "text", placeholder: "224 Ponce de Leon Ave", maxLength: 150, half: true },
      { key: "popular", label: "Must-Try", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Southern Classics", description: "", price: "", restaurant: "", address: "", popular: false, image: "" }),
  },
  hotels: {
    contentType: "hotels",
    title: "Hotels & Stays",
    subtitle: "Hotels, boutique stays and accommodations",
    itemLabel: "Hotel",
    fields: [
      { key: "name", label: "Hotel Name", type: "text", placeholder: "e.g. The Ritz-Carlton", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Luxury", "Boutique", "Business", "Budget", "Resort", "B&B", "Hostel", "Vacation Rental"], half: true },
      { key: "image", label: "Hotel Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What makes this stay special?", maxLength: 300 },
      { key: "priceRange", label: "Price Range", type: "select", options: ["$ (Under $100)", "$$ ($100-$200)", "$$$ ($200-$400)", "$$$$ ($400+)"], half: true },
      { key: "rating", label: "Star Rating", type: "select", options: ["5 Stars", "4 Stars", "3 Stars", "2 Stars"], half: true },
      { key: "address", label: "Address", type: "text", placeholder: "181 Peachtree St NE", maxLength: 150, half: true },
      { key: "website", label: "Booking URL", type: "url", placeholder: "https://...", maxLength: 200, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Luxury", description: "", priceRange: "$$$ ($200-$400)", rating: "5 Stars", address: "", website: "", image: "" }),
  },
  planTrip: {
    contentType: "planTrip",
    title: "Plan Your Trip",
    subtitle: "Curated itinerary templates for visitors",
    itemLabel: "Itinerary",
    fields: [
      { key: "name", label: "Template Name", type: "text", placeholder: "e.g. 3-Day Explorer", maxLength: 80, half: true },
      { key: "duration", label: "Duration", type: "select", options: ["1 Day", "2 Days", "3 Days", "5 Days", "1 Week", "Weekend", "Custom"], half: true },
      { key: "description", label: "Overview", type: "textarea", placeholder: "What does this itinerary cover?", maxLength: 500 },
      { key: "highlights", label: "Highlights", type: "text", placeholder: "BeltLine, Aquarium, Midtown food", maxLength: 200 },
      { key: "budget", label: "Est. Budget ($)", type: "text", placeholder: "500", maxLength: 10, half: true },
      { key: "bestFor", label: "Best For", type: "select", options: ["Couples", "Families", "Solo", "Groups", "Foodies", "Adventurers", "Culture Lovers", "Budget"], half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", duration: "3 Days", description: "", highlights: "", budget: "", bestFor: "Couples" }),
  },
  transportation: {
    contentType: "transportation",
    title: "Getting Around",
    subtitle: "Transit, rideshare and ways to move around the city",
    itemLabel: "Transport Option",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "e.g. MARTA Rail", maxLength: 80, half: true },
      { key: "type", label: "Type", type: "select", options: ["Metro/Rail", "Bus", "Rideshare", "Bike", "Scooter", "Shuttle", "Walking", "Car Rental"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "How does this work?", maxLength: 300 },
      { key: "price", label: "Cost", type: "text", placeholder: "$2.50 per ride", maxLength: 50, half: true },
      { key: "coverage", label: "Coverage Area", type: "text", placeholder: "Downtown, Midtown, Airport", maxLength: 100, half: true },
      { key: "website", label: "Website / App", type: "url", placeholder: "https://...", maxLength: 200 },
    ],
    defaultItem: () => ({ id: uid(), name: "", type: "Metro/Rail", description: "", price: "", coverage: "", website: "" }),
  },
  culture: {
    contentType: "culture",
    title: "Cultural Experiences",
    subtitle: "Museums, galleries, performing arts and culture",
    itemLabel: "Experience",
    fields: [
      { key: "name", label: "Experience Name", type: "text", placeholder: "e.g. MLK Historic District Tour", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Art", "History", "Music", "Dance", "Theater", "Film", "Literature", "Architecture"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What will visitors discover?", maxLength: 300 },
      { key: "duration", label: "Duration", type: "text", placeholder: "1.5 hours", maxLength: 30, half: true },
      { key: "price", label: "Price ($)", type: "text", placeholder: "30.00", maxLength: 10, half: true },
      { key: "location", label: "Location", type: "text", placeholder: "Sweet Auburn district", maxLength: 100, half: true },
      { key: "website", label: "Website", type: "url", placeholder: "https://...", maxLength: 200, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "History", description: "", duration: "", price: "", location: "", website: "", image: "" }),
  },
  nightlife: {
    contentType: "thingsToDo",
    title: "Nightlife",
    subtitle: "Bars, clubs, live music and late-night spots",
    itemLabel: "Venue",
    fields: [
      { key: "name", label: "Venue Name", type: "text", placeholder: "e.g. The Sound Table", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Nightlife", "Walking Tour", "Food Tour", "Adventure", "Workshop", "Family", "Sports", "Wellness"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What's the vibe?", maxLength: 300 },
      { key: "duration", label: "Hours", type: "text", placeholder: "Open 9pm - 3am", maxLength: 50, half: true },
      { key: "price", label: "Cover / Avg ($)", type: "text", placeholder: "15.00", maxLength: 10, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Nightlife", description: "", duration: "", price: "", image: "" }),
  },
  nature: {
    contentType: "nature",
    title: "Nature & Eco",
    subtitle: "Parks, trails and outdoor recreation",
    itemLabel: "Park / Trail",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "e.g. Piedmont Park", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["City Park", "Nature Reserve", "Trail", "Garden", "Lake", "Mountain", "Wildlife Area"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "address", label: "Location", type: "text", placeholder: "400 Park Dr NE", maxLength: 150, half: true },
      { key: "difficulty", label: "Trail Difficulty", type: "select", options: ["Easy", "Moderate", "Challenging", "N/A"], half: true },
      { key: "hours", label: "Hours", type: "text", placeholder: "Dawn to dusk", maxLength: 50, half: true },
      { key: "admission", label: "Admission", type: "text", placeholder: "Free", maxLength: 30, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "City Park", description: "", address: "", difficulty: "Easy", hours: "", admission: "Free" }),
  },
  family: {
    contentType: "thingsToDo",
    title: "Family",
    subtitle: "Kid-friendly attractions and family activities",
    itemLabel: "Family Activity",
    fields: [
      { key: "name", label: "Activity Name", type: "text", placeholder: "e.g. Children's Museum", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Family", "Walking Tour", "Adventure", "Workshop", "Sports", "Wellness"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Why families will love this", maxLength: 300 },
      { key: "duration", label: "Duration", type: "text", placeholder: "2 hours", maxLength: 30, half: true },
      { key: "price", label: "Price ($)", type: "text", placeholder: "20.00", maxLength: 10, half: true },
      { key: "groupSize", label: "Recommended Ages", type: "text", placeholder: "3-12", maxLength: 20, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Family", description: "", duration: "", price: "", groupSize: "", image: "" }),
  },
  sports: {
    contentType: "thingsToDo",
    title: "Sports",
    subtitle: "Stadiums, fan zones and sports experiences",
    itemLabel: "Sports Experience",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "e.g. Mercedes-Benz Stadium Tour", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Sports", "Adventure", "Walking Tour", "Workshop"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What's included?", maxLength: 300 },
      { key: "duration", label: "Duration", type: "text", placeholder: "1.5 hours", maxLength: 30, half: true },
      { key: "price", label: "Price ($)", type: "text", placeholder: "35.00", maxLength: 10, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Sports", description: "", duration: "", price: "", image: "" }),
  },
  photos: {
    contentType: "photos",
    title: "Photo & Video",
    subtitle: "Photo gallery and visual content",
    itemLabel: "Photo",
    fields: [
      { key: "image", label: "Photo", type: "image" },
      { key: "caption", label: "Caption", type: "text", placeholder: "e.g. Sunset over Piedmont Park", maxLength: 100, half: true },
      { key: "location", label: "Location", type: "text", placeholder: "Piedmont Park", maxLength: 100, half: true },
      { key: "category", label: "Category", type: "select", options: ["Landmarks", "Food", "Nature", "Culture", "Nightlife", "People", "Events", "Street Art"], half: true },
      { key: "photographer", label: "Photographer", type: "text", placeholder: "Credit name", maxLength: 80, half: true },
    ],
    defaultItem: () => ({ id: uid(), caption: "", location: "", category: "Landmarks", photographer: "", image: "" }),
  },
  deals: {
    contentType: "deals",
    title: "Deals & Packages",
    subtitle: "Promotions, bundles and special offers",
    itemLabel: "Deal",
    fields: [
      { key: "title", label: "Deal Title", type: "text", placeholder: "e.g. 20% Off BeltLine Tours", maxLength: 80, half: true },
      { key: "type", label: "Type", type: "select", options: ["Discount", "Package", "Bundle", "Early Bird", "Group Rate", "Seasonal", "Flash Sale", "Loyalty"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "What's included in this deal?", maxLength: 300 },
      { key: "discount", label: "Discount", type: "text", placeholder: "20% OFF", maxLength: 30, half: true },
      { key: "originalPrice", label: "Original Price ($)", type: "text", placeholder: "80.00", maxLength: 10, half: true },
      { key: "validUntil", label: "Valid Until", type: "date", half: true },
      { key: "code", label: "Promo Code", type: "text", placeholder: "ATLANTA20", maxLength: 20, half: true },
    ],
    defaultItem: () => ({ id: uid(), title: "", type: "Discount", description: "", discount: "", originalPrice: "", validUntil: "", code: "" }),
  },
  faqs: {
    contentType: "faqs",
    title: "FAQs & Chat",
    subtitle: "Common visitor questions and AI assistant knowledge",
    itemLabel: "FAQ",
    fields: [
      { key: "question", label: "Question", type: "text", placeholder: "e.g. When is the best time to visit?", maxLength: 200 },
      { key: "answer", label: "Answer", type: "textarea", placeholder: "Provide a helpful answer", maxLength: 500 },
      { key: "category", label: "Category", type: "select", options: ["Planning", "Tours", "Transportation", "Safety", "Dining", "Weather", "Accessibility", "Payments"], half: true },
      { key: "featured", label: "Show at Top", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), question: "", answer: "", category: "Planning", featured: false }),
  },
  creators: {
    contentType: "creators",
    title: "Community & Creators",
    subtitle: "Local creators, influencers and ambassadors",
    itemLabel: "Creator",
    fields: [
      { key: "name", label: "Name / Handle", type: "text", placeholder: "@atlantafoodie", maxLength: 80, half: true },
      { key: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "Blog", "Twitter/X", "Facebook", "Pinterest", "Multi-Platform"], half: true },
      { key: "bio", label: "Bio", type: "textarea", placeholder: "What content do they create?", maxLength: 300 },
      { key: "followers", label: "Followers", type: "text", placeholder: "50K", maxLength: 20, half: true },
      { key: "niche", label: "Niche", type: "select", options: ["Food", "Travel", "Lifestyle", "Culture", "Adventure", "Family", "Luxury", "Budget"], half: true },
      { key: "profileUrl", label: "Profile URL", type: "url", placeholder: "https://...", maxLength: 200 },
    ],
    defaultItem: () => ({ id: uid(), name: "", platform: "Instagram", bio: "", followers: "", niche: "Travel", profileUrl: "" }),
  },
  socialLinks: {
    contentType: "socialLinks",
    title: "Social Links",
    subtitle: "Connect visitors with your official channels",
    itemLabel: "Social Link",
    fields: [
      { key: "platform", label: "Platform", type: "select", options: ["Instagram", "Facebook", "Twitter/X", "TikTok", "YouTube", "LinkedIn", "Pinterest", "Yelp", "TripAdvisor", "Google Business"], half: true },
      { key: "url", label: "URL", type: "url", placeholder: "https://instagram.com/...", maxLength: 200, half: true },
      { key: "handle", label: "Handle", type: "text", placeholder: "@meridiantours", maxLength: 50, half: true },
      { key: "followers", label: "Followers", type: "text", placeholder: "12.5K", maxLength: 20, half: true },
    ],
    defaultItem: () => ({ id: uid(), platform: "Instagram", url: "", handle: "", followers: "" }),
  },
};
