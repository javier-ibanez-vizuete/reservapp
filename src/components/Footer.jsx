import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export const Footer = () => {
	const { lang, languages, handleLang } = useContext(LanguageContext);

	return (
		<footer className="flex flex-col py-6 bg-orange-200">
			<div className="flex justify-between items-center">
				<small>Elementos Footer</small>
				<label htmlFor="lang">
					<select name="lang" id="lang" value={lang} onChange={(event) => handleLang(event.target.value)}>
						{Object.entries(languages).map(([langCode, langValue]) => {
							return (
								<option key={langCode} value={langCode}>
									{langValue}
								</option>
							);
						})}
					</select>
				</label>
			</div>
			<div className="flex flex-1 justify-center items-center text-center text-sm text-gray-500">
				<p>© {new Date().getFullYear()} Tipico Footer. All rights reserved</p>
			</div>
		</footer>
	);
};
