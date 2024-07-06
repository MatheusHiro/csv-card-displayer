import axios from 'axios';
import React, { useRef, useState } from 'react';
import Button from '../components/button/button';
import Card from '../components/card/card';
import SearchBar from '../components/searchBar/searchBar';

export default function MainPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [cards, setCards] = useState<any[]>([]);
    const [allData, setAllData] = useState<any[]>([]);
    const [fields, setFields] = useState<string[]>([]);


    const fetchData = () => {
        axios.get('http://localhost:3000/api/users')
            .then(response => {
                const data = response.data.data || [];
                setCards(data);
                setAllData(data);

                if (data.length > 0) {
                    setFields(Object.keys(data[0]));
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setCards([]);
                setAllData([]);
            });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        if (file.type !== 'text/csv') {
            console.error('Invalid file type. Please upload a CSV file.');
            resetFileInput();
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3000/api/files', formData)
            .then(response => {
                resetFileInput();
                fetchData();
            })
            .catch(error => {
                console.error('Upload error:', error);
                console.error('Error occurred:', error.response?.data || 'Unknown error');
                alert('Upload failed');
                resetFileInput();
            });
    };

    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSearch = (searchTerm: string, searchField: string) => {
        if (!searchTerm) {
            setCards(allData);
            return;
        }

        let url = `http://localhost:3000/api/users?q=${searchTerm}`;
        if (searchField) {
            url += `&field=${searchField}`;
        }

        axios.get(url)
            .then(response => {
                setCards(response.data.data || []);
            })
            .catch(error => {
                console.error('Error searching data:', error);
                setCards([]);
            });
    };

    return (
        <div>
            <header className="flex flex-col sm:flex-row items-center justify-center p-4 space-y-2 sm:justify-between">
                <SearchBar onSearch={handleSearch} fields={fields} />

                <input
                    className="hidden"
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
                <Button
                    label="Upload"
                    onClick={() => fileInputRef.current?.click()}
                    className='w-16 h-11'
                />
            </header>
            <main>
                <div className="flex justify-center p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-4">
                        {cards.length > 0 ? (
                            cards.map((item, index) => (
                                <div key={index} className="flex justify-center">
                                    <div className="border border-black rounded p-4">
                                        <Card item={item} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center">No data available</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}