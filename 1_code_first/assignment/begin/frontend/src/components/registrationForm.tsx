import { useState } from "react";
import { Link } from "react-router-dom";
import type { RegistrationInput } from "../model/registrationInput";

interface RegistrationFormProps {
    onSubmit: (formDetails: RegistrationInput) => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
      const [userForm, setUserForm] = useState<RegistrationInput>({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
      });

    const setEmail = (value: string) => {
        setUserForm(
            {
                ...userForm,
                email: value,
            }
        )
    };

    const setUsername = (value: string) => {
        setUserForm(
            {
                ...userForm,
                username: value,
            }
        )
    };

    const setFirstName = (value: string) => {
        setUserForm(
            {
                ...userForm,
                firstName: value,
            }
        )
    };

    const setLastName = (value: string) => {
        setUserForm(
            {
                ...userForm,
                lastName: value,
            }
        )
    };

    const handleSubmit = () => {
        props.onSubmit(userForm);
    }

    return (
        <div className="registration-form">
            <div>Create Account</div>
            <input 
                className="registration-input email"
                type="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
            />
             <input 
                className="registration-input username"
                type="text"
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                className="registatation-input username"
                type="text"
                placeholder="first name"
                onChange={e => setFirstName(e.target.value)}
            />
            <input 
                className="registration-input username"
                type="text"
                placeholder="last name"
                onChange={e => setLastName(e.target.value)}
            />
            <div>
                <div className="to-login">
                    <div>Already have an account?</div>
                    <Link to="/login">Login</Link>
                </div>
                <button onClick={() => handleSubmit()} className="submit-button" type="submit">
                    Submit
                </button>
            </div>
        </div>
    );
};