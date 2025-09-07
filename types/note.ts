export interface Note {
    id: string;
  title: string;
  content: string;
  createdAt: string; 
  updatedAt: string; 
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
};

export type NoteId = Note["id"];
export type Tag = Note["tag"];