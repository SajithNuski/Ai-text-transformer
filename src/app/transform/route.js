import OpenAI from "openai";

function buildInstructions(mode, targetLanguage, tone) {
        const base = "you are a helpful assistant that can summarize, rewrite, or translate text based on the user's request. don't add any extra comments.";
        
        if(mode === "summarize") {
            return `${base} please summarize the following text in a concise manner with maximum 5 bullet points.`;
        }else if(mode === "rewrite") {
            return `${base} please rewrite the following text in a ${tone ? tone : "simple"} tone. you should not preserve the meaning`;

        }else{
            return `${base} please translate the following text to ${targetLanguage ? targetLanguage : "tamil"}. you should not change the name or product mentioned in the text. you should not preserve the meaning`;
        }
}

export async function POST(req) {
    try {
    const { mode, targetLanguage, tone, inputText } = await req.json();

    const cleanedInputText = inputText ? inputText.replace(/[\n\r]+/g, " ").trim() : "";

    if(!cleanedInputText) {
        return new Response(JSON.stringify({ error: "Input text is required." }), { status: 400 });
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const Ai_response = await client.responce.create({
        model: "gpt-5-mini",
        instructions: buildInstructions(mode, targetLanguage, tone),
        input: cleanedInputText,
    });

    return Response.json({ outputText: Ai_response.output[0].content[0].text });
    }catch (error) {    
        return Response.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}