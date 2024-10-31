"use client";
import React from "react";
import { redirect, useSearchParams } from "next/navigation";
import { setupStages } from "@/types";
import { getKey } from "@/lib/utils";
import PhoneOnboardingPage from "./phone-onboarding-form";
import PhoneVerificationForm from "./phone-verification-form";
import NokOnboardingForm from "./nok-onboarding-form";

const GettingStartedComponent = () => {
	const search = useSearchParams();
	const stageName = search.get("stage");

	if (!stageName) {
		redirect("/dashboard");
	}
	const stage = Number(getKey(setupStages, stageName as string));

	if (stage === 1) {
		return <PhoneOnboardingPage currentStage={stage} />;
	} else if (stage === 2) {
		return <PhoneVerificationForm currentStage={stage} />;
	} else if (stage === 3) {
		return <NokOnboardingForm currentStage={stage} />;
	}
};

export default GettingStartedComponent;
