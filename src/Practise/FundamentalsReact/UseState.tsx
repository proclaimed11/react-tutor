import { useState } from "react";

interface CarBrand{
    brand: string,
    model: string,
    year: number,
    color: string
}

const Usestate = ()=>{
    const [count, setCount] =useState(0);
    const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: 1964,
    color: "red",
    isNew:true
    });

    const [player, setPlayer] = useState({
    name: "Saka",
    energy: 100,
    isTraining: false
    });

    const EnergyLimit = (value:number):number=>{
      return Math.max(0,Math.min(100, value));
    }

    return(
        <div>
            <p>We have {count} cars, A {car.brand} year {car.year} with a {car.color} is my favourite car and is it new {car.isNew.toString().toUpperCase()} &nbsp;
                 <button
                  onClick={()=> car.color == "red" ? setCar((prevCar)=>({...prevCar, color:"blue"})) : setCar((prevCar)=>({...prevCar, color:"red"}))}>
                    update color
                 </button>&nbsp; 
                 <button onClick={()=> car.brand == "Ford" ? setCar((prevCar)=>({...prevCar, brand:"BMW"})) : setCar((prevCar)=>({...prevCar, brand:"Ford"}))}>
                    update brand
                </button> &nbsp;
                <button onClick={()=>setCar((prevCar)=>({...prevCar, year:prevCar.year + 1}))}>
                    update year
                </button> &nbsp; 
                 <button onClick={()=>setCount((previouscount)=>previouscount + 1)}>
                    Add 
                </button> &nbsp;
                <button onClick={()=>setCar((prevCar)=>({...prevCar, isNew:!prevCar.isNew}))}>
                    Update status
                </button>
                </p>

                <h2>Player:{player.name}</h2>
                 <p>Energy : <span style={{
                    color: player.energy >= 70 ? "green":
                     player.energy < 70 && player.energy > 30 ? "orange" :
                     player.energy <= 30 ? "red" : "black" 
                     }}>
                 {player.energy}
                 </span>
                 </p> 
                 <p>Status : <span>{player.isTraining ? "Training" : "Resting"}</span></p>
                 <p>
                    <button disabled = {player.energy < 20} onClick={()=>setPlayer((prev)=>({...prev, energy:EnergyLimit(prev.energy - 20), isTraining:true}))}>
                        Train(-20)
                    </button>&nbsp;
                    <button disabled = {player.energy >= 100} onClick={()=>setPlayer((prev)=>({...prev, energy:EnergyLimit(prev.energy + 30),isTraining:false}))}>
                        Rest(+30)
                    </button>&nbsp;
                 </p>
        </div>
    )
}

export default Usestate;