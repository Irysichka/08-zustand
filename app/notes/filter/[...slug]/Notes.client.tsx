"use client";

import { useState} from "react";
import css from "./Notesclient.module.css";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useRouter } from "next/navigation";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import { NotesResponse } from "@/lib/api";


type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
   const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [debouncedQuery] = useDebounce(query, 300);

  const handleChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () => fetchNotes(page, debouncedQuery, tag),
    placeholderData: keepPreviousData,
  });


  const totalPages = data?.totalPages ?? 1;

  return (
    
            <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>

      {data?.notes && <NoteList notes={data?.notes} />}
    </div>
  );
}