export async function handleFormSubmit(url, query, variables) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error response text: ${errorText}`);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const jsonResponse = await response.json();
      if (jsonResponse.errors) {
        throw new Error(`Server error: ${jsonResponse.errors.map(e => e.message).join(', ')}`);
      }
  
      return jsonResponse.data;
    } catch (error) {
      console.error(`Submit failed; saving offline`, error);
      throw error;
    }
  }
  