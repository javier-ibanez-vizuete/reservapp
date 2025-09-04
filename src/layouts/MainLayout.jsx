import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";

export const MainLayout = ({ children }) => {
	return (
		<div className="flex flex-col h-full">
			<NavBar />
			<main className="flex-1 flex flex-col bg-red-300 p-7">{children}</main>
			<Footer />
		</div>
	);
};
