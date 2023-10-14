import "./App.css";
import Canvas from "./components/Canvas";
import ShapeButtons from "./components/ShapeButtons";
import PropertyEditor from "./components/PropertyEditor";
import { useShapeContext } from "./ShapeContext";

function App() {
  const { shapes } = useShapeContext();
  const hasSelectedShapes = shapes.some((shape) => shape.selected);

  return (
    <div className="app-container">
      <div className="canvas-container">
        <ShapeButtons />
        <Canvas />
      </div>

      <div className="property-editor-container">
        {hasSelectedShapes && <PropertyEditor />}
      </div>
    </div>
  );
}

export default App;
