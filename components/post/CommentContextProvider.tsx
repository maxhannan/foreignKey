import type { FC } from "react";
import { PingContextProvider } from "./CommentContext";

interface Props {
  children: React.ReactNode;
}

const CommentContextProvider: FC<Props> = ({ children }) => {
  return <PingContextProvider>{children}</PingContextProvider>;
};

export default CommentContextProvider;
