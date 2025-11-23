(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('snow-canvas');
  const ctx = canvas.getContext('2d');

  const CONFIG = {
    flakes: 200,
    size: { min: 1.5, max: 4.5 },
    speed: { min: 0.4, max: 1.8 },
    wind: { min: -0.5, max: 0.5 },
    opacity: { min: 0.4, max: 0.95 },
    warmUpFrames: 60
  };

  let DPR = Math.max(1, window.devicePixelRatio || 1);
  let width = 0, height = 0;
  let flakes = [];
  let frame = 0;

  function resize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFlake(init) {
    const radius = rand(CONFIG.size.min, CONFIG.size.max);
    const x = rand(0, width);
    const y = init ? rand(-height, height) : rand(-20, -5);
    const speed = rand(CONFIG.speed.min, CONFIG.speed.max);
    const drift = rand(CONFIG.wind.min, CONFIG.wind.max);
    const opacity = rand(CONFIG.opacity.min, CONFIG.opacity.max);
    const swing = rand(0.5, 1.8);
    const phase = Math.random() * Math.PI * 2;
    return { x, y, radius, speed, drift, opacity, swing, phase };
  }

  function initFlakes() {
    flakes = Array.from({ length: CONFIG.flakes }, () => createFlake(true));
  }

  function drawFlake(f) {
    ctx.beginPath();
    ctx.globalAlpha = f.opacity;

    const g = ctx.createRadialGradient(
      f.x - f.radius / 3,
      f.y - f.radius / 3,
      f.radius / 6,
      f.x,
      f.y,
      f.radius
    );

    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0.3)");

    ctx.fillStyle = g;
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function update() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    const time = performance.now() / 1000;

    flakes.forEach((f, i) => {
      f.y += f.speed;
      f.phase += 0.01 * f.swing;
      f.x += Math.sin(f.phase) * (f.swing * 0.3) + f.drift * 0.6;

      f.opacity += Math.sin(time + i) * 0.0006;
      f.opacity = Math.max(CONFIG.opacity.min, Math.min(CONFIG.opacity.max, f.opacity));

      if (f.y > height || f.x < -50 || f.x > width + 50) {
        flakes[i] = createFlake(false);
      }

      drawFlake(f);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(update);
  }

  window.__SnowEffect = {
    start: () => { initFlakes(); requestAnimationFrame(update); },
    stop: () => { flakes = []; ctx.clearRect(0, 0, width, height); },
    setCount: (n) => { CONFIG.flakes = Math.max(0, n); initFlakes(); }
  };

  resize();
  initFlakes();
  requestAnimationFrame(update);

  window.addEventListener("resize", resize);
})();
