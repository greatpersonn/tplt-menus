import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import OilRig from "./components/OilRig";

function App() {
  const [inventory, setInventory] = useState(["⚙️", "🔧", "🔩", "🛠️", "⚡", "⚡"]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <OilRig inventory={inventory} setInventory={setInventory} />
      </div>
    </DndProvider>
  );
}

export default App;
