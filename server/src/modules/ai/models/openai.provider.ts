import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiProvider {
  private openAi: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async testAi(prompt: string): Promise<string> {
    const response = await this.openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  }
}
