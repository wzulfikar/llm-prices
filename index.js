import fs from 'fs';
import { htmlToText } from 'html-to-text';
import getPrices from './src/get-prices.js'
import llmPrices from './llm-prices.json';

/*
Usage:
bun ./index.js
*/
(async () => {
  for (const [provider, { pricing_page, models, embedding_models }] of Object.entries(llmPrices)) {
    console.log(`- Getting models prices for "${provider}": ${pricing_page}`)
    const pricingPage = await fetch(pricing_page).then(res => res.text())
    const content = htmlToText(pricingPage).trim()
    const modelsPrices = await getPrices(provider, { models, embedding_models, content })

    llmPrices[provider].last_checked_at = new Date().toISOString()
    llmPrices[provider].models = modelsPrices.models
    if (modelsPrices.embedding_models) {
      llmPrices[provider].embedding_models = modelsPrices.embedding_models
    }

    if (process.env.UPDATE_FIXTURES) {
      require('fs').writeFileSync(`./fixtures/pricing-page-${provider}.json`, `export const pricingPage_${provider} = \`\n${content}\n\``)
    }
  }
  fs.writeFileSync('./llm-prices.json', JSON.stringify(llmPrices, null, 2))
})()
