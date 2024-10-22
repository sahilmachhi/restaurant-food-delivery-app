import { useFormContext } from "react-hook-form";

const CuisinesForm = () => {
  const {} = useFormContext();
  return (
    <>
      <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
        <label>Please select cuisines</label>
        {/* cuisines selection box goes here */}
      </div>
    </>
  );
};

export default CuisinesForm;
