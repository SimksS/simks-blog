import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import { Post as PostType } from "@/lib/types";
import Post from "@/components/Post";

import { cn } from "@/lib/utils";

export default function PostsCarousel({ posts }: { posts: PostType[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="flex gap-4">
        {posts.map((post) => (
          <CarouselItem key={post.slug} className="w-full">
           <img
            src={`https://placehold.co/1200x500`}
            alt={post.title}
            width={1200}
            height={500}
            className="w-full rounded-lg object-cover mb-4"
          />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-10 cursor-pointer" />
      <CarouselNext className="right-10 cursor-pointer" />
    </Carousel>
  );
}