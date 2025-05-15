"use client"

import { useEffect } from "react";

const ChatwootWidget = () => {
  useEffect(() => {
    (function (d, t) {
      const BASE_URL = "https://app.chatwoot.com";
      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode?.insertBefore(g, s);
      g.onload = function () {
        (window as any).chatwootSDK.run({
          websiteToken: "eBfgD7atc8vgz6nD4cNVJgKV",
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
};

export default ChatwootWidget;
