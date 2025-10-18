import { Module } from '@nestjs/common';
import { OrchestratorService } from './orchestrator/orchestrator.service';
import { OpenAiProvider } from './models/openai.provider';
import { MemoryService } from './memory/memory.service';
import { FeedbackService } from './feedback/feedback.service';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { IntentDetectorService } from './orchestrator/intent-detector.service';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    OrchestratorService,
    IntentDetectorService,
    OpenAiProvider,
    MemoryService,
    FeedbackService,
  ],
  exports: [
    AiService,
    OrchestratorService,
    IntentDetectorService,
    OpenAiProvider,
    MemoryService,
    FeedbackService,
  ],
})
export class AiModule {}
