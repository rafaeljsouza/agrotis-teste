import { createContext, useState, ReactNode } from 'react';
import { FormData } from '../types';

interface FormContextType {
  formDataList: FormData[];
  addFormData: (data: FormData) => void;
}

export const FormContext = createContext<FormContextType>({
  formDataList: [],
  addFormData: () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);

  const addFormData = (data: FormData) => {
    setFormDataList([...formDataList, data]);
  };

  return (
    <FormContext.Provider value={{ formDataList, addFormData }}>
      {children}
    </FormContext.Provider>
  );
};