"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WordReveal, TextLine, useWordReveal } from "@components/WordReveal";
import Slogan from "@components/Slogan";

const title: TextLine[] = [
  [
    { text: "a." },
    { text: "darrell", bold: true },
    { text: "bumika" },
  ],
];

const menus: TextLine[] = [
  [
    { text: "menu" },
  ],
];

const links = [
  { label: "home", href: "#home" },
  { label: "about", href: "#about" },
  { label: "works", href: "#works" },
  { label: "experiences", href: "#experiences" },
];

const Header = () => {
	const titleRef = useWordReveal<HTMLHeadingElement>({ stagger: 0.07 });
	const menuRef = useWordReveal<HTMLSpanElement>({ stagger: 0.07 });

	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const menuFooterRef = useRef<HTMLDivElement>(null);
	const emailRef = useRef<HTMLAnchorElement>(null);

	const close = () => setOpen(false);

	useGSAP(
		() => {
			const words = menuFooterRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
			const email = emailRef.current;
			if (!words?.length || !email) return;

			const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			const distance = reduced ? 0 : 110;

			if (open) {
				gsap.fromTo(
					words,
					{ yPercent: distance, opacity: 0 },
					{
						yPercent: 0,
						opacity: 1,
						duration: reduced ? 0.4 : 0.9,
						delay: 0.25,
						ease: "power4.out",
						stagger: reduced ? 0 : 0.12,
						overwrite: true,
					}
				);

				gsap.fromTo(
					email,
					{ yPercent: distance, opacity: 0 },
					{
						yPercent: 0,
						opacity: 1,
						duration: reduced ? 0.4 : 0.8,
						delay: 0.5,
						ease: "power3.out",
						overwrite: true,
					}
				);
			} else {
				gsap.to([...words, email], {
					yPercent: distance,
					opacity: 0,
					duration: 0.3,
					ease: "power2.in",
					stagger: 0.02,
					overwrite: true,
				});
			}
		},
		{ dependencies: [open] }
	);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		const previousOverflow = document.body.style.overflow;
		const trigger = triggerRef.current;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);
		closeRef.current?.focus();

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
			trigger?.focus();
		};
	}, [open]);

	return (
		<>
			<header className="flex w-full items-center justify-between text-black z-10">
				<h1
					ref={titleRef}
					aria-label="a. darrell bumika"
					className="text-xl font-light tracking-[-0.06em] pe-2 overflow-hidden">
					<WordReveal lines={title} />
				</h1>
				<button
					ref={triggerRef}
					type="button"
					onClick={() => setOpen(true)}
					aria-label="open menu"
					aria-expanded={open}
					aria-controls="site-menu"
					className="cursor-pointer">
					<span
						ref={menuRef}
						aria-label="menu"
						className="block text-xl font-light tracking-[-0.06em] pe-2 overflow-hidden">
						<WordReveal lines={menus} />
					</span>
				</button>
			</header>

			<div
				aria-hidden={!open}
				inert={!open}
				className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
				<div
					onClick={close}
					className={`absolute inset-0 bg-black/75 transition-opacity duration-500 ${
						open ? "opacity-100" : "opacity-0"
					}`}
				/>

				<aside
					id="site-menu"
					role="dialog"
					aria-modal="true"
					aria-label="menu"
					className={`absolute top-0 right-0 flex h-full w-1/2 flex-col justify-between bg-white px-5 py-6 text-black sm:px-8 sm:py-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
						open ? "translate-x-0" : "translate-x-full"
					}`}>
					<div className="flex items-start justify-end">
						<button
							ref={closeRef}
							type="button"
							onClick={close}
							aria-label="close menu"
							className="cursor-pointer text-xl font-light tracking-[-0.06em] pe-2">
							close
						</button>
					</div>

					<nav aria-label="main">
						<ul className="flex flex-col">
							{links.map((link, index) => (
								<li
									key={link.href}
									className={`flex justify-end transition-all duration-500 ease-out ${
										open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
									}`}
									style={{ transitionDelay: open ? `${150 + index * 70}ms` : "0ms" }}>
									<a
										href={link.href}
										onClick={close}
										className="flex items-baseline gap-2 text-3xl font-light leading-[0.8] tracking-[-0.06em] sm:gap-3 sm:text-5xl lg:text-9xl">
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div ref={menuFooterRef} className="flex justify-between items-end">
						<Slogan animateOnMount={false} />
						<a
							ref={emailRef}
							href="mailto:hello@ashilpadarrell.site"
							className="inline-block break-all leading-[0.8] text-sm sm:text-base">
							hello@ashilpadarrell.site
						</a>
					</div>
				</aside>
			</div>
		</>
	);
};

export default Header;
