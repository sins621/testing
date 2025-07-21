'use client';

import Input from "@/components/Input";
import Submit from "@/components/Submit";
import { stepTwoFormAction } from "./actions";
import { FormErrors } from "@/types";
import { useFormState } from "react-dom";

const initialState: FormErrors = {}

export default function StepTwoForm() {
  const [serverErrors, formAction] = useFormState(stepTwoFormAction, initialState)

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
        <Input label="Coupon Code" id="coupon" type="text" required minLength={5} errorMsg={serverErrors?.Coupon}/>
        <Input label="Discount (%)" id="discount" type="number" required min={0} max={100} errorMsg={serverErrors?.Discount}/>
        <Submit text="Submit" />
      </div>
    </form>
  );
}
