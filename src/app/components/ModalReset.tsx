"use client";
import { useState, useEffect } from "react";

interface ModalResetProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	category?: string;
}

export function ModalReset({
	isOpen,
	onClose,
	onConfirm,
	category,
}: ModalResetProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		} else {
			const timer = setTimeout(() => setIsVisible(false), 200);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50">
			{/* Backdrop */}
			<div
				className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
				onClick={handleBackdropClick}
			/>

			{/* Modal Container */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div
					className={`relative bg-neutral-900 border border-neutral-700/50 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 ${
						isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
					}`}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					{/* Glow effect */}
					<div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl blur opacity-20" />

					{/* Header */}
					<div className="relative p-6 pb-0">
						<div className="flex items-center gap-3 mb-2">
							<div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
								<span className="text-red-400 text-lg">⚠️</span>
							</div>
							<h2 id="modal-title" className="text-lg font-semibold text-white">
								Reset Progress
							</h2>
						</div>
					</div>

					{/* Content */}
					<div className="relative p-6 pt-2">
						<p
							id="modal-description"
							className="text-neutral-300 text-sm leading-relaxed mb-1"
						>
							{category
								? `Are you sure you want to reset all progress for the ${category} category?`
								: "Are you sure you want to reset all progress?"}
						</p>
						<p className="text-neutral-400 text-xs">
							This action will mark all books as unowned and unread. This cannot
							be undone.
						</p>
					</div>

					{/* Actions */}
					<div className="relative flex gap-3 p-6 pt-0">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-600 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-sm font-medium transition-all duration-200 hover:scale-105"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
						>
							Reset All
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
