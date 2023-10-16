async function getTextFromTextarea() {
    // change Button 
    const lucrumGPTButton = document.getElementById('lucrumGPTButton');
    lucrumGPTButton.textContent = 'Loading...';
    lucrumGPTButton.setAttribute('disabled', true);

    // change API Response Text
    document.getElementById('apiResponse').value = "LucrumGPT's response will appear here...";

    // Make text visible if not visible yet
    const container = document.querySelector(".lucrumgpt-response-container");
    console.log(container);
    const currentOpacity = window.getComputedStyle(container).getPropertyValue("opacity");
    if (currentOpacity === "0") {
        container.style.opacity = "1";
    }

    // Get the text from the 'bigTextBox' textarea
    const text = document.getElementById('bigTextBox').value;
    
    try {
        // Send the text to the server's '/sendToOpenAI' endpoint
        const response = await sendToServer(text);
        // Display the response in the 'apiResponse' textarea
        document.getElementById('apiResponse').value = response;
        // Revert the button text
        lucrumGPTButton.textContent = 'Send to LucrumGPT';
        lucrumGPTButton.removeAttribute('disabled');
    } catch (error) {
        console.error('There was an error:', error);
        document.getElementById('apiResponse').value = "There was an error :(";
        // Revert the button text in case of an error
        lucrumGPTButton.textContent = 'Send to LucrumGPT';
        lucrumGPTButton.removeAttribute('disabled');
    }
}

async function sendToServer(text) {
    try {
        const response = await fetch('/sendToOpenAIServer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error('Server response was not OK');
        }
        
        const responseData = await response.json(); // Await the JSON parsing
        console.log(responseData); // Log the parsed JSON data
        return responseData;
    } catch (error) {
        throw error;
    }
}
