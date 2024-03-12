import { ReactNode, useState } from "react";

export const useMultiStep = (steps: ReactNode[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function prev() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    console.log(index);
    
    setCurrentStepIndex((i) => {
      if (i > steps.length - 1 || i < 0) return i;
      return index;
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    prev,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};
