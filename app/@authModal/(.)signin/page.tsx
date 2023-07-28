import SignInForm from "@/app/(auth)/signin/SignInForm";
import CloseModal from "@/components/CloseModal";

import { FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="px-4 sm:container sm:px-0  flex items-center h-full sm:max-w-[500px] w-full sm:mx-auto">
        <div className="relative bg-background dark:border  dark:border-accent  w-full h-fit  py-12 sm:px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default page;
