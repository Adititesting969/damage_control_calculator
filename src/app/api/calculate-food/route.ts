import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openaiClient';

interface OpenAIResponse {
  food: string;
  calories: number;
  activities: {
    walking: string;
    running: string;
    cycling: string;
    swimming: string;
  };
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'API configuration error. Please check your OpenAI API key.' },
        { status: 500 }
      );
    }

    const { foodInput, tone } = await request.json();

    if (!foodInput || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields: foodInput and tone' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are the "Damage Control Calculator," a fitness translator that converts global food dish or item into physical activity equivalents.

TASK:
When a user tells you what they ate, respond with:
1. Estimated total calories (reasonable approximation)
2. Activity equivalents for: walking, running, cycling, swimming
3. A short, punchy closing message

CALCULATION BASELINE (average 70kg/155lb adult):
- Walking (moderate): 4 cal/min
- Running (8 km/h): 10 cal/min
- Cycling (moderate): 8 cal/min
- Swimming (freestyle): 11 cal/min

TONE SETTING: ${tone}
- "gentle": supportive, encouraging, no pressure -"honest": matter-of-fact, neutral, straightforward
- "brutal": blunt, dry humor, no sugarcoating

RESPONSE FORMAT (strict JSON):
{
  "food": "user's input, cleaned up",
  "calories": number,
  "activities": {
    "walking": "X hr Y min",
    "running": "X hr Y min",
    "cycling": "X hr Y min",
    "swimming": "X hr Y min"
  },
  "message": "short, direct closing line based on tone setting"
}

TONE RULES:
- Be direct, not preachy
- No lectures, no guilt trips
- Frame it as a fact, then a choice
- Keep the message under 15 words

GOOD MESSAGE EXAMPLES:
- "That's tomorrow's morning jog. Set an alarm." -"A quick swim covers it. Not bad." -"Three episodes of walking. Pick a podcast." -"You'll need stairs. Lots of stairs."

BAD MESSAGE EXAMPLES:
- "You should really reconsider your choices..." (preachy)
- "This is very unhealthy!" (judgmental)
- "Maybe try a salad next time?" (passive-aggressive)

ERROR HANDLING:
If the input is unclear or not food-related, respond with:
{
  "error": "Couldn't identify that. Try something like '2 slices of pizza' or 'a bowl of rice.'"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: foodInput },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'food_calculation_response',
          schema: {
            type: 'object',
            properties: {
              food: { type: 'string' },
              calories: { type: 'number' },
              activities: {
                type: 'object',
                properties: {
                  walking: { type: 'string' },
                  running: { type: 'string' },
                  cycling: { type: 'string' },
                  swimming: { type: 'string' },
                },
                required: ['walking', 'running', 'cycling', 'swimming'],
                additionalProperties: false,
              },
              message: { type: 'string' },
              error: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
      max_tokens: 1000,
    });

    const result: OpenAIResponse = JSON.parse(
      response.choices[0].message.content || '{}'
    );

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    // Provide more specific error messages
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your OpenAI API key configuration.' },
        { status: 500 }
      );
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (error?.code === 'model_not_found') {
      return NextResponse.json(
        { error: 'Invalid model configuration. Please contact support.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to process request. Please try again.',
        details: error || 'Unknown error'
      },
      { status: 500 }
    );
  }
}