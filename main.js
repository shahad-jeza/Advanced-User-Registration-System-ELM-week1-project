import {CompanyForm} from "./components/Form.js"

const app = document.getElementById("app");

const formComponent = new CompanyForm(); // object from form class 
formComponent.render(app); // render the component in app 


