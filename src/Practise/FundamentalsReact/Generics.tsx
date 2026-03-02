interface UserId{
    id:number
}

//=============Generics in interfaces==================
interface Rectangle<T>{
    length:T,
    width:T
}

const rectangle: Rectangle<number> ={
    length:20,
    width:20
}

//Multiple params passed
const Introduction=<T,U>(name:T, age:U):string =>{
return `my name is ${name} and I am ${age} years old`
}

const intro = Introduction<string,number>("Pascal",27);

const Merger=<A,B = number>(arsenal:A, positions:B):A & B=>{
return {...arsenal,...positions}
}

const combo = Merger({player1:"odegaard"},{pos:1})

//===============[Exends]:what ever parameter pased must have the id property=====
const myUser =<T extends UserId >(user:T):number=>{
return user.id;
}

const myUserId = myUser({id:203, name:"Pascal"})


//=======Generics in functions============
const Value = <T,>(myValue:T):T=>{
 return myValue;
}

const myName = Value<string>("Pascal");



//===============Generics in classes===========
class Vehicle<T>{
    private players:T[]=[];
    push=(player:T):T=>{
        this.players.push(player);
        return player;
    }
    pop=():T|undefined=>{return this.players.pop()}
    getAllPlayers=():T[]=>{return this.players}
}
const arsenal = new Vehicle<string>();
arsenal.push("Rice");
arsenal.push("Saka");
const currentPlayers:string[] = arsenal.getAllPlayers();

const Generics = () =>{
    return (
    <div>
       <h2>This is my user's id: {myUserId} & name:{myName}</h2>
       <p>This is the Arsenal current playes:</p>
       <p>{intro}</p>
       <ul>{currentPlayers.map((player)=><li>{player}</li>)}</ul>
       <p>The length of the rectangle is:{rectangle.length}</p>
       <p>The width of the rectangle is: {rectangle.width}</p>
    </div>
    )
}

export default Generics;