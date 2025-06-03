"use client";
import { useState, useEffect } from "react";
import { categorizedBooks } from "@/app/data/books";
import { BookItem } from "@/app/components/BookItem";
import { ModalReset } from "@/app/components/ModalReset";
import Footer from "@/app/components/Footer";

export default function Home() {
	const [bookStates, setBookStates] = useState<
		Record<string, { owned: boolean; read: boolean }>
	>({});
	const [isGlobalResetModalOpen, setIsGlobalResetModalOpen] = useState(false);

	// Initialize all books as not owned and not read
	useEffect(() => {
		const initialStates: Record<string, { owned: boolean; read: boolean }> = {};
		categorizedBooks.forEach((category) => {
			category.books.forEach((book) => {
				initialStates[book.id] = { owned: false, read: false };
			});
		});
		setBookStates(initialStates);
	}, []);

	const handleOwnedChange = (id: string, owned: boolean) => {
		setBookStates((prev) => ({
			...prev,
			[id]: { ...prev[id], owned },
		}));
	};

	const handleReadChange = (id: string, read: boolean) => {
		setBookStates((prev) => ({
			...prev,
			[id]: { ...prev[id], read },
		}));
	};

	const resetAllProgress = () => {
		const resetStates: Record<string, { owned: boolean; read: boolean }> = {};
		categorizedBooks.forEach((category) => {
			category.books.forEach((book) => {
				resetStates[book.id] = { owned: false, read: false };
				localStorage.removeItem(`book_${book.id}_owned`);
				localStorage.removeItem(`book_${book.id}_read`);
			});
		});
		setBookStates(resetStates);
	};

	const getOverallStats = () => {
		let totalBooks = 0;
		let ownedBooks = 0;
		let readBooks = 0;

		categorizedBooks.forEach((category) => {
			category.books.forEach((book) => {
				totalBooks++;
				if (bookStates[book.id]?.owned) ownedBooks++;
				if (bookStates[book.id]?.read) readBooks++;
			});
		});

		return { totalBooks, ownedBooks, readBooks };
	};

	const stats = getOverallStats();

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-950 via-stone-900 to-neutral-900">
			<div className="max-w-7xl mx-auto p-4 space-y-6">
				{/* Header */}
				<div className="text-center space-y-4 py-8">
					<h1 className="text-4xl md:text-6xl font-bold">
						<span className="mr-2">🧟</span>
						<span className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
							Project Zombooks
						</span>
					</h1>
					<p className="text-neutral-400 text-lg">
						Survive. Learn. Master the apocalypse.
					</p>

					{/* Overall progress stats */}
					<div className="flex justify-center gap-8 mt-8">
						<div className="text-center">
							<div className="text-3xl font-bold text-green-400">
								{stats.readBooks}
							</div>
							<div className="text-sm text-neutral-500">Skills Mastered</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-yellow-400">
								{stats.ownedBooks}
							</div>
							<div className="text-sm text-neutral-500">Books Found</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-neutral-400">
								{stats.totalBooks}
							</div>
							<div className="text-sm text-neutral-500">Total Books</div>
						</div>
					</div>
				</div>

				{/* Categories Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{categorizedBooks.map((category) => (
						<BookItem
							key={category.category}
							category={category.category}
							books={category.books}
							bookStates={bookStates}
							onOwnedChange={handleOwnedChange}
							onReadChange={handleReadChange}
						/>
					))}
				</div>

				{/* Reset All Progress Button */}
				<div className="text-center pt-8">
					<button
						onClick={() => setIsGlobalResetModalOpen(true)}
						className="relative group px-6 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 hover:border-red-400/60 text-red-300 hover:text-red-200 font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
					>
						{/* Glow effect */}
						<div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300 -z-10" />

						{/* Button content */}
						<div className="relative flex items-center gap-2">
							<span className="text-lg">🔄</span>
							<span>Reset All Progress</span>
						</div>
					</button>
				</div>

				<Footer />
			</div>

			{/* Global Reset Modal */}
			<ModalReset
				isOpen={isGlobalResetModalOpen}
				onClose={() => setIsGlobalResetModalOpen(false)}
				onConfirm={resetAllProgress}
			/>
		</div>
	);
}
