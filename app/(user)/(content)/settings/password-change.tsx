"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/spinner";
import { PasswordField } from "@/components/form-fields/password-field";
import { changePassword } from "@/db/user/mutations/change-password";
import { PasswordProps, passwordSchema } from "@/schemas/settings-schema";

export default function PasswordChange() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  };

  const form = useForm<PasswordProps>({
    defaultValues,
    resolver: zodResolver(passwordSchema),
  });

  const {
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    reset();
  };

  const onSubmit = async (values: PasswordProps) => {
    if (values.currentPassword === values.newPassword) {
      setError(
        "newPassword",
        { message: "Old and new password are same" },
        { shouldFocus: true }
      );
      return;
    }

    // console.log("values", values);
    // return;

    const result = await changePassword({ values });

    // console.log("result", result);

    if (result.success) {
      signOut();
    } else if (result.error) {
      toast.error(result.error);
      const errorType = result?.errorType as "currentPassword";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });
    } else {
      toast.error("Error");
    }
  };

  return (
    <div>
      <label htmlFor="">Password</label>
      <div className="flex flex-col lg:flex-row w-full items-center gap-5">
        <p className="h-[50px] pl-0.5 pt-[1px] flex items-center font-bold text-gray-400 text-2xl w-full">
          ********
        </p>

        <Button
          type="button"
          className="w-[200px] rounded-full"
          onClick={() => setShowPasswordModal(true)}
        >
          Change Password
        </Button>
      </div>

      <AlertDialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <AlertDialogContent className="bg-card w-[450px] p-9 flex flex-col items-center">
          <p className="text-xl font-semibold text-center mb-5">
            Change password
          </p>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="space-y-7 w-full"
            >
              <PasswordField name="currentPassword" label="Current password" />
              <PasswordField name="newPassword" label="New password" />
              <PasswordField
                name="retypePassword"
                label="Re-enter new password"
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
