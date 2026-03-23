import { useState, type ChangeEvent, type FormEvent } from "react";

type Team = "Arsenal" | "Chelsea" | "Man City";

type Position = "Forward" | "MidFielder" | "Defender" | "GoalKeeper";

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
    onTrain:(player:T)=>void,
    onRest:(player:T)=>void,
    onReset:(player:T)=>void,
    onRemove:(playerId:number)=>void,
    onUpdate:(player:T)=>void,
}

const PlayerProfile=(prop:PlayerProps<Player>)=>{
const [editId, setEditId] = useState<number | null>(null);
const [editForm, setEditForm] = useState<Partial<Player>>({});

const startEdit=(player:Player)=>{
setEditId(player.id);
setEditForm(player);
}

const handleEditChange=(e:ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
const {name,value} = e.target;
setEditForm((prev)=>({
...prev,
[name]:value
}))
}

const saveEdit=(playerId:number)=>{
if(!editForm.name?.trim()) return;

const updated ={
...prop.players.find((p)=>p.id===playerId)!,
...editForm
}

prop.onUpdate(updated);
setEditId(null);
setEditForm({});
}

const cancel=()=>{
    setEditId(null);
    setEditForm({});
}

const energyColor=(value:number):string=>{
if(value > 70){return "green"};
if(value > 30){return "orange"};
return "red";
}

return(
<>
{prop.players.map((player)=>{
    const isEditing = player.id === editId;
    const currentOp = isEditing ? {...player,...editForm} : player;
    
    return(
        <div key={player.id}>
            {isEditing ? (
                <>
                <label htmlFor="name">Name:</label>&nbsp;&nbsp;
                <input name="name" onChange={handleEditChange} type="text" value={editForm.name ?? ""}/>&nbsp;&nbsp;

                <label htmlFor="position">Position:</label>&nbsp;&nbsp;
                <select name="position" value={editForm.position ?? ""} onChange={handleEditChange}>
                 <option value="Forward">Forward</option>
                 <option value="Midfielder">Midfielder</option>
                 <option value="Defender">Defender</option>
                 <option value="GoalKeeper">GoalKeeper</option>
                </select>&nbsp;&nbsp;

                <label htmlFor="team">Team:</label>&nbsp;&nbsp;
                <select name="team" value={editForm.team ?? ""} onChange={handleEditChange}>
                 <option value="Arsenal">Arsenal</option>
                 <option value="Chelsea">Chelsea</option>
                 <option value="Man City">Man City</option>
                </select>&nbsp;&nbsp;

                <label htmlFor="goals">Goals:</label>&nbsp;&nbsp;
                <input name="goals" onChange={handleEditChange} type="number" value={editForm.goals ?? ""}/>&nbsp;&nbsp;
                <button onClick={()=>saveEdit(player.id)}>save ✅</button>&nbsp;&nbsp;
                <button onClick={()=>cancel()}>cancel ❌</button>
                </>
            ):(
                <p key={player.id}>
                <span><strong>Name :</strong>{player.name}</span>&nbsp;&nbsp; 
                <span><strong>Team :</strong>{player.team}</span>&nbsp;&nbsp; 
                <span><strong>Position :</strong>{player.position}</span>&nbsp;&nbsp; 
                {player.goals && <><span><strong>Goals :</strong>{player.goals}</span>&nbsp;&nbsp;</>}
                <span  style={{color:energyColor(player.energy)}}><strong>Energy :</strong>{player.energy}</span>&nbsp;&nbsp;
                <button onClick={()=>prop.onTrain(player)}>Train</button>&nbsp;&nbsp;  
                <button onClick={()=>prop.onReset(player)}>Reset</button>&nbsp;&nbsp;  
                <button onClick={()=>prop.onRest(player)}>Rest</button>&nbsp;&nbsp;  
                <button onClick={()=>startEdit(player)}>Edit</button>&nbsp;&nbsp;  
                <button onClick={()=>prop.onRemove(player.id)}>Remove</button>&nbsp;&nbsp;  
                </p>
            )}
        </div>
    )
})}
</>
)
}

const SquadManager5=()=>{
const [players, SetPlayers]=useState<Player[]>([
{id:1,name:"Saka", position:"Forward",team:"Arsenal",goals:12,energy:87},
]);

const[newPlayer, setNewPlayer]=useState({
name:"",
position:"Forward" as Position,
team:"Arsenal" as Team,
goals:""
})

const[error, setErrors]=useState({
    name:"",
    goals:""
});

const clamper=(v:number)=> Math.max(0,Math.min(100,v));

const nextId = players.length > 0 ? Math.max(...players.map((p)=>p.id)) + 1:1;

const handleTrain=(playerToUpdate:Player)=>{
SetPlayers((prev)=>(
    prev.map((player)=>(
         player.id === playerToUpdate.id ?
         {...player, energy:clamper(player.energy - 20)}:
         player 
    ))
))
}

const handleRest=(playerToUpdate:Player)=>{
SetPlayers((prev)=>(
    prev.map((player)=>(
         player.id === playerToUpdate.id ?
         {...player, energy:clamper(player.energy + 20)}:
         player 
    ))
))
}

const handleReset=(playerToUpdate:Player)=>{
SetPlayers((prev)=>(
    prev.map((player)=>(
         player.id === playerToUpdate.id ?
         {...player, energy:100}:
         player 
    ))
))
}

const handleRemove=(playerId:number)=>{
SetPlayers((prev)=>(
    prev.filter((player)=>(
         player.id === playerId
    ))
))
}

const handleUpdate=(playerToUpdate:Player)=>{
   SetPlayers((prev)=>(
    prev.map((player)=>(
         player.id === playerToUpdate.id ?
         playerToUpdate : player
    ))
))
}

const handleInputChange=(e:ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
const {name,value} = e.target;
setNewPlayer((prev)=>({
...prev,
[name]:value
}))
}

const validateForm=():boolean=>{
    let isValid = true;
    const newErrors={
        name:"",
        goals:""
    }

    if(!newPlayer.name.trim()){
        newErrors.name="Name is required"
        isValid = false
    } else {
        const nameLowerCase = newPlayer.name.trim().toLowerCase();
        const duplicate = players.some((player)=>player.name.toLowerCase()=== nameLowerCase);

        if(duplicate){
        newErrors.name="player already exists"
        isValid=false;
        }
    }

    if(newPlayer.goals){
     const goalsNum = Number(newPlayer.goals);

     if(isNaN(goalsNum) || goalsNum < 0){
        newErrors.goals="Goals should be a number greater than 0";
        isValid=false;
     }
    }

    setErrors(newErrors);
    return isValid;
}

const handleAddPlayer=(e:FormEvent)=>{
e.preventDefault();

if(!validateForm()) return;

const playerAdd={
    id:nextId,
    name:newPlayer.name,
    position:newPlayer.position,
    team:newPlayer.team,
    goals:Number(newPlayer.goals),
    energy:100
}

SetPlayers((prev)=>([...prev,playerAdd]));

setErrors({
    name:"",
    goals:""
});

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
        <label htmlFor="name">Name:</label>&nbsp;&nbsp;
        <input name="name" onChange={handleInputChange} type="text" value={newPlayer.name}/>&nbsp;&nbsp;
        {error.name && <span style={{color:"red"}}>{error.name}</span>}

        <label htmlFor="position">Position:</label>&nbsp;&nbsp;
        <select name="position" value={newPlayer.position} onChange={handleInputChange}>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="GoalKeeper">GoalKeeper</option>
        </select>&nbsp;&nbsp;

        <label htmlFor="team">Team:</label>&nbsp;&nbsp;
        <select name="team" value={newPlayer.team} onChange={handleInputChange}>
            <option value="Arsenal">Arsenal</option>
            <option value="Chelsea">Chelsea</option>
            <option value="Man City">Man City</option>
        </select>&nbsp;&nbsp;

        <label htmlFor="goals">Goals:</label>&nbsp;&nbsp;
        <input name="goals" onChange={handleInputChange} type="number" value={newPlayer.goals}/>&nbsp;&nbsp;
        <button type="submit">Add ➕</button>&nbsp;&nbsp;              
    </form>


    <PlayerProfile
    players={players}
    onRemove={handleRemove}
    onReset={handleReset}
    onRest={handleRest}
    onTrain={handleTrain}
    onUpdate={handleUpdate}
    />
    </>
)
}

export default SquadManager5;