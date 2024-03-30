import ContentBoardLogo from "@/components/logo/content-board";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center bg-custom-gray2 dark:bg-black">
      <div className="lg:flex-1 lg:flex lg:relative">
        <div className="absolute lg:static top-10 flex items-center w-full lg:w-[70%] justify-center z-10 lg:bg-white dark:lg:bg-custom-gray4">
          <div className="lg:ml-[20%]">
            <ContentBoardLogo className="w-[200px] lg:w-[400px] mx-auto lg:mx-0" />
            <p className="mt-1 lg:mr-1 text-primary text-center font-medium lg:text-end text-xs lg:text-sm 2xl:text-base italic">
              Write <b>blogs</b> and manage <b>contact</b> for your website
            </p>
          </div>
        </div>

        <div className="hidden lg:block absolute inset-y-0 right-[15%] w-[30%] bg-white dark:bg-custom-gray4 -skew-x-[16deg]"></div>
      </div>

      <div className="lg:flex-1 flex justify-center items-center px-3 lg:px-0 my-32 lg:my-0">
        {children}
      </div>
    </div>
  );
}
