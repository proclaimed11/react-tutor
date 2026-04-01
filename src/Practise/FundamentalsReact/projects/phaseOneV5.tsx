import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type Teams = "Arsenal" | "Chelsea" | "Liverpool" | "Manchester United" | "Manchester City";

type Positions = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";

interface Player{
id:number,
name:string,
team:Teams,
position:Positions,
goals?:number  
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
const [editForm,setEditForm] = useState<Partial<Player>>({});
const [editId, setEditId] = useState<number | null>(null);

const startEditing=(player:Player)=>{
  setEditForm(player);
  setEditId(player.id);  
}

const saveEdit=(playerId:number)=>{

const update={
    ...prop.players.find(player=>player.id === playerId)!,
    ...editForm
}

prop.onUpdate(update);
setEditForm({});
setEditId(null);
}

const cancelEdit=()=>{
    setEditForm({});
    setEditId(null);
}

const handleEditChange=(e:ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
const {name,value} = e.target;
setEditForm((prev)=>({
...prev,
[name]:value
}))
}

const energyColor=(energy:number):string=>{
if(energy > 80) return "green";
if(energy > 50) return "yellow";
return "red"; 
}

return(
    <>
    {prop.players.map(player=>{
       const isEditing = editId === player.id;
       const startEdit = isEditing ? {...player,...editForm}: player;

        return(
            <>
              {isEditing ? 
              (<>
              <label htmlFor="name"></label>
              <input name="name" onChange={handleEditChange} type="text" value={editForm.name ?? ""}/>
              <label htmlFor="position">Position </label>&nbsp;&nbsp;
                <select name="position" onChange={handleEditChange} value={editForm.position}>
                <option value="Forward">Forward</option>
                <option value="Midfielder">Midfieleder</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
                </select>&nbsp;&nbsp;
                <label htmlFor="team">Team </label>&nbsp;&nbsp;
                <select name="team" onChange={handleEditChange} value={editForm.team}>
                <option value="Arsenal">Arsenal</option>
                <option value="Man Utd">Man Utd</option>
                <option value="Chelsea">Chelsea</option>
                <option value="Liverpool">Liverpool</option>
                <option value="Manchester United">Manchester United</option>
                <option value="Manchester City">Manchester City</option>
                </select>&nbsp;&nbsp;
                <label htmlFor="goals">Goals </label>&nbsp;&nbsp;
                <input name="goals" onChange={handleEditChange} type="number" value={editForm.goals ?? ""}/>&nbsp;&nbsp;
                <button onClick={()=>saveEdit(player.id)}>Save ✅</button>&nbsp;&nbsp;
                <button onClick={()=>cancelEdit()}>Cancel ➕</button>&nbsp;&nbsp;
              </>)
              
              :(<>
               <p key={player.id}>
                <span><strong>Name :</strong>{player.name}</span>&nbsp;&nbsp; 
                <span><strong>Team :</strong>{player.team}</span>&nbsp;&nbsp; 
                <span><strong>Position :</strong>{player.position}</span>&nbsp;&nbsp; 
                {player.goals && <><span><strong>Goals :</strong>{player.goals}</span>&nbsp;&nbsp;</>}
                <span><strong style={{color:energyColor(player.energy)}}>Energy :</strong>{player.energy}</span>&nbsp;&nbsp;
                <button onClick={()=>prop.onTrain(player)}>Train</button>&nbsp;&nbsp;  
                <button onClick={()=>prop.onReset(player)}>Reset</button>&nbsp;&nbsp;  
                <button onClick={()=>prop.onRest(player)}>Rest</button>&nbsp;&nbsp;  
                <button onClick={()=>prop.onRemove(player.id)}>Remove</button>&nbsp;&nbsp;  
                <button onClick={()=>startEditing(player)}>Update</button>&nbsp;&nbsp;  
                </p>
              </>)
              }
            </>
        )
    })}
    </>
)
}

const SquadManager5 =()=>{
    const [players, setPlayers] = useState<Player[]>(()=>{
     const saved = localStorage.getItem("players");
     return saved ? JSON.parse(saved) : 
     [
        {id:1,name:"Saka",team:"Arsenal",position:"Forward",goals:12,energy:87},
     ]
    });


    const [newPlayer, setNewPlayer] = useState({
        name:"",
        team:"Arsenal" as Teams,
        position:"Forward" as Positions,
        goals:"",
    });

    const [errors, setErrors] = useState({
        name:"",
        goals:""
    });

    const clamper =(v:number)=>Math.min(Math.max(v, 0), 100);

    const nextId = players.length > 0 ? Math.max(...players.map((player)=>player.id)) + 1 : 1;

    useEffect(()=>{
        localStorage.setItem("players", JSON.stringify(players));
        console.log("Players saved to localStorage");
    },[players])

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
            {...player, energy:100} : player
        ))
       )) 
    }

    const handleRemove=(playerId:number)=>{
        setPlayers((prev)=>(
        prev.filter((player)=>(player.id !== playerId))
        ))
    }

    const handleUpdate=(updatedPlayer:Player)=>{
        setPlayers((prev)=>(
            prev.map((player)=>(
                player.id === updatedPlayer.id ? updatedPlayer : player
            ))
        ))
    }

    const handleChangeInput=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name,value} = e.target;
     setNewPlayer((prev)=>({
        ...prev,
        [name]:value
     }))
    }

    const validateForm=():boolean=>{
     let isValid = true;
     const newErrors = {
        name:"",
        goals:""
     }

     if(!newPlayer.name.trim()){
       newErrors.name = "Name is required";
       isValid = false;
     }else{
      const nameLowerCase = newPlayer.name.trim().toLowerCase();
      const duplicate = players.some((p)=>p.name.toLowerCase() === nameLowerCase);
      if(duplicate){
        newErrors.name = "Player with this name already exists";
        isValid = false;
      }
     }

     if(newPlayer.goals){
        const goalsNumber = Number(newPlayer.goals);
        if(isNaN(goalsNumber)){
            newErrors.goals = "Goals must be a number";
            isValid = false;
        }
     }

     setErrors(newErrors);
     return isValid;
    }

    const handleAddPlayer=(e:FormEvent)=>{
     e.preventDefault();

     if(!validateForm()) return;

     const newPlayerToAdd:Player={
        id:nextId,
        name:newPlayer.name,
        team:newPlayer.team,
        position:newPlayer.position,
        goals:Number(newPlayer.goals),
        energy:100
     }

     setPlayers([...players,newPlayerToAdd]);

     setNewPlayer({
        name:"",
        team:"Arsenal" as Teams,
        position:"Forward" as Positions,
        goals:"", 
     })
    }

    return(
        <>
        <h2>Add new player</h2>
        <form onSubmit={handleAddPlayer}>
            <label htmlFor="name">Name </label>&nbsp;&nbsp;
            <input name="name" onChange={handleChangeInput} type="text" value={newPlayer.name}/>&nbsp;&nbsp;
            {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
            <label htmlFor="position">Position </label>&nbsp;&nbsp;
                <select name="position" onChange={handleChangeInput} value={newPlayer.position}>
                <option value="Forward">Forward</option>
                <option value="Midfielder">Midfieleder</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
            </select>&nbsp;&nbsp;
            <label htmlFor="team">Team </label>&nbsp;&nbsp;
            <select name="team" onChange={handleChangeInput} value={newPlayer.team}>
                <option value="Arsenal">Arsenal</option>
                <option value="Man Utd">Man Utd</option>
                <option value="Chelsea">Chelsea</option>
                <option value="Liverpool">Liverpool</option>
                <option value="Manchester United">Manchester United</option>
                <option value="Manchester City">Manchester City</option>
            </select>&nbsp;&nbsp;
            <label htmlFor="goals">Goals </label>&nbsp;&nbsp;
            <input name="goals" onChange={handleChangeInput} type="number" value={newPlayer.goals}/>&nbsp;&nbsp;
            {errors.goals && <span style={{color:"red"}}>{errors.goals}</span>}
            <button type="submit">Add ➕</button>
        </form>

        <PlayerProfile
        players={players}
        title="Squad Manager"
        onTrain={handleTrain}
        onRest={handleRest}
        onReset={handleReset}
        onRemove={handleRemove}
        onUpdate={handleUpdate} 
        />
        </>
    )
}

export default SquadManager5;