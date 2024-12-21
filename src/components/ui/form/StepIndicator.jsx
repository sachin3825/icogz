import React from "react";

export const StepIndicator = ({ currentStep }) => {
  const steps = [1, 2, 3, 4];
  const primaryColor = "#664DE5";
  const grayColor = "#D1D5DB";

  return (
    <ol className="flex items-center w-full md:max-w-[500px]">
      {steps.map((step, index) => (
        <li
          key={step}
          className={`flex items-center ${
            index < steps.length - 1 ? "w-full md:w-1/2" : "w-auto"
          }`}
        >
          {/* Step Circle */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 transition-all duration-300`}
            style={{
              backgroundColor: step <= currentStep ? primaryColor : "white",
              color: step <= currentStep ? "#FFF" : "#000",
              border: `2px solid ${
                step <= currentStep ? primaryColor : grayColor
              }`,
            }}
          >
            {step}
          </div>

          {/* Line Between Steps */}
          {index < steps.length - 1 && (
            <div
              className="flex-grow h-0.5 transition-all duration-800 "
              style={{
                background: `${
                  step < currentStep
                    ? primaryColor // Previous step: 100% primary color
                    : step === currentStep
                    ? `linear-gradient(to right, ${primaryColor} 50%, ${grayColor} 50%)` // Current step: 50% primary
                    : grayColor // Future step: gray
                }`,
              }}
            ></div>
          )}
        </li>
      ))}
    </ol>
  );
};
