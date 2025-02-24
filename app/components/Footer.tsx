import { t } from '@/i18n/locale_service';

const Footer = () => {
    return (
        <footer className="footer py-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} {t("foot_note_1")}</p>
            <p className="text-sm mt-2">{t("foot_note_2")}</p>
        </footer>
    );
}

export default Footer