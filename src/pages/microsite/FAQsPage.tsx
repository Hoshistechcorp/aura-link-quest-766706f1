import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMicrositeContent } from "@/contexts/MicrositeContentContext";

const FAQsPage = () => {
  const navigate = useNavigate();
  const { getItems } = useMicrositeContent();
  const faqs = getItems("faqs");

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-lg font-semibold">Travel FAQs</h1>
      </div>

      <div className="px-4 mt-4">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.id} value={`faq-${i}`} className="rounded-xl bg-card border px-4">
              <AccordionTrigger className="text-sm font-medium text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="h-8" />
    </div>
  );
};

export default FAQsPage;
