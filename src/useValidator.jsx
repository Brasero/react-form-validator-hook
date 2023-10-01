import React, {useState} from "react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

const useValidator = (state, config) => {
    const [values, setValues] = useState(state);
    const [errors, setErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({
        minLength: !config.password,
        number: !config.password.rules.number || false,
        upperCase: !config.password.rules.upperCase || false,
        lowerCase: !config.password.rules.lowerCase || false,
        specialChar: !config.password.rules.specialChar || false
    });

    const handleValueChange = (name, value) => {
        setValues({...values, [name]: value});
        validate(name, value);
    }

    const handleBlur = (name) => {
        validate(name, values[name]);
    }

    const validateOnSubmit = (event) => {
        event.preventDefault();
        const errors = Object.keys(config).reduce((acc, name) => {
            const value = values[name];
            const error = validate(name, value);
            return {...acc, [name]: error};
        }, {});
        setErrors(errors);
    }

    const validate = (name, value) => {
        const rules = config[name].rules;
        const errorsArray = [];
        if (rules.required && !value) {
            errorsArray.push(rules.required.message);
        }
        if (rules.pattern && !rules.pattern.value.test(value)) {
            errorsArray.push(rules.pattern.message);
        }
        if (rules.minLength && value.length < rules.minLength) {
            errorsArray.push(rules.minLength.message);
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            errorsArray.push(rules.maxLength.message);
        }
        if (rules.min && value < rules.min) {
            errorsArray.push(rules.min.message);
        }
        if (rules.max && value > rules.max) {
            errorsArray.push(rules.max.message);
        }
        if (rules.email && !emailRegex.test(value)) {
            errorsArray.push(rules.email.message);
        }
        if (rules.confirm && value !== values[rules.confirm.field]) {
            errorsArray.push(rules.confirm.message);
        }

        if (rules.password) {
            const newPasswordErrors = {
                minLength: value.length >= rules.minLengthPassword,
                number: rules.number ? /[0-9]/.test(value) : true,
                upperCase: rules.upperCase ? /[A-Z]/.test(value) : true,
                lowerCase: rules.lowerCase ? /[a-z]/.test(value) : true,
                specialChar: rules.specialChar ? /[^A-Za-z0-9]/.test(value) : true
            };
            setPasswordErrors(newPasswordErrors);
            if (!Object.values(newPasswordErrors).every((value) => value)) {
                errorsArray.push(rules.error.message);
            }
        }

        setErrors({...errors, [name]: errorsArray});
        return errorsArray;
    }

    const PasswordValidationComponent = ({validIcon}) => {
        return (
            <div className={"password-validation"}>
                <div className={"password-validation-wrapper"}>
                    <div className={"password-validation__item"}>
                        <div className={"password-validation__item__icon"}>
                            {passwordErrors.minLength && validIcon}
                        </div>
                        <div className={`password-validation__item__text ${passwordErrors.minLength && ' valid'}`}>
                            {config.password.rules.minLengthPassword.message}
                        </div>
                    </div>
                    {
                        config.password.rules.number && (
                            <div className={"password-validation__item"}>
                                <div className={"password-validation__item__icon"}>
                                    {passwordErrors.number && validIcon}
                                </div>
                                <div className={`password-validation__item__text ${passwordErrors.number && ' valid'}`}>
                                    {config.password.rules.number.message}
                                </div>
                            </div>
                        )
                    }
                    {
                        config.password.rules.upperCase && (
                            <div className={"password-validation__item"}>
                                <div className={"password-validation__item__icon"}>
                                    {passwordErrors.upperCase && validIcon}
                                </div>
                                <div className={`password-validation__item__text ${passwordErrors.upperCase && ' valid'}`}>
                                    {config.password.rules.upperCase.message}
                                </div>
                            </div>
                        )
                    }
                    {
                        config.password.rules.lowerCase && (
                            <div className={"password-validation__item"}>
                                <div className={"password-validation__item__icon"}>
                                    {passwordErrors.lowerCase && validIcon}
                                </div>
                                <div className={`password-validation__item__text ${passwordErrors.lowerCase && ' valid'}`}>
                                    {config.password.rules.lowerCase.message}
                                </div>
                            </div>
                        )
                    }
                    {
                        config.password.rules.specialChar && (
                            <div className={"password-validation__item"}>
                                <div className={"password-validation__item__icon"}>
                                    {passwordErrors.specialChar && validIcon}
                                </div>
                                <div
                                    className={`password-validation__item__text ${passwordErrors.specialChar && ' valid'}`}>
                                    {config.password.rules.specialChar.message}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    const ErrorComponent = ({name}) => {
        return (
            errors[name] && errors[name].length > 0 && (
                <div className={"form-error"}>
                    {errors[name].map((error, index) => (
                        <div key={index} className={"form-error__item"}>
                            {error}
                        </div>
                    ))}
                </div>
            )
        )
    }

    return {
        values,
        errors,
        handleValueChange,
        handleBlur,
        validateOnSubmit,
        PasswordValidationComponent,
        ErrorComponent
    }
}

export default useValidator;