'use client';

import Submit from "@/components/Submit";
import { useAddDealContext } from "@/contexts/addDealContext";
import { submitDealAction } from "./actions";
import { NewDealType } from "@/schemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ReviewForm() {
  const { newDealData, resetData } = useAddDealContext()
  const { name, discount, coupon, link, contactEmail, contactName } = newDealData
  const router = useRouter()

  const handleFormSubmit = async (formData: FormData) => {
    const { success, errorMsg, redirect } = await submitDealAction(newDealData as NewDealType)
    if (errorMsg) toast.error(errorMsg)
    if (success) resetData();
    if (redirect) router.push(redirect)
  }

  return (
    <form action={handleFormSubmit} className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]">
      <p className="text-xl md:text-3xl">Name: {name}</p>
      <p className="font-light text-white/90">
        Link:{' '}
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="font-normal underline hover:text-teal-500"
        >
          {link}
        </a>
      </p>
      <p className="text-white/90">Coupon: {coupon}</p>
      <p className="text-white/90">Discount: {discount}</p>
      <p className="text-white/90">Contact Name: {contactName}</p>
      <p className="text-white/90">Contact Email: {contactEmail}</p>
      <Submit text="Submit" />
    </form>
  );
}
