import "./DashboardV6.css";

const DashboardV6 = ()=>{
    return(
        <div className="DashboardV6">
           <div className="HeaderV6">HEADER</div>
           <div className="SidebarV6">
            <div className="LogoV6">Logo</div>
            <nav>
                <p>Dashboard</p>
                <p>Settings</p>
                <p>Logout</p>
            </nav>
           </div>
           <div className="ScrollableMainV6">
                <div className="WidgetsV6">
                    <div className="WOneV6">Widget One</div>
                    <div className="WTwoV6">Widget Two</div>
                    <div className="WThreeV6">Widget Three</div>
                    <div className="WFourV6">Widget Four</div>
                    <div className="WFiveV6">Widget Five</div>
                </div>

                {/* Top content */}
                <div className="ContentTopV6">   
                    <div className="SectionLeftV6">
                        <div className="TopLeftOneV6">Top Left One</div>
                        <div className="TopLeftTwoV6">Top Left Two</div>
                        <div className="TopLeftThreeV6">Top Left Three</div>
                    </div>
                    <div className="SectionRightV6">
                        <div className="TopRightOneV6">Top Right One</div>
                        <div className="TopRightTwoV6">Top Right Two</div>
                        <div className="TopRightThreeV6">Top Right Three</div>
                    </div>
                </div>

                {/* Bottom content for scrolling purposes duplicated */}
                <div className="ContentBottomV6">
                    <div className="BottomOneV6">Bottom One</div>
                    <div className="BottomTwoV6">Bottom Two</div>
                </div>
                <div className="ContentBottomV6">
                    <div className="BottomOneV6">Bottom One</div>
                    <div className="BottomTwoV6">Bottom Two</div>
                </div>
                <div className="ContentBottomV6">
                    <div className="BottomOneV6">Bottom One</div>
                    <div className="BottomTwoV6">Bottom Two</div>
                </div>
           </div>
           <div className="FooterV6">FOOTER</div>
        </div>
    )
}

export default DashboardV6;