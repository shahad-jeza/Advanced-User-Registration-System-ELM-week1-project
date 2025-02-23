# Modern Company Registration Form

A responsive, interactive company registration form with real-time validation, API integration, and modern UI/UX features.

## Features

- **Real-time Form Validation**: Input validation for all fields, password strength checker, custom error messages.
- **API Integration**: Auto-form population, loading states with spinner, error handling for API calls.
- **Modern UI/UX**: Mobile-first, smooth animations, custom form elements, gradient effects, and a clean, modern layout.
- **Component-Based Architecture**: Modular code structure, separated concerns (validation, API handling, UI), reusable components.

## Project Structure

project-root/
├── index.html
├── main.js
├── styles/
│   └── main.css
├── js/
│   ├── components/
│   │   ├── Form.js
│   │   └── UserList.js
│   ├── services/
│   │   ├── api.js
│   │   └── formHandler.js
│   └── utils/
│       └── validation.js


## Setup Instructions

1. Clone the repository:
git clone https://github.com/your-username/modern-company-registration-form.git

2. Open `index.html` via a local server (needed for ES6 modules).

## Dependencies

- Bootstrap 5.3.0

## Usage

### Basic Form Implementation

```javascript
import { CompanyForm } from "./components/Form.js";

const app = document.getElementById("app");
const formComponent = new CompanyForm();
formComponent.render(app);
```

Validation

Validates fields like email, password strength, phone number format, and commercial registration number.

API Integration

Auto-populates form with company data from an external API, with error handling and loading spinner.


Contributing
	1.	Fork the repository.
	2.	Create a feature branch.
	3.	Commit your changes.
	4.	Push to the branch and create a pull request.

License

MIT License - see the LICENSE file for details.
