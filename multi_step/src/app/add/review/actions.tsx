'use server';

import { NewDealType, stepOneSchema, stepThreeSchema, stepTwoSchema } from "@/schemas";
import { AddDealRoutes } from "@/types";

export type SubmitDealActionReturnType = {
  redirect?: AddDealRoutes,
  errorMsg?: string,
  success?: boolean
}

export const submitDealAction = async (deal: NewDealType): Promise<SubmitDealActionReturnType> => {
  const stepOneValidated = stepOneSchema.safeParse(deal);
  if (!stepOneValidated.success) { return { redirect: AddDealRoutes.PRODUCT_INFO, errorMsg: "Please Validate Product Info" } }

  const stepTwoValidated = stepTwoSchema.safeParse(deal);
  if (!stepTwoValidated.success) { return { redirect: AddDealRoutes.COUPON_DETAILS, errorMsg: "Please Validate Coupon Details" } }

  const stepThreeValidated = stepThreeSchema.safeParse(deal);
  if (!stepThreeValidated.success) { return { redirect: AddDealRoutes.CONTACT_INFO, errorMsg: "Please Validate Contact Info" } }

  return {success: true, redirect: AddDealRoutes.PRODUCT_INFO}
};
