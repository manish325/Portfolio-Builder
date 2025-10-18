import { Injectable } from '@nestjs/common';
import { OpenAiProvider } from '../models/openai.provider';
import { IntentDetectorService } from './intent-detector.service';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly intentDetector: IntentDetectorService,
    private readonly openAiProvider: OpenAiProvider,
  ) {}

  async testAi(prompt: string): Promise<string> {
    return await this.openAiProvider.testAi(prompt);
  }
}
