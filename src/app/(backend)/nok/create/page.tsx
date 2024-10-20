import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

import CreateNokView from "./create-nok-view";

const CreateNokPage = async () => {
	const user = await getSession();
	if (!user) {
		redirect("/login?callbackUrl=/messages/create");
	}

	return <CreateNokView />;
};

export default CreateNokPage;
