
export async function createHTMLElem(gptAnswer){

    const htmlBrickText = await fetch("gptBox.html");

    const htmlString = htmlBrickText.text();
    (await htmlString).replace("PLACEHOLDER", gptAnswer);

    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = htmlString;
    return template.content.firstChild;
}


export async function callGpt(text){
    console.log("Calling GPT API...");
    const gptQuery = `You are a google search assistant. If the following search is a question, give a precise answer in under 3 sentences. If it asks to define something, define it in under 2 sentences. If it's anything else, give a short explanation of the topic (example person, place or thing) in under 3 sentences. Here's the question: '${text}'`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: gptQuery }]
        }),
    });

    if (response.ok) {
        console.log("GPT Success.");
        const data = await response.json();
        return data.choices[0].message.content;
    } else {
        console.error(`GPT failed. Status:${response.status}`);
    }

}