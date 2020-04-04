export interface Message {
  id: number;
  variant: MessageVariant;
  text: string;
}

export type MessageVariant = 'info' | 'success' | 'warning' | 'error';
