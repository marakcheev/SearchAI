
class GptService {
    static callGpt = async (bodyData) => {
        console.log("Calling GPT API...");
        const gptQuery = `You are a google search assistant. If the following search is a question, give a precise answer in under 3 sentences. If it asks to define something, define it in under 2 sentences. If it's anything else, give a short explanation of the topic (example person, place or thing) in under 3 sentences. Here's the question: '${bodyData.query}'`;
        console.log(`gptQuery: ${gptQuery}`);
        
        return GptService.getGPT(gptQuery, bodyData.key);
    }

    static requestLongerResponse = async (originalrequest, gptAnswer, key) => {
        console.log("Calling GPT API...");
        const gptQuery = "This is a follow up to a past conversation with prompt: \n'" + `You are a google search assistant. If the following search is a question, give a precise answer in under 3 sentences. If it asks to define something, define it in under 2 sentences. If it's anything else, give a short explanation of the topic (example person, place or thing) in under 3 sentences. Here's the question: '${originalrequest}'` + " \n and you answered: \n" + `'${gptAnswer}` + " \n ' Now give a more detailed response to the same question without repeating anything, simply add on to what you've said before. DO NOT REPEAT! Hard limit: 7 sentences. ";

        return GptService.getGPT(gptQuery, key);
    }

    static getGPT = async (query, key) => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                // model: 'gpt-4',
                messages: [{ role: 'user', content: query }]
            }),
        });

        if (response.ok) {
            console.log("GPT Success. ");
            const data = await response.json();
            console.log(data.choices[0].message.content);
            return data.choices[0].message.content;
        } else {
            console.error(`GPT failed. Status:${response.status}`);
            throw Error ("Error fetching OpenAi result.");
        }
    }

}

module.exports = GptService;
