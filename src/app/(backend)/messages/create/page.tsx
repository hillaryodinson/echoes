import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import CreateMessageView from "./create-message-view";

const CreateMessagePage = async () => {
	const user = await getSession();
	if (!user) {
		redirect("/login?callbackUrl=/messages/create");
	}

	return <CreateMessageView />;
};

export default CreateMessagePage;
