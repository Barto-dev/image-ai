'use client';

import { fabric } from 'fabric';
import { useEditor } from '@/features/editor/hooks/useEditor';
import { useEffect, useRef } from 'react';

export const Editor = () => {
  const { init } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      return;
    }
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
