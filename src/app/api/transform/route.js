function buildInstructions(mode, targetLanguage, tone) {
  const base =
    "you are a helpful assistant that can summarize, rewrite, or translate text based on the user's request. don't add any extra comments.";

  if (mode === "summarize") {
    return `${base} please summarize the following text in a concise manner with maximum 5 bullet points.`;
  } else if (mode === "rewrite") {
    return `${base} please rewrite the following text in a ${tone ? tone : "simple"} tone. you should not preserve the meaning`;
  } else {
    return `${base} please translate the following text to ${targetLanguage ? targetLanguage : "tamil"}. you should not change the name or product mentioned in the text. you should not preserve the meaning`;
  }
}

export async function POST(req) {
  try {
    const { mode, targetLanguage, tone, inputText } = await req.json();

    const cleanedInputText = inputText
      ? inputText.replace(/[\n\r]+/g, " ").trim()
      : "";

    if (!cleanedInputText) {
      return new Response(
        JSON.stringify({ error: "Input text is required." }),
        { status: 400 },
      );
    }

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: buildInstructions(mode, targetLanguage, tone),
            },
            { role: "user", content: cleanedInputText },
          ],
        }),
      },
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return Response.json(
        {
          error:
            data?.error?.message ||
            "An error occurred while processing your request.",
        },
        { status: groqResponse.status },
      );
    }

    return Response.json({
      outputText: data?.choices?.[0]?.message?.content ?? "",
    });
  } catch (error) {
    console.error("Transform API error:", error);
    return Response.json(
      { error: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}
