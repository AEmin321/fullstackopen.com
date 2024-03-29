import Toggle from "./Toggle";
import BlogForm from "./BlogForm";

const CreateBlog = () => {
  return (
    <Toggle buttonText="Create New Blog">
      <BlogForm />
    </Toggle>
  );
};

export default CreateBlog;
