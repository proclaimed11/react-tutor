import "./DashboardV3.css"

const DashboardV3=()=>{
    return(
        <>
        <div className="DashboardV3">
        <div className="HeaderV3">Header</div>
        <div className="SidebarV3">
           <div className="LogoV3">logo</div>
           <nav className="NavigationV3">
            <p>Dasboard</p>
            <p>Settings</p>
            <p>Logout</p>
           </nav>
        </div>
        <div className="MainV3">
            <div className="WidgetsV3">
                <div className="W1">widget 1</div>
                <div className="W2">widget 2</div>
                <div className="W3">widget 3</div>
                <div className="W4">widget 4</div>
                <div className="W5">widget 5</div>
            </div>
            <div className="ContentV3">
               <div className="Content-top">content top</div>
               <div className="Content-bottom">
                <div className="Content-bottom1">content-bottom1</div>
                <div className="Content-bottom2">content-bottom2</div>
               </div>
            </div>
        </div>
        <div className="FooterV3">Footer</div>
        </div>
        </>
    )
}

export default DashboardV3;