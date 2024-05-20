import { useShapeContext } from "../ShapeContext";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config";

export default function PropertyEditor() {
  const { shapes, updateShape, deleteShape } = useShapeContext();
  const selectedShapes = shapes.filter((shape) => shape.selected);

  const handlePropertyChange = (shapeId, property, value) => {
    updateShape(shapeId, { [property]: value });
  };

  return (
    <div className="property-editor">
      {selectedShapes.map((selectedShape, index) => (
        <div key={selectedShape.id} className="property-group">
          <h2>{selectedShape.id} Properties:</h2>

          <div className="coordinate-container">
            <p>X: {selectedShape.x}</p>
            <p>Y: {selectedShape.y}</p>
          </div>

          {selectedShape.width && (
            <label>
              Width:
              <input
                type="range"
                min="10"
                max={CANVAS_WIDTH}
                value={selectedShape.width}
                onChange={(e) =>
                  handlePropertyChange(
                    selectedShape.id,
                    "width",
                    e.target.value
                  )
                }
              />
              {selectedShape.width}
            </label>
          )}

          {selectedShape.height && (
            <label>
              Height:
              <input
                type="range"
                min="10"
                max={CANVAS_HEIGHT}
                value={selectedShape.height}
                onChange={(e) =>
                  handlePropertyChange(
                    selectedShape.id,
                    "height",
                    e.target.value
                  )
                }
              />
              {selectedShape.height}
            </label>
          )}

          {selectedShape.radius && (
            <label>
              Radius:
              <input
                type="range"
                min="10"
                max={Math.min(CANVAS_HEIGHT, CANVAS_WIDTH)}
                value={selectedShape.radius}
                onChange={(e) =>
                  handlePropertyChange(
                    selectedShape.id,
                    "radius",
                    e.target.value
                  )
                }
              />
              {selectedShape.radius}
            </label>
          )}

          {selectedShape.scale && (
            <label>
              Scale:
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={selectedShape.scale}
                onChange={(e) =>
                  handlePropertyChange(
                    selectedShape.id,
                    "scale",
                    e.target.value
                  )
                }
              />
              {selectedShape.scale}
            </label>
          )}

          {selectedShape.fill && (
            <label>
              Fill Color:
              <input
                style={{ marginLeft: 10 }}
                type="color"
                value={selectedShape.fill}
                onChange={(e) =>
                  handlePropertyChange(selectedShape.id, "fill", e.target.value)
                }
              />
            </label>
          )}

          <button
            className="delete-button"
            onClick={() => {
              deleteShape(selectedShape.id);
            }}
          >Delete shape</button>

          {index < selectedShapes.length - 1 && (
            <div className="separator"></div>
          )}
        </div>
      ))}
    </div>
  );
}
