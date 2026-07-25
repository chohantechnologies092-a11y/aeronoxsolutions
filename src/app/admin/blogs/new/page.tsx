import { createBlog } from "@/lib/actions";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return <BlogForm action={createBlog} isEdit={false} />;
}
