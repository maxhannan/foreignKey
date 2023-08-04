"use client";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { PostCreationRequest, PostValidator } from "@/lib/validators/editor";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import "@/styles/editor.css";
import { singleUpload } from "@/lib/imageupload";
import { BlockMutationEvent } from "@editorjs/editorjs/types/events/block";
import { useToast } from "./ui/use-toast";
import CreateControls from "@/app/create/components/CreateControls";

interface Props {}

type FormData = z.infer<typeof PostValidator>;

const Editor: FC<Props> = ({}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      subtitle: "",
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async ({
      title,
      content,
      subtitle,
      featuredImageUrl,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        content,
        subtitle,
        featuredImageUrl,
      };
      const { data } = await axios.post("/api/post/create", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity

      router.push("/");
      router.refresh();

      return toast({
        title: "Your post is published.",
        description: "Your post is now live.",
        variant: "success",
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onChange: async (api, e: BlockMutationEvent[]) => {},
        onReady() {
          ref.current = editor;
        },
        defaultBlock: "paragraph",
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const res = await singleUpload(file);

                  return {
                    success: 1,
                    file: {
                      url: res,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log({ errors });
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const editordata = await ref.current?.save();

    if (!editordata || editordata.blocks.length < 1) {
      return toast({
        title: "Something went wrong.",
        description: "Your post must have at least one block.",
        variant: "destructive",
      });
    } else if (
      editordata.blocks.filter((block) => block.type === "image").length < 1
    ) {
      return toast({
        title: "Something went wrong.",
        description: "Your post must have at least one image.",
        variant: "destructive",
      });
    }

    const payload: PostCreationRequest = {
      title: data.title,
      subtitle: data.subtitle,
      content: editordata,
      featuredImageUrl: editordata.blocks.filter(
        (block) => block.type === "image"
      )[0].data.file.url,
    };
    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <>
      <CreateControls submitting={isLoading || isSubmitting} />
      <div className="flex flex-col items-center gap-6 max-w-[850px] mx-auto ">
        <div className="w-full  lg:max-w-[850px] p-2 bg-background rounded-lg ">
          <form
            id="post-form"
            className=" mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" max-w-[85ch] prose prose-stone dark:prose-invert mx-auto w-full ">
              <TextareaAutosize
                ref={(e) => {
                  titleRef(e);
                  // @ts-ignore
                  _titleRef.current = e;
                }}
                {...rest}
                placeholder="Title"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none py-2"
              />
              <input
                {...register("subtitle")}
                placeholder="Subtitle"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-normal text-muted-foreground focus:outline-none mb-2"
              />

              <div
                id="editor"
                className="min-h-[500px] w-full codex-editor--narrow 
                "
              />
              <p className="text-sm text-gray-500">
                Use{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  Tab
                </kbd>{" "}
                to open the command menu.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editor;
