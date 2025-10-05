import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "01743764995";
  const message = encodeURIComponent("Hallo, ich interessiere mich für Ihre Fahrzeuge.");

  return (
    <a
      href={`https://wa.me/49${phoneNumber.slice(1)}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-xl hover:shadow-2xl"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
