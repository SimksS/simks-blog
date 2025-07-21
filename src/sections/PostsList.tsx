import { Post as PostType } from "@/lib/types";
import Post from "@/components/Post";
import { cn } from "@/lib/utils";

export default function PostList({ posts, className }: { posts: PostType[], className?: string }) {
  return (
    <div className={cn( className, "grid gap-8 md:grid-cols-2 lg:grid-cols-3")}>
          {
              posts.map((post) => ( <Post key={post.slug} post={post} />))
      }
    </div>
  );
}