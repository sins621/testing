import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FormSchemaType } from './zod'

interface FormStore {
  formData: FormSchemaType
  updateFormData: (field: keyof FormSchemaType, value: string) => void
  resetFormData: () => void
}

const initialFormData: FormSchemaType = {
  name: '',
  age: '',
  email: ''
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      updateFormData: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value
          }
        })),
      resetFormData: () =>
        set(() => ({
          formData: initialFormData
        }))
    }),
    {
      name: 'form-storage',
      partialize: (state) => ({ formData: state.formData }),
    }
  )
) 