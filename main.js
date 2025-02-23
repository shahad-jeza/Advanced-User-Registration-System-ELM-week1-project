import {CompanyForm} from "./components/Form.js"
import { ThemeManager } from "./utils/darkMode.js";

const app = document.getElementById("app");

const themeManager = new ThemeManager();

const formComponent = new CompanyForm(); // object from form class 
formComponent.render(app); // render the component in app 


