import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNoteParams } from "../api";

type NoteStore = {
  draft: CreateNoteParams;
  setDraft: (draft: CreateNoteParams) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteParams = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);