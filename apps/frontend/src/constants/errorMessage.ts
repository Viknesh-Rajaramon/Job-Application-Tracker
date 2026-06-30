const errorMessage = {
	required: "This is a required field",
	invalidEmail: "Please enter a valid email address",
	unregisteredEMail: "Please enter a registered email address",
	emailExist: "Email already exists",
	digitRequired: (num: number) => `This needs to be total of ${num} digit number`,
	
	unknownErr: "Some error occurred",
	inValidCredentials: "Invalid credentials. Please try again.",
	accountLocked: "Too many failed attempts. Please try again after a short wait.",
	invalidPassword: "Passwords do not match. Please try again.",
	password: "8 Characters | 1 Uppercase | 1 Lowercase | 1 Digit | 1 Special Character",
};

export default errorMessage;
