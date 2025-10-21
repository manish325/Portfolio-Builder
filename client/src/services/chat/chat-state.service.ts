import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  private isExpandedSubject = new BehaviorSubject<boolean>(false);
  private isMinimizedSubject = new BehaviorSubject<boolean>(false);

  public isVisible$ = this.isVisibleSubject.asObservable();
  public isExpanded$ = this.isExpandedSubject.asObservable();
  public isMinimized$ = this.isMinimizedSubject.asObservable();

  constructor() { }

  toggleChat() {
    const currentState = this.isVisibleSubject.value;
    this.isVisibleSubject.next(!currentState);
    
    // If opening chat, ensure it's not minimized
    if (!currentState) {
      this.isMinimizedSubject.next(false);
    }
  }

  showChat() {
    this.isVisibleSubject.next(true);
    this.isMinimizedSubject.next(false);
  }

  hideChat() {
    this.isVisibleSubject.next(false);
  }

  toggleExpanded() {
    const currentState = this.isExpandedSubject.value;
    this.isExpandedSubject.next(!currentState);
    
    // If expanding, ensure it's visible and not minimized
    if (!currentState) {
      this.isVisibleSubject.next(true);
      this.isMinimizedSubject.next(false);
    }
  }

  toggleMinimized() {
    const currentState = this.isMinimizedSubject.value;
    this.isMinimizedSubject.next(!currentState);
    
    // If minimizing, ensure it's still visible
    if (!currentState) {
      this.isVisibleSubject.next(true);
    }
  }

  getCurrentState() {
    return {
      isVisible: this.isVisibleSubject.value,
      isExpanded: this.isExpandedSubject.value,
      isMinimized: this.isMinimizedSubject.value
    };
  }
}
