export async function fetchCompanyDetails() {
  try {
      const response = await fetch('https://fakerapi.it/api/v1/companies?_quantity=1');
      if (!response.ok) throw new Error('Failed to fetch company details.');
      
      const data = await response.json();
      const company = data.data[0]; // Get the first company from the response

      return {
          name: company.name,
          vat: `${Math.floor(Math.random() * 1000000)}`,
          email: company.email,
          phone: company.phone,
          website: company.website,
          addresses: [{
              street: company.country, // FakerAPI doesn't return street, so using country as placeholder
              city: company.country,
              zipcode: "42361",
              country: company.country
          }],
          contact: {
              firstname: company.contact.firstname,
              lastname: company.contact.lastname,
              email: company.contact.email,
              phone: company.contact.phone
          }
      };
  } catch (error) {
      console.error('API Error:', error);
      throw new Error('Error fetching company details.');
  }
}