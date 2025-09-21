import type { RegistrationInput } from "../model/registrationInput";

type ValidationResult = {
  success: boolean;
  errorMessage?: string;
}

export function validateForm (input: RegistrationInput): ValidationResult {
  if (input.email.indexOf('@') === -1) return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2) return { success: false, errorMessage: "Username invalid" };
  return { success: true }
}