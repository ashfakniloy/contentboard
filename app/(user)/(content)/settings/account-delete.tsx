"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/spinner";
import { PasswordField } from "@/components/form-fields/password-field";
import { InputField } from "@/components/form-fields/input-field";
import { deleteAccount } from "@/db/user/mutations/delete-account";
import {
  DeleteAccountProps,
  deleteAccountSchema,
} from "@/schemas/settings-schema";

export default function AccountDelete() {
  const [showModal, setShowModal] = useState(false);

  const defaultValues = {
    confirmPassword: "",
    confirmText: "",
  };

  const form = useForm<DeleteAccountProps>({
    defaultValues,
    resolver: zodResolver(deleteAccountSchema),
  });

  const {
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  const closePasswordModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = async (values: DeleteAccountProps) => {
    // console.log("values", values);
    // return;

    const result = await deleteAccount({ values });

    // console.log("result", result);

    if (result.success) {
      signOut();
    } else if (result.error) {
      toast.error(result.error);
      const errorType = result?.errorType as "confirmPassword";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="pt-5">
      <div className="flex w-full items-center gap-5">
        <p className="h-[50px] w-full pl-0.5 pt-[1px] flex items-center font-bold text-lg text-red-500 ">
          Delete Account
        </p>

        <Button
          type="button"
          className="w-[200px] rounded-full"
          onClick={() => setShowModal(true)}
        >
          Continue
        </Button>
      </div>

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="bg-card w-[450px] p-9 flex flex-col items-center">
          <p className="text-xl font-semibold text-center">
            Do you want to delete your account?
          </p>
          <p className="mb-5 text-sm text-center">
            All your blogs, medias and messages will be deleted. Once you delete
            your account, there is no going back. Please be certain.
          </p>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="space-y-7 w-full"
            >
              <PasswordField
                name="confirmPassword"
                label="Enter your password"
              />
              <InputField
                name="confirmText"
                label="To verify, type delete my account below"
                className="bg-custom-gray dark:bg-card"
              />
              <div>
                <div className="mt-8 flex justify-center gap-5">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={closePasswordModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full relative"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Spinner className="absolute left-3.5" />}
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
