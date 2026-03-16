import { useState, type ChangeEvent, type FormEvent } from "react";

type Position = "Forward" | "Midfielder" | "Defender" | "Goalkeeper";
type Team = "Arsenal" | "Man Utd" | "Chelsea";

interface Player{
  id:number,
  name:string,
  position:Position,
  team:Team,
  goals?:number,
  energy:number
}

interface Playerprops<T>{
  players:T[],
  title?:string,
  OnTrain:(player:T)=>void,
  OnRest:(player:T)=>void,
  OnReset:(player:T)=>void,
  OnRemove:(playerId:number)=>void,
}


const PlayerProfile =(prop:Playerprops<Player>)=>{
const energyColor = (value:number) =>{
if(value >= 70) return "green";
if(value >= 30) return "orange";
return "red"
}

return(
  <>
  {prop.players.map((player)=>(
    <p key={player.id}>
     <span><strong>Name :</strong>{player.name}</span>&nbsp;&nbsp; 
     <span><strong>Team :</strong>{player.team}</span>&nbsp;&nbsp; 
     <span><strong>Position :</strong>{player.position}</span>&nbsp;&nbsp; 
     {player.goals && <><span><strong>Goals :</strong>{player.goals}</span>&nbsp;&nbsp;</>}
     <span><strong style={{color:energyColor(player.energy)}}>Energy :</strong>{player.energy}</span>&nbsp;&nbsp;
     <button onClick={()=>prop.OnTrain(player)}>Train</button>&nbsp;&nbsp;  
     <button onClick={()=>prop.OnReset(player)}>Reset</button>&nbsp;&nbsp;  
     <button onClick={()=>prop.OnRest(player)}>Rest</button>&nbsp;&nbsp;  
     <button onClick={()=>prop.OnRemove(player.id)}>Remove</button>&nbsp;&nbsp;  
    </p>
  ))}
  </>
)
}


const SquadManagerV4 =()=>{
  const [players, setPlayers] = useState<Player[]>([
   {id:1,name:"Saka", position:"Forward",team:"Arsenal",goals:12,energy:87}, 
  ]);

  const [newPlayer, setNewPlayer] = useState({
      name:"",
      position:"Forward" as Position,
      team:"Arsenal" as Team,
      goals:"",
    });

  const [error, setErrors] = useState({
    name:"",
    goals:""
  });

  const nextId = players.length > 0 ? Math.max(...players.map((p)=>p.id))+1 : 1;

  const clamper = (value:number):number =>{
    return Math.max(0,Math.min(100,value))
  }

   const handleTrain=(playerToUpdate:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
      player.id === playerToUpdate.id ?
      {...player, energy:clamper(player.energy - 20)} : player
    ))
   ))
   }

  const handleRest=(playerToUpdate:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
      player.id === playerToUpdate.id ?
      {...player, energy:clamper(player.energy + 20)} : player
    ))
   ))
   }

  const handleReset=(playerToUpdate:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
      player.id === playerToUpdate.id ?
      {...player, energy:0} : player
    ))
   ))
   }

  const handleRemove=(playerId:number)=>{
   setPlayers((prev)=>(
    prev.filter((player)=>(player.id !== playerId))))
   }

   const handleChangeInput=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name, value} = e.target;
    setNewPlayer((prev)=>({
    ...prev,
    [name]:value
   }))
   }

   const validateForm =():Boolean=>{
    let isValid = true;
    const newErrors = {
      name:"", 
      goals:""
    };

    if(!newPlayer.name){
       newErrors.name = "Name is required"
       isValid = false
    }else{
      const nameLowerCase = newPlayer.name.trim().toLocaleLowerCase();
      const duplicate = players.some((player)=>player.name.toLowerCase() === nameLowerCase);
      if(duplicate){
       newErrors.name = "Player with this name already exists";
       isValid=false;
      }
    }

    if(newPlayer.goals.trim()){
      const goalsNum = Number(newPlayer.goals)
      if(isNaN(goalsNum) || goalsNum < 0 || typeof goalsNum !== "number"){
       newErrors.goals = "Goals has to be a number greater that O";
       isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
   }

   const handleAddPlayer=(e:FormEvent)=>{
    e.preventDefault();
  
    if(!validateForm()) return;

    const newAddedPlayer:Player={
      id:nextId,
      name:newPlayer.name,
      position:newPlayer.position,
      team:newPlayer.team,
      goals:Number(newPlayer.goals),
      energy:100
    }

    setPlayers((prev)=>([...prev, newAddedPlayer]));

    setNewPlayer({
      name:"",
      position:"Forward" as Position,
      team:"Arsenal" as Team,
      goals:"",
    });
    
   }

   return(
    <>
    <h2>Add new player</h2>
    <form onSubmit={handleAddPlayer}>
     <label htmlFor="name">Name </label>&nbsp;&nbsp;
     <input name="name" onChange={handleChangeInput} type="text" value={newPlayer.name}/>&nbsp;&nbsp;
     {error.name && <span style={{color:"red"}}>{error.name}</span>}
     <label htmlFor="position">Position </label>&nbsp;&nbsp;
     <select name="position" onChange={handleChangeInput} value={newPlayer.position}>
      <option value="Forward">Forward</option>
      <option value="Midfielder">Midfieleder</option>
      <option value="Defender">Defender</option>
      <option value="Goalkeeper">Goalkeeper</option>
    </select>&nbsp;&nbsp;
    <label htmlFor="team">Team </label>&nbsp;&nbsp;
     <select name="team" onChange={handleChangeInput} value={newPlayer.position}>
      <option value="Arsenal">Arsenal</option>
      <option value="Man Utd">Man Utd</option>
      <option value="Chelsea">Chelsea</option>
    </select>&nbsp;&nbsp;
    <label htmlFor="goals">Goals </label>&nbsp;&nbsp;
    <input name="goals" onChange={handleChangeInput} type="number" value={newPlayer.goals}/>&nbsp;&nbsp;
    {error.goals && <span style={{color:"red"}}>{error.goals}</span>}
    <button type="submit">Add ➕</button>
    </form>

  <PlayerProfile
    players={players}
    title="Squad Players"
    OnTrain={handleTrain}
    OnReset={handleReset}
    OnRest={handleRest}
    OnRemove={handleRemove}
    />
    </>
   )
}


export default SquadManagerV4;


