import { createContext, useState } from "react";

const INITIAL_USERS_DATABASE = [
	{ id: 1, name: "admin", email: "admin@admin.com", password: "adminadmin", role: "admin", active: "false" },
];

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [usersDataBase, setUsersDataBase] = useState(INITIAL_USERS_DATABASE);
	const [userActive, setUserActive] = useState(null);

	const generateNewId = () => {
		const randomId = Number((Math.random() * 10000).toFixed(0));
		const idExist = usersDataBase.some(({ id }) => id === randomId);
		if (idExist) return generateNewId();
		return randomId;
	};

	const userValidate = (userData) => {
		const { email } = userData;
		const userExist = usersDataBase.some((user) => user.email === email);
		if (userExist) return true;
		return false;
	};

	const userLogin = (userData) => {
		const validateUser = usersDataBase.some((user) => {
			const sameEmail = user.email === userData.email;
			const samePassword = userData.password === userData.password;
			return sameEmail && samePassword;
		});
		if (!validateUser) return false;

		const currentUser = usersDataBase.find((user) => {

			return user.email === userData.email;
		});

		if (!currentUser) return console.log("NO HUBO COINCIDENCIAS EN EL EMAIL");

		const restUsers = usersDataBase.filter((user) => currentUser?.id !== user.id);

		const newCurrentUser = { ...currentUser, active: true };
		const newUsersDataBase = [...restUsers, newCurrentUser];

		setUserActive({ ...newCurrentUser });
		setUsersDataBase([...newUsersDataBase]);
		return true;
	};

	const userCreate = (userData) => {
		const newId = generateNewId();
		const newUser = { ...userData, id: newId, role: "user", active: false };
		setUsersDataBase((prevUsersDataBase) => [...prevUsersDataBase, newUser]);
		userLogin(userData);
	};

	const logout = () => {
		const currentUser = usersDataBase.find((user) => user.id === userActive?.id);
		if (!currentUser) return console.log("LOGOUT FALLIDO");

		const restUsersDataBase = usersDataBase.filter((user) => user.id !== currentUser.id);

		const newCurrentUser = { ...currentUser, active: false };

		const newUsersDataBase = [...restUsersDataBase, newCurrentUser];

		setUsersDataBase([...newUsersDataBase]);
		setUserActive(null);
		return;
	};

	return (
		<AuthContext value={{ usersDataBase, userActive, userCreate, userLogin, userValidate, logout }}>
			{children}
		</AuthContext>
	);
};
