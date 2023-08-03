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
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  header: {
    h1: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    h2: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    h3: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    h4: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    h5: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    h6: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
  },
};
interface Props {
  content: any;
}

const EditorOutput: FC<Props> = ({ content }) => {
  return <Output renderers={renderers} style={style} data={content} />;
};

export default EditorOutput;
