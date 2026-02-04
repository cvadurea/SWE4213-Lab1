import React, { useState, useEffect, useMemo } from 'react';
import ItemCard from './ItemCard';
import CreateListingModal from './CreateListingModal'; // Import your component

const Listings = ({ onSelectItem, myListings }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const endpoint = myListings
                ? 'http://localhost:3000/products/mylistings'
                : 'http://localhost:3000/products';

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const data = await response.json();
            const finalData = myListings ? data : data.sort(() => Math.random() - 0.5);
            setProducts(finalData);
        } catch (err) {
            // Do nothing 
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Failed to delete product');
                
                fetchProducts(); // Refresh the list
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete listing');
            }
        }
    };

    const displayedProducts = useMemo(() => {
        if (!products || !products.length) return products;

        const arr = [...products];

        switch (sortOption) {
            case 'price-asc':
                return arr.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
            case 'price-desc':
                return arr.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
            case 'date-asc':
                return arr.sort((a, b) => {
                    const ta = a.created_at ? new Date(a.created_at).getTime() : (a.id || 0);
                    const tb = b.created_at ? new Date(b.created_at).getTime() : (b.id || 0);
                    return ta - tb;
                });
            case 'date-desc':
                return arr.sort((a, b) => {
                    const ta = a.created_at ? new Date(a.created_at).getTime() : (a.id || 0);
                    const tb = b.created_at ? new Date(b.created_at).getTime() : (b.id || 0);
                    return tb - ta;
                });
            default:
                return arr;
        }
    }, [products, sortOption]);

    useEffect(() => {
        fetchProducts();
    }, [myListings]);

    if (loading) return <div className="text-slate-400 text-center py-20 italic">Loading...</div>;

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">
                    {myListings ? "My Listings" : "Browse Listings"}
                </h1>

                <div className="flex items-center space-x-3">
                    <p className="text-sm text-slate-400">Sort by:</p>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-slate-800 text-white py-2 px-3 rounded-lg text-sm"
                    >
                        <option value="">Default</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="date-asc">Date: Oldest → Newest</option>
                        <option value="date-desc">Date: Newest → Oldest</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                {displayedProducts.map((product) => (
                    <ItemCard
                        key={product.id}
                        productId={product.id}
                        image={product.image_url || `https://picsum.photos/seed/${product.id}/400/400`}
                        title={product.title}
                        price={product.price}
                        onView={() => onSelectItem(product)}
                        onDelete={myListings ? handleDeleteProduct : undefined}
                    />
                ))}

                {myListings && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-4 hover:border-blue-500 hover:bg-slate-800/50 transition-all group min-h-[250px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                            <span className="text-2xl text-slate-400 group-hover:text-white">+</span>
                        </div>
                        <span className="text-slate-400 font-medium group-hover:text-white">Create Listing</span>
                    </button>
                )}
            </div>

            <CreateListingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchProducts} // Re-fetches the list after a successful post
            />
        </>
    );
};

export default Listings;