const weakPasswords = ["password", "123456", "qwerty", "abc123", "letmein", "welcome"];

export const validateForm = (formData) => {
    let errors = {};
    
    // Some basic regex patterns to check if the input is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Needs at least one uppercase, one lowercase, one number, and one special character
    const phoneRegex = /^\+?\d{10,15}$/; // Accepts phone numbers with or without +, between 10 and 15 digits
    const crnRegex = /^\d{10}$/; // CRN should be exactly 10 digits
    const zipRegex = /^\d{5,10}$/; // Zip code should be between 5-10 digits

    // Looping through the form data to check if anything is missing
    Object.keys(formData).forEach(field => {
        if (!formData[field] && field !== "termsAccepted") { 
            errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`; // Making the field name more readable
        }
    });

    // Email validation - making sure it follows the proper format
    if (formData.email && !emailRegex.test(formData.email)) {
        errors.email = "Invalid email format.";
    }

    // Phone number validation - making sure it has only numbers and an optional +
    if (formData.phone && !phoneRegex.test(formData.phone)) {
        errors.phone = "Invalid phone number format.";
    }

    // CRN validation - should be exactly 10 digits
    if (formData.crNumber && !crnRegex.test(formData.crNumber)) {
        errors.crNumber = "CRN must be 10 digits.";
    }

    // Zip code validation - should be between 5-10 digits
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
        errors.zipCode = "Invalid zip code format.";
    }

    // Password validation - making sure it meets the security requirements
    if (formData.password) {
        if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must have uppercase, lowercase, number, and special character.";
        } else if (weakPasswords.includes(formData.password.toLowerCase())) {
            errors.password = "This password is too common."; // Nobody wants their account hacked, right?
        }
    }

    // Checking if passwords match
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    // Making sure the user agreed to the terms (because that's important)
    if (!formData.termsAccepted) {
        errors.terms = "You must accept the terms and conditions.";
    }

    return errors;
};

export const checkPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 8) return "Weak"; // Less than 8? Too short!
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) return "Strong"; // Meets all the requirements? Strong password!
    return "Medium"; // Otherwise, it's somewhere in the middle
};