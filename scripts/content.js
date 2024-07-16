import OpenAI from "openai";

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

async function setFontSize(size){
    await chrome.storage.local.set({fontSize: size});
    console.log("Set font-size to " + size);
}

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

function getBackgroundColor(){
    return window.getComputedStyle(document.body).backgroundColor;
}

function isMainSearchPage(){
    // Find the element with text "All"
    let elements = document.querySelectorAll("div");

    let isSelected = false;
    elements.forEach(element => {
        if (element.textContent.trim() === "All" && element.getAttribute("selected") !== null) {
            isSelected = true;
        }
    });

    console.log("BRAPAPAP " + isSelected);

    return isSelected;
    
    // var targetDiv = document.querySelector('div.YmvwI');
    

    if (/*targetDiv && !targetDiv.textContent.includes('All')*/isSelected) {
        console.log('Found the <div> element with class:', targetDiv, 'and "ALL"');
        return true;
        // Your additional code here...
    } 
    return false;
}

function isColorDark(backgroundColor) {
    // Extract RGB values from the background color string
    const match = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    
    if (!match) {
        throw new Error("Invalid RGB color format");
    }

    const [, red, green, blue] = match;

    // Formula to calculate luminance
    const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

    // You can adjust the threshold based on your preference
    const threshold = 128;

    // Check if the luminance is below the threshold
    return luminance < threshold;
}

function getAccentColor(){
    const bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
    
    var accentColor; 

    if (isColorDark(bodyBackgroundColor)){
        console.log("darkness");
        accentColor = "#303134";
    }
    else{
        console.log("Brightness");
        accentColor = "#dadada";
    }

    return accentColor;
}

//

//---------------------------------------------------------------------------------------------------------

//


async function createHTMLElem(){

    const bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
    const accentColor = getAccentColor();
    

    
    // Log the background color to the console
    console.log('Background Color:', bodyBackgroundColor);

    //Primary area

    const resultBox = document.createElement("div");//biggest box that holds everything
        resultBox.id = "resultBox";
        resultBox.style.fontFamily = "Google Sans,arial,sans-serif";
        resultBox.style.backgroundColor = bodyBackgroundColor;
        resultBox.style.border = "2px solid " + accentColor;
        resultBox.style.borderRadius = "18px";
        resultBox.style.padding = "10px";
        resultBox.style.marginTop = "10px";
        resultBox.style.marginBottom = "20px";
        resultBox.style.display = "block";

    //Header Bar - Name and Logo
    const header = document.createElement("div");
        header.style.display = "block";

        //Textbox "SearchGPT"
        const heading = document.createElement("h1");
        heading.textContent = "SearchAI";
        heading.style.fontFamily = "Google Sans, arial,sans-serif";
        heading.style.fontSize = "22px";
        // heading.style.marginTop = "8px";

    const headerIcon = document.createElement("img");
        if (!isColorDark(getBackgroundColor())){
            headerIcon.setAttribute("src", "data:image/png;base64,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");
        }
        else{
            headerIcon.setAttribute("src", "data:image/png;base64,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");
        }

        headerIcon.style.float = "right";
        headerIcon.style.marginTop = "-3px";

    //Box where gpt response is given
    const answerBox = document.createElement("div");
        answerBox.id = "AnswerBox";
        answerBox.style.paddingTop = "15px";
        // answerBox.style.color = "#535156";
        answerBox.className = "hgKElc";
        answerBox.style.fontSize = await getFontSize();
        answerBox.style.lineHeight = "22px";

    const footer = document.createElement("div");
        footer.style.display = "block";
        footer.textContent = "";
        footer.id = "footer";
        

    
    header.appendChild(heading);
    heading.appendChild(headerIcon);
    
    resultBox.appendChild(header);
    resultBox.appendChild(answerBox);
    resultBox.appendChild(footer);

    appendHTMLtoPage(resultBox);

    return resultBox;
}

function appendHTMLtoPage(item){
    const resultStatsElement = document.getElementById("center_col");

    if (resultStatsElement) {
        resultStatsElement.insertBefore(item, resultStatsElement.firstChild);
    }
    console.log("added box");

    var style = document.createElement('style');
    item.appendChild(style);
}

function makeGenerateButton(){

    //find box in 
    const resultBox = document.getElementById("resultBox");
    const accentColor = getAccentColor();
    // const footer = document.getElementById("footer");
    

    const button = document.createElement("button");
    button.id = "button";
    button.innerHTML = "Generate more";
    // button.style.marginTop = "10px";
    button.style.padding = "5px";
    button.style.paddingLeft = "10px";
    button.style.paddingRight = "10px";
    button.style.borderRadius = "10px";
    button.style.fontSize = "14px";
    button.style.backgroundColor = accentColor;
    button.style.border = "0";
    button.style.cursor = 'pointer';
    button.style.marginTop = "10px";
    button.style.fontFamily = "Google Sans, arial,sans-serif";

    
    // footer.appendChild(button);

    // resultBox.appendChild(footer);

    resultBox.appendChild(button);

    console.log("Button Added");
}

function makeInfoIcon(){

    const footer = document.getElementById("footer");
    const resultbox = document.getElementById("resultBox");
    const accentColor = getAccentColor();

    const infoIcon = document.createElement('div');
    infoIcon.className = 'info-icon';
    infoIcon.style.position = 'relative';
    infoIcon.style.display = 'inline-block';
    infoIcon.style.cursor = 'pointer';
    infoIcon.style.float = "right";
    infoIcon.style.borderRadius = "20px";
    infoIcon.style.marginTop = "10px";
    infoIcon.style.padding = "5px";
    infoIcon.style.paddingLeft = "11px";
    infoIcon.style.paddingRight = "11px";
    infoIcon.style.fontSize = "14px";
    // infoIcon.style.backgroundColor = "#dadada";
    infoIcon.style.backgroundColor = accentColor;

    infoIcon.style.border = "0";

    const iconSpan = document.createElement('span');
    iconSpan.textContent = 'ℹ';

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.display = 'none';
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '100%';
    tooltip.style.width = "200px";
    tooltip.style.transform = 'translateX(-90%)';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '8px';
    tooltip.style.padding = '8px';
    tooltip.textContent = 'SearchAI can make mistakes. Consider checking important information.';

    // Append elements to the document
    infoIcon.appendChild(iconSpan);
    infoIcon.appendChild(tooltip);
    resultbox.appendChild(infoIcon);

    // Show the tooltip when hovering over the info icon
    infoIcon.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
    });

    // Hide the tooltip when the mouse leaves the info icon
    infoIcon.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
}

//

//---------------------------------------------------------------------------------------------------------

//
const openai = new OpenAI({
    organization: "org-rCtMskOVcgJlRhPK1CyW0T8N",
    project: "proj_iewF4PE3Y4oqduzf3KQBGJCM",
});

async function getGPT(query, key){
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            // model: 'gpt-4',
            messages: [{ role: 'user', content: query }],
        });

        console.log("GPT Success: ", response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (error) {
        if (error.status === 429) {
            console.warn("Rate limit exceeded. Implement retry logic here.");
        } else {
            console.error(`GPT failed. Status: ${error.status}, Message: ${error.message}`);
        }
        throw new Error("Error fetching OpenAI result.");
    }




    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${key}`,
    //     },
    //     body: JSON.stringify({
    //         model: 'gpt-4o',
    //         // model: 'gpt-4',
    //         messages: [{ role: 'user', content: query }]
    //     }),
    // });

    // if (response.ok) {
    //     console.log("GPT Success. ");
    //     const data = await response.json();
    //     console.log(data.choices[0].message.content);
    //     return data.choices[0].message.content;
    // } else {
    //     console.error(`GPT failed. Status:${response.status}`);
    //     throw Error ("Error fetching OpenAi result.");
    // }
}

//Bold after asterisk
const boldAfterAsterisk = (str) => {
    const words = str.split(/\s+/); // Split the string into an array of words

    for (let i = 0; i < words.length; i++) {
        // Check if the word starts with an asterisk
        if (words[i].startsWith('*')) {
            // Remove the asterisk and wrap the word in <b> tags
            words[i] = '<b>' + words[i].substring(1) + '</b>';
        }
    }

    // Join the array of words back into a string
    return words.join(' ');
};

// Add asterisks (*) before each important word in the following response:

// ---

// {response}

// ---

// For example, if the original response is "Yes, apples are healthy for you and are a great source of fibres." and you want to highlight "Yes", "are", "healthy, "great", "source", "fibres" the filled-in prompt would look like this:


// *Yes, apples *are *healthy for you and are a *great *source of *fibres.

// If there are multiple sentences in the result, only highlight in the first sentence.

//You're a person in charge of making answers easier to read. For the next answer, place an * before some words that could be valuable and answer a question. Here's the response:


async function callGpt(text, key){
    console.log("Calling GPT API...");
    const gptQuery = `You are a google search assistant. If the following search is a question, give a precise answer in under 3 sentences. If it asks to define something, define it in under 2 sentences. If it's anything else, give a short explanation of the topic (example person, place or thing) in under 3 sentences. Here's the question: '${text}'`;
    console.log(`gptQuery: ${gptQuery}`);
    
    return getGPT(gptQuery, key);
}

async function requestLongerResponse(originalrequest, gptAnswer, key){
    console.log("Calling GPT API...");
    const gptQuery = "This is a follow up to a past conversation with prompt: \n'" + `You are a google search assistant. If the following search is a question, give a precise answer in under 3 sentences. If it asks to define something, define it in under 2 sentences. If it's anything else, give a short explanation of the topic (example person, place or thing) in under 3 sentences. Here's the question: '${originalrequest}'` + " \n and you answered: \n" + `'${gptAnswer}` + " \n ' Now give a more detailed response to the same question without repeating anything, simply add on to what you've said before. DO NOT REPEAT! Hard limit: 7 sentences. ";

    return getGPT(gptQuery, key);
}


//

//---------------------------------------------------------------------------------------------------------

//


async function saveQuestionAndAnswer(question, answer) {
    
    
    const result = await chrome.storage.local.get({ questions: [], answers: [] });

    var questions = result.questions;
    var answers = result.answers;

    questions.push(question);
    answers.push(answer);

    chrome.storage.local.set({ questions: questions, answers: answers });

    
}

async function getQuestionsList(){
    
    return new Promise((resolve) => {
        chrome.storage.local.get({ questions: [] }, function(result) {
            const questionsList = result.questions || []; // Use a default value in case questions is undefined
            // const isSaved = questions.includes(question);
            resolve(questionsList);
            // callback(isSaved);
        });
    });   
}

async function getAnswersList(){

    return new Promise((resolve) => {
        chrome.storage.local.get({ answers: [] }, function(result) {
            const answersList = result.answers || []; // Use a default value in case questions is undefined
            // const isSaved = questions.includes(question);
            resolve(answersList);
            // callback(isSaved);
        });
    });
}

async function isQuestionSaved(question) {
    // const questions = await chrome.storage.local.get("questions");
    // return questions.includes(question);

    return new Promise((resolve) => {
        chrome.storage.local.get({ questions: [] }, function(result) {
            const questions = result.questions || []; // Use a default value in case questions is undefined
            // const isSaved = questions.includes(question);
            resolve(questions.includes(question));
            // callback(isSaved);
        });
    });
    // return false;
}

async function getAnswerForQuestion(question) {

    // chrome.storage.local.get({ questions: [], answers: [] }, await function(result) {
    //     const questionsList = result.questions || [];
    //     const answersList = result.answers || [];
        
    //     
        
    // });

    const questionsList = await getQuestionsList();
    const answersList = await getAnswersList();

    const index = questionsList.indexOf(question);

    console.log(index);

    if (index !== -1) {
        console.log("GOT FROM BANK: " + answersList[index]);
        return answersList[index];
    }

    return "Error retrieving answer from storage"; // Question not found

    
}

async function removeOldQandA(){
    const questionsList = await getQuestionsList();
    const answersList = await getAnswersList();

    while (questionsList.length > 5 ) {
        questionsList.shift(); // Removes the first element of the array
        answersList.shift();

        console.log(questionsList);
        console.log(answersList);
    }

    chrome.storage.local.set({ questions: questionsList, answers: answersList });


}



//

//---------------------------------------------------------------------------------------------------------

//


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOutResult(text, element){
    const words = text.split(" ");//array
        
    for (let word of words){
        element.innerText += " " + word;
        await delay(25);
    }
}

function openAiError(){
    const answerBox = document.getElementById("AnswerBox");
    answerBox.innerText = "";
    const openAIErrorMessage = " Error fetching data from OpenAI. Try checking your OpenAI API Key in settings. We are sorry for the inconvenience that this may cause."

    typeOutResult(openAIErrorMessage, answerBox);
}


//

//---------------------------------------------------------------------------------------------------------

//


(async() => {
    // await setStatus(true);

    console.log("searchAI Start");

    const apiKey = await getKey();
    // const json = await loadJson("secrets.json");
    // console.log(json.apiKey);

    const searchBox = document.querySelector("textarea");
    // console.log("SearchGPT Start");`

    if (await getStatus() == undefined){
        setStatus(true);
        setKey("");
    }

    // Class that must contain "all" for it to be main search page: "hdtb-mitem" and "hdtb-msel"

    if (searchBox && await getStatus()==true && isMainSearchPage()) {
        const elem = await createHTMLElem("");
        
        const text = searchBox.textContent;
        const answerBox = document.getElementById("AnswerBox");


        
        answerBox.innerText = "Generating..."

        // const gptAnswer = "Hello, I am your AI assistant.";
        var gptAnswer = "";

        if (await isQuestionSaved(text)){
            answerBox.innerText = "";

            const answer = await getAnswerForQuestion(text);

            await typeOutResult(answer, answerBox);

            delay(50);
            makeGenerateButton();
            makeInfoIcon();
        }
        else{
            try{
                gptAnswer = await callGpt(text, apiKey); 
                answerBox.innerText = "";
    
                await typeOutResult(gptAnswer, answerBox);
    
                delay(50);
                makeGenerateButton();
    
                await saveQuestionAndAnswer(text, gptAnswer);
                removeOldQandA();
                makeInfoIcon();

            }
            catch(error){
                openAiError();
                console.log(error);
            }
    
        }

        //Maybe put int o try catch block
        
        const generateMoreButton = document.getElementById("button");
        //Very occasionally says "Sure!" or "okay" at the start of the longer response.
        
        generateMoreButton.onclick = async function() {
            generateMoreButton.innerText = "Generating..."
            
            const gptNewAnswer = await requestLongerResponse(text, gptAnswer, apiKey);

             //Hide button
            
            answerBox.innerText += "\n\n";

            typeOutResult(gptNewAnswer, answerBox);

            generateMoreButton.style.visibility = 'hidden';

            // answerBox.innerText += "\n\n";

        };

        // await chrome.runtime.onSuspend.addListener(function() {
        //     chrome.storage.local.set({ questions: [""], answers: [""] });
        // });


        //------------------------------------------------------------
        //Clears

        // await chrome.storage.local.set({ questions: []}, () => {
        //     console.log("Cleared Questions");
        // });
    
        // await chrome.storage.local.set({ answers: []}, () => {
        //     console.log("Cleared Answers");
        // });

    }
})();
