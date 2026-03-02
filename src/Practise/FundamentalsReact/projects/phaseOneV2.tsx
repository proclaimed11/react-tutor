const Position ={
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

interface PlayerProps<T>{
    players:T[],
    title?:string,
    onTrain?:(player:T)=>void,
    onRest?:(player:T)=>void,
}

const PlayerList = (props:PlayerProps<Player>)=>{
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
                <h1>{props.title}</h1>
                {props.players.map((player)=>(
                    <p key={player.id}>
                        <span><strong>Player name:</strong>&nbsp;{player.name}</span>&nbsp;
                        <span><strong>Postion:</strong>&nbsp;{player.position}</span>&nbsp;
                        {player.goals !== undefined && <span><strong>Goals:</strong>&nbsp;{player.goals}</span>}&nbsp;
                        <span>Energy:&nbsp;{player.energy}</span>&nbsp;
                        <button onClick={()=>props.onTrain ? props.onTrain:simulateTraining(player,"Train")}>Train</button>&nbsp;
                        <button onClick={()=>props.onRest ? props.onRest:simulateTraining(player,"Rest")}>Rest</button>
                    </p>
                ))}
            </div>
           )
}

const SquadManager=()=>{
    const players =[
    {id:1,name:"Saka", position:Position.Forward,goals:12,energy:87},
    {id:1,name:"Rice", position:Position.Midfielder,goals:6,energy:89},
    {id:1,name:"Saliba", position:Position.Defender,energy:85},
    {id:1,name:"Raya", position:Position.GoalKeeper,energy:82},
    ]

    return(
        <div>
            <PlayerList
             players={players}
             title="Players in the squad"
            />


            <PlayerList
             players={players.filter((player)=>player.position === Position.Forward)}
             title="Forwards in the squad"
            />
        </div>
    )
}

export default SquadManager;