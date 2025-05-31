class coreHTTP {
    async processRequest(inMethod, url, content = 0) {
        try {
            
            let options = {
                method: inMethod,
                headers: {
                    'Content-Type': 'application/json'  // Inform server that we are sending JSON data
                }
            };

            // If content is provided, add it as the request body
            if (content !== 0) {
                options.body = content;  // body should be a JSON string
            }

            // Make the HTTP request with fetch and await the response
            let result = await fetch(url, options);

            // If the response status code is in the 200–299 range (successful)
            if (result.ok) {
                // Parse and return the response JSON data
                return await result.json();
            } else {
                // If the status code indicates an error, return an error object with details
                return { error: `${inMethod} Error: ${result.status} ${result.statusText}` };
            }
        } catch (err) {
            // Handle any network or fetch exceptions and return an error object
            return { error: err.message };
        }
    }
}
