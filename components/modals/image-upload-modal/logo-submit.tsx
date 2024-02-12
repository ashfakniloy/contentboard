import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";

type LogoSubmitProps = {
  logo: string;
  handleImageSubmit: (values: { logo: string }) => Promise<void>;
  imageSubmitting: boolean;
};

export default function LogoSubmit({
  logo,
  handleImageSubmit,
  imageSubmitting,
}: LogoSubmitProps) {
  const handleLogoSubmit = () => {
    const values = { logo: logo };

    handleImageSubmit(values);
  };

  return (
    <div className="bg-gray-300 rounded-full">
      <Button
        type="button"
        className="w-[150px] font-medium relative"
        onClick={handleLogoSubmit}
        disabled={imageSubmitting}
      >
        {imageSubmitting && (
          <div className="absolute inset left-3.5">
            <span>
              <Spinner className="border-gray-200 border-r-gray-200/30 border-b-gray-200/30" />
            </span>
          </div>
        )}
        Submit
      </Button>
    </div>
  );
}
