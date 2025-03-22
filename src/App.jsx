import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Furnace from "./components/Furnace";

function App() {
  const [inventory, setInventory] = useState(["⚙️", "🔧", "🔩", "🛠️", "⚡", "⚡"]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Furnace inventory={inventory} setInventory={setInventory} />
      </div>
    </DndProvider>
  );
}

export default App;
