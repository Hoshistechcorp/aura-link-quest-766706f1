import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, Camera, Utensils, Hotel, Compass } from "lucide-react";

const tripIdeas = [
  {
    id: "weekend-getaway",
    title: "Perfect Weekend Getaway",
    duration: "2 days",
    description: "Hit the highlights of Dallas in a whirlwind 48-hour trip — from BBQ to arts to nightlife.",
    days: [
      { day: 1, activities: ["Sixth Floor Museum", "Klyde Warren Park lunch", "Dallas Arts District", "Deep Ellum dinner & live music"] },
      { day: 2, activities: ["Dallas Arboretum morning walk", "Bishop Arts District brunch", "Reunion Tower GeO-Deck sunset", "Uptown dining"] },
    ],
    tags: ["Culture", "Food", "Nightlife"],
  },
  {
    id: "family-fun",
    title: "Family Fun in Dallas",
    duration: "3 days",
    description: "Kid-friendly attractions, outdoor adventures, and family dining that everyone will love.",
    days: [
      { day: 1, activities: ["Perot Museum of Nature & Science", "Klyde Warren Park food trucks", "Dallas Zoo"] },
      { day: 2, activities: ["Dallas Arboretum", "White Rock Lake bike ride", "Pizza & ice cream in Lakewood"] },
      { day: 3, activities: ["LEGOLAND Discovery Center", "Galleria Dallas", "Medieval Times dinner show"] },
    ],
    tags: ["Family", "Outdoor", "Educational"],
  },
  {
    id: "foodie-tour",
    title: "Dallas Foodie Tour",
    duration: "3 days",
    description: "A culinary journey through Dallas's best restaurants, food halls, and hidden gems.",
    days: [
      { day: 1, activities: ["Pecan Lodge BBQ (arrive early!)", "Deep Ellum brewery hop", "Uchi dinner"] },
      { day: 2, activities: ["Bishop Arts brunch at Oddfellows", "Emporium Pies", "El Bolero dinner", "Midnight tacos"] },
      { day: 3, activities: ["Cattleack Barbeque (Thu-Sat only)", "Legacy Hall food hall", "Flora Street Café tasting menu"] },
    ],
    tags: ["Food", "BBQ", "Fine Dining"],
  },
  {
    id: "world-cup",
    title: "World Cup Match Day",
    duration: "1 day",
    description: "Everything you need for the ultimate World Cup match day experience in Dallas.",
    days: [
      { day: 1, activities: ["Morning: Fan Zone opens — live music & food", "Pre-game: Team march to stadium", "Match time: AT&T Stadium", "Post-game: Victory Park celebrations", "Late night: Deep Ellum after-party"] },
    ],
    tags: ["World Cup", "Sports", "Nightlife"],
  },
];

const DallasTripIdeasPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-bold">Trip Ideas</h1>
        <p className="text-muted-foreground mt-1">Curated itineraries to help you make the most of Dallas</p>
      </div>

      <div className="space-y-6">
        {tripIdeas.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="listing-card p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl">{trip.title}</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />{trip.duration}
                  </span>
                  <div className="flex gap-1.5">
                    {trip.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <Compass className="w-8 h-8 text-secondary shrink-0" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">{trip.description}</p>
            <div className="space-y-3">
              {trip.days.map((day) => (
                <div key={day.day} className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">D{day.day}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {day.activities.map((act, j) => (
                      <span key={j} className="text-sm">
                        {j > 0 && <span className="text-muted-foreground mx-1">→</span>}
                        <span className="text-foreground">{act}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DallasTripIdeasPage;
