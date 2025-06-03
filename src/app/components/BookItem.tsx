'use client';
import { useState, useEffect } from 'react';
import { Book } from '@/app/types/book';

// Category icons mapping
const categoryIcons = {
  'Carpentry': '🔨',
  'Cooking': '🍳',
  'Electricity': '⚡',
  'Farming': '🌱',
  'First Aid': '🏥',
  'Fishing': '🎣',
  'Foraging': '🍄',
  'Mechanics': '🔧',
  'Metalworking': '⚒️',
  'Tailoring': '🧵',
  'Trapping': '🪤'
};

// Category color themes
const categoryColors = {
  'Carpentry': 'from-amber-900 to-yellow-800',
  'Cooking': 'from-orange-900 to-red-800',
  'Electricity': 'from-blue-900 to-cyan-800',
  'Farming': 'from-green-900 to-emerald-800',
  'First Aid': 'from-red-900 to-pink-800',
  'Fishing': 'from-teal-900 to-blue-800',
  'Foraging': 'from-lime-900 to-green-800',
  'Mechanics': 'from-gray-900 to-slate-800',
  'Metalworking': 'from-zinc-900 to-gray-800',
  'Tailoring': 'from-purple-900 to-indigo-800',
  'Trapping': 'from-stone-900 to-neutral-800'
};

interface BookItemProps {
  category: string;
  books: Book[];
  bookStates: Record<string, { owned: boolean; read: boolean }>;
  onOwnedChange: (id: string, owned: boolean) => void;
  onReadChange: (id: string, read: boolean) => void;
}

export function BookItem({ category, books, bookStates, onOwnedChange, onReadChange }: BookItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Load states from localStorage on client
  useEffect(() => {
    books.forEach(book => {
      const ownedValue = localStorage.getItem(`book_${book.id}_owned`) === 'true';
      const readValue = localStorage.getItem(`book_${book.id}_read`) === 'true';
      
      if (ownedValue !== bookStates[book.id]?.owned) {
        onOwnedChange(book.id, ownedValue);
      }
      if (readValue !== bookStates[book.id]?.read) {
        onReadChange(book.id, readValue);
      }
    });
  }, [books, bookStates, onOwnedChange, onReadChange]);
  
  const ownedCount = books.filter(book => bookStates[book.id]?.owned).length;
  const readCount = books.filter(book => bookStates[book.id]?.read).length;
  const completionPercentage = (readCount / books.length) * 100;
  
  const categoryColor = categoryColors[category as keyof typeof categoryColors] || 'from-gray-900 to-slate-800';
  const icon = categoryIcons[category as keyof typeof categoryIcons] || '📚';

  const handleBookToggle = (bookId: string, type: 'owned' | 'read', value: boolean) => {
    if (type === 'owned') {
      onOwnedChange(bookId, value);
      localStorage.setItem(`book_${bookId}_owned`, value.toString());
      
      if (!value && bookStates[bookId]?.read) {
        onReadChange(bookId, false);
        localStorage.setItem(`book_${bookId}_read`, 'false');
      }
    } else {
      onReadChange(bookId, value);
      localStorage.setItem(`book_${bookId}_read`, value.toString());
      
      if (value && !bookStates[bookId]?.owned) {
        onOwnedChange(bookId, true);
        localStorage.setItem(`book_${bookId}_owned`, 'true');
      }
    }
  };

  return (
    <div className="group">
      {/* Category Header Card */}
      <div 
        className={`relative bg-gradient-to-r ${categoryColor} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 border border-neutral-700/50 shadow-2xl`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Glow effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColor} rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300 -z-10`}></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{icon}</div>
            <div>
              <h3 className="text-lg font-bold text-white">{category}</h3>
              <div className="text-xs text-neutral-300">
                {readCount}/{books.length} mastered • {ownedCount}/{books.length} collected
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Progress ring */}
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full border-2 border-neutral-600"></div>
              <div 
                className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-green-400 transform -rotate-90 transition-all duration-500"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((completionPercentage * 360 / 100 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((completionPercentage * 360 / 100 - 90) * Math.PI / 180)}%, 50% 50%)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{Math.round(completionPercentage)}%</span>
              </div>
            </div>
            
            {/* Expand arrow */}
            <div className={`text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Books Grid */}
      {isExpanded && (
        <div className="mt-4 bg-neutral-900/80 backdrop-blur-sm rounded-xl p-4 border border-neutral-700/30 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {books.map((book) => {
              const bookState = bookStates[book.id] || { owned: false, read: false };
              
              return (
                <div key={book.id} className="relative group/book">
                  <div className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                    bookState.read 
                      ? 'bg-green-900/50 border-green-500/50' 
                      : bookState.owned 
                        ? 'bg-yellow-900/50 border-yellow-500/50'
                        : 'bg-neutral-800/50 border-neutral-600/50 hover:border-neutral-500/50'
                  }`}>
                    
                    {/* Book status indicator */}
                    <div className="absolute top-1 right-1 text-lg">
                      {bookState.read ? '🧠' : bookState.owned ? '📖' : '❓'}
                    </div>
                    
                    {/* Book title */}
                    <div className="text-sm font-medium text-white mb-3 pr-6">
                      {book.title}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookToggle(book.id, 'owned', !bookState.owned);
                        }}
                        className={`w-full px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                          bookState.owned
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'
                        }`}
                      >
                        {bookState.owned ? '✓ Owned' : 'Not Found'}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookToggle(book.id, 'read', !bookState.read);
                        }}
                        disabled={!bookState.owned}
                        className={`w-full px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                          bookState.read
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : bookState.owned
                              ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'
                              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        {bookState.read ? '✓ Mastered' : 'Unread'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}