const weakPasswords = ["password", "123456", "qwerty", "abc123", "letmein", "welcome"];

export const validateForm = (formData) => {
    let errors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const crnRegex = /^\d{10}$/;
    const zipRegex = /^\d{5,10}$/;
    
    Object.keys(formData).forEach(field => {
        if (!formData[field] && field !== "termsAccepted") {
            errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
        }
    });
    
    if (formData.email && !emailRegex.test(formData.email)) {
        errors.email = "Invalid email format.";
    }
    
    if (formData.phone && !phoneRegex.test(formData.phone)) {
        errors.phone = "Invalid phone number format.";
    }
    
    if (formData.crNumber && !crnRegex.test(formData.crNumber)) {
        errors.crNumber = "CRN must be 10 digits.";
    }
    
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
        errors.zipCode = "Invalid zip code format.";
    }
    
    if (formData.password) {
        if (!passwordRegex.test(formData.password)) {
            errors.password = "Password must have uppercase, lowercase, number, and special character.";
        } else if (weakPasswords.includes(formData.password.toLowerCase())) {
            errors.password = "This password is too common.";
        }
    }
    
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }
    
    if (!formData.termsAccepted) {
        errors.terms = "You must accept the terms and conditions.";
    }
    
    return errors;
};

export const checkPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 8) return "Weak";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) return "Strong";
    return "Medium";
};
