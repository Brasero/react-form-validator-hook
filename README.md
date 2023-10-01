# React-validator

## Installation

```bash
 npm i react-form-validator-hook
```

## Usage

```js
import React, {useState} from 'react';
import useValidator from 'react-form-validator-hook';

// Create a configuration object containing the rules for each field

const config = {
  name: {
    rules: {
        required: {
          message: 'Name is required',
        },
        minLength: {
          value: 3,
          message: 'Name must be at least 3 characters long',
        },
        maxLength: {
          value: 20,
          message: 'Name must be at most 20 characters long',
        },
    }
  },
  email: {
    rules: {
        required: {
            message: 'Email is required',
        },
        email: {
            message: 'Email is invalid',
        }
    }
  },
  password: {
      rules: {
          password: true,
          required: {
              message: "Password is required"
          },
          // For password validation you can use the following rules if you want to activate them you must set the value to an object containing an error message, otherwise if you want to deactivate them you must set the value to false
          minLengthPassword: {
              value: 8,
              message: "Password must be at least 8 characters long"
          },
          number: {
              message: "Password must contain at least one number"
          },
          upperCase: {
              message: "Password must contain at least one uppercase letter"
          },
          lowerCase: {
              message: "Password must contain at least one lowercase letter"
          },
          specialChar: false,
          error: {
              message: "Password must contain at least one number, one uppercase letter and one lowercase letter"
          }
      }
  },
  passwordConfirm: {
      rules: {
          required: {
              message: "Password confirmation is required"
          },
          confirm: {
              field: "password",
              message: "Password confirmation does not match password"
          }
      }
  }
};

const Form = () => {
    
    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };

    const {
        values,
        errors,
        handleValueChange,
        validateOnSubmit,
        PasswordValidationComponent,
        ErrorComponent,
    } = useValidator(initialValues, config);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleValueChange(name, value); 
    };
    
    return (
        <form onSubmit={validateOnSubmit}>
            {...}
            {
                // Error component show the errors of the field if there are any
            }
            <ErrorComponent name="name" />
            
            {
                // PasswordValidationComponent show the validation state of the password according to the rules defined in the configuration object
            }
            <PasswordValidationComponent />
        </form>
    )
}

export default Form;
```

> **Note:** The `PasswordValidationComponent` component is optional and is used to display the validation state of the password according to the rules defined in the configuration object.
> 
> The `ErrorComponent` component is optional and is used to display the errors of the field if there are any.
> 
> The `validateOnSubmit` function is used to validate the form when submitting.
> 
> The `handleValueChange` function is used to update the value of the field and validate it.
> 
> The `values` object contains the values of the fields.
> 
> The `errors` object contains the errors of the fields.
> 
> The `config` object contains the rules for each field.
> 
> The `initialValues` object contains the initial values of the fields.
> 
> The `name` attribute of the field must be the same as the key of the field in the `config` object.
> 
> The `message` attribute of the rule is used to display a custom error message if none passed no message will be displayed.
> 
> The `error` attribute of password rule is used to display a custom error message if password does not match the password rules set.
> 
> The `confirm` attribute of passwordConfirm rule is used to check if the password matches the password confirmation field he need a field prop in order to know the confirmed field name and compare their value.
> 
> 