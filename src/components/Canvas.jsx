// Canvas.jsx
import { useRef, useEffect, useState } from "react";
import { useShapeContext } from "../ShapeContext";
import { CANVAS_HEIGHT, CANVAS_WIDTH, shapesConfig } from "../config";

export default function Canvas() {
  const canvasRef = useRef(null);

  const { shapes, selectShape, deselectShape, updateShape } = useShapeContext();
  const selectedShapes = shapes.filter((shape) => shape.selected);
  const [hoveredShape, setHoveredShape] = useState(null);

  const [dragging, setDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [startClickPos, setStartClickPos] = useState({});
  const [selectedStatusOnClickStart, setSelectedStatusOnClickStart] =
    useState(false); // Keeps track of whether shape was selected or not when it was first clicked

  // Draw shapes whenever shapes array or currently hoveredShape changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawShape = (shape) => {
      ctx.fillStyle = shape.fill;
      ctx.beginPath();
      shapesConfig[shape.type].draw(ctx, shape);
      ctx.fill();

      // If the shape is selected or hovered, draw an outline
      if (shape.id === hoveredShape) {
        ctx.strokeStyle =
          "rgba(0, 0, 255" + (shape.selected ? "" : ", 0.5") + ")"; // Solid blue if selected, semi-transparent blue otherwise
        ctx.lineWidth = shape.selected ? 5 : 3; // Extra thick outline if selected, standard thickness otherwise
        ctx.stroke();
      } else if (shape.selected) {
        ctx.strokeStyle = "rgba(0, 0, 255)"; // Solid blue
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    shapes.forEach((shape) => {
      drawShape(shape);
    });
  }, [shapes, hoveredShape]);

  // Handle mouse down event
  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    setStartClickPos({ x: mouseX, y: mouseY });

    const selectedShape = shapes.find((shape) =>
      isPointInShape(ctx, mouseX, mouseY, shape)
    );

    if (event.shiftKey && selectedShapes.length >= 1) {
      // When SHIFT is held down, toggle selection without deselecting others
      if (selectedShape) {
        if (selectedShape.selected) {
          deselectShape(selectedShape.id);
        } else {
          selectShape(selectedShape.id);
        }
      }
    } else {
      // SHIFT not being held; ensure only one shape at a time is selected
      if (selectedShape) {
        setSelectedStatusOnClickStart(selectedShape.selected);

        if (selectedShape.selected) {
          // Clicked on an already selected shape, so start dragging it
          setDragging(true);
          setDragStartPos({ x: mouseX, y: mouseY });
        } else {
          // Clicked on a new shape, so deselect all shapes except the clicked one
          shapes.forEach((shape) => {
            if (shape.selected && shape.id !== selectedShape.id) {
              deselectShape(shape.id);
            }
          });
          selectShape(selectedShape.id);

          // Start dragging the selected shape
          setDragging(true);
          setDragStartPos({ x: mouseX, y: mouseY });
        }
      } else {
        // Deselect all shapes when clicking outside
        shapes.forEach((shape) => {
          if (shape.selected) {
            deselectShape(shape.id);
          }
        });
      }
    }
  };

  // Handle mouse move event
  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (dragging) {
      // Calculate the new position based on the drag movement
      const dx = mouseX - dragStartPos.x;
      const dy = mouseY - dragStartPos.y;

      // Update the position of selected shapes
      shapes.forEach((shape) => {
        if (shape.selected) {
          updateShape(shape.id, {
            x: shape.x + dx,
            y: shape.y + dy,
          });
        }
      });

      // Update the drag start position
      setDragStartPos({ x: mouseX, y: mouseY });
    } else {
      let isHovering = false;

      // If cursor is in shape boundaries, set it as the hovered shape
      shapes.forEach((shape) => {
        if (isPointInShape(ctx, mouseX, mouseY, shape)) {
          isHovering = true;
          setHoveredShape(shape.id);
        }
      });

      if (!isHovering) {
        setHoveredShape(null);
      }
    }
  };

  // Handle mouse up event
  const handleMouseUp = (event) => {
    // End the drag operation when the mouse button is released
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (selectedShapes.length === 1) {
      // If there's only one selected shape
      if (startClickPos.x === mouseX && startClickPos.y === mouseY) {
        // If the mouse was clicked at the same position where it was released
        const selectedShape = shapes.find((shape) =>
          isPointInShape(ctx, mouseX, mouseY, shape)
        );

        if (selectedShape && selectedStatusOnClickStart) {
          // If the selected shape was already selected at the start of the click
          deselectShape(selectedShape.id); // Deselect the shape
        }
      }
    } else if (selectedShapes.length > 1 && !event.shiftKey) {
      // If there are multiple selected shapes and SHIFT is not held down
      if (startClickPos.x === mouseX && startClickPos.y === mouseY) {
        // If the mouse was clicked at the same position where it was released
        const selectedShape = shapes.find((shape) =>
          isPointInShape(ctx, mouseX, mouseY, shape)
        );

        if (selectedShape && selectedStatusOnClickStart) {
          // If the selected shape was already selected at the start of the click
          selectShape(selectedShape.id); // Select the shape

          // Deselect all other selected shapes
          shapes.forEach((shape) => {
            if (shape.selected && shape.id !== selectedShape.id) {
              deselectShape(shape.id);
            }
          });
        }
      }
    }
    setDragging(false); // End the drag operation
  };

  const handleMouseLeave = () => {
    // End the drag operation when the mouse leaves the canvas
    setDragging(false);
  };

  const isPointInShape = (ctx, x, y, shape) => {
    // Check if cursor intersects shape
    ctx.beginPath();
    shapesConfig[shape.type].draw(ctx, shape);
    return ctx.isPointInPath(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid gray", borderRadius: 8 }}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    ></canvas>
  );
}
