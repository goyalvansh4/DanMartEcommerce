// src/components/Categories.jsx
import React from 'react';

const Categories = () => {
  const categories = [
    { title: 'Categories', items: [] },
    {
      title: 'Telescope',
      items: [],
    },
    {
      title: 'Compass with Leather Case',
      items: [],
    },
    {
      title: 'Antique Compass with Wooden Box', 
      items: [],
    },
  ];

  return (
    <nav className="bg-white shadow-lg shadow-slate-500 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto">
      <ul>
        <li>
          <a
            href="javascript:void(0)"
            className="text-black text-xl font-bold hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
          >
            {categories[0].title}
          </a>
        </li>
      </ul>

      {categories.slice(1).map((category, index) => (
        <div className="mt-4" key={index}>
          <h6 className="text-gray-600 text-lg font-light px-4">{category.title}</h6>
          <ul className="mt-2">
            {category.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <a
                  href="javascript:void(0)"
                  className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Categories;
