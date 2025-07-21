import { Post } from "@/lib/types";
import {supabase} from "@/lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


export async function getAllPosts(): Promise<Post[] | null> {
    const { data, error } = await supabase.from('posts').select('*').limit(30);
    return data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error }: PostgrestSingleResponse<Post> = await supabase.from('posts').select('*').eq('slug', slug).single();
    return data;
}

export async function getCategories(): Promise<{ category: any; }[] | null> {
  const { data, error } = await supabase.from("posts").select("category");
  if (!data) return null;
  // Group by category and return unique categories
  const uniqueCategories = Array.from(
    new Set(data.map((item: { category: any }) => item.category))
  ).map((category) => ({ category }));
  return uniqueCategories;
}

export async function getPostsByCategory(category: string): Promise<Post[] | null> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .ilike("category", decodeURIComponent(category)); 
    return data;
}
export async function getMenuLinks() {
    const menuCategories = await getCategories();
    if (!menuCategories) return [];

    return [...new Set(menuCategories)].map((category) => ({
        href: `/${encodeURIComponent(category?.category.toLowerCase())}`,
        label: category.category
    }));
}

export async function updateViewPost (slug: string): Promise<void> {
    const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("views")
        .eq("slug", slug)
        .single();

    if (fetchError || !post) {
        console.error("Error fetching post views:", fetchError);
        return;
    }

    const newViews = (post.views || 0) + 1;

    const { data, error } = await supabase
        .from("posts")
        .update({ views: newViews })
        .eq("slug", slug);

    if (error) {
        console.error("Error updating post views:", error);
    } 
}

export async function getPostsBySearch(query: string): Promise<Pick<Post, "title" | "slug">[] | null> {
    const { data, error } = await supabase
        .from("posts")
        .select("title,slug")
        .ilike("title", `%${query}%`)
        .or(`content.ilike.%${query}%`)
        .limit(10);

    if (error) {
        console.error("Error fetching posts by search:", error);
        return null;
    }

    return data;
}