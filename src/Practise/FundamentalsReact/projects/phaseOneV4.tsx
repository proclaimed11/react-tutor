import { useState } from "react";

type Position = 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';
type Team = 'Arsenal' | 'Man United' | 'Chelsea' | 'Liverpool'| 'Man City' | 'Tottenham';

interface Player{
  id:number,
  name:string,
  team:Team,
  position:Position,
  goals?:number,
  energyLevel:number,
}

interface TeamProps<T>{
  players:T[],
  OnTrain:(player:T)=>void,  
  OnReset:(player:T)=>void,
  OnDelete:(playerID:number)=>void,
  OnRest:(player:T)=>void,
}

const PlayerProps =(props:TeamProps<Player>)=>{
  const enerrgyColor=(value:number):string=>{
      if(value > 70) return 'green';
      if(value > 30) return 'orange';
      return 'red';
  }

  return(
    <div>
      {props.players.map((player)=>(
        <p key={player.id}>
          <span>Name: {player.name}</span>&nbsp;
          <span>Position:{player.position}</span>&nbsp;
          <span>Team: {player.team}</span>&nbsp;
          {player.goals && <span>Goals: {player.goals}</span>}&nbsp;
          <span style={{color:enerrgyColor(player.energyLevel)}}>Energy:{player.energyLevel}</span>
        </p>
      ))}
    </div>
  )
}

const PlayerList = () => {
  const [players,SetPlayers] = useState<Player[]>([
    {id:1,name:'Rice',team:'Arsenal',position:'Forward',goals:10,energyLevel:80},
    {id:2,name:'Cherki',team:'Man City',position:'Midfielder',goals:10,energyLevel:80},
    {id:3,name:'James',team:'Chelsea',position:'Defender',goals:10,energyLevel:80},
  ])

  const [newPlayer, SetNewPlayer] = useState({
   name:"",
   team:"Arsenal" as Team,
   position:"Forward" as Position,
   goals:""
  })

  const nextId = players.length ? Math.max(...players.map((player)=>player.id))+1 : 1;

  const clamp = (value:number) => Math.max(0,Math.min(100,value));

  const handleTrain = (playerToUpdate:Player) =>{
    SetPlayers((prev)=>
      prev.map((player)=>(
        player.id === playerToUpdate.id ?
        {...player, energyLevel:clamp(player.energyLevel-10)} : player
      ))
    );
  }
}

