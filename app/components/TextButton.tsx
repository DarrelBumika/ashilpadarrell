import Link from "next/link";
import type { ReactNode } from "react";

type BaseProps = {
	children: ReactNode;
	className?: string;
	"aria-label"?: string;
};

type TextButtonLinkProps = BaseProps & {
	href: string;
	external?: boolean;
	onClick?: () => void;
};

type TextButtonActionProps = BaseProps & {
	href?: undefined;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
};

type TextButtonProps = TextButtonLinkProps | TextButtonActionProps;

const base =
	"group relative inline-flex w-fit cursor-pointer select-none items-center gap-[0.25em] text-current leading-none tracking-[-0.03em] transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none";

const underline =
	"pointer-events-none absolute inset-x-0 -bottom-[0.15em] h-px origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none";

const arrow =
	"inline-block transition-transform duration-300 ease-out group-hover:translate-x-[0.1em] group-hover:-translate-y-[0.1em] motion-reduce:transition-none";

const TextButton = (props: TextButtonProps) => {
	const { children, className } = props;
	const classes = className ? `${base} ${className}` : base;

	const label = (
		<span className="relative inline-block">
			{children}
			<span aria-hidden="true" className={underline} />
		</span>
	);

	if (props.href !== undefined) {
		const { href, external, onClick, "aria-label": ariaLabel } = props;
		const isExternal = external ?? /^https?:\/\//i.test(href);

		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					onClick={onClick}
					aria-label={ariaLabel}
					className={classes}>
					{label}
					<span aria-hidden="true" className={arrow}>
						↗
					</span>
					<span className="sr-only"> (opens in a new tab)</span>
				</a>
			);
		}

		return (
			<Link href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
				{label}
			</Link>
		);
	}

	const { onClick, type = "button", disabled, "aria-label": ariaLabel } = props;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			className={classes}>
			{label}
		</button>
	);
};

export default TextButton;
