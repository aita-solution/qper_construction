import { Message } from '../types';

export class ChatContextService {
  private static readonly MAX_CONTEXT_LENGTH = 4000;
  private static readonly DEFAULT_RESPONSE = "Keine vorherigen Gespräche vorhanden. Wie kann ich helfen?";
  private chatContext: string = '';

  constructor() {
    this.chatContext = '';
  }

  public addUserMessage(message: string): void {
    this.appendToContext(`Nutzer: ${message}`);
  }

  public addAssistantMessage(message: string): void {
    this.appendToContext(`Qper: ${message}`);
  }

  public getCurrentContext(): string {
    return this.chatContext || ChatContextService.DEFAULT_RESPONSE;
  }

  public clearContext(): void {
    this.chatContext = '';
  }

  private appendToContext(message: string): void {
    const newContext = this.chatContext ? `${this.chatContext}\n${message}` : message;
    
    if (newContext.length <= ChatContextService.MAX_CONTEXT_LENGTH) {
      this.chatContext = newContext;
      return;
    }

    // Remove oldest messages when context gets too long
    const messages = newContext.split('\n');
    while (messages.join('\n').length > ChatContextService.MAX_CONTEXT_LENGTH && messages.length > 1) {
      messages.shift();
    }
    this.chatContext = messages.join('\n');
  }

  public buildContextFromMessages(messages: Message[]): void {
    this.clearContext();
    messages.forEach(message => {
      const content = typeof message.content === 'string' 
        ? message.content 
        : Array.isArray(message.content)
          ? message.content.map(c => c.text?.value || '').join(' ')
          : message.content.text?.value || '';

      if (message.role === 'user') {
        this.addUserMessage(content);
      } else {
        this.addAssistantMessage(content);
      }
    });
  }
}