import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class OpenAiProvider {
  private openAi: OpenAI;
  private stringOutputParser: StringOutputParser;

  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.stringOutputParser = new StringOutputParser();
  }

  async testAi(prompt: string): Promise<string> {
    const response = await this.openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    
    const content = response.choices[0].message.content;
    
    // Use StringOutputParser to properly parse the output
    return this.stringOutputParser.parse(content);
  }

  async testAiWithJsonOutput(prompt: string): Promise<any> {
    // Ensure the prompt instructs to return JSON
    const jsonPrompt = `${prompt}\n\nPlease respond with valid JSON format only.`;
    
    const response = await this.openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: jsonPrompt }],
      response_format: { type: "json_object" }
    });
    
    const content = response.choices[0].message.content;
    
    // Clean the content before parsing
    const cleanedContent = content?.trim().replace(/\s+/g, ' ') || '';
    
    try {
      // Parse the JSON response
      return JSON.parse(cleanedContent);
    } catch (error) {
      // If parsing fails, return the raw content as fallback
      return {
        content: cleanedContent,
        error: "Failed to parse JSON response",
        originalContent: content
      };
    }
  }
}
