import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMicrositeContent, type ContentItem, type MicrositeFeature } from "@/contexts/MicrositeContentContext";
import {
  Store, Clock, ImagePlus, Trash2, Plus, Save, GripVertical,
  UtensilsCrossed, Users, Camera, MapPin, Phone, Mail,
  Globe, Star, Check, Eye, EyeOff,
  Landmark, Compass, Calendar, Hotel, Palette, TreePine, Train,
  Bot, HelpingHand, HelpCircle, CalendarDays, Tag, Megaphone,
  Gamepad2, Link2, Handshake, Leaf, Award, Info, Settings2,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ── Icon map ────────────────────────────────────────── */
const featureIconMap: Record<string, any> = {
  Landmark, Compass, Calendar, UtensilsCrossed, Hotel, Palette, TreePine, MapPin, Train,
  Users, Camera, Star, Award, Info, Bot, HelpingHand, HelpCircle, CalendarDays,
  Store, Tag, Megaphone, Globe, Gamepad2, Link2, Handshake, Leaf,
};

/* ── Admin tabs ──────────────────────────────────────── */
const adminTabs = [
  { id: "business", label: "Business Info", icon: Store },
  { id: "hours", label: "Hours & Contact", icon: Clock },
] as const;

/* ── Types ───────────────────────────────────────────── */

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "toggle" | "date" | "time" | "url" | "image";
  placeholder?: string;
  maxLength?: number;
  options?: string[];
  half?: boolean;
  third?: boolean;
}

interface FeatureContentConfig {
  fields: FieldConfig[];
  itemLabel: string;
  defaultItem: () => ContentItem;
}


interface DayHours { day: string; open: string; close: string; closed: boolean; }

/* ── Helpers ─────────────────────────────────────────── */
const uid = () => crypto.randomUUID();
const inputCls = "w-full px-4 py-2.5 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";
const labelCls = "text-xs font-medium text-muted-foreground mb-1.5 block";
const btnPrimary = "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity";

const defaultHours: DayHours[] = [
  { day: "Monday", open: "09:00", close: "18:00", closed: false },
  { day: "Tuesday", open: "09:00", close: "18:00", closed: false },
  { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
  { day: "Thursday", open: "09:00", close: "18:00", closed: false },
  { day: "Friday", open: "09:00", close: "18:00", closed: false },
  { day: "Saturday", open: "10:00", close: "16:00", closed: false },
  { day: "Sunday", open: "10:00", close: "16:00", closed: true },
];

/* ── Content configs per feature type ────────────────── */
const contentConfigs: Record<string, FeatureContentConfig> = {
  attractions: {
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
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Museum", description: "", address: "", price: "", hours: "", website: "", featured: false, image: "" }),
  },
  thingsToDo: {
    itemLabel: "Activity",
    fields: [
      { key: "name", label: "Activity Name", type: "text", placeholder: "e.g. BeltLine Walking Tour", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Walking Tour", "Food Tour", "Adventure", "Workshop", "Nightlife", "Family", "Sports", "Wellness"], half: true },
      { key: "image", label: "Photo", type: "image" },
      { key: "description", label: "Description", type: "textarea", placeholder: "What will visitors experience?", maxLength: 300 },
      { key: "duration", label: "Duration", type: "text", placeholder: "2 hours", maxLength: 30, half: true },
      { key: "price", label: "Price ($)", type: "text", placeholder: "45.00", maxLength: 10, half: true },
      { key: "difficulty", label: "Difficulty", type: "select", options: ["Easy", "Moderate", "Challenging"], half: true },
      { key: "groupSize", label: "Max Group Size", type: "text", placeholder: "15", maxLength: 5, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Walking Tour", description: "", duration: "", price: "", difficulty: "Easy", groupSize: "", image: "" }),
  },
  events: {
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
    itemLabel: "Hotel",
    fields: [
      { key: "name", label: "Hotel Name", type: "text", placeholder: "e.g. The Ritz-Carlton Atlanta", maxLength: 80, half: true },
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
  culture: {
    itemLabel: "Experience",
    fields: [
      { key: "name", label: "Experience Name", type: "text", placeholder: "e.g. MLK Jr. Historic District Tour", maxLength: 80, half: true },
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
  nature: {
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
  neighborhoods: {
    itemLabel: "Neighborhood",
    fields: [
      { key: "name", label: "Neighborhood Name", type: "text", placeholder: "e.g. Midtown", maxLength: 80, half: true },
      { key: "vibe", label: "Vibe", type: "select", options: ["Trendy", "Historic", "Family-Friendly", "Nightlife", "Artsy", "Foodie", "Business", "Residential"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "What's the neighborhood known for?", maxLength: 300 },
      { key: "highlights", label: "Key Highlights", type: "text", placeholder: "High Museum, Piedmont Park, restaurants", maxLength: 200 },
      { key: "gettingThere", label: "Getting There", type: "text", placeholder: "MARTA Midtown station", maxLength: 100, half: true },
      { key: "bestFor", label: "Best For", type: "text", placeholder: "Art lovers, foodies", maxLength: 100, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", vibe: "Trendy", description: "", highlights: "", gettingThere: "", bestFor: "" }),
  },
  transportation: {
    itemLabel: "Transport Option",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "e.g. MARTA Rail", maxLength: 80, half: true },
      { key: "type", label: "Type", type: "select", options: ["Metro/Rail", "Bus", "Rideshare", "Bike", "Scooter", "Shuttle", "Walking", "Car Rental"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "How does this transport work?", maxLength: 300 },
      { key: "price", label: "Cost", type: "text", placeholder: "$2.50 per ride", maxLength: 50, half: true },
      { key: "coverage", label: "Coverage Area", type: "text", placeholder: "Downtown, Midtown, Airport", maxLength: 100, half: true },
      { key: "website", label: "Website / App", type: "url", placeholder: "https://...", maxLength: 200 },
    ],
    defaultItem: () => ({ id: uid(), name: "", type: "Metro/Rail", description: "", price: "", coverage: "", website: "" }),
  },
  guides: {
    itemLabel: "Tour Guide",
    fields: [
      { key: "name", label: "Full Name", type: "text", placeholder: "e.g. James Walker", maxLength: 80, half: true },
      { key: "specialty", label: "Specialty", type: "select", options: ["History", "Food & Drink", "Nature", "Art & Culture", "Architecture", "Nightlife", "Photography", "General"], half: true },
      { key: "image", label: "Profile Photo", type: "image" },
      { key: "bio", label: "Bio", type: "textarea", placeholder: "Tell visitors about this guide", maxLength: 300 },
      { key: "experience", label: "Years Experience", type: "text", placeholder: "8", maxLength: 3, half: true },
      { key: "languages", label: "Languages", type: "text", placeholder: "English, Spanish", maxLength: 100, half: true },
      { key: "rating", label: "Rating", type: "select", options: ["5.0 ⭐", "4.9 ⭐", "4.8 ⭐", "4.7 ⭐", "4.5 ⭐"], half: true },
      { key: "pricePerHour", label: "Rate ($/hr)", type: "text", placeholder: "75", maxLength: 10, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", specialty: "General", bio: "", experience: "", languages: "English", rating: "5.0 ⭐", pricePerHour: "", image: "" }),
  },
  photos: {
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
  reviews: {
    itemLabel: "Review",
    fields: [
      { key: "reviewer", label: "Reviewer Name", type: "text", placeholder: "Sarah M.", maxLength: 80, half: true },
      { key: "rating", label: "Rating", type: "select", options: ["5 Stars ⭐⭐⭐⭐⭐", "4 Stars ⭐⭐⭐⭐", "3 Stars ⭐⭐⭐", "2 Stars ⭐⭐", "1 Star ⭐"], half: true },
      { key: "review", label: "Review Text", type: "textarea", placeholder: "What did the traveler say?", maxLength: 500 },
      { key: "date", label: "Date", type: "date", half: true },
      { key: "tour", label: "Tour/Experience", type: "text", placeholder: "BeltLine Walking Tour", maxLength: 100, half: true },
      { key: "verified", label: "Verified Review", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), reviewer: "", rating: "5 Stars ⭐⭐⭐⭐⭐", review: "", date: "", tour: "", verified: true }),
  },
  topExperiences: {
    itemLabel: "Top Experience",
    fields: [
      { key: "name", label: "Experience Name", type: "text", placeholder: "e.g. BeltLine Art Tour", maxLength: 80, half: true },
      { key: "rank", label: "Rank", type: "select", options: ["#1 Must-Do", "#2 Must-Do", "#3 Must-Do", "Top 5", "Top 10", "Hidden Gem"], half: true },
      { key: "description", label: "Why It's Special", type: "textarea", placeholder: "What makes this unmissable?", maxLength: 300 },
      { key: "price", label: "Price ($)", type: "text", placeholder: "35.00", maxLength: 10, half: true },
      { key: "duration", label: "Duration", type: "text", placeholder: "3 hours", maxLength: 30, half: true },
      { key: "bookingUrl", label: "Booking URL", type: "url", placeholder: "https://...", maxLength: 200 },
    ],
    defaultItem: () => ({ id: uid(), name: "", rank: "Top 5", description: "", price: "", duration: "", bookingUrl: "" }),
  },
  aboutUs: {
    itemLabel: "Section",
    fields: [
      { key: "heading", label: "Section Heading", type: "text", placeholder: "e.g. Our Story", maxLength: 80 },
      { key: "content", label: "Content", type: "textarea", placeholder: "Write about your company...", maxLength: 1000 },
    ],
    defaultItem: () => ({ id: uid(), heading: "", content: "" }),
  },
  aiAssistant: {
    itemLabel: "FAQ / Knowledge",
    fields: [
      { key: "question", label: "Common Question", type: "text", placeholder: "e.g. What are the best tours in Atlanta?", maxLength: 150 },
      { key: "answer", label: "Suggested Answer", type: "textarea", placeholder: "Provide the answer the AI should give", maxLength: 500 },
      { key: "category", label: "Category", type: "select", options: ["Tours", "Dining", "Transportation", "Hotels", "Events", "General", "Pricing", "Safety"], half: true },
      { key: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], half: true },
    ],
    defaultItem: () => ({ id: uid(), question: "", answer: "", category: "General", priority: "Medium" }),
  },
  vipExperiences: {
    itemLabel: "VIP Package",
    fields: [
      { key: "name", label: "Package Name", type: "text", placeholder: "e.g. Helicopter Tour", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Helicopter", "Private Tour", "Wine Tasting", "Chef's Table", "Yacht", "Sunset Safari", "VIP Event Access", "Luxury Transfer"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "What's included in this VIP experience?", maxLength: 500 },
      { key: "price", label: "Starting Price ($)", type: "text", placeholder: "450.00", maxLength: 10, half: true },
      { key: "duration", label: "Duration", type: "text", placeholder: "2 hours", maxLength: 30, half: true },
      { key: "maxGuests", label: "Max Guests", type: "text", placeholder: "6", maxLength: 5, half: true },
      { key: "includes", label: "Includes", type: "text", placeholder: "Champagne, snacks, private guide", maxLength: 200, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Private Tour", description: "", price: "", duration: "", maxGuests: "", includes: "" }),
  },
  faqs: {
    itemLabel: "FAQ",
    fields: [
      { key: "question", label: "Question", type: "text", placeholder: "e.g. What's the best time to visit Atlanta?", maxLength: 200 },
      { key: "answer", label: "Answer", type: "textarea", placeholder: "Provide a helpful answer", maxLength: 500 },
      { key: "category", label: "Category", type: "select", options: ["Planning", "Tours", "Transportation", "Safety", "Dining", "Weather", "Accessibility", "Payments"], half: true },
      { key: "featured", label: "Show at Top", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), question: "", answer: "", category: "Planning", featured: false }),
  },
  upcomingTours: {
    itemLabel: "Tour",
    fields: [
      { key: "name", label: "Tour Name", type: "text", placeholder: "e.g. Midtown Art Walk", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Walking", "Food", "History", "Nature", "Photography", "Night", "Bike", "Bus"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "What will this tour cover?", maxLength: 300 },
      { key: "date", label: "Date", type: "date", half: true },
      { key: "time", label: "Time", type: "time", half: true },
      { key: "price", label: "Price ($)", type: "text", placeholder: "55.00", maxLength: 10, half: true },
      { key: "spotsLeft", label: "Spots Available", type: "text", placeholder: "12", maxLength: 5, half: true },
      { key: "meetingPoint", label: "Meeting Point", type: "text", placeholder: "Krog Street Market entrance", maxLength: 150 },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Walking", description: "", date: "", time: "", price: "", spotsLeft: "", meetingPoint: "" }),
  },
  localBusinesses: {
    itemLabel: "Business",
    fields: [
      { key: "name", label: "Business Name", type: "text", placeholder: "e.g. Junkyard ATL", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Restaurant", "Shop", "Cafe", "Bar", "Gallery", "Market", "Spa", "Boutique"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "What makes this business special?", maxLength: 300 },
      { key: "address", label: "Address", type: "text", placeholder: "123 Main St", maxLength: 150, half: true },
      { key: "phone", label: "Phone", type: "text", placeholder: "+1 (404) 555-0123", maxLength: 20, half: true },
      { key: "website", label: "Website", type: "url", placeholder: "https://...", maxLength: 200, half: true },
      { key: "featured", label: "Featured", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Restaurant", description: "", address: "", phone: "", website: "", featured: false }),
  },
  deals: {
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
  creators: {
    itemLabel: "Creator",
    fields: [
      { key: "name", label: "Name / Handle", type: "text", placeholder: "e.g. @atlantafoodie", maxLength: 80, half: true },
      { key: "platform", label: "Platform", type: "select", options: ["Instagram", "TikTok", "YouTube", "Blog", "Twitter/X", "Facebook", "Pinterest", "Multi-Platform"], half: true },
      { key: "bio", label: "Bio", type: "textarea", placeholder: "What content do they create?", maxLength: 300 },
      { key: "followers", label: "Followers", type: "text", placeholder: "50K", maxLength: 20, half: true },
      { key: "niche", label: "Niche", type: "select", options: ["Food", "Travel", "Lifestyle", "Culture", "Adventure", "Family", "Luxury", "Budget"], half: true },
      { key: "profileUrl", label: "Profile URL", type: "url", placeholder: "https://...", maxLength: 200 },
    ],
    defaultItem: () => ({ id: uid(), name: "", platform: "Instagram", bio: "", followers: "", niche: "Travel", profileUrl: "" }),
  },
  socialLinks: {
    itemLabel: "Social Link",
    fields: [
      { key: "platform", label: "Platform", type: "select", options: ["Instagram", "Facebook", "Twitter/X", "TikTok", "YouTube", "LinkedIn", "Pinterest", "Yelp", "TripAdvisor", "Google Business"], half: true },
      { key: "url", label: "URL", type: "url", placeholder: "https://instagram.com/meridiantours", maxLength: 200, half: true },
      { key: "handle", label: "Handle / Username", type: "text", placeholder: "@meridiantours", maxLength: 50, half: true },
      { key: "followers", label: "Followers", type: "text", placeholder: "12.5K", maxLength: 20, half: true },
    ],
    defaultItem: () => ({ id: uid(), platform: "Instagram", url: "", handle: "", followers: "" }),
  },
  spinWin: {
    itemLabel: "Prize",
    fields: [
      { key: "prize", label: "Prize Name", type: "text", placeholder: "e.g. Free Walking Tour", maxLength: 80, half: true },
      { key: "type", label: "Type", type: "select", options: ["Free Tour", "Discount", "Merch", "Upgrade", "Drink", "Photo Package", "VIP Access", "Gift Card"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "What does the winner get?", maxLength: 200 },
      { key: "probability", label: "Win Chance (%)", type: "text", placeholder: "10", maxLength: 5, half: true },
      { key: "quantity", label: "Qty Available", type: "text", placeholder: "50", maxLength: 5, half: true },
      { key: "validDays", label: "Valid For (days)", type: "text", placeholder: "30", maxLength: 5, half: true },
      { key: "active", label: "Active", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), prize: "", type: "Discount", description: "", probability: "10", quantity: "50", validDays: "30", active: true }),
  },
  referral: {
    itemLabel: "Reward Tier",
    fields: [
      { key: "name", label: "Tier Name", type: "text", placeholder: "e.g. Bronze Referrer", maxLength: 80, half: true },
      { key: "referralsNeeded", label: "Referrals Needed", type: "text", placeholder: "3", maxLength: 5, half: true },
      { key: "reward", label: "Reward", type: "text", placeholder: "e.g. $25 Tour Credit", maxLength: 100 },
      { key: "description", label: "Description", type: "textarea", placeholder: "What does the referrer get?", maxLength: 200 },
      { key: "active", label: "Active", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", referralsNeeded: "", reward: "", description: "", active: true }),
  },
  partners: {
    itemLabel: "Partner",
    fields: [
      { key: "name", label: "Partner Name", type: "text", placeholder: "e.g. Atlanta Convention Bureau", maxLength: 80, half: true },
      { key: "type", label: "Type", type: "select", options: ["Hotel", "Restaurant", "Transport", "Activity", "Government", "Media", "Technology", "Tourism Board"], half: true },
      { key: "description", label: "Partnership Details", type: "textarea", placeholder: "What's the partnership about?", maxLength: 300 },
      { key: "commission", label: "Commission (%)", type: "text", placeholder: "15", maxLength: 5, half: true },
      { key: "website", label: "Website", type: "url", placeholder: "https://...", maxLength: 200, half: true },
      { key: "active", label: "Active", type: "toggle", half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", type: "Tourism Board", description: "", commission: "", website: "", active: true }),
  },
  planTrip: {
    itemLabel: "Itinerary Template",
    fields: [
      { key: "name", label: "Template Name", type: "text", placeholder: "e.g. 3-Day Atlanta Explorer", maxLength: 80, half: true },
      { key: "duration", label: "Duration", type: "select", options: ["1 Day", "2 Days", "3 Days", "5 Days", "1 Week", "Weekend", "Custom"], half: true },
      { key: "description", label: "Overview", type: "textarea", placeholder: "What does this itinerary cover?", maxLength: 500 },
      { key: "highlights", label: "Highlights", type: "text", placeholder: "BeltLine, Aquarium, Midtown food scene", maxLength: 200 },
      { key: "budget", label: "Est. Budget ($)", type: "text", placeholder: "500", maxLength: 10, half: true },
      { key: "bestFor", label: "Best For", type: "select", options: ["Couples", "Families", "Solo", "Groups", "Foodies", "Adventurers", "Culture Lovers", "Budget"], half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", duration: "3 Days", description: "", highlights: "", budget: "", bestFor: "Couples" }),
  },
  aiPlanner: {
    itemLabel: "AI Prompt Template",
    fields: [
      { key: "scenario", label: "Scenario", type: "text", placeholder: "e.g. First time visitor, 3 days", maxLength: 100, half: true },
      { key: "category", label: "Focus", type: "select", options: ["General", "Food", "Culture", "Adventure", "Family", "Romantic", "Budget", "Luxury"], half: true },
      { key: "suggestedPlan", label: "Suggested Plan", type: "textarea", placeholder: "AI-suggested itinerary for this scenario", maxLength: 1000 },
      { key: "tips", label: "Pro Tips", type: "textarea", placeholder: "Insider tips for this type of trip", maxLength: 300 },
    ],
    defaultItem: () => ({ id: uid(), scenario: "", category: "General", suggestedPlan: "", tips: "" }),
  },
  sustainability: {
    itemLabel: "Initiative",
    fields: [
      { key: "name", label: "Initiative Name", type: "text", placeholder: "e.g. Carbon-Neutral Tours", maxLength: 80, half: true },
      { key: "category", label: "Type", type: "select", options: ["Carbon Offset", "Local Sourcing", "Waste Reduction", "Water Conservation", "Community Support", "Wildlife Protection", "Education", "Green Transport"], half: true },
      { key: "description", label: "Description", type: "textarea", placeholder: "How does this initiative work?", maxLength: 300 },
      { key: "impact", label: "Impact Metric", type: "text", placeholder: "e.g. 500 tons CO2 offset", maxLength: 100, half: true },
      { key: "partner", label: "Partner Org", type: "text", placeholder: "e.g. One Tree Planted", maxLength: 80, half: true },
    ],
    defaultItem: () => ({ id: uid(), name: "", category: "Carbon Offset", description: "", impact: "", partner: "" }),
  },
};

/* ── Default sample data per feature type ────────────── */
const defaultContentData: Record<string, ContentItem[]> = {
  attractions: [
    { id: uid(), name: "Georgia Aquarium", category: "Aquarium", description: "The world's largest aquarium featuring whale sharks, beluga whales, and over 100,000 animals.", address: "225 Baker St NW, Atlanta, GA", price: "39.95", hours: "9am - 9pm", website: "https://georgiaaquarium.org", featured: true },
    { id: uid(), name: "Martin Luther King Jr. National Historical Park", category: "Historic Site", description: "Birthplace, church, and final resting place of Dr. Martin Luther King Jr.", address: "450 Auburn Ave NE, Atlanta, GA", price: "Free", hours: "9am - 5pm", website: "", featured: true },
  ],
  thingsToDo: [
    { id: uid(), name: "BeltLine Walking Tour", category: "Walking Tour", description: "Explore Atlanta's famous BeltLine trail with an expert guide covering art, history, and architecture.", duration: "2.5 hours", price: "45.00", difficulty: "Easy", groupSize: "15" },
    { id: uid(), name: "Ponce City Market Food Tour", category: "Food Tour", description: "Sample 8+ dishes from Atlanta's best food hall while learning about the city's culinary evolution.", duration: "3 hours", price: "65.00", difficulty: "Easy", groupSize: "12" },
  ],
  events: [
    { id: uid(), name: "Atlanta Jazz Festival", category: "Festival", description: "One of the largest free jazz festivals in the country, held annually in Piedmont Park.", date: "2026-05-23", time: "12:00", venue: "Piedmont Park", price: "Free", website: "" },
    { id: uid(), name: "Dragon Con", category: "Convention", description: "Massive multi-genre pop culture convention held every Labor Day weekend in downtown Atlanta.", date: "2026-09-04", time: "10:00", venue: "Downtown Atlanta Hotels", price: "85.00", website: "" },
  ],
  cuisine: [
    { id: uid(), name: "Southern Fried Chicken", category: "Southern Classics", description: "Crispy, golden-brown fried chicken — an Atlanta staple served with collard greens and cornbread.", price: "16.00", restaurant: "Mary Mac's Tea Room", address: "224 Ponce de Leon Ave NE", popular: true },
    { id: uid(), name: "Peach Cobbler", category: "Desserts", description: "Warm peach cobbler with vanilla ice cream — the quintessential Georgia dessert.", price: "9.00", restaurant: "Paschal's", address: "180 Northside Dr SW", popular: true },
    { id: uid(), name: "Atlanta-Style BBQ Ribs", category: "BBQ", description: "Slow-smoked ribs with tangy tomato-based sauce, a local BBQ tradition.", price: "22.00", restaurant: "Fox Bros. Bar-B-Q", address: "1238 Dekalb Ave NE", popular: true },
  ],
  hotels: [
    { id: uid(), name: "The Ritz-Carlton Atlanta", category: "Luxury", description: "Five-star luxury in the heart of downtown with a world-class spa and fine dining.", priceRange: "$$$$ ($400+)", rating: "5 Stars", address: "181 Peachtree St NE", website: "" },
    { id: uid(), name: "Hotel Clermont", category: "Boutique", description: "A beautifully restored boutique hotel on Ponce de Leon with a rooftop bar and retro charm.", priceRange: "$$$ ($200-$400)", rating: "4 Stars", address: "789 Ponce De Leon Ave NE", website: "" },
  ],
  culture: [
    { id: uid(), name: "MLK Jr. Historic District Tour", category: "History", description: "Walk through the neighborhood where Dr. King was born, preached, and is laid to rest.", duration: "2 hours", price: "Free", location: "Sweet Auburn", website: "" },
  ],
  nature: [
    { id: uid(), name: "Piedmont Park", category: "City Park", description: "Atlanta's premier urban park offering trails, gardens, and stunning skyline views.", address: "400 Park Dr NE", difficulty: "Easy", hours: "6am - 11pm", admission: "Free" },
  ],
  neighborhoods: [
    { id: uid(), name: "Midtown", vibe: "Trendy", description: "Atlanta's arts district featuring the High Museum, Piedmont Park, and vibrant dining scene.", highlights: "High Museum, Piedmont Park, Fox Theatre", gettingThere: "MARTA Midtown station", bestFor: "Art lovers, foodies" },
  ],
  transportation: [
    { id: uid(), name: "MARTA Rail", type: "Metro/Rail", description: "Atlanta's rapid transit system connecting the airport to downtown, Midtown, and Buckhead.", price: "$2.50 per ride", coverage: "Airport, Downtown, Midtown, Buckhead", website: "https://itsmarta.com" },
  ],
  guides: [
    { id: uid(), name: "James Walker", specialty: "History", bio: "Born and raised in Atlanta with 12 years of experience leading Civil Rights history tours.", experience: "12", languages: "English", rating: "5.0 ⭐", pricePerHour: "75" },
    { id: uid(), name: "Elena Rodriguez", specialty: "Food & Drink", bio: "Certified food guide specializing in Southern cuisine and Atlanta's emerging food scene.", experience: "8", languages: "English, Spanish", rating: "4.9 ⭐", pricePerHour: "85" },
  ],
  photos: [
    { id: uid(), caption: "BeltLine Eastside Trail at sunset", location: "BeltLine", category: "Nature", photographer: "Meridian Tours" },
    { id: uid(), caption: "Centennial Olympic Park fountain", location: "Downtown", category: "Landmarks", photographer: "Meridian Tours" },
  ],
  reviews: [
    { id: uid(), reviewer: "Sarah M.", rating: "5 Stars ⭐⭐⭐⭐⭐", review: "The BeltLine tour was incredible! Our guide James knew every mural and building along the way.", date: "2026-02-15", tour: "BeltLine Walking Tour", verified: true },
  ],
  topExperiences: [
    { id: uid(), name: "BeltLine Art Tour", rank: "#1 Must-Do", description: "Walk the famous Eastside Trail and discover 50+ outdoor art installations.", price: "35.00", duration: "2.5 hours", bookingUrl: "" },
  ],
  aboutUs: [
    { id: uid(), heading: "Our Story", content: "Meridian Tours was founded in 2018 with a mission to showcase Atlanta's vibrant culture, rich history, and emerging food scene to travelers from around the world." },
    { id: uid(), heading: "Our Mission", content: "We believe every visitor deserves an authentic, unforgettable experience. Our expert local guides bring the city to life through immersive walks, food tours, and exclusive VIP experiences." },
  ],
  aiAssistant: [
    { id: uid(), question: "What are the best tours in Atlanta?", answer: "Our most popular tours include the BeltLine Art Walk, the Civil Rights History Tour, and the Ponce City Food Tour.", category: "Tours", priority: "High" },
  ],
  vipExperiences: [
    { id: uid(), name: "Helicopter City Tour", category: "Helicopter", description: "See Atlanta from above on a private helicopter tour covering downtown, the BeltLine, and Stone Mountain.", price: "450.00", duration: "45 min", maxGuests: "3", includes: "Champagne, aerial photos" },
  ],
  faqs: [
    { id: uid(), question: "What's the best time to visit Atlanta?", answer: "Spring (March-May) and Fall (September-November) offer the best weather. Spring brings blooming dogwoods while fall has pleasant temperatures.", category: "Planning", featured: true },
  ],
  upcomingTours: [
    { id: uid(), name: "Midtown Art Walk", category: "Walking", description: "Explore Midtown's gallery district and street art scene with a local artist guide.", date: "2026-03-15", time: "10:00", price: "40.00", spotsLeft: "8", meetingPoint: "High Museum of Art entrance" },
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
    { id: uid(), name: "3-Day Atlanta Explorer", duration: "3 Days", description: "The perfect introduction to Atlanta covering history, food, and culture.", highlights: "BeltLine, Aquarium, Midtown food scene, MLK Historic Site", budget: "500", bestFor: "Couples" },
  ],
  aiPlanner: [
    { id: uid(), scenario: "First time visitor, 3 days", category: "General", suggestedPlan: "Day 1: Downtown & MLK Historic Site. Day 2: BeltLine & Ponce City Market. Day 3: Midtown museums & Piedmont Park.", tips: "Get a MARTA Breeze pass for easy transport. Start early to beat the crowds at the Aquarium." },
  ],
  sustainability: [
    { id: uid(), name: "Carbon-Neutral Tours", category: "Carbon Offset", description: "All walking tours are naturally carbon-neutral. For vehicle tours, we offset 100% through verified programs.", impact: "500 tons CO2 offset annually", partner: "One Tree Planted" },
  ],
};

/* ── Feature content type mapping ────────────────────── */
const featureContentTypeMap: Record<string, string> = {
  "Attractions": "attractions",
  "Things To Do": "thingsToDo",
  "Events & Festivals": "events",
  "Local Cuisine": "cuisine",
  "Hotels & Stays": "hotels",
  "Cultural Experiences": "culture",
  "Nature & Parks": "nature",
  "Neighborhood Guide": "neighborhoods",
  "Transportation": "transportation",
  "Tour Guides": "guides",
  "Photo Memories": "photos",
  "Traveler Reviews": "reviews",
  "Top Experiences": "topExperiences",
  "About Us": "aboutUs",
  "AI Travel Assistant": "aiAssistant",
  "VIP Experiences": "vipExperiences",
  "Travel FAQs": "faqs",
  "Upcoming Tours": "upcomingTours",
  "Local Businesses": "localBusinesses",
  "Deals & Packages": "deals",
  "Local Creators": "creators",
  "Social Links": "socialLinks",
  "Spin & Win": "spinWin",
  "Refer a Traveler": "referral",
  "Travel Partners": "partners",
  "Plan Your Trip": "planTrip",
  "AI Trip Planner": "aiPlanner",
  "Sustainability": "sustainability",
};

/* ── Default features ────────────────────────────────── */
const defaultFeatures: MicrositeFeature[] = [
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

/* ══════════════════════════════════════════════════════
   GENERIC CONTENT ITEM EDITOR
   ══════════════════════════════════════════════════════ */
const ContentItemEditor = ({
  item, config, onUpdate, onDelete, isEditing, onToggleEdit,
}: {
  item: ContentItem;
  config: FeatureContentConfig;
  onUpdate: (id: string, patch: Partial<ContentItem>) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onToggleEdit: () => void;
}) => {
  const firstField = config.fields[0];
  const secondField = config.fields[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl transition-all ${
        isEditing ? "bg-primary/5 border border-primary/30" : "bg-muted/30 border border-transparent hover:border-primary/20"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            {config.fields.map((field) => {
              if (field.type === "toggle") {
                return (
                  <div key={field.key} className={field.half ? "" : "sm:col-span-2"}>
                    <label className="flex items-center gap-2 text-sm py-2">
                      <Switch checked={!!item[field.key]} onCheckedChange={(v) => onUpdate(item.id, { [field.key]: v })} />
                      <span className="text-xs font-medium text-muted-foreground">{field.label}</span>
                    </label>
                  </div>
                );
              }
              if (field.type === "image") {
                const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    onUpdate(item.id, { [field.key]: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                };
                return (
                  <div key={field.key} className="sm:col-span-2">
                    <label className={labelCls}>{field.label}</label>
                    <div className="flex items-center gap-3">
                      {item[field.key] ? (
                        <div className="relative group">
                          <img src={item[field.key]} alt="" className="w-20 h-20 rounded-xl object-cover border" />
                          <button
                            onClick={() => onUpdate(item.id, { [field.key]: "" })}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >×</button>
                        </div>
                      ) : (
                        <label className="w-20 h-20 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-primary/10 transition-colors">
                          <ImagePlus className="w-5 h-5 text-primary" />
                          <span className="text-[9px] text-primary font-medium">Upload</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      )}
                      {!item[field.key] && (
                        <div className="flex-1">
                          <label className={labelCls}>Or paste image URL</label>
                          <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className={inputCls}
                            onBlur={(e) => { if (e.target.value) onUpdate(item.id, { [field.key]: e.target.value }); }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div key={field.key} className={field.half || field.third ? "" : "sm:col-span-2"}>
                  <label className={labelCls}>{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={item[field.key] || ""}
                      onChange={(e) => onUpdate(item.id, { [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className={`${inputCls} resize-none`}
                      rows={3}
                      maxLength={field.maxLength}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={item[field.key] || ""}
                      onChange={(e) => onUpdate(item.id, { [field.key]: e.target.value })}
                      className={inputCls}
                    >
                      {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
                      value={item[field.key] || ""}
                      onChange={(e) => onUpdate(item.id, { [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className={inputCls}
                      maxLength={field.maxLength}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => onDelete(item.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onToggleEdit} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between cursor-pointer" onClick={onToggleEdit}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {item.image ? (
              <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
            ) : (
              <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{item[firstField.key] || "Untitled"}</span>
                {item.featured && <Star className="w-3 h-3 fill-aura-warning text-aura-warning shrink-0" />}
                {item.popular && <Star className="w-3 h-3 fill-aura-warning text-aura-warning shrink-0" />}
                {item.verified && <Check className="w-3 h-3 text-primary shrink-0" />}
                {item.active === false && <EyeOff className="w-3 h-3 text-muted-foreground shrink-0" />}
              </div>
              {secondField && (
                <p className="text-xs text-muted-foreground truncate">
                  {item[secondField.key]}
                </p>
              )}
            </div>
          </div>
          {item.price && <span className="text-sm font-bold text-primary shrink-0 ml-2">${item.price}</span>}
        </div>
      )}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════
   ADMIN PAGE
   ══════════════════════════════════════════════════════ */
const AdminPage = () => {
  const [activePanel, setActivePanel] = useState<string>(defaultFeatures[0].id);
  const [features, setFeatures] = useState<MicrositeFeature[]>(defaultFeatures);
  const [contentData, setContentData] = useState<Record<string, ContentItem[]>>(defaultContentData);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  /* Business info */
  const [business, setBusiness] = useState({
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
  });
  const [hours, setHours] = useState<DayHours[]>(defaultHours);

  /* Handlers */
  const save = (section: string) =>
    toast({ title: `${section} saved`, description: "Changes published to your microsite." });

  const updateFeature = (id: string, patch: Partial<MicrositeFeature>) =>
    setFeatures((f) => f.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const updateContentItem = (contentType: string, itemId: string, patch: Partial<ContentItem>) => {
    setContentData((prev) => ({
      ...prev,
      [contentType]: (prev[contentType] || []).map((item) =>
        item.id === itemId ? { ...item, ...patch } : item
      ),
    }));
  };

  const addContentItem = (contentType: string) => {
    const config = contentConfigs[contentType];
    if (!config) return;
    const newItem = config.defaultItem();
    setContentData((prev) => ({
      ...prev,
      [contentType]: [...(prev[contentType] || []), newItem],
    }));
    setEditingItem(newItem.id);
  };

  const deleteContentItem = (contentType: string, itemId: string) => {
    setContentData((prev) => ({
      ...prev,
      [contentType]: (prev[contentType] || []).filter((item) => item.id !== itemId),
    }));
    if (editingItem === itemId) setEditingItem(null);
  };

  const updateHour = (idx: number, patch: Partial<DayHours>) =>
    setHours((h) => h.map((d, i) => (i === idx ? { ...d, ...patch } : d)));

  /* Derived */
  const selectedFeature = features.find((f) => f.id === activePanel);
  const isAdminTab = ["business", "hours"].includes(activePanel);

  return (
    <DashboardLayout title="Admin Panel" subtitle="Manage all business content & details">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── LEFT NAV ───────────────────────────────── */}
        <div className="lg:w-64 shrink-0">
          <ScrollArea className="lg:h-[calc(100vh-12rem)]">
            <div className="space-y-4 pr-2">
              {/* Settings */}
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-2">Settings</h4>
                <div className="space-y-0.5">
                  {adminTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePanel(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activePanel === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <tab.icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-2">
                  Microsite Features
                </h4>
                <div className="space-y-0.5">
                  {features.map((feature) => {
                    const Icon = featureIconMap[feature.icon] || Compass;
                    const isActive = activePanel === feature.id;
                    const itemCount = (contentData[feature.contentType] || []).length;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => { setActivePanel(feature.id); setEditingItem(null); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors group ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : feature.visible
                            ? "text-foreground hover:bg-muted"
                            : "text-muted-foreground/50 hover:bg-muted/50"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate flex-1 text-left">{feature.title}</span>
                        <span className={`text-[10px] shrink-0 ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {itemCount}
                        </span>
                        {!feature.visible && <EyeOff className="w-3 h-3 shrink-0 opacity-50" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* ── RIGHT PANEL ────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {/* ── FEATURE CONTENT EDITOR ─────────────── */}
            {selectedFeature && (() => {
              const contentType = selectedFeature.contentType;
              const config = contentConfigs[contentType];
              const items = contentData[contentType] || [];
              const Icon = featureIconMap[selectedFeature.icon] || Compass;

              return (
                <motion.div key={selectedFeature.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  {/* Header card */}
                  <div className="p-6 rounded-2xl bg-card border">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-lg">{selectedFeature.title}</h3>
                          <p className="text-xs text-muted-foreground">{items.length} {config?.itemLabel || "item"}{items.length !== 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2">
                          <Switch checked={selectedFeature.visible} onCheckedChange={(v) => updateFeature(selectedFeature.id, { visible: v })} />
                          <span className="text-xs text-muted-foreground">{selectedFeature.visible ? "Visible" : "Hidden"}</span>
                        </label>
                        {config && (
                          <button onClick={() => addContentItem(contentType)} className={btnPrimary}>
                            <Plus className="w-4 h-4" /> Add {config.itemLabel}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content items */}
                    {config && items.length > 0 ? (
                      <div className="space-y-2">
                        {items.map((item) => (
                          <ContentItemEditor
                            key={item.id}
                            item={item}
                            config={config}
                            onUpdate={(id, patch) => updateContentItem(contentType, id, patch)}
                            onDelete={(id) => deleteContentItem(contentType, id)}
                            isEditing={editingItem === item.id}
                            onToggleEdit={() => setEditingItem(editingItem === item.id ? null : item.id)}
                          />
                        ))}
                      </div>
                    ) : config ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No {config.itemLabel.toLowerCase()}s yet</p>
                        <p className="text-xs mt-1">Click "Add {config.itemLabel}" to get started</p>
                      </div>
                    ) : null}

                    {config && items.length > 0 && (
                      <div className="flex justify-end mt-6">
                        <button onClick={() => save(selectedFeature.title)} className={btnPrimary}>
                          <Save className="w-4 h-4" /> Save {selectedFeature.title}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Feature settings */}
                  <div className="p-5 rounded-2xl bg-card border">
                    <h4 className="font-display font-semibold text-sm mb-4">Feature Settings</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Display Title</label>
                        <input value={selectedFeature.title} onChange={(e) => updateFeature(selectedFeature.id, { title: e.target.value })} className={inputCls} maxLength={30} />
                      </div>
                      <div>
                        <label className={labelCls}>Subtitle</label>
                        <input value={selectedFeature.subtitle} onChange={(e) => updateFeature(selectedFeature.id, { subtitle: e.target.value })} className={inputCls} maxLength={30} />
                      </div>
                      <div>
                        <label className={labelCls}>Route Path</label>
                        <input value={selectedFeature.route} onChange={(e) => updateFeature(selectedFeature.id, { route: e.target.value })} className={inputCls} maxLength={100} />
                      </div>
                      <div>
                        <label className={labelCls}>Icon</label>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.keys(featureIconMap).map((name) => {
                            const Ic = featureIconMap[name];
                            return (
                              <button key={name} onClick={() => updateFeature(selectedFeature.id, { icon: name })}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  selectedFeature.icon === name ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                }`} title={name}>
                                <Ic className="w-3.5 h-3.5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* ── BUSINESS INFO ──────────────────────── */}
            {activePanel === "business" && (
              <motion.div key="business" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border">
                  <h3 className="font-display font-semibold text-lg mb-6">Business Details</h3>
                  <div className="flex gap-4 mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-primary/10 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-primary/30 cursor-pointer hover:bg-primary/20 transition-colors">
                      <ImagePlus className="w-5 h-5 text-primary" /><span className="text-[9px] text-primary font-medium">Logo</span>
                    </div>
                    <div className="flex-1 h-24 rounded-2xl bg-muted/50 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-muted-foreground/20 cursor-pointer hover:bg-muted transition-colors">
                      <ImagePlus className="w-5 h-5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground font-medium">Cover Photo (1200×400)</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Business Name</label><input value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} className={inputCls} maxLength={100} /></div>
                    <div><label className={labelCls}>Industry</label><input value={business.cuisine} onChange={(e) => setBusiness({ ...business, cuisine: e.target.value })} className={inputCls} maxLength={50} /></div>
                    <div className="sm:col-span-2"><label className={labelCls}>Tagline</label><input value={business.tagline} onChange={(e) => setBusiness({ ...business, tagline: e.target.value })} className={inputCls} maxLength={150} /></div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Description</label>
                      <textarea value={business.description} onChange={(e) => setBusiness({ ...business, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} maxLength={500} />
                      <span className="text-[10px] text-muted-foreground mt-1 block text-right">{business.description.length}/500</span>
                    </div>
                    <div>
                      <label className={labelCls}>Price Range</label>
                      <div className="flex gap-2">
                        {["$", "$$", "$$$", "$$$$"].map((p) => (
                          <button key={p} onClick={() => setBusiness({ ...business, priceRange: p })}
                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${business.priceRange === p ? "bg-primary text-primary-foreground" : "bg-muted/50 border text-muted-foreground hover:bg-muted"}`}>{p}</button>
                        ))}
                      </div>
                    </div>
                    <div><label className={labelCls}>Capacity</label><input value={business.capacity} onChange={(e) => setBusiness({ ...business, capacity: e.target.value.replace(/\D/g, "") })} className={inputCls} maxLength={5} /></div>
                    <div><label className={labelCls}>Established Year</label><input value={business.established} onChange={(e) => setBusiness({ ...business, established: e.target.value.replace(/\D/g, "") })} className={inputCls} maxLength={4} /></div>
                  </div>
                  <div className="flex justify-end mt-6"><button onClick={() => save("Business details")} className={btnPrimary}><Save className="w-4 h-4" /> Save Details</button></div>
                </div>
              </motion.div>
            )}

            {/* ── HOURS & CONTACT ────────────────────── */}
            {activePanel === "hours" && (
              <motion.div key="hours" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border">
                  <h3 className="font-display font-semibold text-lg mb-6">Contact Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Address</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={business.address} onChange={(e) => setBusiness({ ...business, address: e.target.value })} className={`${inputCls} pl-10`} maxLength={200} /></div></div>
                    <div><label className={labelCls}>Phone</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={business.phone} onChange={(e) => setBusiness({ ...business, phone: e.target.value })} className={`${inputCls} pl-10`} maxLength={20} /></div></div>
                    <div><label className={labelCls}>Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} className={`${inputCls} pl-10`} maxLength={100} /></div></div>
                    <div><label className={labelCls}>Website</label><div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={business.website} onChange={(e) => setBusiness({ ...business, website: e.target.value })} className={`${inputCls} pl-10`} maxLength={200} /></div></div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border">
                  <h3 className="font-display font-semibold text-lg mb-6">Operating Hours</h3>
                  <div className="space-y-2">
                    {hours.map((d, i) => (
                      <div key={d.day} className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 p-3 rounded-xl bg-muted/30">
                        <span className="w-20 sm:w-24 text-sm font-medium shrink-0">{d.day}</span>
                        <Switch checked={!d.closed} onCheckedChange={(v) => updateHour(i, { closed: !v })} />
                        {d.closed ? <span className="text-sm text-muted-foreground italic">Closed</span> : (
                          <div className="flex items-center gap-2">
                            <input type="time" value={d.open} onChange={(e) => updateHour(i, { open: e.target.value })} className="px-2 py-1.5 rounded-lg bg-background border text-sm w-[110px]" />
                            <span className="text-xs text-muted-foreground">to</span>
                            <input type="time" value={d.close} onChange={(e) => updateHour(i, { close: e.target.value })} className="px-2 py-1.5 rounded-lg bg-background border text-sm w-[110px]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6"><button onClick={() => save("Hours & contact")} className={btnPrimary}><Save className="w-4 h-4" /> Save Hours</button></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
