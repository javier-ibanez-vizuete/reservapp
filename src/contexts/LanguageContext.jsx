import { createContext, useState } from "react";

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
	const [lang, setLang] = useState("en");

	const getText = (key) => {
		const selectedText = TEXTS[lang][key];
		if (!selectedText) return "No text Found";
		return selectedText;
	};
	const handleLang = (lang = "en") => {
		setLang(lang);
	};

	const languages = {
		en: "English",
		es: "Español",
		fr: "Français",
		it: "Italiano",
		de: "Deutsch",
		zh: "中文（简体）",
	};

	const TEXTS = {
		en: {
			h1HomePage: "Home Page Title",
			userNavLabel: "Profile",
		},

		es: {},

		fr: {},

		it: {},

		de: {},

		zh: {},
	};

	return <LanguageContext value={{ lang, TEXTS, languages, getText, handleLang }}>{children}</LanguageContext>;
};
