import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Floating circles
    const circles = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 50 + 20,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    // Wave parameters for 4 different waves
    const waves = [
      { amplitude: 50, frequency: 0.02, speed: 0.02, offset: 0 },
      { amplitude: 30, frequency: 0.03, speed: 0.03, offset: 2 },
      { amplitude: 20, frequency: 0.01, speed: 0.01, offset: 4 },
      { amplitude: 40, frequency: 0.015, speed: 0.025, offset: 6 },
    ];

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude + canvas.height / 2;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(132, 204, 179, ${0.1 - index * 0.02})`;
        ctx.stroke();
      });

      // Draw and update floating circles
      circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(132, 204, 179, ${circle.opacity})`;
        ctx.fill();

        // Update position
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Bounce off walls
        if (circle.x < 0 || circle.x > canvas.width) circle.dx *= -1;
        if (circle.y < 0 || circle.y > canvas.height) circle.dy *= -1;
      });

      time += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ filter: 'blur(4px)' }}
    />
  );
};

export default AnimatedBackground;