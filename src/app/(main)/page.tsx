import { headers as getHeaders } from "next/headers";

import { SignoutButton } from "@/components/global/signout-button";
import { auth } from "@/lib/auth";

export default async function HomePage() {
	const session = await auth.api.getSession({ headers: await getHeaders() });

	return (
		<div>
			{!session ? (
				"Not signed in"
			) : (
				<div className="overflow-clip text-sm">
					{JSON.stringify(session, null, 2)}
					<SignoutButton />
				</div>
			)}
		</div>
	);
}
