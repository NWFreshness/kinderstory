# KinderStory 📚

Generate fun, simple stories for kindergarteners (ages 5-6) with matching illustrations!

## How It Works

1. Type a topic you'd like to hear about (or leave blank for a surprise!)
2. Click "Tell me a story!" or "Surprise me!"
3. Read the story and see a picture that goes with it!

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **OpenAI API** (GPT-4o for stories, DALL-E 3 for images)
- **Vercel** (deploy target)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/NWFreshness/kinderstory.git
   cd kinderstory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your OpenAI API key:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your API key
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo
4. Add your `OPENAI_API_KEY` environment variable in Vercel project settings
5. Deploy!

## Stories are generated using

- Kindergarten sight words (Dolch list)
- Simple, age-appropriate vocabulary
- 8-10 short sentences per story
- Each sentence: 5-10 words max
