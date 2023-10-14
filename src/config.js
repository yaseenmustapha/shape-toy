// config.js
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 900;

export const shapesConfig = {
  rectangle: {
    default: {
      width: 200,
      height: 100,
      fill: "white",
      selected: false,
    },
    initialPosition: {
      x: CANVAS_WIDTH / 2 - 100,
      y: CANVAS_HEIGHT / 2 - 50,
    },
    draw: (ctx, shape) => {
      ctx.rect(shape.x, shape.y, shape.width, shape.height);
    },
  },
  circle: {
    default: {
      radius: 50,
      fill: "white",
      selected: false,
    },
    initialPosition: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
    },
    draw: (ctx, shape) => {
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
    },
  },
  //   triangle: {
  //     default: {
  //       scale: 1, // Use scale factor instead of sideLength
  //       fill: "white",
  //       selected: false,
  //     },
  //     initialPosition: {
  //       x: CANVAS_WIDTH / 2 - 50, // Adjust the initial x-coordinate as needed
  //       y: CANVAS_HEIGHT / 2, // Adjust the initial y-coordinate as needed
  //     },
  //     draw: (ctx, shape) => {
  //       const sideLength = 100 * shape.scale; // Calculate sideLength based on scale
  //       const halfHeight = (sideLength * (Math.sqrt(3) / 2)) / 2;
  //       ctx.beginPath();
  //       ctx.moveTo(shape.x, shape.y);
  //       ctx.lineTo(shape.x + sideLength, shape.y);
  //       ctx.lineTo(shape.x + sideLength / 2, shape.y - halfHeight);
  //       ctx.closePath();
  //     },
  //   },
};
