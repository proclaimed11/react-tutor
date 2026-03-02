import './DashboardV8.css';

const DashboardV8=()=>{
    return(
        <div className="DashboardV8">
            <div className="HeaderV8">Header</div>
            <div className="Sidebarv8">
                <nav>
                <p>Dashboard</p>
                <p>Settings</p>
                <p>Logout</p>
                </nav>
            </div>
            <div className="ScrollabeMainV8">
              <div className="WidgetV8">
                  <div className="WOneV8">W1</div>
                  <div className="WTwoV8">W2</div>
                  <div className="WThreeV8">W3</div>
                  <div className="WFourV8">W4</div>
                  <div className="WFiveV8">W5</div>
              </div>

              <div className="ContentTopV8">
                <div className="ContentTopOneV8">
                  <div className="CTLeftOne">TL1</div> 
                  <div className="CTLeftTwo">TL2</div> 
                </div>
                <div className="ContentTopTwoV8">
                  <div className="CRightOne">TR1</div> 
                  <div className="CRightTwo">TR2</div> 
                </div>
              </div>

            <div className="ContentBottomOneV8">
               Bottom Content One
            </div>

            <div className="ContentBottomTwoV8">
              Bottom Content Two
            </div>

            </div>
            <div className="FooterV8">Footer</div>
        </div>
    )
}

export default DashboardV8;