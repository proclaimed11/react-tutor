import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx';
import Type from './Practise/FundamentalsReact/Types.tsx';
import Interfaces from './Practise/FundamentalsReact/Interfaces.tsx';
import DashboardV1 from './Practise/FundamentalsCSS/Dashboards/DashV1/DashboardV1.tsx';
import WebV1 from './Practise/FundamentalsCSS/Websites/WebV1/WebV2.tsx';
import Enums from './Practise/FundamentalsReact/Enums.tsx';
import DashboardV2 from './Practise/FundamentalsCSS/Dashboards/DashV2/DashboardV2.tsx';
import Functions from './Practise/FundamentalsReact/FunctionsProps.tsx';
import Generics from './Practise/FundamentalsReact/Generics.tsx';
import DashboardV3 from './Practise/FundamentalsCSS/Dashboards/DashV3/DashboardV3.tsx';
import DashboardV4 from './Practise/FundamentalsCSS/Dashboards/DashV4/DashboardV4.tsx';
import DashboardV5 from './Practise/FundamentalsCSS/Dashboards/DashV5/DashboardV5.tsx';
import DashboardV6 from './Practise/FundamentalsCSS/Dashboards/DashV6/DashboardV6.tsx';
import PlayerManager from './Practise/FundamentalsReact/projects/phaseOne.tsx';
import SquadManager from './Practise/FundamentalsReact/projects/phaseOneV2.tsx';
import DashboardV7 from './Practise/FundamentalsCSS/Dashboards/DashV7/DashboardV7.tsx';
import Usestate from './Practise/FundamentalsReact/UseState.tsx';
import SquadManagerV3 from './Practise/FundamentalsReact/projects/phaseOneV3.tsx';
import SquadMangerV4 from './Practise/FundamentalsReact/projects/phaseOneV4.tsx';
import DashboardV8 from './Practise/FundamentalsCSS/Dashboards/DashV8/DashboardV8.tsx';
import UseEffect from './Practise/FundamentalsReact/UseEffect.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* css basics */}
    {/* <App /> */}

    {/* dashboards */}
    {/* <DashboardV8/> */}

    {/* websites */}
    {/* <WebV1/> */}

    {/* React TypeScript basics */}
    
    {/* <Type /> */}
    
    {/* <Interfaces /> */}

    {/* <Enums/> */}

    {/* functions-Props */}
    {/* <Functions level="high" value={2}/> */}
    {/* <Functions title="Hello">
      <p>This is inside!</p>  // Works without error
    </Functions> */}
    {/* <Functions><p>This is inside a box</p></Functions> */}

    {/* <Generics/> */}

      {/* <Usestate/> */}

      <UseEffect/>

    {/* <SquadManagerV3/>  */}

    {/* <SquadMangerV4/> */}

  
  </StrictMode>,
)
