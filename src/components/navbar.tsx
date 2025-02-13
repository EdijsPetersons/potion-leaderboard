"use client";

import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const MenuLinks = [
	{ name: "Leaderboards", href: "/" },
	{ name: "Learn", href: "learn" },
	{ name: "Prizes", href: "prizes" },
];

function Navbar() {
	const [open, setOpen] = React.useState(false);

	return (
		<nav className="flex flex-wrap items-center justify-center w-full bg-background backdrop-filter backdrop-blur-lg h-24">
			<div className="flex items-center w-full h-full bg-background px-6">
				<div className="flex items-center pr-16">
					<Link href="/" className="flex items-center">
						<Image
							src="/potion-logo.avif"
							alt="Potion leaderboard logo"
							width={56}
							height={56}
							className="w-12 h-12 mr-4"
						/>
						<p className="hidden text-lg leading-none uppercase md:block">
							<span className="block text-3xl font-black">Potion</span>
							<span className="text-fuchsia-600 font-bold">Leaderboard</span>
						</p>
					</Link>
				</div>
				<button
					type="button"
					onClick={() => setOpen(!open)}
					className="absolute w-8 h-8 cursor-pointer right-8 top-8 md:top-6 lg:hidden"
				>
					<span className="sr-only">Open main menu</span>
					<Menu className="w-8 h-8" />
				</button>
				<div className={`items-center flex-2 w-full lg:flex lg:w-auto`}>
					<ul
						className={`flex flex-col lg:flex-row gap-6 font-bold lg:items-center lg:pb-0 pb-12 absolute lg:static -z-10 lg:z-auto bg-background left-0 w-full lg:w-auto lg:pl-0 lg:gap-10 pl-8 transition-all duration-200 ease-in ${
							open ? "top-24 pt-8" : "-top-64"
						}`}
					>
						{MenuLinks.map((link) => (
							<li
								className="block w-full text-md font-bold hover:text-blue-600 lg:w-fit lg:inline-block"
								key={link.name}
							>
								<Link href={link.href} onClick={() => setOpen(false)}>
									{link.name}
								</Link>
							</li>
						))}
						<li>
							<a
								href="https://x.com/potionalpha"
								target="_blank"
								className="flex gap-2 lg:hidden"
							>
								<Image src="/x.svg" alt="Discord" width={16} height={16} />
								@potionalpha
							</a>
						</li>
						<li>
							<a
								href="https://dicord.com"
								target="_blank"
								className="flex gap-2 lg:hidden"
							>
								<Image
									src="/discord.svg"
									alt="Discord"
									width={24}
									height={24}
								/>
								Join discord channel
							</a>
						</li>
					</ul>
				</div>
				<div className="flex justify-end flex-1 gap-12">
					<div className="items-center gap-4 hidden lg:flex">
						<Button asChild variant="ghost" size='icon'>
							<a href="https://x.com/potionalpha" target="_blank">
								<Image src="/x.svg" alt="Discord" width={16} height={16} />
							</a>
						</Button>
						<Button asChild variant="ghost" size='icon'>
							<a href="https://dicord.com" target="_blank">
								<Image
									src="/discord.svg"
									alt="Discord"
									width={20}
									height={20}
								/>
							</a>
						</Button>
					</div>
					<Avatar className="h-12 w-12 rounded-full hidden lg:inline-flex">
						<AvatarImage src="/avatar.png" alt="user avatar" />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
