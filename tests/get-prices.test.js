import getPrices from '../get-prices';
import llmPrices from '../llm-prices.json';
import { pricingPage_openai } from './fixtures/pricing-page-openai';
import { pricingPage_anthropic } from './fixtures/pricing-page-anthropic';
import { pricingPage_groq } from './fixtures/pricing-page-groq';
import { pricingPage_mistral } from './fixtures/pricing-page-mistral';

/*
usage:
bun test --timeout 60000
*/
describe('getPrices', () => {
  it('parses model prices for OpenAI', async () => {
    const { models, embedding_models } = llmPrices['openai']
    const modelsPrices = await getPrices('openai', { models, embedding_models, content: pricingPage_openai })
    const expectedPrices = {
      "models": {
        "gpt-4-0125-preview": {
          "input_per_million": 10,
          "output_per_million": 30
        },
        "gpt-4-1106-preview": {
          "input_per_million": 10,
          "output_per_million": 30
        },
        "gpt-4-1106-vision-preview": {
          "input_per_million": 10,
          "output_per_million": 30
        },
        "gpt-4": {
          "input_per_million": 30,
          "output_per_million": 60
        },
        "gpt-4-32k": {
          "input_per_million": 60,
          "output_per_million": 120
        },
        "gpt-3.5-turbo-0125": {
          "input_per_million": 0.50,
          "output_per_million": 1.50
        },
        "gpt-3.5-turbo-instruct": {
          "input_per_million": 1.50,
          "output_per_million": 2.00
        }
      }
    }
    for (const [model, prices] of Object.entries(expectedPrices.models)) {
      expect(modelsPrices.models[model]).toEqual(prices)
    }
  })

  it('parses model prices for Anthropic', async () => {
    const { models, embedding_models } = llmPrices['anthropic']
    const modelsPrices = await getPrices('anthropic', { models, embedding_models, content: pricingPage_anthropic })
    const expectedPrices = {
      "models": {
        haiku: {
          input_per_million: 0.25,
          output_per_million: 1.25,
        },
        sonnet: {
          input_per_million: 3,
          output_per_million: 15,
        },
        opus: {
          input_per_million: 15,
          output_per_million: 75,
        },
        "claude_2.1": {
          input_per_million: 8,
          output_per_million: 24,
        },
        "claude_2.0": {
          input_per_million: 8,
          output_per_million: 24,
        },
        claude_instant: {
          input_per_million: 0.8,
          output_per_million: 2.4,
        }
      }
    }
    for (const [model, prices] of Object.entries(expectedPrices.models)) {
      expect(modelsPrices.models[model]).toEqual(prices)
    }
  })

  it('parses model prices for Groq', async () => {
    const { models, embedding_models } = llmPrices['groq']
    const modelsPrices = await getPrices('groq', { models, embedding_models, content: pricingPage_groq })
    const expectedPrices = {
      models: {
        "llama 2 70B": {
          input_per_million: 0.7,
          output_per_million: 0.8,
        },
        "llama 2 7B": {
          input_per_million: 0.1,
          output_per_million: 0.1,
        },
        "mixtral-8x7b": {
          input_per_million: 0.27,
          output_per_million: 0.27,
        },
        "gemma 7B": {
          input_per_million: 0.1,
          output_per_million: 0.1,
        },
      }
    }
    for (const [model, prices] of Object.entries(expectedPrices.models)) {
      expect(modelsPrices.models[model]).toEqual(prices)
    }
  })

  it('parses model prices for Mistral', async () => {
    const { models, embedding_models } = llmPrices['mistral']
    const modelsPrices = await getPrices('mistral', { models, embedding_models, content: pricingPage_mistral })
    const expectedPrices = {
      models: {
        "open-mistral-7b": {
          input_per_million: 0.25,
          output_per_million: 0.25,
        },
        "open-mixtral-8x7b": {
          input_per_million: 0.7,
          output_per_million: 0.7,
        },
        "mistral-small-latest": {
          input_per_million: 2,
          output_per_million: 6,
        },
        "mistral-medium-latest": {
          input_per_million: 2.7,
          output_per_million: 8.1,
        },
        "mistral-large-latest": {
          input_per_million: 8,
          output_per_million: 24,
        },
      },
      embedding_models: {
        "mistral-embed": {
          price_per_million: 0.1,
        },
      },
    }
    for (const [model, prices] of Object.entries(expectedPrices.models)) {
      expect(modelsPrices.models[model]).toEqual(prices)
    }
    for (const [model, prices] of Object.entries(expectedPrices.embedding_models)) {
      expect(modelsPrices.embedding_models[model]).toEqual(prices)
    }
  })
})
