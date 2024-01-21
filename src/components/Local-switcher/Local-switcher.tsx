"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "../../../i18n.config";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="flex gap-x-3">
      {i18n.locales.map((locale: any) => {
        const isCurrentLocale = pathName.includes(locale);

        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              passHref
              className={`rounded-md border border-mainColor font-bold ${
                isCurrentLocale
                  ? "bg-mainColor text-white"
                  : "bg-bgColor text-black"
              } px-3 py-2`}
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
