// helper function for making API calls

export const fetchData = async (endpoint, method, body = null) => {
    const BASE_URL = 'https://communitycompass-438103.ue.r.appspot.com'; // leave empty when using proxy in package.json
    console.log(`Fetching: ${BASE_URL}${endpoint}, Method: ${method}, Body:`, body);

    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        // log response text
        const responseText = await response.text();
        console.log('Response Text:', responseText);

        // check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        // try to parse response as JSON
        try {
            return JSON.parse(responseText);
        } catch (jsonError) {
            console.warn('Response is not valid JSON, returning text:', responseText);
            return responseText;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
