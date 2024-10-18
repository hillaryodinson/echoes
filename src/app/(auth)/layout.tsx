import { JSX, SVGProps } from "react";

export default function Component({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex">
			<div className="hidden md:w-1/2 bg-black text-white p-12 md:flex flex-col justify-between">
				<div>
					<FlagIcon className="text-white h-6 w-6" />
					<h1 className="text-4xl font-bold mt-2">Acme Inc</h1>
				</div>
				<div>
					<p className="text-lg italic">
						&quot;This library has saved me countless hours of work and helped
						me deliver stunning designs to my clients faster than ever
						before.&quot;
					</p>
					<p className="text-lg font-semibold mt-4">Sofia Davis</p>
				</div>
			</div>
			<div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
				{children}
			</div>
		</div>
	);
}
function FlagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
			<line x1="4" x2="4" y1="22" y2="15" />
		</svg>
	);
}
