"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { InputFieldLong } from "@/components/form-fields/input-field";
import { changeUsername } from "@/db/user/mutations/change-username";
import { UsernameProps, usernameSchema } from "@/schemas/settings-schema";

export default function UsernameChange({ username }: { username: string }) {
  const [isSelected, setIsSelected] = useState(false);
  const [nameState, setNameState] = useState(username);

  const router = useRouter();

  const { data: session, update } = useSession();

  const defaultValues = {
    username: nameState,
  };
  const form = useForm<UsernameProps>({
    // defaultValues,
    values: defaultValues,
    resolver: zodResolver(usernameSchema),
  });

  const {
    reset,
    formState: { isSubmitting },
    setError,
  } = form;

  const onSubmit = async (values: UsernameProps) => {
    // console.log("values", values);
    // return;

    if (values.username === nameState) {
      setError(
        "username",
        { message: "Current and new username are same" },
        { shouldFocus: true }
      );
      return;
    }

    const result = await changeUsername({ values });

    // console.log("result", result);

    if (result.success) {
      toast.success(result.success);
      setIsSelected(false);
      setNameState(result.data.username);

      await update({
        ...session,
        user: {
          ...session?.user,
          username: result.data.username,
        },
      });

      router.refresh();
    } else if (result.error) {
      toast.error(result.error);

      const errorType = result?.errorType as "username";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });
    } else {
      toast.error("Error");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <label htmlFor="">Name</label>
        <div className="flex flex-col lg:flex-row w-full items-center gap-5">
          {isSelected ? (
            <InputFieldLong
              name="username"
              type="text"
              autoFocus={isSelected}
            />
          ) : (
            <p className="h-[50px] pl-0.5 pt-[1px] flex items-center font-bold text-gray-400 text-2xl w-full">
              {nameState}
            </p>
          )}
          {!isSelected ? (
            <Button
              type="button"
              className="w-[200px] rounded-full"
              onClick={() => setIsSelected(true)}
            >
              Change Name
            </Button>
          ) : (
            <div className="flex items-center gap-5">
              <Button
                type="button"
                className="w-[140px] rounded-full bg-transparent"
                variant="outline"
                onClick={() => {
                  setIsSelected(false);
                  reset();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-[140px] rounded-full relative"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner className="absolute left-6" />}
                Save
              </Button>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
