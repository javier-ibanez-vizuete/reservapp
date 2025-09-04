import { useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { AuthContext } from "../contexts/AuthContext";
import { usePassWordVisibility } from "../hooks/usePasswordVisibility";
import { CustomInput } from "../components/CustomInput";
import { BackButton } from "../components/UI/BackButton";
import { Link } from "react-router-dom";
const INITIAL_REGISTER_FORM_DATA = {
	name: "",
	email: "",
	password: "",
	repassword: "",
};

export const RegisterPage = () => {
	const [formData, setFormData] = useState(INITIAL_REGISTER_FORM_DATA);
	const [errorKey, setErrorKey] = useState("");

	const { getText } = useContext(LanguageContext);
	const { userValidate, userCreate } = useContext(AuthContext);

	const passwordView = usePassWordVisibility();
	const rePasswordView = usePassWordVisibility();

	const { name, email, password, repassword } = formData;

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setErrorKey("");
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const { name, email, password, repassword } = formData;

		if (!name) return setErrorKey("noNameField");
		if (name.length < 2) return setErrorKey("nameFieldShorter");
		if (name.length > 20) return setErrorKey("nameFieldLonger");
		if (!email) return setErrorKey("noEmailField");
		if (!email.includes("@")) return setErrorKey("emailNotValid");
		if (!email.includes(".")) return setErrorKey("emailNotValid");
		if (email.length < 4) return setErrorKey("emailShorter");
		if (!password) return setErrorKey("noPasswordField");
		if (password.length < 8) return setErrorKey("passwordShorter");
		if (password.length > 20) return setErrorKey("passwordLonger");
		if (!repassword) return setErrorKey("noRePasswordField");
		if (password !== repassword) return setErrorKey("passwordNotEqual");

		const newUserData = { name, email, password };

		const userExist = userValidate(newUserData);
		if (userExist) return setErrorKey("emailExistAlert");

		userCreate(newUserData);
		setFormData(INITIAL_REGISTER_FORM_DATA);
		setErrorKey("");
	};

	const onFormReset = () => {
		setFormData(INITIAL_REGISTER_FORM_DATA);
		setErrorKey("");
	};

	return (
		<section className="flex flex-1 flex-col gap-4">
			<BackButton />

			<h1 className="text-xl font-bold">FORMULARIO REGISTRO</h1>
			<form action="#" method="get" onSubmit={onFormSubmit} onReset={onFormReset} className="flex flex-col gap-6">
				<CustomInput inputName={"name"} labelName={"LABELINPUTNAME"}>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={onInputChange}
						placeholder="PlaceholderINPUTNAME"
						className="p-2 rounded-sm text-sm placeholder:opacity-70"
					/>
				</CustomInput>
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
							placeholder="PlaceholderINPUTPASSWORD"
							className="flex-1 p-2 rounded-sm text-sm placeholder:opacity-70"
						/>
						<button type="button" onClick={passwordView.toggleVisible}>
							{passwordView.visible ? "VISIBLE" : "NO VISIBLE"}
						</button>
					</div>
				</CustomInput>
				<CustomInput inputName={"repassword"} labelName={"LABELINPUTREPASSWORD"}>
					<div className="flex items-center">
						<input
							type={rePasswordView.visible ? "text" : "password"}
							name="repassword"
							id="repassword"
							value={repassword}
							onChange={onInputChange}
							placeholder="PlaceholderINPUTREPASSWORD"
							className="flex-1 p-2 rounded-sm text-sm placeholder:opacity-70"
						/>
						<button type="button" onClick={rePasswordView.toggleVisible}>
							{rePasswordView.visible ? "VISIBLE" : "NO VISIBLE"}
						</button>
					</div>
				</CustomInput>
				<div className="flex flex-col gap-2">
					{errorKey && <small className="text-sm text-red-600 italic opacity-50">MENSAJE DE ERROR</small>}
					<button
						className="p-2 bg-blue-500 rounded-md shadow-md cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition"
						type="submit"
					>
						BOTON REGISTRARSE
					</button>
					<button
						className="p-2 bg-blue-500 rounded-md shadow-md cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition"
						type="reset"
					>
						BOTON RESETEAR FORMULARIO
					</button>
					<div>
						¿Ya tienes Cuenta?{" "}
						<Link className="cursor-pointer text-blue-500" to={"/login"}>
							Inicia sesion
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
};
