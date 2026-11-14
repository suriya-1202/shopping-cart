import React, { useEffect, useRef } from 'react';

/**
 * HeroBackgroundAnimation
 * An ultra-luxurious, lightweight interactive canvas & SVG ambient field.
 * Combines:
 * 1. Morphing Pastel Aurora Blobs (CSS GPU-accelerated)
 * 2. Harmonic Soundwave Ripple Rings (Acoustics motif)
 * 3. Interactive Floating Luminous Particles with subtle spring physics
 */
export default function HeroBackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse coordinates for interactive gravity
    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const setCanvasSize = () => {
      dpr = window.devicePixelRatio || 1;
      const parentEl = canvas.parentElement || canvas.parentNode;
      width = parentEl ? parentEl.offsetWidth : window.innerWidth;
      height = parentEl ? parentEl.offsetHeight : 650;
      canvas.width = (width || window.innerWidth) * dpr;
      canvas.height = (height || 650) * dpr;
      canvas.style.width = `${width || window.innerWidth}px`;
      canvas.style.height = `${height || 650}px`;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Particle Palette inspired by luxury metals & studio acoustics
    const colors = [
      { r: 79, g: 70, b: 229 },   // Royal Indigo
      { r: 217, g: 119, b: 6 },   // Warm Amber Gold
      { r: 14, g: 165, b: 233 },  // Sky Cerulean
      { r: 168, g: 85, b: 247 },  // Electric Violet
      { r: 5, g: 150, b: 105 }    // Emerald
    ];

    // Initialize Particles
    const particleCount = Math.min(48, Math.floor((width * height) / 22000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[i % colors.length];
      particles.push({
        x: Math.random() * (width * dpr),
        y: Math.random() * (height * dpr),
        vx: (Math.random() - 0.5) * 0.45 * dpr,
        vy: (Math.random() - 0.5) * 0.45 * dpr,
        radius: (Math.random() * 2.2 + 1.2) * dpr,
        baseAlpha: Math.random() * 0.45 + 0.25,
        alpha: 0,
        color: color,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 1;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Subtle boundary rebound with soft damping
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        // Interactive mouse magnetism
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius * dpr) {
            const force = (1 - dist / (mouse.radius * dpr)) * 0.06;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        // Shimmering pulse alpha
        const currentAlpha = p.baseAlpha + Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.18;
        p.alpha = Math.max(0.1, Math.min(0.75, currentAlpha));

        // Draw soft glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.shadowBlur = 12 * dpr;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance

        // Connect nearby particles with delicate architectural lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distDx = p.x - p2.x;
          const distDy = p.y - p2.y;
          const distance = Math.sqrt(distDx * distDx + distDy * distDy);
          const maxDistance = 110 * dpr;

          if (distance < maxDistance) {
            const lineAlpha = (1 - distance / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.85 * dpr;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="hero-animated-bg-root" aria-hidden="true">
      {/* 1. Subtle Architectural Dot Grid */}
      <div className="hero-dot-grid-pattern" />

      {/* 2. Luminous Morphing Aurora Blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />

      {/* 3. Concentric Acoustic Soundwave Ripple Rings */}
      <div className="soundwave-rings-container">
        <div className="soundwave-ring ring-1" />
        <div className="soundwave-ring ring-2" />
        <div className="soundwave-ring ring-3" />
        <div className="soundwave-ring ring-4" />
      </div>

      {/* 4. Interactive 60FPS Ambient Particle Canvas */}
      <canvas ref={canvasRef} className="hero-particle-canvas" />
    </div>
  );
}
