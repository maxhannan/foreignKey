"use client";

import CustomCodeRenderer from "@/components/renderers/CustomCodeRenderer";
import CustomImageRenderer from "@/components/renderers/CustomImageRenderer";
import { FC } from "react";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "1.5rem",
    lineHeight: "1.25rem",
  },
};
interface Props {
  content: any;
}

const EditorOutput: FC<Props> = ({ content }) => {
  return <Output className="text-sm " renderers={renderers} data={content} />;
};

export default EditorOutput;
