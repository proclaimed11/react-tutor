import "./Dashboardv7..css";

const DashboardV7 = ()=>{
    return(
        <div className="DashboardV7">
            <div className="HeaderV7">Header</div>
            <div className="SidebarV7">
                <div className="LogoV7">LOGO</div>
                    <nav>
                        <p>Dashboard</p>
                        <p>Settings</p>
                        <p>Logout</p>
                    </nav>
            </div>
            <div className="ScrollableMainV7">
                <div className="WidgetV7">
                     <div className="WOneV7">W1</div>
                     <div className="WTwoV7">W2</div>
                     <div className="WThreeV7">W3</div>
                     <div className="WFourV7">W4</div>
                     <div className="WFiveV7">W5</div>
                </div>

                {/* Top cotent */}
                <div className="ContentTopV7">
                     <div className="TopLeftV7">
                       <div className="TL1">TL1</div>
                       <div className="TL2">TL2</div>
                       <div className="TL3">TL3</div>
                     </div>
                     <div className="TopRightV7">
                       <div className="TR1">TR1</div>
                       <div className="TR2">TR2</div>
                       <div className="TR3">TR3</div>
                     </div>
                </div>

                <div className="ContentBottomV7">
                    <div className="BottomLeft1">Bottom Left</div>
                    <div className="BottomRight1">Bottom Right</div>
                </div>

                <div className="Content2BottomV7">
                    <div className="BottomLeft2">Bottom Left</div>
                    <div className="BottomRight2">Bottom Right</div>
                </div>
            </div>
            <div className="FooterV7">Footer</div>
        </div>
    )
}

export default DashboardV7