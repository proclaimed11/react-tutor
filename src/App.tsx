import "./Border.css";
import "./Margin.css";
import "./Padding.css";
import "./Box-sizing.css";
import "./Flex-box.css";
import "./Grid.css";

function App() {
  return (
    <>
    <h1 className = "double">Hello World</h1>
    <p className = "par1">This is the first paragraph on this code journey practice</p>
    <p className = "par2">This is the second paragraph on this code journey practice</p>
    <p className = "par3">This is the third paragraph on this code journey practice</p>
    <p className = "par4">This is the fourth paragraph on this code journey practice</p>
    <p className = "par5">This is the fifth paragraph on this code journey practice</p>

    <div className="div1">
      <span>This is just a drill</span>
    </div>

    <h3>This is a flex container(affects either column or row - one dimensional)</h3>
    <div className="flex-container">
      <div><span>1</span></div>
      <div><span>2</span></div>
      <div><span>3</span></div>
      <div><span>4</span></div>
    </div>

    {/* <h3>This is a grid container(affects both column or row - two dimensional)</h3> */}
    <div className="grid-container">
      <div><span>item 1</span></div>
      <div><span>2</span></div>
      <div><span>3</span></div>
      <div><span>4</span></div>
      <div><span>5</span></div>
    </div>
    </>
  )
}

export default App
