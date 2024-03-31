export default async function getPrices(provider, { models, embedding_models = {}, content }) {
  const prompt = `
You are text parser for LLM pricing page. Parse model prices from the given text.
The models are from ${provider}.
Return the output in raw JSON (without backticks). Example:

${JSON.stringify({ models, embedding_models }, null, 2)}
`.trim()

  const openAIApiKey = process.env.OPENAI_API_KEY
  if (!openAIApiKey) throw new Error('OPENAI_API_KEY is required');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${openAIApiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: content },
      ],
    })
  }).then(res => res.json())

  return JSON.parse(response.choices[0].message.content)
}
