import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import SelectBtn from "../SelectBtn";
import RTE from "../RTE";
import appwriteService from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input";
function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const onSubmit = async (data) => {
    console.log(data.image)
    try {
      let fileId;
      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) {
          throw new Error('Failed to upload file');
        }
        fileId = file.$id;
        if (post && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }
      const postData = {
        ...data,
        featuredImage:fileId || post?.featuredImage,
        userId:userData.userData.$id,
      };
      console.log(postData)

      let dbPost;
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, postData);
      } else {
        dbPost = await appwriteService.createPost(postData);
      }

      if (!dbPost) {
        throw new Error('Failed to save post');
      }

      navigate(`/post/${dbPost.$id}`);
    } catch (error) {
      console.error('Error submitting post:', error);
      
    }
  };

  const Slugtransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLocaleLowerCase().replace(/\s/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", Slugtransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, Slugtransform, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-black my-10">
      <h1 className="text-center font-bold md:text-5xl text-3xl text-red-700">Create a Post:</h1>
      <div className="px-2">
        <div className="md:grid grid-cols-3 gap-x-20 mx-5 items-center">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 border border-black p-2 w-full"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 border-black border p-2 w-full"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", Slugtransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <SelectBtn
            options={["active", "inactive"]}
            label="Status"
            className="mt-7"
            {...register("status", { required: true })}
          />
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage).href}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="bg-blue-600 text-white w-96">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
