'use client'
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { getPostsBySearch } from "@/lib/posts";
import Link from "next/link";

const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Orange",
    "Strawberry",
];

export const Autocomplete: React.FC = () => {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<{ title: string, slug: string }[]>([]);
    const [show, setShow] = useState(false);

    // Debounce state
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        (async () => {
            if (debouncedQuery.length > 0) {
                setFiltered(
                    await getPostsBySearch(debouncedQuery).then((posts) =>
                        posts ? posts.map(({ title, slug }) => { return { title, slug } }) : []
                    )
                );
                setShow(true);
            } else {
                setFiltered([]);
                setShow(false);
            }

        })();
    }, [debouncedQuery]);

    const handleBlur = () => {
        setTimeout(() => {
            setShow(false);
            setQuery("");
            setFiltered([]);
        }, 200); // Delay to allow click on suggestion
      
      
    }

    return (
        <div className="relative w-64" onFocus={() => query && setShow(true)} onBlur={() => handleBlur()} >
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Type to search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  
                   
                    autoComplete="off"
                    className="pl-10"
                />
            </div>
            {show && filtered.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-zinc-900 border rounded shadow">
                    {filtered.map((item) => (
                        <li
                            key={item.slug}
                            className={cn(
                                "px-4 py-2 cursor-pointer hover:bg-white/15"
                            )}
                        >
                            <Link href={`/posts/${item.slug}`} className="w-full" onClick={() => { setShow(false); setQuery("") }}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;