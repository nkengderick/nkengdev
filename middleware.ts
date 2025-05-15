import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Locale, routing } from "./i18n/routing";

// Function to detect the user's preferred language
function detectPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  console.log("Accept-Language Header:", acceptLanguage);

  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    console.log("Parsed Locales:", preferredLocales);

    const matchedLocale = preferredLocales.find((locale) =>
      routing.locales.includes(locale as Locale)
    );

    console.log("Matched Locale:", matchedLocale);

    if (matchedLocale) {
      return matchedLocale as Locale;
    }
  }

  console.log("Fallback to default:", routing.defaultLocale);
  return routing.defaultLocale;
}

export default async function middleware(req: NextRequest) {
  const detectedLocale = detectPreferredLocale(req);
  console.log("Final Detected Locale:", detectedLocale);

  const url = req.nextUrl.clone();

  // Check if the URL already has a locale prefix
  const currentLocale = detectedLocale;

  if (!routing.locales.includes(currentLocale as Locale)) {
    console.log("No locale Found in the req url: ", req.url);
    console.log(`Redirecting to: /${detectedLocale}${url.pathname}`);
    url.pathname = `/${detectedLocale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return createMiddleware({
    ...routing,
    defaultLocale: detectedLocale,
    localePrefix: "always",
  })(req);
}

export const config = {
  matcher: ["/", "/(fr|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
