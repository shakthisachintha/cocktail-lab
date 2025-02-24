import en from './en.json';
import si from './si.json';

export type Locale = 'en' | 'si';
export type Translations = Record<Locale, Record<string, string>>;
type Params = string | number | boolean | undefined | null

const LocaleService = (locale: Locale, translations: Translations) => (messageId: string, parameters?: Params[]) => {
        let message = translations[locale][messageId];
        if (parameters && parameters.length > 0) {
            parameters.forEach((val, index) => {
                message = message.replace(`{${index + 1}}`, String(val));
            })
        }
        return message;
    };

export default LocaleService;

const translations: Translations = {
    en,
    si,
};

export const t = LocaleService('en', translations);