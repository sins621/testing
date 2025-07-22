'use client';

import { newDealInitialValuesSchema, NewDealInitialValuesType, NewDealType } from "@/schemas";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const defaultDeal: NewDealInitialValuesType = {
  name: '',
  link: '',
  coupon: '',
  discount: undefined,
  contactName: '',
  contactEmail: '',
}

type AddDealContextType = {
  newDealData: NewDealInitialValuesType;
  updateNewDealDetais: (dealDetails: Partial<NewDealType>) => void;
  dataLoaded: boolean;
  resetData: () => void;
}

const LOCAL_STORAGE_KEY = 'multi-step-newDealData';

export const AddDealContext = createContext<AddDealContextType | null>(null);

export const AddDealContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [newDealData, setNewDealData] = useState<NewDealInitialValuesType>(defaultDeal)

  const updateNewDealDetais = (dealDetails: Partial<NewDealType>) => {
    setNewDealData(prev => ({ ...prev, ...dealDetails }))
  }

  const [dataLoaded, setDataLoaded] = useState(false);

  const resetData = () => {
    setNewDealData(defaultDeal);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultDeal));
  }

  const writeToLocalStorage = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDealData));
  }, [newDealData])

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, [])

  useEffect(() => {
    if (dataLoaded) {
      writeToLocalStorage();
    }
  }, [newDealData, dataLoaded, writeToLocalStorage])

  const readFromLocalStorage = () => {
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!dataString) {
      return setNewDealData(defaultDeal);
    }
    const validated = newDealInitialValuesSchema.safeParse(JSON.parse(dataString));
    if (!validated.success) {
      return setNewDealData(defaultDeal);
    }
    setNewDealData(validated.data);
  }

  return <AddDealContext.Provider value={{ newDealData, updateNewDealDetais, dataLoaded, resetData }}>{children}</AddDealContext.Provider>
}

export function useAddDealContext() {
  const context = useContext(AddDealContext);
  if (!context) {
    throw new Error('useAddDealContext must be used within an AddDealContextProvider');
  }
  return context;
}