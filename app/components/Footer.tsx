"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextButton from "@components/TextButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
	{ label: "home", href: "#home" },
	{ label: "about", href: "#about" },
	{ label: "works", href: "#works" },
	{ label: "experiences", href: "#experiences" },
];

const nameLines = [
	[{ text: "a." }, { text: "darrel", bold: true }],
	[{ text: "bumika" }],
];

const Footer = ({ year }: { year: number }) => {
	const footerRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const footer = footerRef.current;
			if (!footer) return;

			const copy = footer.querySelector<HTMLElement>("[data-footer-copy]");
			const links = footer.querySelectorAll<HTMLElement>("[data-footer-link]");
			const words = footer.querySelectorAll<HTMLElement>("[data-footer-word]");
			if (!copy || !links.length || !words.length) return;

			const motion = gsap.matchMedia();

			motion.add("(prefers-reduced-motion: no-preference)", () => {
				const items = [...links, ...words];

				gsap.set(items, { yPercent: 120, opacity: 0 });

				gsap.fromTo(
					copy,
					{ yPercent: 120, opacity: 0 },
					{
						yPercent: 0,
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: footer,
							start: "top bottom",
							end: "top 35%",
							scrub: true,
						},
					}
				);

				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: footer,
						start: "top 85%",
						once: true,
					},
				});

				timeline
					.to(links, {
						yPercent: 0,
						opacity: 1,
						duration: 0.9,
						ease: "power4.out",
						stagger: 0.06,
					})
					.to(
						words,
						{
							yPercent: 0,
							opacity: 1,
							duration: 1,
							ease: "power4.out",
							stagger: 0.1,
						},
						"-=0.55"
					);
			});

			motion.add("(prefers-reduced-motion: reduce)", () => {
				gsap.from([...links, ...words], {
					opacity: 0,
					duration: 0.4,
					stagger: 0.02,
					scrollTrigger: {
						trigger: footer,
						start: "top 85%",
						once: true,
					},
				});
			});

			return () => motion.revert();
		},
		{ scope: footerRef }
	);

	return (
		<footer
			id="site-footer"
			ref={footerRef}
			className="relative z-20 flex flex-col justify-between min-h-dvh w-full overflow-hidden bg-black px-8 py-8 text-sm text-white"
		>
			<div className="w-full flex justify-end gap-32">
				<div aria-label="social" className="flex flex-col items-end gap-4 text-end text-4xl">
					<span data-footer-link className="inline-flex will-change-transform">
						<TextButton href="https://www.linkedin.com/in/ashilpadarrel/" external>
							LinkedIn
						</TextButton>
					</span>
					<span data-footer-link className="inline-flex will-change-transform">
						<TextButton href="https://github.com/DarrelBumika" external>
							GitHub
						</TextButton>
					</span>
					<span data-footer-link className="inline-flex will-change-transform">
						<TextButton href="https://www.fiverr.com/ashilpadarrel" external>
							Fiverr
						</TextButton>
					</span>
				</div>
				<div aria-label="main" className="flex flex-col items-end gap-4 text-end text-4xl">
					{navLinks.map((link) => (
						<span key={link.href} data-footer-link className="inline-flex will-change-transform">
							<TextButton href={link.href}>{link.label}</TextButton>
						</span>
					))}
				</div>
			</div>

			<div className="w-full flex flex-col items-end gap-4 text-4xl">
				<span data-footer-link className="inline-flex will-change-transform">
					<TextButton href="mailto:hello@ashilpadarrell.site">
						hello@ashilpadarrell.site
					</TextButton>
				</span>
				<span data-footer-link className="inline-flex will-change-transform">
					<TextButton href="tel:+2347036461555">
						&#40;+62&#41; 897-5939-968
					</TextButton>
				</span>
			</div>

			<div className="w-full flex justify-between items-end">
				<h3
					aria-label="a. darrel bumika"
					className="text-[16rem] leading-[0.8] tracking-[-0.06em] font-light"
				>
					{nameLines.map((line, lineIndex) => (
						<span key={lineIndex} className="block">
							{line.map((word, wordIndex) => (
								<span
									key={wordIndex}
									data-footer-word
									className={`inline-block will-change-transform ${
										word.bold ? "font-bold" : ""
									}`}
								>
									{word.text}
									{wordIndex < line.length - 1 ? "\u00A0" : ""}
								</span>
							))}
						</span>
					))}
				</h3>
				<p data-footer-copy className="text-sm text-white/50">
					&copy; {year} ashilpa darrel bumika. all rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
