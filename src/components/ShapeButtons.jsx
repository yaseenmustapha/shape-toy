// ShapeButtons.jsx
import { useShapeContext } from "../ShapeContext";
import { shapesConfig } from "../config";

export default function ShapeButtons() {
  const { shapes, addShape } = useShapeContext();

  const generateShapeId = (shapeType) => {
    const totalShapeCount = shapes.length + 1;
    return `shape-${String(totalShapeCount).padStart(3, "0")}-${shapeType}`;
  };

  const handleAddShape = (shapeType) => {
    const { default: defaultProperties, initialPosition } =
      shapesConfig[shapeType];
    const shape = {
      id: generateShapeId(shapeType),
      type: shapeType,
      ...defaultProperties,
      ...initialPosition,
    };

    addShape(shape);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {Object.keys(shapesConfig).map((shapeType) => (
        <button
          key={shapeType}
          style={{ marginRight: 10 }}
          onClick={() => handleAddShape(shapeType)}
        >
          Add {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)}
        </button>
      ))}
    </div>
  );
}
