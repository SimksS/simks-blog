import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import Link from "next/link";

export default function Post({ post }: { post: Post }) {
    return (
      <Link href={`/posts/${post.slug}`} key={post.slug}>
                <Card key={post.slug} className="hover:shadow-lg transition-shadow duration-300 p-3 relative">
                      <Badge variant="secondary" className="absolute top-4 left-5 z-10">{post.category}</Badge>
                <img src="https://placehold.co/200x200" alt={post.title} />
                <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                    {post.excerpt}
                    </CardDescription>
                </Card>
            
            </Link>
    );
}