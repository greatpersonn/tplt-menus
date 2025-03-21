import Menu from "./components/Menu";

const App = () => {
  const menuConfig = {
    header: {
      isVisible: true,
      title: "Menu"
    },
    tabs: [
      { label: "Tab 1" },
      { label: "Tab 2" },
      { label: "Tab 3" }
    ],
    body: {
      isVisible: true,
      items: [
        { 
          label: "Персонаж",
          content: "Additional content for item 1",
          isActive: false 
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
