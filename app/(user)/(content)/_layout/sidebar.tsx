"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { IconLogout } from "@/components/icons";
import LogoUploadModal from "@/components/modals/logo-upload-modal";
import ContentBoardLogo from "@/components/logo/content-board";
import DarkMode from "./dark-mode";
import { navLinks } from "./navLinks";
import useToggle from "@/hooks/use-toggle";
import { useEffect } from "react";
import { ChevronLeftCircle, Menu } from "lucide-react";

export default function UserSidebar({
  logoUrl,
}: {
  logoUrl: string | null | undefined;
}) {
  const pathname = usePathname();
  const { toggle: showSidebar, setToggle: setShowSidebar, node } = useToggle();

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("overflow-y-hidden");
    }

    return () => document.body.classList.remove("overflow-y-hidden");
  }, [showSidebar]);

  const handleSignout = () => {
    signOut({
      callbackUrl: `${window.location.origin}${pathname}`,
    });
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === path) {
      return true;
    }

    // if (path !== "/" && pathname.includes(path)) {
    //   return true;
    // }

    if (
      path !== "/" &&
      (pathname === path || pathname.startsWith(`${path}/`))
    ) {
      return true;
    }
  };

  return (
    <div
      className={
        showSidebar
          ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:bg-transparent"
          : ""
      }
    >
      <div
        ref={node}
        className={`h-dvh lg:h-screen z-30 top-0 bottom-0 fixed lg:sticky lg:translate-x-0 w-[260px]  ease-out transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="lg:hidden absolute top-0 right-[-38px] h-[70px] flex items-center">
          <button type="button" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? (
              <ChevronLeftCircle className="text-white size-[30px]" />
            ) : (
              <Menu className=" size-[30px]" />
            )}
          </button>
        </div>
        <div
          className={`h-full flex flex-col justify-between shadow-xl overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-200 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600 bg-white dark:bg-custom-gray4`}
        >
          <div className="w-[160px] mx-auto">
            <div className="py-3 lg:py-7">
              <div className="relative w-[160px] h-[100px]">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="static logo"
                    sizes="200px"
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <LogoUploadModal>
                    <div className="w-full h-full rounded-md bg-gray-200 flex justify-center items-center">
                      <p className="text-gray-700">Add logo</p>
                    </div>
                  </LogoUploadModal>
                )}
              </div>
            </div>

            <div className="mt-5 space-y-5 text-[17px]">
              {navLinks?.map((navLink, i) => (
                <div key={i}>
                  <Link href={navLink.link} passHref>
                    <div
                      className={`px-6 py-2 flex justify-between items-center rounded-full font-semibold  ${
                        isActive(navLink.link)
                          ? "bg-primary text-white"
                          : "transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={` ${
                            isActive(navLink.link)
                              ? "bg-primary text-white"
                              : "text-primary"
                          }`}
                        >
                          <navLink.icon />
                        </span>

                        <p>{navLink.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              <button
                type="button"
                className={`w-full px-6 py-2 flex justify-between items-center group font-semibold transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700`}
                onClick={handleSignout}
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <IconLogout />
                  </span>
                  <p>Sign out</p>
                </div>
              </button>
            </div>
          </div>

          <div className="w-[160px] mx-auto flex flex-col items-center mt-12 lg:mt-5 mb-5">
            <div className="w-full flex justify-between items-center mb-12">
              <div className="flex items-center gap-1 font-montserrat font-semibold rounded-lg">
                <p className="text-sm">Dark Theme</p>
              </div>

              <DarkMode />
            </div>

            <ContentBoardLogo />
            <div className="mt-3 text-xs text-center font-medium text-gray-600 dark:text-gray-400">
              <p>{`© 2024, Contentboard`}</p>
              <p>
                Developed by:{" "}
                <Link
                  href="https://niloy.vercel.app"
                  target="_blank"
                  className="underline text-blue-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Niloy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
