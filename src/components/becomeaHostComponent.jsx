"use client";

import useCountries from "@/hooks/useCountries";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./country-select";
import { Input } from "./ui/input";
import Counter from "./counter-input";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGE: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};
const roomCount = watch("roomCount");
function BecomeAHostComponent({ session }) {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      category: "",
      location: "",
    },
  });

  const { getByValue } = useCountries();

  const category = watch("category");

  const setCustomValue = (title, value) => {
    setValue(title, value); // Correct value usage
  };

  let sourceAtStep = (
    <div>
      <h1>Which of these categories define your property</h1>
      <p>Pick a category</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((each) => (
          <div
            key={each.label}
            onClick={() => {
              setCustomValue("category", each.label);
              setStep(STEPS.LOCATION);
            }}
            className={cn(
              "flex flex-col p-5 rounded-lg border border-gray-300/20 cursor-pointer",
              category === each.label ? "bg-red-500/80 text-white" : ""
            )}
          >
            <each.icon />
            {each.label}
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    const location = watch("location");

    sourceAtStep = (
      <div>
        <h1>Where is your property based off?</h1>
        <CountrySelect
          value={getByValue(location)}
          onChange={(value) => {
            console.log("Selected value from dropdown:", value); // add this
            setCustomValue("location", value?.value);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    sourceAtStep = (
      <div>
        <Counter
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", roomCount)}
        />
      </div>
    );
  }

  return <div>{sourceAtStep}</div>;
}

export default BecomeAHostComponent;
