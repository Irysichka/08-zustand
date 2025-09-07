"use client";
import css from "@/app/notes/[id]/NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
 const { id } = useParams<{ id: string }>();
 
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });
  const router = useRouter();
  
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note?.createdAt
            ? `Created at: ${note.createdAt}`
            : `Updated at: ${note.updatedAt}`}
        </p>
      </div>
      <button className={css.backBtn} onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
}