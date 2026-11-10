const regex = {
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	password: {
		isUpper: /[A-Z]/,
		isLower: /[a-z]/,
		isNum: /\d/,
		hasSpecialCharacter: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
	},
	pwd: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
	passwordCriteria: {
		eightChar: /^.{8,}$/,
		lower: /(?=.*[a-z])/,
		upper: /(?=.*[A-Z])/,
		digit: /(?=.*\d)/,
		specialChar: /(?=.*[!@#$%^&*])/,
	},
};

export default regex;
