import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Tourism layout & pages
import TourismLayout from "@/components/tourism/TourismLayout";
import DallasHomePage from "@/pages/dallas/DallasHomePage";
import DallasAttractionsPage from "@/pages/dallas/DallasAttractionsPage";
import DallasRestaurantsPage from "@/pages/dallas/DallasRestaurantsPage";
import DallasHotelsPage from "@/pages/dallas/DallasHotelsPage";
import DallasEventsPage from "@/pages/dallas/DallasEventsPage";
import DallasWorldCupPage from "@/pages/dallas/DallasWorldCupPage";
import DallasTripIdeasPage from "@/pages/dallas/DallasTripIdeasPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to Dallas */}
          <Route path="/" element={<Navigate to="/dallas" replace />} />

          {/* Dallas tourism site */}
          <Route path="/dallas" element={<TourismLayout />}>
            <Route index element={<DallasHomePage />} />
            <Route path="attractions" element={<DallasAttractionsPage />} />
            <Route path="attractions/:id" element={<DallasAttractionsPage />} />
            <Route path="restaurants" element={<DallasRestaurantsPage />} />
            <Route path="restaurants/:id" element={<DallasRestaurantsPage />} />
            <Route path="hotels" element={<DallasHotelsPage />} />
            <Route path="hotels/:id" element={<DallasHotelsPage />} />
            <Route path="events" element={<DallasEventsPage />} />
            <Route path="worldcup" element={<DallasWorldCupPage />} />
            <Route path="trip-ideas" element={<DallasTripIdeasPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
