import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatData {
  professionalDetails: {
    workExperience: any[];
    education: any[];
    skills: any[];
    projects: any[];
    achievements: any[];
    certifications: any[];
  };
  portfolioPreferences: {
    style: string;
    colorScheme: string;
    layout: string;
    sections: string[];
  };
  userIntent: string;
  extractedData: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatDataSubject = new BehaviorSubject<ChatData>({
    professionalDetails: {
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      achievements: [],
      certifications: []
    },
    portfolioPreferences: {
      style: '',
      colorScheme: '',
      layout: '',
      sections: []
    },
    userIntent: '',
    extractedData: {}
  });

  public chatData$ = this.chatDataSubject.asObservable();

  constructor() { }

  updateProfessionalDetails(details: Partial<ChatData['professionalDetails']>) {
    const currentData = this.chatDataSubject.value;
    this.chatDataSubject.next({
      ...currentData,
      professionalDetails: {
        ...currentData.professionalDetails,
        ...details
      }
    });
  }

  updatePortfolioPreferences(preferences: Partial<ChatData['portfolioPreferences']>) {
    const currentData = this.chatDataSubject.value;
    this.chatDataSubject.next({
      ...currentData,
      portfolioPreferences: {
        ...currentData.portfolioPreferences,
        ...preferences
      }
    });
  }

  setUserIntent(intent: string) {
    const currentData = this.chatDataSubject.value;
    this.chatDataSubject.next({
      ...currentData,
      userIntent: intent
    });
  }

  setExtractedData(data: any) {
    const currentData = this.chatDataSubject.value;
    this.chatDataSubject.next({
      ...currentData,
      extractedData: data
    });
  }

  getCurrentChatData(): ChatData {
    return this.chatDataSubject.value;
  }

  clearChatData() {
    this.chatDataSubject.next({
      professionalDetails: {
        workExperience: [],
        education: [],
        skills: [],
        projects: [],
        achievements: [],
        certifications: []
      },
      portfolioPreferences: {
        style: '',
        colorScheme: '',
        layout: '',
        sections: []
      },
      userIntent: '',
      extractedData: {}
    });
  }

  // TODO: Implement your own message processing logic
  async processUserMessage(message: string): Promise<any> {
    // Implement your own logic here
    return {
      intent: 'custom',
      extractedData: {},
      suggestions: []
    };
  }

  // TODO: Implement your own portfolio suggestion logic
  async generatePortfolioSuggestion(data: ChatData): Promise<string> {
    // Implement your own logic here
    return 'Custom portfolio suggestion based on your data';
  }
}
