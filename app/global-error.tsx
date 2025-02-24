"use client";

import { t } from "@/i18n/locale_service";
import { ErrorProps } from "@/lib/types";
import { useEffect } from "react";
import { Button } from "./components/Button";
import ImageWithFallback from "./components/ImageWithFallback";

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.log(error, error?.digest);
  }, [error]);

  return (
    <html>
      <body>
        <div className="error-container">
          <ImageWithFallback src="/broken.png" alt="Error" width={200} height={200} />
          <h1 className="page-title-text">{t("oops")}</h1>
          <h2 className="sub-title-text">{t("error_slug")}</h2>
          <p className="error-text">
            {error?.digest && t("error_id", [error.digest])}
          </p>
          <Button onClick={reset}>{t("try_again")}</Button>
        </div>
      </body>
    </html>
  );
}