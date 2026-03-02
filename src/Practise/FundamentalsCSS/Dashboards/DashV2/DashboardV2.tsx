import "./DashboardV2.css"

const DashboardV2 =() =>{
return(
    <>
     <div className="dashboardV2">
        <div className="sidebarV2">
            <div className="logoV2">Logo</div>
            <nav>
                <p>Dashboards</p>
                <p>Settings</p>
                <p>Logout</p>
            </nav>
        </div>
         <div className="headerV2">
            <div className="pageV2">Heading</div>
            <div className="accountV2">
                Account icon
            </div>
         </div>
        <div className="mainV2">
            <div className ="widgets-conainerV2">
               <div className="widget1">widget 1</div>
               <div className="widget2">widget 2</div>
               <div className="widget3">widget 3</div>
            </div>
        
            <div className="main-content">
                <div className="content1">
                    content1
                </div>
                <div className="content-bottom">
                 <div className="content2">
                    content2
                </div>
                <div className="content3">
                    content3
                </div>
                </div>
            </div>
        </div>
        <div className="footerV2">Footer</div>
     </div>
    </>
)
}
export default DashboardV2;