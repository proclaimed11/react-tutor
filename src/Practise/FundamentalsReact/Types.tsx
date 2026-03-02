let isActive: boolean = true;
let age: any = "Twenty Seven";
age = 27;
let firstName: String = "John";
let intro: String =`Hello , my name is ${firstName} and I am ${age} years old.`;

const unique: symbol = Symbol("id-1");

const names: String [] = ['Saka', 'Odegaard', 'Martinelli', 'Saliba'];
names.push('Calafiori');

const values:(String | number)[] = [ 'Saka', 10, 'Odegaard', 8, 'Martinelli', 9 ];

const myObj = {
    [unique]:"This is a unique propery"
};


const Type = () =>{
    return (
    <div>
        <h2>Boolean value is: {isActive?.toString()}</h2>
        <h2>Number value is: {age}</h2>
        <h2>String value is: {firstName}</h2>
        <h2>Introduction: {intro}</h2>
        <h2>Unique Symbol value is: {myObj[unique]}</h2>
        <h2>Arsenal players in the array are:</h2>
        <ul>
            {names.map((name: String ,pos:number) => <li>{pos + 1}&nbsp;{name}</li>)}
        </ul>
        <h2>Values in the mixed array are:</h2>
        <ul>
            {values.map((val: String | number ,pos:number) => <li>{pos + 1}&nbsp;{val}</li>)}
        </ul>
    </div>
    )
}

export default Type;