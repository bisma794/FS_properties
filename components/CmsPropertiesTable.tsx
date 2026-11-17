'use client';

import { useState } from 'react';

export interface PropertyItem {
  id: string;
  title: string;
  community: string;
  developer: string;
  price: string;
  fsScore: number;
  status: 'Published' | 'Draft' | 'Featured';
  type: string;
  bedrooms: number;
}

const initialProperties: PropertyItem[] = [
  {
    id: 'PROP-101',
    title: 'The Valley - 4 Bed Villa',
    community: 'The Valley',
    developer: 'Emaar Properties',
    price: 'AED 3,250,000',
    fsScore: 9.4,
    status: 'Featured',
    type: 'Villa',
    bedrooms: 4,
  },
  {
    id: 'PROP-102',
    title: 'Dubai Creek Harbour Luxury Townhouse',
    community: 'Creek Harbour',
    developer: 'Emaar Properties',
    price: 'AED 4,800,000',
    fsScore: 9.1,
    status: 'Published',
    type: 'Townhouse',
    bedrooms: 3,
  },
  {
    id: 'PROP-103',
    title: 'Palm Jumeirah Waterfront Haven',
    community: 'Palm Jumeirah',
    developer: 'Nakheel',
    price: 'AED 12,500,000',
    fsScore: 9.7,
    status: 'Published',
    type: 'Villa',
    bedrooms: 5,
  },
  {
    id: 'PROP-104',
    title: 'Dubai Hills Estate Executive Apartment',
    community: 'Dubai Hills',
    developer: 'Emaar Properties',
    price: 'AED 2,100,000',
    fsScore: 8.8,
    status: 'Draft',
    type: 'Apartment',
    bedrooms: 2,
  },
  {
    id: 'PROP-105',
    title: 'Sobha Hartland Sanctuary Mansion',
    community: 'Sobha Hartland',
    developer: 'Sobha Realty',
    price: 'AED 18,900,000',
    fsScore: 9.5,
    status: 'Featured',
    type: 'Mansion',
    bedrooms: 6,
  },
];

interface CmsPropertiesTableProps {
  onOpenAddModal: () => void;
  propertiesList?: PropertyItem[];
  onDeleteProperty?: (id: string) => void;
}

export default function CmsPropertiesTable({
  onOpenAddModal,
  propertiesList = initialProperties,
  onDeleteProperty,
}: CmsPropertiesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProperties = propertiesList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' || item.status === selectedFilter || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden mb-8">
      {/* Table Top Toolbar */}
      <div className="p-6 border-b border-[#E5E0D8] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FAF9F6]">
        <div>
          <h2 className="text-xl font-bold font-playfair text-[#171717]">
            Property Listings & Assets
          </h2>
          <p className="text-xs text-[#858585] mt-0.5 font-inter">
            Manage real estate opportunities displayed across the FS Properties application
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-[#E5E0D8] rounded-lg text-xs font-inter focus:outline-none focus:border-[#BFA16A] text-[#171717] w-60 transition-colors"
            />
            <svg
              className="w-4 h-4 text-[#858585] absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Dropdown */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E5E0D8] rounded-lg text-xs font-inter focus:outline-none focus:border-[#BFA16A] text-[#171717] transition-colors cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Featured">Featured</option>
            <option value="Draft">Draft</option>
            <option value="Villa">Villas</option>
            <option value="Apartment">Apartments</option>
          </select>

          {/* Add New Property Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-[#BFA16A] hover:bg-[#aa8e59] text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2"
          >
            <span>+</span> Add Property
          </button>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-inter">
          <thead className="bg-[#F8F6F2] text-[#171717] font-semibold border-b border-[#E5E0D8] uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6">ID & Title</th>
              <th className="py-4 px-6">Community</th>
              <th className="py-4 px-6">Developer</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">FS Score</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8]">
            {filteredProperties.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#858585]">
                  No properties found matching your search.
                </td>
              </tr>
            ) : (
              filteredProperties.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAF9F6] transition-colors group"
                >
                  <td className="py-4 px-6">
                    <span className="text-[10px] text-[#BFA16A] font-semibold block uppercase">
                      {item.id}
                    </span>
                    <span className="font-semibold text-[#171717] text-sm">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#858585] block">
                      {item.type} • {item.bedrooms} Beds
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#171717] font-medium">
                    {item.community}
                  </td>
                  <td className="py-4 px-6 text-[#858585]">{item.developer}</td>
                  <td className="py-4 px-6 font-bold text-[#171717]">
                    {item.price}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-md bg-[#171717] text-[#BFA16A] font-bold text-xs">
                      {item.fsScore}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.status === 'Featured' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF4EA] text-[#BFA16A] border border-[#BFA16A]/30">
                        ★ Featured
                      </span>
                    )}
                    {item.status === 'Published' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ● Published
                      </span>
                    )}
                    {item.status === 'Draft' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                        ○ Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="px-3 py-1.5 text-[11px] font-medium text-[#171717] bg-[#F8F6F2] hover:bg-[#BFA16A] hover:text-white rounded transition-colors">
                      Edit
                    </button>
                    {onDeleteProperty && (
                      <button
                        onClick={() => onDeleteProperty(item.id)}
                        className="px-3 py-1.5 text-[11px] font-medium text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-[#E5E0D8] bg-[#FAF9F6] flex items-center justify-between text-xs text-[#858585]">
        <span>Showing {filteredProperties.length} of {propertiesList.length} total entries</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-white border border-[#E5E0D8] rounded hover:border-[#BFA16A] transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-[#BFA16A] text-white rounded font-medium">
            1
          </button>
          <button className="px-3 py-1 bg-white border border-[#E5E0D8] rounded hover:border-[#BFA16A] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
