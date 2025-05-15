"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "./button";
import { Globe } from "lucide-react";
import { Locale } from "../../i18n/routing";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "fr" : "en";
    // Remove the current locale from the pathname and add the new one
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the locale segment
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      aria-label={`Switch to ${locale === "en" ? "French" : "English"}`}
    >
      <Globe className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">
        Current language: {locale === "en" ? "English" : "French"}
      </span>
    </Button>
  );
}
