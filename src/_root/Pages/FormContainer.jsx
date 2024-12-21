import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTENT } from "@/utils/data";
import { StepIndicator } from "@/components/ui/form/StepIndicator";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/utils/schema";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const FormContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      displayName: "",
      workspaceName: "",
      workspaceUrl: "",
      usageDetails: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, register, trigger, formState, setValue, control } =
    form;
  const { errors } = formState;

  const usageDetails = useWatch({
    control,
    name: "usageDetails",
  });

  const onNext = async (e) => {
    e.preventDefault();
    const stepFields = getFieldsForStep(currentStep);

    // Validate fields for the current step
    const isValid = await trigger(stepFields);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onPrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (values) => {
    console.log("Form Submitted: ", values);
    if (!values.workspaceUrl) {
      values.workspaceUrl = "";
    }
    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    const updatedData = [...existingData, values];
    localStorage.setItem("formData", JSON.stringify(updatedData));
    form.reset();
    navigate("/table");
  };

  const handleToggle = (value) => {
    form.setValue("usageDetails", value);
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ["fullName", "displayName"];
      case 2:
        return ["workspaceName", "workspaceUrl"];
      case 3:
        return ["usageDetails"];
      default:
        return [];
    }
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <label htmlFor="fullName" className="font-medium">
              Full Name
            </label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}

            <label htmlFor="displayName" className="font-medium">
              Display Name
            </label>
            <Input
              id="displayName"
              placeholder="Enter your display name"
              {...register("displayName")}
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <label htmlFor="workspaceName" className="font-medium">
              Workspace Name
            </label>
            <Input
              id="workspaceName"
              placeholder="Enter your workspace name"
              {...register("workspaceName")}
            />
            {errors.workspaceName && (
              <p className="text-red-500 text-sm">
                {errors.workspaceName.message}
              </p>
            )}

            <label htmlFor="workspaceUrl" className="font-medium">
              Workspace URL (optional)
            </label>
            <Input
              id="workspaceUrl"
              placeholder="Enter your workspace URL (optional)"
              {...register("workspaceUrl")}
            />
            {errors.workspaceUrl && (
              <p className="text-red-500 text-sm">
                {errors.workspaceUrl.message}
              </p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              {/* For Myself Button */}
              <button
                type="button"
                className={`p-4 border rounded-lg flex flex-col items-center justify-center w-40 ${
                  form.getValues("usageDetails") === "For myself"
                    ? "border-primary bg-purple-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleToggle("For myself")}
              >
                <span className="text-xl">👤</span>
                <span className="font-medium mt-2">For myself</span>
                <span className="text-gray-500 text-sm mt-1">
                  Write better. Think more clearly. Stay organized.
                </span>
              </button>

              <button
                type="button"
                className={`p-4 border rounded-lg flex flex-col items-center justify-center w-40 ${
                  form.getValues("usageDetails") === "With my team"
                    ? "border-primary bg-purple-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleToggle("With my team")}
              >
                <span className="text-xl">👥</span>
                <span className="font-medium mt-2">With my team</span>
                <span className="text-gray-500 text-sm mt-1">
                  Wikis, docs, tasks & projects, all in one place.
                </span>
              </button>
            </div>
            {errors.usageDetails && (
              <p className="text-red-500 text-sm">
                {errors.usageDetails.message}
              </p>
            )}
          </div>
        );
      case 4:
        return (
          <div className="text-center flex items-center justify-center flex-col gap-5 ">
            <FaCheckCircle color="#664DE5" size={60} />
            <h1 className="text-3xl font-semibold p-2">
              Congratulations, Eren!
            </h1>
            <p className="text-gray-500">
              You have completed onboarding, you can start using the Eden!
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col items-center  justify-between gap-20 w-full">
      <StepIndicator currentStep={currentStep} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-6 max-w-screen-sm"
      >
        {currentStep < 4 && (
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold p-2">
              {CONTENT[currentStep - 1].heading}
            </h1>
            <p className="text-gray-500">{CONTENT[currentStep - 1].text}</p>
          </div>
        )}
        {renderFormFields()}
        <div className="flex justify-center gap-4 mt-6">
          {currentStep === 4 ? (
            <Button
              type="submit"
              c
              variant="primary"
              className="w-10/12 self-center bg-primary text-white py-6"
            >
              Launch Eden
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onNext}
              variant="primary"
              className="w-full self-center bg-primary text-white py-6"
            >
              Create Workspace
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default FormContainer;
