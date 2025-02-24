import { useEffect } from 'react'
import ImageWithFallback from '../components/ImageWithFallback'
import { Button } from '../components/Button'
import { t } from '@/i18n/locale_service'
import { ErrorProps } from '@/lib/types'


export default function createErrorComponent(message?: string) {
    return function ErrorComponent({ error, reset }: ErrorProps) {
        useEffect(() => {
            // Log the error to an error reporting service like Sentry
            console.log(error, error?.digest)
        }, [error])

        return (
            <div className="error-container">
                <ImageWithFallback src="/broken.png" alt="Error" width={200} height={200} />
                <h1 className="page-title-text">{t("oops")}</h1>
                <h2 className="sub-title-text">{t("error_slug")}</h2>
                {message && <p className="error-text">{message}</p>}
                <p className="error-text">
                    {error?.digest && t("error_id", [error.digest])}
                </p>
                <Button onClick={reset}>{t("try_again")}</Button>
            </div>
        )
    }
}