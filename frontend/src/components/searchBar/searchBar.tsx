import { useState } from "react";
import stringFormat from "../../helper/stringFormat";

interface ISearchBar {
    onSearch: (searchTerm: string, searchField: string) => void;
    fields: string[];
}

export default function SearchBar({ onSearch, fields }: ISearchBar) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        onSearch(searchTerm, searchField);
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const searchField = event.target.value;
        setSearchField(searchField);
        onSearch(searchTerm, searchField);
    };

    return (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
            <input
                className="border border-black rounded p-2 h-11"
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
            />
            <select
                className="border border-black rounded p-2 h-11"
                value={searchField}
                onChange={handleFieldChange}
            >
                <option value="">All Fields</option>
                {fields.map(field => (
                    <option key={field} value={field}>{stringFormat(field)}</option>
                ))}
            </select>
        </div>
    );
};
