import { getPostBySlug, getAllPosts, getPostsByCategory, updateViewPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { marked } from "marked"; 
type Props = {
  params: Promise<{ slug: string; }>;
};



export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug);
  await updateViewPost(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Story Weaver`,
    description: post.excerpt,
  };
}

export default async function PostsPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug);
  if (!post) {
    console.error(`Post with slug "${slug}" not found.`);
    return
  }
    const htmlContent = marked(post.content || "");
  return (
    <article className="max-w-4xl mx-auto mt-24">
      <header className="mb-8 text-center">
        <div className="mb-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          By {post.author} on{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>
      <div className="mb-8">
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full rounded-lg object-cover"


        />
      </div>
      <div
        className="prose prose-lg dark:prose-invert max-w-none font-body text-foreground"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
