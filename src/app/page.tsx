'use client';
import { useState, useEffect } from 'react';
import { categorizedBooks } from '@/app/data/books';
import { BookItem } from '@/app/components/BookItem';

export default function Home() {
  const [bookStates, setBookStates] = useState<Record<string, { owned: boolean; read: boolean }>>({});

  // Initialize all books as not owned and not read
  useEffect(() => {
    const initialStates: Record<string, { owned: boolean; read: boolean }> = {};
    categorizedBooks.forEach(category => {
      category.books.forEach(book => {
        initialStates[book.id] = { owned: false, read: false };
      });
    });
    setBookStates(initialStates);
  }, []);

  const handleOwnedChange = (id: string, owned: boolean) => {
    setBookStates(prev => ({
      ...prev,
      [id]: { ...prev[id], owned }
    }));
  };

  const handleReadChange = (id: string, read: boolean) => {
    setBookStates(prev => ({
      ...prev,
      [id]: { ...prev[id], read }
    }));
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const resetStates: Record<string, { owned: boolean; read: boolean }> = {};
      categorizedBooks.forEach(category => {
        category.books.forEach(book => {
          resetStates[book.id] = { owned: false, read: false };
          localStorage.removeItem(`book_${book.id}_owned`);
          localStorage.removeItem(`book_${book.id}_read`);
        });
      });
      setBookStates(resetStates);
    }
  };

  const getOverallStats = () => {
    let totalBooks = 0;
    let ownedBooks = 0;
    let readBooks = 0;

    categorizedBooks.forEach(category => {
      category.books.forEach(book => {
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            🧟 Zombooks
          </h1>
          <p className="text-neutral-400 text-lg">Survive. Learn. Master the apocalypse.</p>
          
          {/* Overall progress stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{stats.readBooks}</div>
              <div className="text-sm text-neutral-500">Skills Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{stats.ownedBooks}</div>
              <div className="text-sm text-neutral-500">Books Found</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-400">{stats.totalBooks}</div>
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

        {/* Reset button */}
        <div className="text-center pt-8">
          <button
            onClick={resetProgress}
            className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-red-600/50"
          >
            🔄 Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}