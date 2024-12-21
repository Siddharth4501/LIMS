import React, { useState, useEffect } from 'react';

function SearchFeature() {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    const items = ['apple', 'banana', 'orange',
        'grape', 'watermelon'];

    useEffect(() => {
        const filtered = items.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [query]);

    return (
        <div className='p-4'>
            <input type="text" placeholder="Search..." value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1 border border-gray-300 rounded mb-2"
            />
            <ul>
                {
                    filteredItems.length > 0 ? filteredItems.map((item, index) => (<li key={index}>{item}</li>)) :
                                    (<p className="text-gray-500">No results found</p>)
                }
            </ul>
        </div>
    );
}

export default SearchFeature;