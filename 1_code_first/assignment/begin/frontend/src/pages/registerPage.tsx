import { Layout } from "../components/layout";
import {
  RegistrationForm,
} from "../components/registrationForm";
import type { RegistrationInput } from "../model/registrationInput";
import { validateForm } from "../helper/userFormValidator";
import { useSpinner } from "../context/spinnerContext";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const { setIsLoading } = useSpinner();
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmitRegistrationForm = (input: RegistrationInput) => {
        const formValidationResult = validateForm(input);
        if(!formValidationResult.success) {
            toast.error(formValidationResult.errorMessage);
            return;
        }

        setIsLoading(true);
        
        try {
        api.register(input)
            .then(() => {
                setUser(input);
                setIsLoading(false);
                toast.success("Registration successful", {
                    autoClose: 3000,
                    onClose: () => navigate("/")
                });
            });
        } catch (err) {
            setIsLoading(false);
            toast.error('Unknown Error');
        }
  
    }

    return (
        <Layout>
            <RegistrationForm 
                onSubmit={(input: RegistrationInput) =>
                    handleSubmitRegistrationForm(input)
                }
            />
        </Layout>
    );
}