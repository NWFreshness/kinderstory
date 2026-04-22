import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { storySeeds } from '@/lib/words';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getRandomSeeds(num: number): string[] {
  const shuffled = [...storySeeds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, num);
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // Build the story prompt
    const seedConcept = prompt?.trim()
      ? prompt.trim()
      : getRandomSeeds(2).join(' and ');

    // Generate story using GPT-4o
    const storyResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that writes very simple stories for kindergarten children (ages 5-6).

RULES:
- Write EXACTLY 8-10 short sentences
- Each sentence must be 5-10 words ONLY
- Use ONLY simple words that a 5-6 year old can read
- DO NOT use any word with more than 2 syllables
- DO NOT use words like "beautiful", "wonderful", "something", "anything", etc.
- Keep sentences simple: subject + verb + object
- Stories should be sweet, innocent, and have a happy ending
- Write in present tense mostly
- Start each sentence with a capital letter
- Separate sentences with spaces
- Do NOT use quotation marks for speech
- Do NOT use complex punctuation (no semicolons, colons, dashes, apostrophes in contractions)
- Example simple sentence: "The dog ran to the park."
- Example simple sentence: "A big bird sat on a tree."
- Example simple sentence: "The kids played in the sun."
- Never break these rules, no matter what`,
        },
        {
          role: 'user',
          content: `Write a simple kindergarten story about: ${seedConcept}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.9,
    });

    const story = storyResponse.choices[0]?.message?.content?.trim() || '';

    if (!story) {
      return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
    }

    // Generate image using DALL-E 3
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Children's book illustration for a kindergarten story. Bright primary colors, simple shapes, cartoon style, cheerful, friendly characters, soft edges, day time scene. Story: ${story}. Square format.`,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = imageResponse.data[0]?.url || '';

    return NextResponse.json({ story, imageUrl, concept: seedConcept });

  } catch (error: unknown) {
    console.error('Generation error:', error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OPENAI_API_KEY in .env.local' },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a moment and try again.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
