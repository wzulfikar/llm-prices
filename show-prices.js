import llmPrices from './llm-prices.json';

/*
Usage:
bun ./show-prices.js
*/
(async () => {
  for (const [provider, { pricing_page, models, embedding_models }] of Object.entries(llmPrices)) {
    console.log(`Models prices for ${provider} (${pricing_page})`)
    console.table(Object.keys(models).map(model => ({
      model,
      ...llmPrices[provider].models[model]
    })))
    if (Object.keys(embedding_models).length) {
      console.table(Object.keys(embedding_models).map(embedding_model => ({
        embedding_model,
        ...llmPrices[provider].embedding_models[embedding_model]
      })))
    }
    console.log()
  }
})()
