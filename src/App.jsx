import { MainLayout } from "./layouts/MainLayout";
import { AppRouter } from "./routes/AppRouter";

export const App = () => {
	return (
		<MainLayout>
			<AppRouter />
		</MainLayout>
	);
};
