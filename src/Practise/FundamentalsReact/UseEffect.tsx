import { useEffect,useState } from "react"

const UseEffect =()=>{
    const [name, setName] = useState("Rice")
    useEffect(()=>{
        //what should I do --> the function
    },[]); // when should I come back

    useEffect(()=>{
       alert("This only happens once");
    },[]); // when should I come back, empty list means it onlyhappens once(only when the component is born)

    useEffect(()=>{
       alert(`This appears only when ${name} changes!`);
    },[name]);

    useEffect(()=>{
        const timer = setInterval(()=>{
            console.log("Tick tock time is up")
        },1000);

        return ()=>{
            clearInterval(timer);
            console.log("Time just stopped")
        } //the cleanup
    },[])

    return(
        <>{name}</>
    )
}

export default UseEffect;