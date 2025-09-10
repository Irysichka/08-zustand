import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = params;
  const filterNote = slug[0];
  return {
    title: `Notes with ${filterNote} filter`,
    description: `All your notes in one app`,
    openGraph: {
      title: `Notes with ${filterNote} filter`,
      description: `All your notes in one app`,
      url: `https://08-zustand-theta-blue.vercel.app/notes/filter/${filterNote}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    }
  }
}

export default async function App({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, 8, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}