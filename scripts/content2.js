// where you logic goes
const apiKey = "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";

(async() => {
    const searchBox = document.querySelector("textarea");
    console.log("bruhmeme");

    if (searchBox) {
        const text = searchBox.textContent;
        const gptQuery = `You are a google search assistant. If the following search is a question, give a precise answer in under 3 sentences. If it asks to define something, define it in under 2 sentences. If it's anything else, give a short explanation of the topic (example person, place or thing) in under 3 sentences. Here's the question: '${text}'`;

        //call chatgpt
        // console.log("Calling GPT API...");
        // const response = await fetch('https://api.openai.com/v1/chat/completions', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${apiKey}`,
        //     },
        //     body: JSON.stringify({
        //         model: 'gpt-3.5-turbo',
        //         messages: [{ role: 'user', content: gptQuery }]
        //     }),
        // });

        // if (response.ok) {

        console.log("GPT Success.");
        // const data = await response.json();
        // const gptAnswer = data.choices[0].message.content;
        const gptAnswer = "bean";
        //get answer
        
        const answerArea = document.createElement("div");
        answerArea.style.backgroundColor = "#ffffff";
        answerArea.style.border = "2px solid #000000";
        answerArea.style.borderRadius = "10px";
        answerArea.style.padding = "10px";
        answerArea.style.position = "fixed";
        answerArea.style.top = "20px";
        answerArea.style.left = "20px";

        const gptBox = document.createElement("p");//create new paragraph
        gptBox.classList.add("color-secondary-text", "type--caption");
        gptBox.textContent = gptAnswer;

        answerArea.appendChild(gptBox);
        
        const resultStatsElement = document.getElementById("appbar");

        if (resultStatsElement) {
            resultStatsElement.appendChild(answerArea);
        }

        // } else {
        //     console.error(`GPT failed. Status:${response.status}`);
        // }

    }
})();