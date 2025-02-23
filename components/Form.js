import { validateForm } from "../utils/validation.js";
import { FormHandler } from "../services/formHandler.js";

export class CompanyForm {
    constructor() {
        // Create objects in the constructor
        this.form = document.createElement("form");
        this.formHandler = new FormHandler(this.form);
        
        // Set up form structure with input fields
        this.form.innerHTML = `
        <div class="form-overlay"><div class="loader"></div></div>
        <h2 class="form-title">Company Registration</h2>
        <div class="form-grid">
            <div class="mb-3">
                <label for="companyName" class="form-label">Company Name</label>
                <input type="text" id="companyName" class="form-control" placeholder="Enter company name">
                <div id="companyNameError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="crNumber" class="form-label">Commercial Registration Number</label>
                <input type="text" id="crNumber" class="form-control" placeholder="Enter CR number">
                <div id="crNumberError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" class="form-control" placeholder="Enter email">
                <div id="emailError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="text" id="phone" class="form-control" placeholder="Enter phone number">
                <div id="phoneError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Enter password">
                <div id="passwordStrength" class="small"></div>
                <div id="passwordError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm your password">
                <div id="confirmPasswordError" class="text-danger small"></div>
            </div>
        </div>

        <div class="form-grid">
            <div class="mb-3">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" class="form-control" placeholder="Enter city">
                <div id="cityError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="region" class="form-label">Region</label>
                <input type="text" id="region" class="form-control" placeholder="Enter region">
                <div id="regionError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="zipCode" class="form-label">Zip Code</label>
                <input type="text" id="zipCode" class="form-control" placeholder="Enter zip code">
                <div id="zipCodeError" class="text-danger small"></div>
            </div>

            <div class="mb-3">
                <label for="businessType" class="form-label">Business Type</label>
                <select id="businessType" class="form-control">
                    <option value="">Select business type</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Service">Service</option>
                </select>
                <div id="businessTypeError" class="text-danger small"></div>
            </div>
        </div>

        <div class="terms-container">
            <label class="checkbox-custom">
                <input type="checkbox" id="terms">
                I agree to the Terms & Conditions
            </label>
            <div id="termsError" class="text-danger small"></div>
        </div>

        <div class="d-grid">
            <button type="submit" class="btn btn-outline-primary">Submit</button>
        </div>
        `;


       // Loading state functions (to show/hide a loading indicator)
       this.showLoading = () => {
        this.form.classList.add('loading');
    };

    this.hideLoading = () => {
        this.form.classList.remove('loading');
    };

    // Attach event listener for form submission
    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    // Initialize form with any existing data (if applicable)
    this.initializeForm();
}

async initializeForm() {
    try {
        this.showLoading();
        await this.formHandler.populateForm(); // Pre-fill form data if needed
    } catch (error) {
        console.error("Error initializing form:", error);
    } finally {
        this.hideLoading();
    }
}

handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const formData = {
        companyName: document.getElementById("companyName").value.trim(),
        crNumber: document.getElementById("crNumber").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        city: document.getElementById("city").value.trim(),
        region: document.getElementById("region").value.trim(),
        zipCode: document.getElementById("zipCode").value.trim(),
        businessType: document.getElementById("businessType").value,
        termsAccepted: document.getElementById("terms").checked
    };

    // Clear previous error messages
    document.querySelectorAll(".text-danger").forEach(el => el.textContent = "");

    // Validate form inputs
    const errors = validateForm(formData);

    // Display validation errors
    Object.keys(errors).forEach(key => {
        document.getElementById(`${key}Error`).textContent = errors[key];
    });

    // If no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
        alert("Registration successful! 🎉"); // Temporary success message
        localStorage.setItem("companyData", JSON.stringify(formData)); // Save form data locally
        this.form.reset(); // Reset form after submission
    }
}

render(parent) {
    // Append the form to the specified parent element
    parent.appendChild(this.form);
}
}