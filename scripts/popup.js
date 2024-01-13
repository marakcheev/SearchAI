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

async function getFontSize(){
    const data = await chrome.storage.local.get("fontSize");
    console.log("Retrieved font size: " + data.fontSize);
    return data.fontSize;
}

async function setStatus(status){
    await chrome.storage.local.set({ status: status }, () => {
        console.log("Status set to " + status);
    });
} 

async function getStatus(){
    const data = await chrome.storage.local.get('status');
    console.log("Retrieved status from storage" + data.status);
    return data.status;
}

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




    var onButton = document.getElementById('onButton');
    var offButton = document.getElementById('offButton');

    if(await getStatus() == true){
        onButton.style.backgroundColor = "#444445";
        offButton.style.backgroundColor = "#303134";
    }
    else{
        onButton.style.backgroundColor = "#303134";
        offButton.style.backgroundColor = "#444445";
    }


    onButton.addEventListener('click', function() {
        setStatus(true);
        onButton.style.backgroundColor = "#444445";
        offButton.style.backgroundColor = "#303134";

    });

    offButton.addEventListener('click', function() {
        setStatus(false);
        onButton.style.backgroundColor = "#303134";
        offButton.style.backgroundColor = "#444445";

    });



    var saveButton = document.getElementById('saveButton');
    var buttonState = 1; //1 - save button, 2 - clear
    const apiBox = document.getElementById('apiKey')

    if (notWhitespace(apiBox.value)){
        saveButton.textContent = "Clear";
        buttonState = 2; // clear button
    }
    
    saveButton.addEventListener('click', function() {

        if (buttonState == 1){
            var newApiKey = apiBox.value;

            // Perform your desired actions with the API key
            // console.log('API Key:', apiKey);
    
            if (notWhitespace(newApiKey)){
                setKey(newApiKey);
                buttonState = 2;
                saveButton.textContent = "Clear"
            }
            else{
                console.log("Empty");
            }
        }
        else if (buttonState == 2){
            apiBox.value = "";
            setKey("");
            buttonState = 2;
        saveButton.textContent = "Save"
        }
        // Get the value from the text box
        

        // You can also send the API key to the background script or perform other actions here
    });

    var smallButton = document.getElementById("leftButton");
    var normalButton = document.getElementById("middleButton");
    var largeButton = document.getElementById("rightButton");

    function brightenFontButton(button){
        smallButton.style.backgroundColor = "#303134";
        normalButton.style.backgroundColor = "#303134";
        largeButton.style.backgroundColor = "#303134";

        button.style.backgroundColor = "#444445";
    }

    if(await getFontSize() == "12px"){
        brightenFontButton(smallButton);
    }
    else if(await getFontSize() == "14px"){
        brightenFontButton(normalButton);
    }else{
        brightenFontButton(largeButton);
    }

    smallButton.addEventListener('click', async function() {
        const size = "12px";
        await chrome.storage.local.set({fontSize: size});
        console.log("Set font-size to " + size);
        brightenFontButton(smallButton);
    });

    normalButton.addEventListener('click', async function() {
        const size = "14px";
        await chrome.storage.local.set({fontSize: size});
        console.log("Set font-size to " + size);
        brightenFontButton(normalButton);
    });

    largeButton.addEventListener('click', async function() {
        const size = "16px";
        await chrome.storage.local.set({fontSize: size});
        console.log("Set font-size to " + size);
        brightenFontButton(largeButton);
    });
});


console.log("popup opened");