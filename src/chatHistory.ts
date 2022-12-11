/*
 Memory for storing chat history by phone number
*/

export type Turn = {
  speaker: string;
  text: string;
}


export interface ChatHistory {
  agentName: string;
  promptId: string;
  phone: string;
  turns: Turn[];
}

export class ChatHistoryStore {
    private history: { [chatId: string]: ChatHistory } = {};

    create(phone: string, agentName: string, promptId: string): ChatHistory {
      this.history[phone] = {
        agentName: agentName,
        promptId: promptId,
        phone: phone,
        turns: []
      }
      return this.history[phone];
    }
  
    add(phone: string, message: string, speaker: string) {
      const turn = {
        speaker: speaker,
        text: message
      }
      this.history[phone].turns.push(turn);
    }
  
    get(phone: string): ChatHistory {
      return this.history[phone];
    }
  }
  