const  Coordinates ={
    dir1:"north",
    dir2:"south",
    dir3:"east",
    dir4:1
}

interface User{
    id:number,
    userName?:String,
    userEmail:String,
    Location:String
}

const userData :User ={
    id:1,
    userName:"Pascal",
    userEmail:"pascalkibona@gmail.com",
    Location:"Mbagala"
}

const staff = {
    employee1:userData,
}

const Enums = () =>{
    return(
        <>
        <p>{Coordinates.dir1}</p>
        <p>{Coordinates.dir4}</p>
        <p>{staff.employee1.userName}</p>
        </>
    )
}

export default Enums;