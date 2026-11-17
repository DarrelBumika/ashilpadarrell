"use client";

import { useMemo, useState, type ReactNode } from "react";
import { SiteFooterContext } from "@hooks/useSiteFooter";

const SiteFooterProvider = ({ children }: { children: ReactNode }) => {
  const [footer, setFooter] = useState<HTMLElement | null>(null);
  const value = useMemo(() => ({ footer, setFooter }), [footer]);

  return (
    <SiteFooterContext.Provider value={value}>
      {children}
    </SiteFooterContext.Provider>
  );
};

export default SiteFooterProvider;
