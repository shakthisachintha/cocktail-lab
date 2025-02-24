import React from 'react'
import { t } from '@/i18n/locale_service'
import ImageWithFallback from './components/ImageWithFallback'

const NotFound = () => {
  return (
    <div className="error-container">
      <ImageWithFallback src="/broken.png" alt="Error" width={200} height={200} />
      <h1 className="page-title-text">{t("oops")}</h1>
      <h2 className="sub-title-text">{t("not_found_slug")}</h2>
    </div>
  )
}

export default NotFound