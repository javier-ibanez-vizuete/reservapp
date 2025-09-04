import { useLocation, useNavigate } from "react-router-dom";

import iconBackPng from "../../assets/icons/icon-go-back/icon-go-back.avif";
import iconBackWebp from "../../assets/icons/icon-go-back/icon-go-back.png";
import iconBackAvif from "../../assets/icons/icon-go-back/icon-go-back.webp";

const defaultImage = (
    <picture className="flex flex-1 justify-center items-center">
        <source srcSet={iconBackWebp} type="image/webp" />
        <source srcSet={iconBackAvif} type="image/avif" />
        <img className="w-full" src={iconBackPng} alt="Icon go Back" />
    </picture>
);

export const BackButton = ({ fallbackPath = "/", children = defaultImage }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const from = location.state?.from;
        if (from) return navigate(from);
        if (window.history.length > 1) return navigate(-1);
        return navigate(fallbackPath);
    };

    return (
        <button className="flex justify-center items-center w-8 self-start mb-6" onClick={handleBack}>
            {children}
        </button>
    );
};
