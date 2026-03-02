const Position = {
 Forward:"Forward",
 Midfielder:"Midfielder",
 Defender:"Defender",
 GoalKeeper:"GoalKeeper",
}as const;


interface Player{
    id:number,
    name:string,
    position:typeof Position[keyof typeof Position],
    goals?:number,
    energy:number
}

const AppOp=<T,>():{
    players:T[],
    add:(player:T)=>T[],
    allPlayers:()=>T[],
    findById:(id:number)=>T | undefined
}=>{
    let players:T[] = [];

    return{
      players,
      add:(player:T):T[]=>{
        players = [...players, player];
        return players;
      },
      allPlayers:():T[]=>{
        return players;
      },
      findById:(id:number): T | undefined=>{
       return players.find((player)=>(player as any).id === id);
      }
    }
}

const PlayerManager =()=>{
    const engine = AppOp<Player>();

    const allPlayers = engine.allPlayers()

    const simulateTraining = (player:Player, action:"Train"|"Rest")=>{
           const change = action ==="Train" ? -5 : +5;
           const newEnergy = Math.max(0, Math.min(1000, player.energy + change));

           alert(
            `${player.name} is done ${action}ing\n`+
            `Energy: ${player.energy}--->${newEnergy}\n`+
             (action == "Train" ? "Ready for the challenge" : "All rested ready for matchday")
           )
    }

    return(
           <div>
                <h1>{allPlayers.length}</h1>
                {allPlayers.map((player)=>(
                  <p key={player.id}>
                        <span><strong>Player name:</strong>&nbsp;{player.name}</span>&nbsp;
                        <span><strong>Postion:</strong>&nbsp;{player.position}</span>&nbsp;
                        {player.goals !== undefined && <span><strong>Goals:</strong>&nbsp;{player.goals}</span>}&nbsp;
                        <span><strong>Energy:</strong>&nbsp;{player.energy}</span>&nbsp;
                        <button onClick={()=>simulateTraining(player,"Train")}>Train</button>&nbsp;
                        <button onClick={()=>simulateTraining(player,"Rest")}>Rest</button>
                    </p>
                ))}
            </div>
           )

}

export default PlayerManager;