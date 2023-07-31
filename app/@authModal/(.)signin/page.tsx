import SignInForm from "@/app/(auth)/signin/SignInForm";
import CloseModal from "@/components/CloseModal";

import { FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/40 z-10  ">
      <div className="px-4 container mt-8 sm:mt-0 sm:px-0  animate-in zoom-in  flex items-center h-full max-w-[450px] w-full mx-auto">
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
