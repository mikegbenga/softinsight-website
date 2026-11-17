import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** Floating WhatsApp contact button. */
export function WhatsAppButton() {
  return (
    <a
      href={`${site.contact.whatsapp}?text=${encodeURIComponent("Hello SoftInsight, I would like to discuss a project.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SoftInsight on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-0 overflow-hidden bg-[#1f9e55] text-white shadow-[0_10px_30px_-10px_rgb(7_21_48/0.5)] transition-all duration-300 ease-out-quint hover:bg-[#178246] sm:right-6 sm:bottom-6"
    >
      <span className="grid size-13 place-items-center">
        <WhatsAppIcon className="size-6" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width,padding] duration-500 ease-out-quint group-hover:max-w-40 group-hover:pr-5 group-focus-visible:max-w-40 group-focus-visible:pr-5">
        Chat on WhatsApp
      </span>
    </a>
  );
}
