class Input {
  constructor(canvas, balls) {
    ['mousedown', 'touchstart'].forEach(event => {
      canvas.addEventListener(event, (e) => {
        const rect = e.target.getBoundingClientRect();
        const eventType = e.touches ? e.touches[0] : e;
        const mouseX = eventType.clientX - rect.left;
        const mouseY = eventType.clientY - rect.top;
        balls.push(new Ball(canvas, 20, randomHex(), mouseX, mouseY));
      });
    });
  }
}