import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ReactComponent as ArrowStepIco } from "../assets/images/ArrowStep.svg";
import { ReactComponent as StateIco } from "../assets/images/ControlBtn.svg";
import { ReactComponent as FlameIco } from "../assets/images/Flame.svg";
import "./Furnace.scss";

const ITEM_TYPE = "ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { index, item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="slot" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item}
    </div>
  );
};

const DroppableSlot = ({ index, item, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (draggedItem) => onDrop(draggedItem.index, index),
  }));

  return (
    <div ref={drop} className="slot">
      {item && <DraggableItem item={item} index={index} />}
    </div>
  );
};

const Furnace = ({ inventory, setInventory }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputSlots, setInputSlots] = useState({
    fuel: [null], 
    materials: [null, null], 
  });
  
  const [outputSlots, setOutputSlots] = useState(Array(3).fill(null));

  const handleDropToFurnace = (fromIndex, toSection, toIndex) => {
    const item = inventory[fromIndex];
  
    if (!item) return;
  
    setInputSlots((prev) => {
      const newSlots = { ...prev };
      newSlots[toSection][toIndex] = item;
      return newSlots;
    });
  
    setInventory((prev) => {
      const newInventory = [...prev];
      newInventory[fromIndex] = null;
      return newInventory;
    });
  };
  

  const handleDropToInventory = (fromIndex, toIndex) => {
    const item = outputSlots[fromIndex];

    if (item) {
      setInventory((prev) => {
        const newInventory = [...prev];
        newInventory[toIndex] = item;
        return newInventory;
      });

      setOutputSlots((prev) => {
        const newSlots = [...prev];
        newSlots[fromIndex] = null;
        return newSlots;
      });
    }
  };

  const handleProcess = () => {
    setIsProcessing(!isProcessing);

    if (!isProcessing) {
      setTimeout(() => {
        setOutputSlots(inputSlots.map((item) => (item ? "🔩" : null)));
        setInputSlots(Array(6).fill(null));
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="furnace">
      <span className="furnace__title">
        <FlameIco />
        Печь
      </span>

      <div className="furnace__section">
        <span>Топливо</span>
        <div className="slots">
          <DroppableSlot 
            index={0} 
            item={inputSlots.fuel[0]} 
            onDrop={(fromIndex) => handleDropToFurnace(fromIndex, "fuel", 0)} 
          />
        </div>
      </div>

      <div className="furnace__svg">
        <ArrowStepIco />
      </div>
      
      <div className="furnace__section">
        <span>Сырьё</span>
        <div className="slots">
          {inputSlots.materials.map((item, index) => (
            <DroppableSlot 
              key={index} 
              index={index} 
              item={item} 
              onDrop={(fromIndex) => handleDropToFurnace(fromIndex, "materials", index)} 
            />
          ))}
        </div>
      </div>

      <div className="furnace__svg">
        <ArrowStepIco />
        <ArrowStepIco />
      </div>

      <div className="furnace__section">
        <span>Результат</span>
        <div className="slots">
          {outputSlots.map((item, index) => (
            <DroppableSlot key={index} index={index} item={item} onDrop={handleDropToInventory} />
          ))}
        </div>
      </div>

      <div className="furnace__footer">
        <div className="footer__title">Управление</div>
        <div className="footer__content">
          <button
            className={`furnace__button ${
              isProcessing ? "furnace__button--stop" : "furnace__button--start"
            }`}
            onClick={handleProcess}
          >
            <StateIco /> {isProcessing ? "Остановить" : "Запустить"}
          </button>

          <span className="furnace__info">
          Убедитесь, что в печь загружено топливо и обрабатываемые предметы. 
          Топливо помещается в верхний слот, а обрабатываемые предметы – в средний. 
          Готовый результат появится в выходном слоте.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Furnace;
