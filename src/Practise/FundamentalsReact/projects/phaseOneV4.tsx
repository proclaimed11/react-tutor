import { useState, type ChangeEvent, type FormEvent } from "react";

type position = "Forward" | "Midfielder" | "Defender" | "Goalkeeper";

interface Player{
  id:number,
  name:string,
  position:position,
  goals?:number,
  energy:number,
}

interface PlayerProps<T>{
  players:T[],
  title?:string,
  OnTrain:(player:T)=>void,
  OnRest:(player:T)=>void,
  OnReset:(player:T)=>void,
  OnRemove:(id:number)=>void,
}

const PlayerList=(props:PlayerProps<Player>)=>{

  const EnergyColor=(value:number):string=>{
      if(value >= 70){return "green"}
      if(value >= 30 && value < 70){return "orange"}
 
      return "red";
  }

  return(
    <div>
      <h1>{props.title}</h1>
        {props.players.map((player)=>(
            <p key={player.id}>
                <span><strong>Player name:</strong>&nbsp;{player.name}</span>&nbsp;
                <span><strong>Postion:</strong>&nbsp;{player.position}</span>&nbsp;
                {player.goals !== undefined && <span><strong>Goals:</strong>&nbsp;{player.goals}</span>}&nbsp;
                <span><strong>Energy:</strong>&nbsp;<span style={{color:EnergyColor(player.energy)}}>{player.energy}</span></span>&nbsp;
                <button onClick={()=>props.OnTrain && props.OnTrain(player)}>Train</button>&nbsp;
                <button onClick={()=>props.OnRest && props.OnRest(player)}>Rest</button>&nbsp;
                <button onClick={()=>props.OnReset && props.OnReset(player)}>Rest</button>&nbsp;
                <button onClick={()=>props.OnRemove && props.OnRemove(player.id)}>Reset</button>
            </p>
        ))}
    </div>
  )
}

const SquadManagerV4=()=>{
  const[players, setPlayers]=useState<Player[]>([
    {id:1,name:"Saka", position:"Forward",goals:12,energy:87},
    {id:2,name:"Rice", position:"Midfielder",goals:6,energy:89},
    {id:3,name:"Saliba", position:"Defender",energy:85},
    {id:4,name:"Raya", position:"Goalkeeper",energy:82},
  ]);

   const [newplayer, setNewPlayer]= useState({
    name:"",
    position:"Forward" as position,
    goals:""
  });

  const Clamp=(value:number):number=>{
    return Math.min(100, Math.max(0, value));
  }

  const nextId = players.length > 0 ? Math.max(...players.map((player)=>player.id)) + 1 : 1;

  const handleTrain=(playerID:Player)=>{
   setPlayers((prev)=>(
     prev.map((player)=>(
        player.id === playerID.id ?
        {...player, energy:Clamp(player.energy - 20)} :
        player
     ))
   ))
  }

  const handleRest=(playerID:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
       player.id === playerID.id ?
       {...player, energy:Clamp(player.energy + 20)} :
       player
    ))
   ))
  }

  const handleReset=(playerID:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
       player.id === playerID.id ?
       {...player, energy:100} :
       player
    ))
   ))
  }

  const handleRemove=(playerID:number)=>{
   setPlayers((prev)=>(
    prev.filter((player)=>player.id !== playerID)
   ))
  }

  const handleInputChange=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
   e.preventDefault();
   const {name,value} = e.target;
   setNewPlayer((prev)=>({
    ...prev,
    [name]:name==="goals" ? value : value,
   }))
  }

  const handleAddPlayer=(e:FormEvent)=>{
   e.preventDefault();

  if(!newplayer.name.trim()) return;

  const goalsNum = newplayer.goals.trim() ? Number(newplayer.goals) : undefined;

  const playerToAdd:Player={
    id:nextId,
    name:newplayer.name,
    position:newplayer.position,
    energy:85,
    ...(goalsNum !== undefined && !isNaN(goalsNum) && {goals:goalsNum})
  }

  setPlayers([...players, playerToAdd]);

  setNewPlayer({
    name:"",
    position:"Forward" as position,
    goals:""
  })
  }
  
  return(
    <div>
      <form onSubmit={handleAddPlayer}>
        <input
        name="name"
        onChange={handleInputChange}
        type="text"
        value={newplayer.name}
        placeholder="Eg Rice"
        />&nbsp;
        <select
        name="position"
        value={newplayer.position}
        onChange={handleInputChange}
        >
        <option value="Forward">Forward</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Defender">Defender</option>
        <option value="Goalkeeper">Goalkeeper</option>
        </select>&nbsp;
        <input
        name="goals"
        onChange={handleInputChange}
        type="number"
        value={newplayer.goals}
        placeholder="3"
        />&nbsp;
        <button type="submit">Add</button>
      </form>

      <PlayerList
      players={players}
      title="Current Squad"
      OnRemove={handleRemove}
      OnTrain={handleTrain}
      OnRest={handleRest}
      OnReset={handleReset}
      />
    </div>
  )
}

export default SquadManagerV4;