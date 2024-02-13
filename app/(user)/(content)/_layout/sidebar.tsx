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

export default function UserSidebar({
  logoUrl,
}: {
  logoUrl: string | null | undefined;
}) {
  const pathname = usePathname();

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

  // console.log("session", session);

  return (
    <div className="h-screen flex flex-col justify-between overflow-y-auto z-30 top-0 bottom-0 sticky w-[260px] scrollbar-none hover:scrollbar-thin shadow-xl scrollbar-track-gray-100 scrollbar-thumb-gray-200 bg-white dark:bg-custom-gray6">
      <div className="">
        <div className="px-[47px] py-9">
          {/* <div className="relative w-[180px] h-[100px]"> */}
          {/* <div className="relative w-[160px] h-[80px]"> */}
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

        <div className="mt-5 mx-[47px] space-y-5 text-[17px]">
          {navLinks?.map((navLink, i) => (
            <div key={i} className="w-[160px]">
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
            className={`px-6 py-2 flex justify-between items-center group font-semibold transition-colors duration-200 rounded-full w-[160px]   hover:bg-gray-100 dark:hover:bg-gray-700`}
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

      <div className="flex flex-col items-center mb-5">
        <div className="mx-[47px] w-[150px] flex justify-between items-center mb-12">
          <div className="flex items-center gap-1 font-montserrat font-semibold rounded-lg">
            <p className="text-sm">Dark Theme</p>
          </div>

          <DarkMode />
        </div>

        <ContentBoardLogo />
        <div className="mt-3 text-xs text-center font-medium text-gray-600 dark:text-gray-400">
          <p className="">{`© 2024, Contentboard`}</p>
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
  );
}
