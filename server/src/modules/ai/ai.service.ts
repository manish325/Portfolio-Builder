import { Injectable } from '@nestjs/common';
import { OrchestratorService } from './orchestrator/orchestrator.service';
import { MemoryService } from './memory/memory.service';
import { FeedbackService } from './feedback/feedback.service';

@Injectable()
export class AiService {
  constructor(
    private readonly orchestratorService: OrchestratorService,
    private readonly memoryService: MemoryService,
    private readonly feedbackService: FeedbackService,
  ) {}

   async getResponse(prompt: string): Promise<string> {
    const response = await this.orchestratorService.testAi(prompt);
    return response;
  }
}
