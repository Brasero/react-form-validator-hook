import {BiCheck} from "react-icons/bi";

import useValidator from "react-form-validator-hook";

const formConfig = {
    name: {
        rules: {
            required: {
                message: "Le nom est obligatoire"
            },
            minLength: {
                value: 3,
                message: "Le nom doit contenir au moins 3 caractères"
            },
            maxLength: {
                value: 20,
                message: "Le nom doit contenir au plus 20 caractères"
            },
            pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Le nom ne doit contenir que des lettres"
            }
        },
    },
    email: {
        rules: {
            required: {
                message: "L'email est obligatoire"
            },
            email: {
                message: "L'email n'est pas valide"
            }
        }
    },
    password: {
        rules: {
            password: true,
            required: {
                message: "Le mot de passe est obligatoire"
            },
            minLengthPassword: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères"
            },
            number: {
                message: "Le mot de passe doit contenir au moins un chiffre"
            },
            upperCase: {
                message: "Le mot de passe doit contenir au moins une majuscule"
            },
            lowerCase: {
                message: "Le mot de passe doit contenir au moins une minuscule"
            },
            specialChar: {
                message: "Le mot de passe doit contenir au moins un caractère spécial"
            },
            error: {
                message: "Le mot de passe ne respecte pas les règles de sécurité"
            }
        }
    },
    passwordConfirm: {
        rules: {
            required: {
                message: "La confirmation du mot de passe est obligatoire"
            },
            confirm: {
                field: "password",
                message: "La confirmation du mot de passe ne correspond pas au mot de passe"
            }
        }
    }
}

function SimpleFormWithPasswordComponent() {

    const initialState = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }

    const {
        values,
        handleValueChange,
        validateOnSubmit,
        PasswordValidationComponent,
        ErrorComponent
    } = useValidator(initialState, formConfig);

    const handleChange = (event) => {
        const {name, value} = event.target;
        handleValueChange(name, value);
    }


    return (
        <>
            <form onSubmit={validateOnSubmit}>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" name="name" value={values.name} onChange={handleChange}/>
                    <ErrorComponent name={"name"}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={values.email} onChange={handleChange}/>
                    <ErrorComponent name={"email"}/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
                    <ErrorComponent name={"password"}/>
                    <PasswordValidationComponent validIcon={<BiCheck/>}/>
                </div>
                <div>
                    <label htmlFor="passwordConfirm">confirm</label>
                    <input type="password" id="passwordConfirm" name="passwordConfirm" value={values.passwordConfirm}
                           onChange={handleChange}/>
                    <ErrorComponent name={"passwordConfirm"}/>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default SimpleFormWithPasswordComponent;
