'use client';
import Input from '@/components/Input';
import Submit from '@/components/Submit';
import { FormErrors } from '@/types';
import { useFormState } from 'react-dom';
import { stepThreeFormAction } from './actions';

const initialState: FormErrors = {};

export default function StepThreeForm() {
  const [serverErrors, formAction] = useFormState(
    stepThreeFormAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
        <Input
          label="Contact Name"
          id="contactName"
          
          type="text"
          errorMsg={serverErrors?.contactName}
        />
        <Input
          label="Contact Email"
          id="contactEmail"
          
          type="email"
          errorMsg={serverErrors?.contactEmail}
        />

        <Submit text="Continue" />
      </div>
    </form>
  );
}