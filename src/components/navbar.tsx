"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer } from "vaul";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
	return (
		<header className="fixed top-0 z-10 w-full h-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex w-full h-full items-center justify-between px-4 md:px-8">
				<div className="flex items-center gap-2 md:mr-16">
					<Link href="/" className="flex items-center">
						<Image
							src="/potion-logo.avif"
							alt="Potion leaderboard logo"
							width={56}
							height={56}
							className="w-12 h-12 mr-4"
						/>
						<p className="text-lg leading-none uppercase">
							<span className="block text-3xl font-black">Potion</span>
							<span className="text-fuchsia-600 font-bold">Leaderboard</span>
						</p>
					</Link>
				</div>

				<nav className="hidden lg:flex items-center justify-center gap-12">
					<Link
						href="/"
						className="text-lg transition-colors text-md font-bold hover:text-blue-600"
					>
						Leaderboards
					</Link>
					<Link
						href="/learn"
						className="text-lg transition-colors text-md font-bold hover:text-blue-600"
					>
						Learn
					</Link>
					<Link
						href="/prizes"
						className="text-lg transition-colors text-md font-bold hover:text-blue-600"
					>
						Prizes
					</Link>
				</nav>

				<div className="flex items-center justify-end gap-2 flex-1">
					<div className="hidden lg:flex items-center gap-2">
						<Button variant="ghost" size="icon" asChild>
							<a href="https://x.com/potionalpha" target="_blank">
								<Image src="/x.svg" alt="Discord" width={16} height={16} />
							</a>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<a href="https://dicord.com" target="_blank">
								<Image
									src="/discord.svg"
									alt="Discord"
									width={20}
									height={20}
								/>
							</a>
						</Button>
						<Avatar className="h-12 w-12 rounded-full hidden lg:inline-flex">
							<AvatarImage src="/avatar.png" alt="user avatar" />
							<AvatarFallback className="rounded-lg">CN</AvatarFallback>
						</Avatar>
					</div>
					<Drawer.Root direction="right">
						<Drawer.Trigger asChild>
							<Button variant="ghost" size="icon" className="lg:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</Drawer.Trigger>
						<Drawer.Portal>
							<Drawer.Overlay className="fixed inset-0 bg-white/10" />
							<Drawer.Content className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex">
								<div className="bg-background h-full w-full grow p-8 flex flex-col rounded-[16px]">
									<div className="max-w-full h-full">
										<Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
										<Drawer.Description className="sr-only"></Drawer.Description>
										<nav className="flex flex-col justify-between h-full font-bold text-lg">
											<div className="flex flex-col gap-8">
												<Drawer.Close asChild>
													<Link href="/" className="flex items-center">
														<Image
															src="/potion-logo.avif"
															alt="Potion leaderboard logo"
															width={56}
															height={56}
															className="w-12 h-12 mr-4"
														/>
														<p className="text-lg leading-none uppercase">
															<span className="block text-3xl font-black">
																Potion
															</span>
															<span className="text-fuchsia-600 font-bold">
																Leaderboard
															</span>
														</p>
													</Link>
												</Drawer.Close>
												<Drawer.Close asChild>
													<Link
														href="/"
														className="transition-colors hover:text-primary"
													>
														Leaderboards
													</Link>
												</Drawer.Close>
												<Drawer.Close asChild>
													<Link
														href="/learn"
														className="transition-colors hover:text-primary"
													>
														Learn
													</Link>
												</Drawer.Close>
												<Drawer.Close asChild>
													<Link
														href="/prizes"
														className="transition-colors hover:text-primary"
													>
														Prizes
													</Link>
												</Drawer.Close>
											</div>
											<div className="flex flex-col gap-6">
												<Drawer.Close asChild>
													<a
														href="https://x.com/potionalpha"
														target="_blank"
														className="flex gap-2 lg:hidden text-sm"
													>
														<Image
															src="/x.svg"
															alt="Discord"
															width={16}
															height={16}
														/>
														@potionalpha
													</a>
												</Drawer.Close>
												<Drawer.Close asChild>
													<a
														href="https://dicord.com"
														target="_blank"
														className="flex gap-2 lg:hidden text-sm"
													>
														<Image
															src="/discord.svg"
															alt="Discord"
															width={24}
															height={24}
														/>
														Join discord channel
													</a>
												</Drawer.Close>
											</div>
										</nav>
									</div>
								</div>
							</Drawer.Content>
						</Drawer.Portal>
					</Drawer.Root>
				</div>
			</div>
		</header>
	);
}
