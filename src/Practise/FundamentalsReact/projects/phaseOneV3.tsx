import { useState } from "react";

type position = "Forward" | "Midfielder" | "Defender" | "Goalkeeper";

interface Player{
  id:number,
  name:string,
  position:position,
  goals?:number,
  energy:number
}

interface PlayerProps<T>{
players:T[],
title?:string,
onTrain?:(player:T)=>void,
onRest?:(player:T)=>void,
onReset?:(player:T)=>void,
}

const Playerlist = (props:PlayerProps<Player>) =>{

  const energyColor = (value:number):string=>{
    if(value <= 30){return "red";};
    if(value > 30 && value <70){return "orange";};
    if(value >= 70){return "green";};
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
                <span><strong>Energy:</strong>&nbsp;<span style={{color:energyColor(player.energy)}}>{player.energy}</span></span>&nbsp;
                <button onClick={()=>props.onTrain && props.onTrain(player)}>Train</button>&nbsp;
                <button onClick={()=>props.onRest && props.onRest(player)}>Rest</button>&nbsp;
                <button onClick={()=>props.onReset && props.onReset(player)}>Reset</button>
            </p>
        ))}
    </div>
  )
}


const SquadManagerV3=()=>{
  const [players, setPlayers] = useState<Player[]>([
    {id:1,name:"Saka", position:"Forward",goals:12,energy:87},
    {id:1,name:"Rice", position:"Midfielder",goals:6,energy:89},
    {id:1,name:"Saliba", position:"Defender",energy:85},
    {id:1,name:"Raya", position:"Goalkeeper",energy:82},
  ]);

  const clamp = (value:number):number =>{
   return Math.min(100, Math.max(0, value))
  }

  const handleTrain = (PlayerToUpdate:Player) =>{
    setPlayers((prev)=>
     prev.map(player => 
      player.id === PlayerToUpdate.id ?
      {...player, energy:clamp(player.energy - 20)}
      : player
     )
    )
  }

  const handleRest = (PlayerToUpdate:Player) =>{
    setPlayers((prev)=>
      prev.map(player=>
        player.id === PlayerToUpdate.id ?
        {...player, energy:clamp(player.energy + 20)}
        : player
      )
    )
  }

  const handleReset = (PlayerToUpdate:Player) =>{
   setPlayers((prev)=>
    prev.map((player)=>
    player.id === PlayerToUpdate.id ?
    {...player, energy:0}
     : player
    )
   )
  }

  return(
    <>
    <Playerlist
    players = {players}
    title = "All Squad Players"
    onTrain={handleTrain}
    onRest={handleRest}
    onReset={handleReset}
    />

    <Playerlist
    players = {players.filter((player)=>player.position == "Forward")}
    title = "All Forwards Players"
    onTrain={handleTrain}
    onRest={handleRest}
    onReset={handleReset}
    />
    </>
  )
}

export default SquadManagerV3;