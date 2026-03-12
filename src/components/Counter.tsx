import { useState, useEffect } from "react";

interface VariantProps {
    variant : "small" | "large";
}

function Counter({variant}:VariantProps) {

    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(`Counter is now : ${count}`);
        document.title = `Count: ${count}`;
    }, [count]);
    return (
        <section>
            {variant === "large" ?<h1>{count}</h1> : <p>{count}</p>}
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => {
                if(count > 0){
                    setCount(count - 1);
                }
            }}>-</button>
        </section>
    )
}

export default Counter;