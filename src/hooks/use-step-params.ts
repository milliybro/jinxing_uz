import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useStepParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStep = searchParams.get('step');
  const [step, setStep] = useState(1)

  useEffect(()=>{
    setStep(rawStep ? Number(rawStep) : 1)
  }, [rawStep])

  const prev = () => {
    const newParams = new URLSearchParams(searchParams); 
    newParams.set('step', `${step === 1 ? step : step - 1}`); 
    setSearchParams(newParams); 
  };

  const next = () => {
    const newParams = new URLSearchParams(searchParams); 
    newParams.set('step', `${step + 1}`); 
    setSearchParams(newParams); 
  };

  return { step, setStep, prev, next,searchParams, setSearchParams };
};

export default useStepParams;
