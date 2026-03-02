import "./DashboardV4.css";

const DashboardV4 =()=>{
    return(
        <div className="DashboardV4">
          <div className="HeaderV4">Header</div>
          <div className="SidebarV4">
            <div className="LogoV4">logo</div>
            <nav>
                <p>Dashboard</p>
                <p>Settings</p>
                <p>Logout</p>
            </nav>
          </div>
          <div className="MainV4">
            <div className="WidgetsV4">
                <div className="WOneV4">Widget 1</div>
                <div className="WTwoV4">Widget 1</div>
                <div className="WThreeV4">Widget 1</div>
                <div className="WFourV4">Widget 1</div>
                <div className="WFiveV4">Widget 1</div>
            </div>
            <div className="ContentTopV4">
                Top-content
            </div>
            <div className="ContentBottomV4">
                <div className="CBOneV4">Bottom-Content1</div>
                <div className="CBTwoV4">Bottom-Content2</div>
            </div>
          </div>
          <div className="FooterV4">Footer</div>
        </div>
    )
}

export default DashboardV4;