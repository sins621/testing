'use client';

import Input from "@/components/Input";
import Submit from "@/components/Submit";
import { FormErrors } from "@/types";
import { useFormState } from "react-dom";
import { stepOneFormAction } from "./actions";

const initialState: FormErrors = {}

export default function StepOneForm() {
  const [serverErrors, formAction] = useFormState(stepOneFormAction, initialState)


  return (
    <form className="flex flex-1 flex-col items-center" action={formAction}>
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
        <Input label="Name" id="name" type="text" required minLength={1} errorMsg={serverErrors?.name}/>
        <Input label="Link" id="link" type="text" required errorMsg={serverErrors?.link} description="Must start with http:// or https://" pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"/>
        <Submit text="Submit" />
      </div>
    </form>
  );
}
