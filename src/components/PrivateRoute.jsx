import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
	const { userActive } = useContext(AuthContext);

	if (!userActive) return <Navigate to={"/"} state={{ isUser: "No Existe Usuario" }} />;

	return <Outlet />;
};
