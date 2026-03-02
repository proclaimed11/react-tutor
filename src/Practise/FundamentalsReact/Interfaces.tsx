const volume:{len: number, width:number, height:number} = {
  len:30,
  width:20,
  height:10
}

interface Rectangle{
    length:number,
    width:number
}

const rectangle: Rectangle ={
    length:20,
    width:20
}


type appName = string;

const myApp: appName = "This is a calculator";

type Calculation  = "Area" | "Parameter";

const area: Calculation = "Area";

const para: Calculation = "Parameter";

const Interfaces = () =>{
    return (
    <div>
       <h2>{myApp}</h2>
       <p>The length of the rectangle is:{rectangle.length}</p>
       <p>The width of the rectangle is: {rectangle.width}</p>
       <p>The {area} of this rectangle is {rectangle.length * rectangle.width}</p>
       <p>The {para} of this rectangle is {2* (rectangle.length + rectangle.width)}</p>
       <p>The volumne of this rectangle if it was a cube would have been: {volume.height*volume.len*volume.width}</p>
    </div>
    )
}

export default Interfaces;