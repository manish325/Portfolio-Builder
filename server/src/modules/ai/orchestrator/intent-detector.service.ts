import { Injectable } from '@nestjs/common';
import { OpenAiProvider } from '../models/openai.provider';

@Injectable()
export class IntentDetectorService {
  constructor(private readonly openAiProvider: OpenAiProvider) {}
}
