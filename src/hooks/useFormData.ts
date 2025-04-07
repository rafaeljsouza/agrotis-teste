import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useFormData = () => {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  
  return context;
};
