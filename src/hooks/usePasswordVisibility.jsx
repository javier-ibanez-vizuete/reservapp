import { useToggle } from "./useToggle";

export const usePassWordVisibility = (option = false) => {
	const [visible, toggleVisible] = useToggle(option);

	return { visible, toggleVisible };
};
