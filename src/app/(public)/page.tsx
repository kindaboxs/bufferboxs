import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function HomePage() {
	const session = await auth.api.getSession({ headers: await getHeaders() });

	if (!session) redirect("/get-out");

	return redirect("/dashboard");
}
