import fs from 'fs';
import { htmlToText } from 'html-to-text';
import getPrices from './get-prices.js'
import llmPrices from './llm-prices.json';

/*
Usage:
bun ./index.js
*/
(async () => {
  for (const [provider, { pricing_page, models, embedding_models }] of Object.entries(llmPrices)) {
    if (provider != 'mistral') continue;
    console.log(`- Fetching model prices for "${provider}". Pricing page: ${pricing_page}`)
    const pricingPage = await fetch(pricing_page).then(res => res.text())
    const content = htmlToText(pricingPage).trim()

    // Uncomment to update fixtures
    // require('fs').writeFileSync(`./pricing-page-${provider}.json`, `export const pricingPage_${provider} = \`\n${content}\n\``)

    const modelsPrices = await getPrices(provider, { models, embedding_models, content })

    llmPrices[provider].last_checked_at = new Date().toISOString()
    llmPrices[provider].models = modelsPrices.models
  }
  fs.writeFileSync('./llm-prices.json', JSON.stringify(llmPrices, null, 2))
})()
