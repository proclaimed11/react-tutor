import { useState, type ChangeEvent, type FormEvent } from "react";

type Position = "Forward" | "Midfielder" | "Defender" | "Goalkeeper";

type Team = "Arsenal" | "Chelsea" | "Liverpool" | "Manchester United";

interface Player{
  id:number,
  name:string,
  position:Position,
  team:Team,
  goals?:number,
  energyLevel:number,
}

interface PlayerProps<T>{
  Players:T[],
  onTrain:(player:T)=>void,
  onRest:(player:T)=>void,
  onReset:(player:T)=>void,
  onDelete:(playerId:number)=>void,
}

const PlayerList =(props:PlayerProps<Player>)=>{
  const energyComposer =(energy:number)=>{
    if(energy>70) return "green";
    if(energy>40) return "orange";
    return "red";
  }

  return(
    <>
      {props.Players.map(player => (
        <p key={player.id}>
          <span>Name: {player.name}</span>&nbsp;&nbsp;
          <span>Position: {player.position}</span>&nbsp;&nbsp;
          <span>Team: {player.team}</span>&nbsp;&nbsp;
          <span>Goals: {player.goals || 0}</span>&nbsp;&nbsp;
          <span>Energy Level: </span><span style={{color:energyComposer(player.energyLevel)}}>{player.energyLevel}</span>&nbsp;&nbsp;
          <button onClick={() => props.onTrain(player)}>Train</button>&nbsp;&nbsp;
          <button onClick={() => props.onRest(player)}>Rest</button>&nbsp;&nbsp;
          <button onClick={() => props.onReset(player)}>Reset</button>&nbsp;&nbsp;
          <button onClick={() => props.onDelete(player.id)}>Delete</button>
        </p>
      ))}
    </>
  );
}

const SquadManagerV4 =()=>{
  const [players, SetPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", position: "Forward", team: "Arsenal", goals: 10, energyLevel: 80 }
  ]);

  const [newPlayer,SetNewPlayer]=useState({
   name:"",
   position:"Forward" as Position,
   team:"Arsenal" as Team,
   goals:""
  })

  const [errors, setErrors] = useState({
    name:"",
    goals:""
  });

  const nextId = players.length ? Math.max(...players.map((player)=>player.id)) + 1 : 1;

  const clamper =(value:number)=> Math.max(0,Math.min(100,value));

  const handleTrain = (playerToUpdate:Player) =>{
     SetPlayers((prev)=>
        prev.map((player)=>(
          player.id === playerToUpdate.id
            ? { ...player, energyLevel: clamper(player.energyLevel - 10)}
            : player
        ))
    )
  }

  const handleRest = (playerToUpdate:Player) =>{
   SetPlayers((prev)=>
    prev.map((player)=>(
      player.id === playerToUpdate.id
        ? { ...player, energyLevel: clamper(player.energyLevel + 10)}
        : player
    ))
  )
}

const hanndleReset = (playerToUpdate:Player) =>{
  SetPlayers((prev)=>(
    prev.map((player)=>(
      player.id === playerToUpdate.id
        ? { ...player, energyLevel: 100 }
        : player
    ))
  ))
}

const handleDelete =(playerId:number)=>{
  SetPlayers((prev)=>prev.filter((player)=>player.id !== playerId))
}

const validateForm =()=>{
  let isValid = true;
}

const handleChangeInput=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
const { name, value } = e.target;
SetNewPlayer((prev)=>({
...prev,
[name]: name === "goals" ? Number(value) : value
}));
}

const handleAddPlayer =(e:FormEvent)=>{
  e.preventDefault();

  if(!newPlayer.name.trim()) return;

  const playerToAdd:Player={
  id: nextId,
  name: newPlayer.name,
  position:newPlayer.position,
  team:newPlayer.team,
  goals:newPlayer.goals ? Number(newPlayer.goals) : 0,
  energyLevel:100
  }

  SetPlayers((prev)=>[...prev,playerToAdd]);
  SetNewPlayer({
    name:"",
    position:"Forward" as Position,
    team:"Arsenal" as Team,
    goals:""
  })
}

return(
  <>
  <h2>Squad Manager V4</h2>
  <form onSubmit={handleAddPlayer}>
    <label htmlFor="name">Name:</label>
    <input name="name" value={newPlayer.name} onChange={handleChangeInput}/>&nbsp;&nbsp;
    <label htmlFor="position">Position:</label>
    <select name="position" value={newPlayer.position} onChange={handleChangeInput}>
      <option value="Forward">Forward</option>
      <option value="Midfielder">Midfielder</option>
      <option value="Defender">Defender</option>
      <option value="Goalkeeper">Goalkeeper</option>
    </select>&nbsp;&nbsp;
    <label htmlFor="team">Team:</label>
    <select name="team" value={newPlayer.team} onChange={handleChangeInput}>
      <option value="Arsenal">Arsenal</option>
      <option value="Chelsea">Chelsea</option>
      <option value="Liverpool">Liverpool</option>
      <option value="Manchester United">Manchester United</option>
    </select>&nbsp;&nbsp;
    <label htmlFor="goals">Goals:</label>
    <input name="goals" type="number" value={newPlayer.goals} onChange={handleChangeInput}/>&nbsp;&nbsp;
    <button type="submit">Add Player ➕</button>
  </form>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <PlayerList Players={players} onTrain={handleTrain} onRest={handleRest} onReset={hanndleReset} onDelete={handleDelete}/>
  </>
)

}

export default SquadManagerV4;