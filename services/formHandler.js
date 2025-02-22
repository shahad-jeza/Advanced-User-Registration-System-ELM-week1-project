import { fetchCompanyDetails } from '../services/api.js';

export class FormHandler {
    constructor(form) {
        this.form = form;
    }

    async populateForm() {
        try {
            const company = await fetchCompanyDetails();

            // Populate company details
            document.getElementById("companyName").value = company.name;
            document.getElementById("crNumber").value = company.vat;
            document.getElementById("email").value = company.email;
            document.getElementById("phone").value = company.phone;

            // Populate address
            if (company.addresses && company.addresses.length > 0) {
                const address = company.addresses[0];
                document.getElementById("city").value = address.city;
                document.getElementById("zipCode").value = address.zipcode;
                document.getElementById("region").value = address.country;
            }

            console.log("Form pre-filled successfully!");
        } catch (error) {
            console.error("Error populating form:", error);
            throw error;
        }
    }
}