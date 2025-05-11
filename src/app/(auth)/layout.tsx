export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-dvh flex-col items-center justify-center">
			<main className="container max-w-xl grow p-4">{children}</main>
		</div>
	);
}
