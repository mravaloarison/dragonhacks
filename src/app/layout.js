import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Link Owner",
	description:
		"Take ownership of a project and leverage verbwire api to get the link metadata.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main>{children}</main>
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
