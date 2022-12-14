/*
 Memory for storing chat history by phone number

promptId is a Promptable.ai thing. If you're using your own local prompt,
you can just hard-code the promptId (which is used to identify the prompt)
if you want to reset/switch between prompts in the chat using the 
"reset <promptId> <agentName>" command.

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
  