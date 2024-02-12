import ContentBoardLogo from "@/components/logo/content-board";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-custom-gray3">
      <div className="flex-1 flex relative">
        <div className="flex items-center w-[70%] justify-center z-10 bg-white">
          <div className="ml-[20%]">
            <ContentBoardLogo className="w-[400px]" />
            <p className="mt-1 mr-1 text-primary font-medium text-end text-[16px] italic">
              Write <b>blogs</b> and manage <b>contact</b> for your website
            </p>
          </div>
        </div>

        <div className="absolute inset-y-0 right-[15%] w-[30%] bg-white -skew-x-[16deg]"></div>
      </div>

      <div className="flex-1 flex justify-center items-center">{children}</div>
    </div>
  );
}
