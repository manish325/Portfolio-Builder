import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { ChatStateService } from '../../services/chat/chat-state.service';
import { Subscription } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatBadgeModule, LogoComponent],
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent implements OnInit, OnDestroy {
  isChatVisible = false; // This tracks if the chat component is visible
  hasUnreadMessages = false;
  messageCount = 0;
  private subscription = new Subscription();

  constructor(private chatStateService: ChatStateService) { }

  ngOnInit() {
    // Subscribe to chat visibility state
    this.subscription.add(
      this.chatStateService.isVisible$.subscribe(visible => {
        this.isChatVisible = visible;
      })
    );

    // Check for unread messages from localStorage or service
    this.checkUnreadMessages();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleChat() {
    this.chatStateService.toggleChat();
    if (this.isChatVisible) {
      this.hasUnreadMessages = false;
      this.messageCount = 0;
    }
  }

  private checkUnreadMessages() {
    // This would typically check with a service or localStorage
    // For now, we'll simulate it
    const unreadCount = localStorage.getItem('chatUnreadCount');
    if (unreadCount) {
      this.messageCount = parseInt(unreadCount);
      this.hasUnreadMessages = this.messageCount > 0;
    }
  }

  markAsRead() {
    this.hasUnreadMessages = false;
    this.messageCount = 0;
    localStorage.removeItem('chatUnreadCount');
  }
}
