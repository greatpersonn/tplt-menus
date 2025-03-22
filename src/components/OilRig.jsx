import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ReactComponent as OilIco } from "../assets/images/Oil.svg";
import { ReactComponent as StateIco } from "../assets/images/Vector.svg";
import "./OilRig.scss";

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

const OilRig = ({ inventory, setInventory }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputSlots, setInputSlots] = useState(Array(1).fill(null));
  const [outputSlots, setOutputSlots] = useState(Array(3).fill(null));

  // 🎯 Перемещение предмета в переработчик
  const handleDropToOilRig = (fromIndex, toIndex) => {
    const item = inventory[fromIndex];

    if (item) {
      setInputSlots((prev) => {
        const newSlots = [...prev];
        newSlots[toIndex] = item;
        return newSlots;
      });

      setInventory((prev) => {
        const newInventory = [...prev];
        newInventory[fromIndex] = null;
        return newInventory;
      });
    }
  };

  // 🎯 Забираем обработанные предметы
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

  // 🎯 Запускаем переработку
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
    <div className="oiler">
      <span className="oiler__title">
        <OilIco />
        Нефтевышка
      </span>

      <div className="oiler__section">
        <span>Входящие</span>
        <div className="slots">
          {inputSlots.map((item, index) => (
            <DroppableSlot key={index} index={index} item={item} onDrop={handleDropToOilRig} />
          ))}
        </div>
      </div>

      <div className="oiler__section">
        <span>Результат</span>
        <div className="slots">
          {outputSlots.map((item, index) => (
            <DroppableSlot key={index} index={index} item={item} onDrop={handleDropToInventory} />
          ))}
        </div>
      </div>

      <div className="oiler__footer">
        <div className="footer__title">Управление</div>
        <div className="footer__content">
          <button
            className={`oiler__button ${
              isProcessing ? "oiler__button--stop" : "oiler__button--start"
            }`}
            onClick={handleProcess}
          >
            <StateIco /> {isProcessing ? "Остановить" : "Запустить"}
          </button>

          <span className="oiler__info">
            Убедитесь, что нефтевышка загружена необходимым топлевом в слоте. 
            Только после этого начнётся переработка, 
            и готовые материалы появятся в выходных слотах.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OilRig;
