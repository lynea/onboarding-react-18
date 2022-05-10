const getChapters = async () => {

    const response = await fetch(`${'http://127.0.0.1:1337/api'}/chapters`, {
        "method": "GET",
        "headers": {
          "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`
        }
      })
     

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const chapters = await response.json();
      return chapters;
}

export {getChapters} 