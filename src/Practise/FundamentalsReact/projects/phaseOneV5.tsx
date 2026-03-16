import { useState, type ChangeEvent, type FormEvent } from "react";

type Team = "Arsenal" | "Liverpool" | "Man Utd" | "Man City";

type Position = "Forward" | "Midfielder" | "Defender" | "GoalKeeper";


interface Player{
    id:number,
    name:string,
    position:Position,
    team:Team,
    goals:number,
    energy:number
}

interface PlayerProps<T>{
players:T[],
title?:string,
OnTrain:(player:T)=>void,
OnReset:(player:T)=>void,
OnRest:(player:T)=>void,
OnRemove:(playerId:number)=>void,
}

const PlayerProfile=(prop:PlayerProps<Player>)=>{
    const energyColors=(value:number):string=>{
    if(value >= 70) return "green";
    if(value >= 30) return "orange";
     return "red";
    }

    return(
        <>
        {prop.players.map((player)=>(
            <p key={player.id}>
            <span><strong>Name:&nbsp;&nbsp;</strong>{player.name}</span>&nbsp;&nbsp;
            <span><strong>Position:&nbsp;&nbsp;</strong>{player.position}</span>&nbsp;&nbsp;
            <span><strong>Team:&nbsp;&nbsp;</strong>{player.team}</span>&nbsp;&nbsp;
            {player.goals && <><span><strong>Goals:&nbsp;&nbsp;</strong>{player.goals}</span>&nbsp;&nbsp;</>}
            <span style={{color:energyColors(player.energy)}}><strong>Energy:&nbsp;&nbsp;</strong>{player.energy}</span>&nbsp;&nbsp;
            <button onClick={()=>prop.OnTrain(player)}>Train</button>&nbsp;&nbsp;
            <button onClick={()=>prop.OnReset(player)}>Reset</button>&nbsp;&nbsp;
            <button onClick={()=>prop.OnRest(player)}>Rest</button>&nbsp;&nbsp;
            <button onClick={()=>prop.OnRemove(player.id)}>Remove</button>
            </p>
        ))}
        </>
    )
}

const SquadManager5=()=>{
  const [players, setPlayers] = useState<Player[]>([
   {id:1,name:"Saka", position:"Forward",team:"Arsenal",goals:12,energy:87}, 
  ]);

  const [newPlayer, setNewPlayer] = useState({
    name:"",
    position:"Forward" as Position,
    team:"Arsenal" as Team,
    goals:""
  })

  const [errors, setErrors] = useState({
    name:"",
    goals:""
  })

  const clamper = (v:number) =>Math.max(0, Math.min(100,v));

  const nextId = players.length > 0 ? Math.max(...players.map((p)=>p.id)) + 1: 1;

  const handleTrain = (playerToUpdate:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
       player.id === playerToUpdate.id ?
       {...player, energy:clamper(player.energy - 20)}:
       player
    ))
   ))
  }

   const handleRest = (playerToUpdate:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
       player.id === playerToUpdate.id ?
       {...player, energy:clamper(player.energy + 20)}:
       player
    ))
   ))
  }

  const handleReset = (playerToUpdate:Player)=>{
   setPlayers((prev)=>(
    prev.map((player)=>(
       player.id === playerToUpdate.id ?
       {...player, energy:100}:
       player
    ))
   ))
  }

   const handleRemove = (playerid:number)=>{
   setPlayers((prev)=>(
    prev.filter((player)=>(
       player.id !== playerid
    ))
   ))
  }

  const handleInputChange =(e:ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
    const {name, value} = e.target;
    setNewPlayer((prev)=>({
        ...prev,
        [name]:value
    }))
  }

  const validateForm = ():Boolean=>{
    let isValid = true;
    const newError = {
        name:"",
        goals:""
    };

    if(!newPlayer.name.trim()){
        newError.name = "Name is required";
        isValid = false;
    }else{
        const nameLowerCase = newPlayer.name.toLowerCase();
        const duplicate = players.some((player)=>player.name.toLowerCase() === nameLowerCase );

        if(duplicate){
            newError.name = "name already exists"
            isValid = false;
        }
    }

    if(newPlayer.goals){
        const goalsNum = Number(newPlayer.goals);
        if(isNaN(goalsNum) || goalsNum < 0 || typeof goalsNum!== "number"){
            newError.goals = "Goals has to be anumber greater than 0"
            isValid = false
        }
    }

    setErrors(newError);
    return isValid;
  }


  const handleAddPlayer=(e:FormEvent)=>{
   e.preventDefault();

   if(!validateForm()) return;

   const newAddPlayer:Player={
    id:nextId,
    name:newPlayer.name,
    position:newPlayer.position,
    team:newPlayer.team,
    goals:Number(newPlayer.goals),
    energy:100
   }

   setPlayers((prev)=>([...prev,newAddPlayer]));

   setNewPlayer({
    name:"",
    position:"Forward" as Position,
    team:"Arsenal" as Team,
    goals:""
   })
  }

  return(
    <>
    <form onSubmit={handleAddPlayer}>
    <label htmlFor="name">Name &nbsp;&nbsp;</label>&nbsp;&nbsp;
    <input name="name" onChange={handleInputChange} type="text" value={newPlayer.name} placeholder="Eg Declan Rice"/>&nbsp;&nbsp;
    {errors.name && <span style={{color:"red"}}>{errors.name}</span>}&nbsp;&nbsp;
    
        <label htmlFor="team">Team &nbsp;&nbsp;</label>&nbsp;&nbsp;
        <select name="team" onChange={handleInputChange} value={newPlayer.team}>
        <option value="Arsenal">Arsenal</option>
        <option value="Liverpool">Liverpool</option>
        <option value="Man Utd">Man Utd</option>
        <option value="Man City">Man City</option>
    </select>&nbsp;&nbsp;

    <label htmlFor="position">Position &nbsp;&nbsp;</label>&nbsp;&nbsp;
    <select name="position" onChange={handleInputChange} value={newPlayer.position}>
        <option value="Forward">Forward</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Defender">Defender</option>
        <option value="GoalKeeper">GoalKeeper</option>
    </select>&nbsp;&nbsp;

    <label htmlFor="goals">Goals &nbsp;&nbsp;</label>&nbsp;&nbsp;
    <input name="goals" onChange={handleInputChange} type="number" value={newPlayer.name} placeholder="Eg 20"/>&nbsp;&nbsp;
    {errors.goals && <span style={{color:"red"}}>{errors.goals}</span>}&nbsp;&nbsp;

    <button type="submit">Add ➕</button>&nbsp;&nbsp;
    </form>

    <PlayerProfile
    players={players}
    title="Squad Lists"
    OnTrain={handleTrain}
    OnReset={handleReset}
    OnRest={handleRest}
    OnRemove={handleRemove}
    />
    </>
  )
}

export default SquadManager5;

