import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { Subscription } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  attachments?: any[];
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    LogoComponent
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: ChatMessage[] = [];
  currentMessage = '';
  isTyping = false;
  isMinimized = false;
  isExpanded = false;
  isVisible = false;
  private subscription = new Subscription();

  constructor(
    private chatStateService: ChatStateService
  ) {}

  // Quick action suggestions - You can customize these
  quickActions = [
    { icon: 'work', text: 'Add Work Experience', action: 'work_experience' },
    { icon: 'school', text: 'Add Education', action: 'education' },
    { icon: 'code', text: 'Add Skills', action: 'skills' },
    { icon: 'palette', text: 'Customize Design', action: 'design' },
    { icon: 'rocket_launch', text: 'Generate Portfolio', action: 'generate' },
    { icon: 'help', text: 'Get Help', action: 'help' }
  ];

  // Professional detail suggestions - You can customize these
  professionalSuggestions = [
    "Tell me about your current role and responsibilities",
    "What are your key achievements in your career?",
    "Describe your technical skills and expertise",
    "What projects are you most proud of?",
    "What are your career goals and aspirations?",
    "Tell me about your educational background",
    "What certifications do you have?",
    "Describe your leadership experience"
  ];

  ngOnInit() {
    // Subscribe to chat state changes
    this.subscription.add(
      this.chatStateService.isVisible$.subscribe(visible => {
        this.isVisible = visible;
      })
    );

    this.subscription.add(
      this.chatStateService.isExpanded$.subscribe(expanded => {
        this.isExpanded = expanded;
      })
    );

    this.subscription.add(
      this.chatStateService.isMinimized$.subscribe(minimized => {
        this.isMinimized = minimized;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // Basic message handling - You can implement your own logic
  addUserMessage(content: string) {
    if (!content.trim()) return;

    this.messages.push({
      id: this.generateId(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    });

    this.currentMessage = '';
    
    // TODO: Implement your own message handling logic here
  }

  addSystemMessage(content: string) {
    this.messages.push({
      id: this.generateId(),
      type: 'system',
      content,
      timestamp: new Date()
    });
  }

  addAssistantMessage(content: string) {
    this.messages.push({
      id: this.generateId(),
      type: 'assistant',
      content,
      timestamp: new Date()
    });
  }

  // Quick action handlers - You can implement your own logic
  onQuickAction(action: string) {
    const actionMessages: { [key: string]: string } = {
      'work_experience': "I'd like to add my work experience",
      'education': "I want to add my education details",
      'skills': "I'd like to add my skills",
      'design': "I want to customize my portfolio design",
      'generate': "I'm ready to generate my portfolio",
      'help': "I need help with my portfolio"
    };
    
    this.addUserMessage(actionMessages[action] || action);
  }

  onSuggestionClick(suggestion: string) {
    this.addUserMessage(suggestion);
  }

  onSendMessage() {
    if (this.currentMessage.trim()) {
      this.addUserMessage(this.currentMessage);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  toggleMinimize() {
    this.chatStateService.toggleMinimized();
  }

  toggleExpand() {
    this.chatStateService.toggleExpanded();
  }

  clearChat() {
    this.messages = [];
  }

  hideChat() {
    this.chatStateService.hideChat();
  }

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
