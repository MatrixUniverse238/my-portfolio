import { useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
    phone: string;
}

function UserCard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        async function fetchUser() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error)   return <p>{error}</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
        </div>
    );

}

export default UserCard;