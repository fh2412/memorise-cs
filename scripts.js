// Animated trailing cursor circles
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = 18; // number of circles

  // Create circles dynamically if not present
  if (!prefersReduced) {
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span');
      s.className = 'circle';
      document.body.appendChild(s);
    }
  }

  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll('.circle');

  circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = '#ffffff';
  });

  window.addEventListener('mousemove', function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    if (prefersReduced || circles.length === 0) return; // skip for reduced motion
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      circle.style.left = (x - 9) + 'px';
      circle.style.top = (y - 9) + 'px';
      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  requestAnimationFrame(animateCircles);
})();
