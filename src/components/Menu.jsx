import React, { useState, useRef, useEffect } from 'react';
import Draggable from "react-draggable";
import NUI from '../drivers/NUI.js';
import closeMark from '../assets/close.png'
import './Menu.scss';
import '../scrollbar.scss';

const Menu = ({ config, updateConfig }) => {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({
    x: config.position?.x || 0,
    y: config.position?.y || 0,
  });

  const handleDragStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);

    if (updateConfig) {
      updateConfig({
        ...config,
        position: newPosition,
      });
    }
  };

  useEffect(() => {
    NUI.initListeners();
    NUI.addMessageListener('open_menu', () => {
        console.log("open menu event");
    })
  }, [])

  return (
    <Draggable nodeRef={nodeRef} position={position} onStop={handleDragStop} bounds={'parent'}>
      <div ref={nodeRef} className="container-menu">
        { config.header.isVisible && <div className="menu-title">{config.header.title} 
            <div className="close-menu">
              <img src={closeMark} alt="closeMenu" />
            </div>
          </div>
        }
        { config.body.isVisible && <div className="menu-body">
            <ul className="menu-items">
              {config.body.items.map((item, index) => (
                <li key={index} className={`menu-item ${item.isActive ? 'active' : ''}`}>
                  {item.label} {index}
                </li>
              ))}
            </ul>
          </div>
        }
        { config.footer.isVisible && <div className="menu-footer">{config.footer.title}</div> }
      </div>
    </Draggable>
  );
};

export default Menu;