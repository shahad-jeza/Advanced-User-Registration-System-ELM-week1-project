export async function fetchCompanyDetails() {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) throw new Error('Failed to fetch company details.');
      
      const userData = await response.json();
      
      return {
          name: userData.company.name,
          vat: `CR${Math.floor(Math.random() * 1000000)}`,
          email: userData.email,
          phone: userData.phone,
          website: userData.website,
          addresses: [{
              street: userData.address.street,
              city: userData.address.city,
              zipcode: userData.address.zipcode,
              country: userData.address.city
          }],
          contact: {
              firstname: userData.name.split(' ')[0],
              lastname: userData.name.split(' ')[1] || '',
              email: userData.email,
              phone: userData.phone
          }
      };
  } catch (error) {
      console.error('API Error:', error);
      throw new Error('Error fetching company details.');
  }
}
