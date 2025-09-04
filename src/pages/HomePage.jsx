import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export const HomePage = () => {
	const { getText } = useContext(LanguageContext);

	return (
		<section>
			<h1>{getText("h1HomePage")}</h1>
		</section>
	);
};
