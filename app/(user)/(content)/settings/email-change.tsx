"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InputFieldLong } from "@/components/form-fields/input-field";
import { Spinner } from "@/components/spinner";
import { PasswordField } from "@/components/form-fields/password-field";
import NonPortalModal from "@/components/modals/non-portal-modal";
import { changeEmail } from "@/db/user/mutations/change-email";
import { EmailProps, emailSchema } from "@/schemas/settings-schema";

export default function EmailChange({ email }: { email: string }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const defaultValues = {
    email: email,
    password: "",
  };
  const form = useForm<EmailProps>({
    // defaultValues,
    values: defaultValues,
    resolver: zodResolver(emailSchema),
  });

  const {
    reset,
    watch,
    trigger,
    setError,
    formState: { isSubmitting },
    resetField,
  } = form;

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    resetField("password");
  };

  const emailvalue = watch("email");

  const handleNextStep = async () => {
    const emailvalidated = await trigger("email", { shouldFocus: true });
    if (!emailvalidated) return;

    if (emailvalue === email) {
      setError(
        "email",
        { message: "Current and new email are same" },
        { shouldFocus: true }
      );
      return;
    }

    setShowPasswordModal(true);
  };

  const onSubmit = async (values: EmailProps) => {
    // console.log("values", values);
    // return;

    const result = await changeEmail({ values });

    // console.log("result", result);

    if (result.success) {
      signOut();
    } else if (result.error) {
      toast.error(result.error);

      const errorType = result?.errorType as "email" | "password";

      errorType &&
        setError(errorType, { message: result.error }, { shouldFocus: true });

      errorType === "email" && closePasswordModal();

      console.log("error", result.data);

      // setError(result.error)
    } else {
      toast.error("Error");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <label htmlFor="">Email</label>
        <div className="flex flex-col lg:flex-row w-full items-center gap-5">
          {isSelected ? (
            <InputFieldLong name="email" type="email" autoFocus={isSelected} />
          ) : (
            <p className="h-[50px] pl-0.5 pt-[1px] flex items-center font-bold text-gray-400 text-2xl w-full">
              {email}
            </p>
          )}
          {!isSelected ? (
            <Button
              type="button"
              className="w-[200px] rounded-full"
              onClick={() => setIsSelected(true)}
            >
              Change Email
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
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="w-[140px] rounded-full"
                onClick={handleNextStep}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        <NonPortalModal open={showPasswordModal}>
          <div>
            <p className="text-xl font-semibold text-center mb-7">
              Enter your password to change email
            </p>

            <PasswordField name="password" label="Password" />

            <div className="mt-7 flex justify-center gap-5">
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
        </NonPortalModal>
      </form>
    </FormProvider>
  );
}
