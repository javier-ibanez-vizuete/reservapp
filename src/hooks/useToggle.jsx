import { useState } from "react";

export const useToggle = (givenOption = false) => {
	const [visible, setVisible] = useState(givenOption);

	if (typeof givenOption !== "boolean") return null;

	const toggleVisible = () => {
		setVisible((prev) => !prev);
	};

	return [visible, toggleVisible];
};
