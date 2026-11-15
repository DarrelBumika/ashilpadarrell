"use client";

import { WordReveal, TextLine, useWordReveal } from "./WordReveal";

const lines: TextLine[] = [
  [
		{ text: "a." },
		{ text: "darrell", bold: true },
		{ text: "bumika" },
  ],
];

const Header = () => {
	const headingRef = useWordReveal<HTMLHeadingElement>({ stagger: 0.07 });

	return (
		<header className="flex w-full items-center justify-between text-black">
			<h1
				ref={headingRef} 
				aria-label="a. darrell bumika"
				className="text-[32px] font-light tracking-[-0.06em]">
					<WordReveal lines={lines} />
			</h1>
			<div>
				<a className="text-[32px] font-light tracking-[-0.06] leading-0.8 hover:underline hover:cursor-pointer">menus</a>
			</div>
		</header>
	);
}

export default Header;