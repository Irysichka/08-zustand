import axios from "axios";
import { Note, NoteId } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const authHeader = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string,
): Promise<NotesResponse> => {
  const params: Record<string, string | number> = { page, perPage};
  if (search) params.search = search;
  if (tag) params.tag = tag; 

  const { data } = await axios.get<NotesResponse>("/notes", { params, headers: authHeader });
  return data;
};

// Створити нотатку
export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
) => {
  const { data } = await axios.post<Note>("/notes", newNote, {
    headers: authHeader,
  });
  return data;
};

// Видалити нотатку
export const deleteNote = async (noteId: NoteId): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: authHeader,
  });
  return data;
};

export const fetchNoteById = async (noteId: NoteId): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${noteId}`, {
    headers: authHeader,
  });
  return data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}