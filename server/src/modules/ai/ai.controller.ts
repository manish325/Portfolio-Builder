import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('test')
  @ApiOperation({ 
    summary: 'Test AI functionality',
    description: 'Send a prompt to test the AI service and get a response'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          example: 'Hello, how are you?',
          description: 'The prompt to send to the AI service'
        }
      },
      required: ['prompt']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'AI test successful',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'string', example: 'AI response here' },
        message: { type: 'string', example: 'AI test successful' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Invalid prompt provided' }
      }
    }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'AI service unavailable' }
      }
    }
  })
  async testAi(@Body() body: { prompt: string }) {
    try {
      const result = await this.aiService.getResponse(body.prompt);
      return {
        success: true,
        data: result,
        message: 'AI test successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'AI test failed'
      };
    }
  }

  @Get('health')
  @ApiOperation({ 
    summary: 'Check AI module health',
    description: 'Check if the AI module is running and healthy'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'AI module is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'healthy' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        module: { type: 'string', example: 'AI Module' }
      }
    }
  })
  async healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      module: 'AI Module'
    };
  }
}
