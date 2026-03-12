import { useState, type ChangeEvent, type FormEvent } from "react";

type Position = "Forward" | "Midfielder"|"Defender"|"GoalKeeper";

type Team = "Arsenal" | "Chelsea" | "Liverpool" | "Man Utd" | "Man City";

interface Player{
  id:number,
  name:string,
  position:Position,
  team:Team,
  goals?:number,
  energy:number
}

interface PlayerProps<T>{
  players:T[],
  title?:string,
  onTrain:(player:T)=>void
  onRest:(player:T)=>void
  onReset:(player:T)=>void
  onRemove:(playerId:number)=>void
}

const Playerlist=(prop:PlayerProps<Player>)=>{
const energyColor =(value:number):string=>{
if(value > 30) return "orange";
if(value > 70) return "green";

return "red";
}

return(
  <div>
    <h2>{prop.title}</h2>
    {prop.players.map((player)=>(
      <p key={player.id}>
        <span><strong>Name: </strong>{player.name}</span>&nbsp;&nbsp;
        <span><strong>Position: </strong>{player.position}</span>&nbsp;&nbsp;
        <span><strong>Team: </strong>{player.team}</span>&nbsp;&nbsp;
        {player.goals && <><span><strong>Goals: </strong>{player.goals}</span>&nbsp;&nbsp;</>}
        <span style={{color:energyColor(player.energy)}}><strong>Energy: </strong>{player.energy}</span>&nbsp;&nbsp;
        <button onClick={()=>prop.onTrain(player)}>Train</button>&nbsp;&nbsp;
        <button onClick={()=>prop.onRest(player)}>Rest</button>&nbsp;&nbsp;
        <button onClick={()=>prop.onReset(player)}>Reset</button>&nbsp;&nbsp;
        <button onClick={()=>prop.onRemove(player.id)}>Remove</button>
      </p>
    ))}
  </div>
)
}

const SquadManagerV4=()=>{
  const [players, setPlayers]=useState<Player[]>([
    {id:1,name:"Saka", position:"Forward",team:"Arsenal",goals:12,energy:87} 
  ]);

  const [newPlayer, setNewPlayer]= useState({
    name:"",
    position:"Forward" as Position,
    team:"Arsenal" as Team,
    goals:""
  })

  const [error, setErrors] = useState({
    name:"",
    goals:""
  });

  const nextId = players.length > 0 ? Math.max(...players.map((p)=>p.id)) + 1 : 1;

  const clamper=(v:number)=>Math.max(0,Math.min(100,v));

   const handleTrain=(playerToUpdate:Player)=>{
      setPlayers((prev)=>
      prev.map(player=>
        player.id === playerToUpdate.id ?
        {...player, energy:clamper(player.energy)} :
        player
      )
      )
   }

   const handleRest =(playerToUpdate:Player)=>{
    setPlayers((prev)=>
    prev.map((player)=>
    player.id === playerToUpdate.id ?
    {...player, energy:clamper(player.energy + 20)}: player
    )
    )
   }

    const handleReset =(playerToUpdate:Player)=>{
    setPlayers((prev)=>(
    prev.map((player)=>(
    player.id === playerToUpdate.id ?
    {...player, energy:100}: player
    ))
    ))
   }

   const handleRemove=(playerId:number)=>{
    setPlayers((prev)=>(
    prev.filter((player)=> player.id !== playerId)
    ))
   }

   const handleInput=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
   const {name, value} = e.target;
    setNewPlayer((prev)=>({
    ...prev,
    [name]:value
    }))
   }

   const validateForm =()=>{
    let isValid = true;
    const newError = {name:"", goals:""};
    
    //validating name
    if(!newPlayer.name.trim()){
      newError.name = "player name is required"
      isValid = false;
    }else{
      const nameLowerCase = newPlayer.name.trim().toLowerCase();
      const duplicate = players.some((p)=>p.name.toLowerCase() === nameLowerCase);

      if(duplicate){
        newError.name = "this player already exists";
        isValid= false;
      }
    }

    //goals validation
    if(newPlayer.goals.trim()){
      const goalsNum = Number(newPlayer.goals)
      if(isNaN(goalsNum) || goalsNum < 0){
        newError.goals = "goals has to be a number greater than 0"
        isValid = false;
      }
    }

    setErrors(newError);
    return isValid;
   }

   const handleAddPlayer=(e:FormEvent)=>{
     e.preventDefault();

     if(!validateForm()) return;

     const addPlayer:Player={
      id:nextId,
      name:newPlayer.name,
      position:newPlayer.position,
      team:newPlayer.team,
      goals:Number(newPlayer.goals),
      energy:100
     }

     setPlayers((prev)=>([...prev, addPlayer]));

     setNewPlayer({
        name:"",
        position:"Forward" as Position,
        team:"Arsenal" as Team,
        goals:""
     })

     setErrors({
        name:"",
        goals:""
     })
   }

   return(
    <div>
      <form onSubmit={handleAddPlayer}>
       <label htmlFor="name">Name: </label>
       <input name="name" onChange={handleInput} type="text" value={newPlayer.name}/>&nbsp;&nbsp;
       {error.name && <span style={{color:"red"}}>{error.name}</span>}&nbsp;&nbsp;

      <label htmlFor="position">Position: </label>
       <select name="position" onChange={handleInput} value={newPlayer.position}>
        <option value="Forward">Forward</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Defender">Defender</option>
        <option value="GoalKeeper">GoalKeeper</option>
        </select>&nbsp;&nbsp;

      <label htmlFor="team">Team: </label>
       <select name="team" onChange={handleInput} value={newPlayer.team}>
        <option value="Arsenal">Arsenal</option>
        <option value="Chelsea">Chelsea</option>
        <option value="Man Utd">Man Utd</option>
        <option value="Man City">Man City</option>
        <option value="Liverpool">Liverpool</option>
        </select>&nbsp;&nbsp;

      <label htmlFor="goals">Goals: </label>
       <input name="goals" onChange={handleInput} type="text" value={newPlayer.goals}/>&nbsp;&nbsp;
       {error.goals && <span style={{color:"red"}}>{error.goals}</span>}&nbsp;&nbsp;

       <button type="submit">Add ➕</button>
      </form>

      <Playerlist
      players={players}
      title="Squad Members"
      onTrain={handleTrain}
      onReset={handleReset}
      onRest={handleRest}
      onRemove={handleRemove}
      />
    </div>
   )
}

export default SquadManagerV4
