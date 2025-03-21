import Menu from "./components/Menu";

const App = () => {
  const menuConfig = {
    header: {
      isVisible: true,
      title: "Menu"
    },
    tabs: [
      { label: "Основное" },
      { label: "Дополнительно" },
      { label: "Администрация" }
    ],
    body: {
      isVisible: true,
      items: [
        { 
          label: "Персонаж",
          content: "Additional content for item 1",
          isActive: true 
        },
      ]
    },
    footer: {
      isVisible: true,
      title: "LambdaRDR"
    },
    position: { x: 0, y: 0 }
  };

  return (
    <>
      <Menu config={menuConfig} />
    </>
  );
}
export default App;
