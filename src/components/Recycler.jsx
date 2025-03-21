import { useState } from "react";
import { ReactComponent as RecycleIco } from '../assets/images/Group.svg';
import { ReactComponent as StateIco } from '../assets/images/Vector.svg';
import "./Recycler.scss";

const Recycler = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputSlots, setInputSlots] = useState(Array(6).fill(null));
  const [outputSlots, setOutputSlots] = useState(Array(6).fill(null));

  const handleProcess = () => {
    setIsProcessing(!isProcessing);

    if (!isProcessing) {
      setTimeout(() => {
        setOutputSlots(inputSlots.map(() => "!"));
        setInputSlots(Array(6).fill(null));
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="recycler">
      <span className="recycler__title">
        <RecycleIco />
        Переработчик компонентов
      </span>

      <div className="recycler__section">
        <span>Входящие</span>
        <div className="slots">
          {inputSlots.map((item, index) => (
            <div key={index} className="slot"
              onClick={() => {
                const newSlots = [...inputSlots];
                newSlots[index] = newSlots[index] ? null : "?";
                setInputSlots(newSlots);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="recycler__section">
        <span>Результат</span>
        <div className="slots">
          {outputSlots.map((item, index) => (
            <div key={index} className="slot">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="recycler__footer">
        <div className="footer__title">
            Управление
        </div>
        <div className="footer__content">
            <button className={`recycler__button ${isProcessing ? "recycler__button--stop" : "recycler__button--start"}`} onClick={handleProcess} >
                <StateIco /> {isProcessing ? "Отключить" : "Запустить"}
            </button>

            <span className="recycler__info">
                Убедитесь, что переработчик загружен необходимыми предметами в слоты для сырья. Только после этого начнётся переработка, и готовые материалы появятся в выходных слотах.
            </span>
        </div>
      </div>
    </div>
  );
};

export default Recycler;
