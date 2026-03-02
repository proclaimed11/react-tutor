import "./DashboardV5.css"

const DashboardV5 = () =>{
return(
    <div className="DashboardV5">
        <div className="HeaderV5">Header</div>
        <div className="SidebarV5">
            <div className="LogoV5">Logo</div>
            <nav>
                <p>Dashboard</p>
                <p>Settings</p>
                <p>Logout</p>
            </nav>
        </div>
       
            <div className="MainV5">
                <div className="WidgetsV5">
                    <div className="WOneV5">Widget 1</div>
                    <div className="WTwoV5">Widget 2</div>
                    <div className="WThreeV5">Widget 3</div>
                    <div className="WFourV5">Widget 4</div>
                    <div className="WFiveV5">Widget 5</div>
                </div>
                <div className="ContentTopV5">
                   Content-Top
                </div>
                <div className="ContentBottomV5">
                   <div className="CBOneV5">CB1</div>
                   <div className="CBTwoV5">CB2</div>
                </div>
            </div>
        <div className="FooterV5">Footer</div>
    </div>
)
}

export default DashboardV5;
