import "../globals.css";
import type { ReactNode } from "react";

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: "tk" | "ru" | "en" };
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}
