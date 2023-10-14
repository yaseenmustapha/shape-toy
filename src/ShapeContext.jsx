/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// ShapeContext.jsx
import { createContext, useContext, useState } from "react";

const ShapeContext = createContext();

export function useShapeContext() {
  return useContext(ShapeContext);
}

export function ShapeProvider({ children }) {
  const [shapes, setShapes] = useState([]);

  const addShape = (shape) => {
    // Add the shape to the state
    setShapes([...shapes, shape]);
  };

  const deleteShape = (shapeId) => {
    // Remove the shape from the state
    setShapes(shapes.filter((shape) => shape.id !== shapeId));
  };

  const updateShape = (shapeId, newProperties) => {
    // Update the properties of the shape in the state
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, ...newProperties } : shape
      )
    );
  };

  const selectShape = (shapeId) => {
    // Set the shape as selected
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, selected: true } : shape
      )
    );
  };

  const deselectShape = (shapeId) => {
    // Set the shape as deselected
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, selected: false } : shape
      )
    );
  };

  return (
    <ShapeContext.Provider
      value={{
        shapes,
        addShape,
        deleteShape,
        updateShape,
        selectShape,
        deselectShape,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
}
