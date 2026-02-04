import { useEffect, useRef } from "react";

interface SubtleBackgroundProps {
  className?: string;
  color?: string;
  particleCount?: number;
}

export default function SubtleBackground({
  className = "",
  color = "#6366f1",
  particleCount = 150,
}: SubtleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.life = Math.random() * 100;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Subtle drift
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;

        // Limit velocity
        const maxSpeed = 0.5;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        // Wrap around edges
        if (this.x < 0) this.x = rect.width;
        if (this.x > rect.width) this.x = 0;
        if (this.y < 0) this.y = rect.height;
        if (this.y > rect.height) this.y = 0;

        // Reset after long life
        if (this.life > 500) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        
        // Very subtle particle with glow
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          3
        );
        gradient.addColorStop(0, color.replace(')', ', 0.15)').replace('rgb', 'rgba').replace('#', 'rgba('));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;

    const animate = () => {
      // Very subtle trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${newRect.width}px`;
      canvas.style.height = `${newRect.height}px`;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)' }}
    />
  );
}
