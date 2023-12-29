function notWhitespace(str) {
    // Use trim to remove leading and trailing whitespaces
    // Check if the resulting string is not empty
    return str.trim() !== '';
}

setKey = async (key) => {
    await chrome.storage.local.set({ apikey: key }, () => {
        console.log("Api key stored in chrome storage");
    });
};

getKey = async () => {
    const data = await chrome.storage.local.get('apikey');
    console.log("Retrieved api key from storage");
    return data.apikey;
};

function censorKey(apiKey){
    if (apiKey.length < 6) {
        console.error("API key is too short to censor");
        return apiKey;
    }

    const firstThree = apiKey.slice(0, 3);
    const lastThree = apiKey.slice(-3);
    const censoredMiddle = "********";

    return `${firstThree}${censoredMiddle}${lastThree}`;
}

document.addEventListener('DOMContentLoaded', async function() {
    const apiKey = await getKey();
    // document.getElementById('apiKey').value = censorKey(apiKey);
    document.getElementById('apiKey').value = apiKey;

    var saveButton = document.getElementById('saveButton');
    
    saveButton.addEventListener('click', function() {
        // Get the value from the text box
        var newApiKey = document.getElementById('apiKey').value;

        // Perform your desired actions with the API key
        // console.log('API Key:', apiKey);

        if (notWhitespace(newApiKey)){
            setKey(newApiKey);
        }
        else{
            console.log("Empty");
        }

        // You can also send the API key to the background script or perform other actions here
    });
});


console.log("popup opened");