import React from 'react';

const ItemCard = ({ image, title, price, onView, onDelete, productId }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col h-full relative">

            {/* --- Delete Button --- */}
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(productId);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center z-10 transition-colors"
                >
                    ×
                </button>
            )}

            {/* --- Product Image Section --- */}
            <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                <img
                    src={image || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* --- Product Details Section --- */}
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-white font-medium text-base truncate mb-1">
                    {title}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-lg font-bold text-white">
                        ${price}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(); // Triggers the modal in App.jsx
                        }}
                        className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded transition-colors border border-slate-600 active:scale-95"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;