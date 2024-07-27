import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.example.com/data');
                const result = await response.json();

                // Проверка дали данните са празен масив
                if (result.length === 0) {
                    setHasData(false);
                } else {
                    setData(result);
                    setHasData(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setHasData(false);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!hasData) {
        return <div>No data available</div>;
    }

    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}
        </div>
    );
}

export default MyComponent;



/* 
В този пример:

useState е използван за управление на състоянието на данните (data), състоянието на зареждане (isLoading), и дали има данни (hasData).
В useEffect, извикването на fetch е обгърнато в асинхронна функция fetchData.
След получаване на резултата от сървъра, проверяваме дали резултатът е празен масив. Ако е, задаваме hasData на false, в противен случай задаваме върнатите данни и задаваме hasData на true.
Ако данните все още се зареждат, показваме "Loading...".
Ако няма данни, показваме "No data available".
Ако има данни, ги показваме на екрана.
Този подход ви позволява лесно да проверите дали сървърът е върнал данни, дори ако върнатите данни са празен масив, и да покажете съответните съобщения на потребителя.
*/