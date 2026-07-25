import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/data";
import { updateBlog } from "@/lib/actions";
import { BlogForm } from "@/components/admin/BlogForm";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateBlog(id, formData);
  }

  return <BlogForm initialData={blog} action={handleUpdate} isEdit={true} />;
}
