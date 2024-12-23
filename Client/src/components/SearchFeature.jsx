import React, { useState, useEffect } from 'react';

function SearchFeature({data}) {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    console.log("data",data)
    useEffect(() => {
        const filtered = data.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [query]);
    // const filtered = Object.keys(data).filter((key) =>
    //     key.toLowerCase().includes(query.toLowerCase())
    //   );
    //   onSearch(filtered);
    // }, [query, data, onSearch]);

    return (
        <div className='p-4'>
            <input type="text" placeholder="Search..." value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-1 border border-gray-300 rounded mb-2"
            />
                {
                    filteredItems.length > 0 ? filteredItems.map((item, index) => (<div key={index}>{item}</div>)) :
                                    (<p className="text-gray-500">No results found</p>)
                }
        </div>
    );
}

export default SearchFeature;