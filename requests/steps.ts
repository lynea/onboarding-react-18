

  
const getSteps = async () => {

    const response = await fetch(`${'http://127.0.0.1:1337/api'}/steps`, {
        "method": "GET",
        "headers": {
          "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`
        }
      })
     

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const steps = await response.json();
      return steps;
}

export {getSteps} 