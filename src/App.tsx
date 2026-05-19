import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountTypeProvider } from "@/contexts/AccountTypeContext";
import { MicrositeContentProvider } from "@/contexts/MicrositeContentContext";
import Index from "./pages/Index";
import AccountTypeSelectorPage from "./pages/AccountTypeSelectorPage";
import Microsite from "./pages/Microsite";
import Dashboard from "./pages/Dashboard";
import QRManagement from "./pages/dashboard/QRManagement";
import AffiliateDashboard from "./pages/dashboard/AffiliateDashboard";
import SubscriptionPage from "./pages/dashboard/SubscriptionPage";
import InfluencerPage from "./pages/dashboard/InfluencerPage";
import LoyaltyPage from "./pages/dashboard/LoyaltyPage";
import ReferralPage from "./pages/dashboard/ReferralPage";
import SEOPage from "./pages/dashboard/SEOPage";
import ReputationPage from "./pages/dashboard/ReputationPage";
import EnterprisePage from "./pages/dashboard/EnterprisePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import AdminPage from "./pages/dashboard/AdminPage";
import GamificationPage from "./pages/dashboard/GamificationPage";
import CardStudioPage from "./pages/dashboard/CardStudioPage";
import LocationsPage from "./pages/dashboard/LocationsPage";
import TeamPage from "./pages/dashboard/TeamPage";
import EcosystemPage from "./pages/dashboard/EcosystemPage";
import TourismDashboardPage from "./pages/dashboard/TourismDashboardPage";
// Tourism microsite pages
import MenuPage from "./pages/microsite/MenuPage";
import GalleryPage from "./pages/microsite/GalleryPage";
import ReviewsPage from "./pages/microsite/ReviewsPage";
import ConciergePage from "./pages/microsite/ConciergePage";
import StaffPage from "./pages/microsite/StaffPage";
import DetailsPage from "./pages/microsite/DetailsPage";
import PrivateDiningPage from "./pages/microsite/PrivateDiningPage";
import PopularDishesPage from "./pages/microsite/PopularDishesPage";
import AwardsPage from "./pages/microsite/AwardsPage";
import FAQsPage from "./pages/microsite/FAQsPage";
import EventsPage from "./pages/microsite/EventsPage";
import SocialLinksPage from "./pages/microsite/SocialLinksPage";
import FreebieGamePage from "./pages/microsite/FreebieGamePage";
import ReferralLinkPage from "./pages/microsite/ReferralLinkPage";
import AffiliatePage from "./pages/microsite/AffiliatePage";
// Destination pages
import AttractionsPage from "./pages/destination/AttractionsPage";
import ThingsToDoPage from "./pages/destination/ThingsToDoPage";
import EventsFestivalsPage from "./pages/destination/EventsFestivalsPage";
import FoodDiningPage from "./pages/destination/FoodDiningPage";
import HotelsStaysPage from "./pages/destination/HotelsStaysPage";
import CulturalExperiencesPage from "./pages/destination/CulturalExperiencesPage";
import NatureParksPage from "./pages/destination/NatureParksPage";
import NeighborhoodGuidePage from "./pages/destination/NeighborhoodGuidePage";
import TransportationPage from "./pages/destination/TransportationPage";
import VisitorServicesPage from "./pages/destination/VisitorServicesPage";
import LocalBusinessesPage from "./pages/destination/LocalBusinessesPage";
import PhotoMemoriesPage from "./pages/destination/PhotoMemoriesPage";
import UpcomingDealsPage from "./pages/destination/UpcomingDealsPage";
import LocalCreatorsPage from "./pages/destination/LocalCreatorsPage";
import PlanYourTripPage from "./pages/destination/PlanYourTripPage";
import GlobalMapPage from "./pages/destination/GlobalMapPage";
import AITripPlannerPage from "./pages/destination/AITripPlannerPage";
import SustainabilityPage from "./pages/destination/SustainabilityPage";
import DestinationCardStudioPage from "./pages/dashboard/DestinationCardStudioPage";
import SponsoredAttractionsPage from "./pages/dashboard/SponsoredAttractionsPage";
import EventPromotionPage from "./pages/dashboard/EventPromotionPage";
import BusinessPromotionPage from "./pages/dashboard/BusinessPromotionPage";
import TourismGamificationPage from "./pages/dashboard/TourismGamificationPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import ModuleManagerPage from "./pages/dashboard/ModuleManagerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccountTypeProvider>
      <MicrositeContentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/account-type" element={<AccountTypeSelectorPage />} />
            <Route path="/microsite" element={<Microsite />} />
            {/* Restaurant microsite */}
            <Route path="/microsite/menu" element={<MenuPage />} />
            <Route path="/microsite/gallery" element={<GalleryPage />} />
            <Route path="/microsite/reviews" element={<ReviewsPage />} />
            <Route path="/microsite/concierge" element={<ConciergePage />} />
            <Route path="/microsite/staff" element={<StaffPage />} />
            <Route path="/microsite/details" element={<DetailsPage />} />
            <Route path="/microsite/private-dining" element={<PrivateDiningPage />} />
            <Route path="/microsite/popular-dishes" element={<PopularDishesPage />} />
            <Route path="/microsite/awards" element={<AwardsPage />} />
            <Route path="/microsite/faqs" element={<FAQsPage />} />
            <Route path="/microsite/events" element={<EventsPage />} />
            <Route path="/microsite/social-links" element={<SocialLinksPage />} />
            <Route path="/microsite/freebie-game" element={<FreebieGamePage />} />
            <Route path="/microsite/referral" element={<ReferralLinkPage />} />
            <Route path="/microsite/affiliate" element={<AffiliatePage />} />
            {/* Destination microsite */}
            <Route path="/destination/attractions" element={<AttractionsPage />} />
            <Route path="/destination/things-to-do" element={<ThingsToDoPage />} />
            <Route path="/destination/events-festivals" element={<EventsFestivalsPage />} />
            <Route path="/destination/food-dining" element={<FoodDiningPage />} />
            <Route path="/destination/hotels" element={<HotelsStaysPage />} />
            <Route path="/destination/culture" element={<CulturalExperiencesPage />} />
            <Route path="/destination/nature" element={<NatureParksPage />} />
            <Route path="/destination/neighborhoods" element={<NeighborhoodGuidePage />} />
            <Route path="/destination/transportation" element={<TransportationPage />} />
            <Route path="/destination/visitor-services" element={<VisitorServicesPage />} />
            <Route path="/destination/local-businesses" element={<LocalBusinessesPage />} />
            <Route path="/destination/photos" element={<PhotoMemoriesPage />} />
            <Route path="/destination/deals" element={<UpcomingDealsPage />} />
            <Route path="/destination/creators" element={<LocalCreatorsPage />} />
            <Route path="/destination/plan-trip" element={<PlanYourTripPage />} />
            <Route path="/destination/ai-planner" element={<AITripPlannerPage />} />
            <Route path="/destination/sustainability" element={<SustainabilityPage />} />
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/qr" element={<QRManagement />} />
            <Route path="/dashboard/affiliates" element={<AffiliateDashboard />} />
            <Route path="/dashboard/subscription" element={<SubscriptionPage />} />
            <Route path="/dashboard/influencers" element={<InfluencerPage />} />
            <Route path="/dashboard/loyalty" element={<LoyaltyPage />} />
            <Route path="/dashboard/referrals" element={<ReferralPage />} />
            <Route path="/dashboard/seo" element={<SEOPage />} />
            <Route path="/dashboard/reputation" element={<ReputationPage />} />
            <Route path="/dashboard/enterprise" element={<EnterprisePage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/admin" element={<AdminPage />} />
            <Route path="/dashboard/gamification" element={<GamificationPage />} />
            <Route path="/dashboard/cards" element={<CardStudioPage />} />
            <Route path="/dashboard/locations" element={<LocationsPage />} />
            <Route path="/dashboard/team" element={<TeamPage />} />
            <Route path="/dashboard/tourism" element={<TourismDashboardPage />} />
            <Route path="/dashboard/destination-cards" element={<DestinationCardStudioPage />} />
            <Route path="/dashboard/sponsored-attractions" element={<SponsoredAttractionsPage />} />
            <Route path="/dashboard/event-promotion" element={<EventPromotionPage />} />
            <Route path="/dashboard/business-promotion" element={<BusinessPromotionPage />} />
            <Route path="/dashboard/tourism-gamification" element={<TourismGamificationPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/ecosystem/:appId" element={<EcosystemPage />} />
            <Route path="/dashboard/modules/:module" element={<ModuleManagerPage />} />
            <Route path="/destination/map" element={<GlobalMapPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </MicrositeContentProvider>
    </AccountTypeProvider>
  </QueryClientProvider>
);

export default App;
