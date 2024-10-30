"use client";
import React from "react";
import { redirect, useSearchParams } from "next/navigation";
import { setupStages } from "@/types";
import { getKey } from "@/lib/utils";
import PhoneOnboardingPage from "./phone-onboarding-form";

const GettingStartedComponent = () => {
	const search = useSearchParams();
	const stageName = search.get("stage");

	if (!stageName) {
		redirect("/dashboard");
	}
	const stage = Number(getKey(setupStages, stageName as string));

	if (stage === 1) {
		return <PhoneOnboardingPage currentStage={stage} />;
	}
};

export default GettingStartedComponent;
