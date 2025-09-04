import { useContext, useState } from "react";
import { BackButton } from "../components/UI/BackButton";
import { LanguageContext } from "../contexts/LanguageContext";
import { AuthContext } from "../contexts/AuthContext";
import { usePassWordVisibility } from "../hooks/usePasswordVisibility";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";

const INITIAL_LOGIN_DATA = {
	email: "",
	password: "",
};

export const LoginPage = () => {
	const [loginData, setLoginData] = useState(INITIAL_LOGIN_DATA);
	const [errorKey, setErrorKey] = useState("");

	const { getText } = useContext(LanguageContext);
	const { userLogin } = useContext(AuthContext);

	const passwordView = usePassWordVisibility();
	const navigate = useNavigate();

	const { email, password } = loginData;

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setErrorKey("");
		setLoginData((prevValue) => ({ ...prevValue, [name]: value }));
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const { email, password } = loginData;

		if (!email) return setErrorKey("noEmailField");
		if (!password) return setErrorKey("nopasswordField");

		const loginUser = userLogin(loginData);
		if (!loginUser) return setErrorKey("emailOrPasswordError");
		return navigate("/");
	};

	return (
		<section className="flex flex-1 flex-col gap-4">
			<BackButton />

			<h1>LOG IN</h1>

			<form action="#" method="get" onSubmit={onFormSubmit}>
				<CustomInput inputName={"email"} labelName={"LABELINPUTEMAIL"}>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={onInputChange}
						placeholder="PlaceholderINPUTEMAIL"
						className="p-2 rounded-sm text-sm placeholder:opacity-70"
					/>
				</CustomInput>
				<CustomInput inputName={"password"} labelName={"LABELINPUTPASSWORD"}>
					<div className="flex items-center">
						<input
							type={passwordView.visible ? "text" : "password"}
							name="password"
							id="password"
							value={password}
							onChange={onInputChange}
							placeholder="PLACEHOLDER inputPassword"
							className="flex-1 p-2 rounded-sm text-sm placeholder:opacity-70"
						/>
					</div>
				</CustomInput>
				<div className="flex flex-col gap-2">
					{errorKey && <small className="text-sm text-red-600 italic opacity-50">MENSAJE DE ERROR</small>}
					<button
						className="p-2 bg-blue-500 rounded-md shadow-md cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition"
						type="submit"
					>
						BOTON INICIAR SESION
					</button>
					<div>
						¿No tienes cuenta?{" "}
						<Link className="cursor-pointer text-blue-500" to={"/register"}>
							Registrarse
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
};
