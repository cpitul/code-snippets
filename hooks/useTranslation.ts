import { RecordKey, Translations } from '@declarations/types';
import { useLocalStorage } from './useStorage';

export { useTranslation };

function useTranslation(translations: Translations) {
	const [language, setLanguage] = useLocalStorage('language', 'en');
	const [fallbackLanguage, setFallbackLanguage] = useLocalStorage('fallbackLanguage', 'en');

	const translate = (key: string) => {
		const keys = key.split('.');

		return (
			getNestedTranslation(language ?? '', keys, translations) ??
			getNestedTranslation(fallbackLanguage ?? '', keys, translations) ??
			key
		);
	};

	return {
		language,
		setLanguage,
		fallbackLanguage,
		setFallbackLanguage,
		t: translate,
	};
}

function getNestedTranslation(language: string, keys: string[], translations: Translations) {
	return keys.reduce((obj, key) => {
		if (typeof obj === 'string') return obj;
		return obj?.[key];
	}, translations[language] as Record<RecordKey, string> | string);
}
