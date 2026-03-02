import type React from "react";

//normal props
interface User{
    name:String;
    age?:number;
}

//component children
interface BoxProps{
    children:React.ReactNode;
}

interface TeamProps{
    players:String[]; //Arrays
    scores:{home:number, away:number};
}

interface ButtonProps{
    onclick:(event:React.MouseEvent)=>void;
    label:String;
}

interface StatusProps{
    level:"low"|"medium" | "high";
    value:String | number;
}

interface Title{
    title:String;
    children?:React.ReactNode;
}

//================Normal props application=============
// const Functions= (props:User)=>{
//    return( 
//     <>
//      <p>
//       Hello {props.name}!
//       {props.age ? ` I am ${props.age} years old`: ""}
//       </p>
//     </>
//     )
// }

//=================using the interface parameters as props===================
// const Functions= ({name, age}:User)=>{
//    return( 
//     <>
//      <p>
//       Hello {name}!
//       {age ? ` I am ${age} years old`: ""}
//       </p>
//     </>
//     )
// }


//================children props=============================
// const Functions = ({children}:BoxProps)=>{
//    return( 
//     <>
//      <div style={{border: '1px solid red'}}>{children}</div>
//     </>
//     )
// }

//=============passing objects and Arrays as props=======================
// const Functions = (props:TeamProps)=>{
//    return( 
//     <>
//      <div>
//         <ul>
//             {props.players.map((player)=><li>{player}</li>)}
//         </ul>
//         <p>
//             Scores: Home {props.scores.home} - Away {props.scores.away}
//         </p>
//      </div>
//     </>
//     )
// }

//=======================passing declared interface values as props=========================
// const Functions = (props:StatusProps)=>{
//    return( 
//     <>
//      <div>
//        <p>level:{props.level} number:{props.value}</p>
//      </div>
//     </>
//     )
// }

//=======================using the React.FC prop with built in children property==============
const Functions:React.FC<Title> = ({title, children}:Title)=>{
   return( 
    <div>
    <h2>{title}</h2>
    {children}
    </div>
    )
}

export default Functions;
