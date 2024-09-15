'use client';

import { useEditor } from '@/features/editor/hooks/useEditor';
import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';
import { Footer } from './footer';

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
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="absolute h-[calc(100%-theme(space.editor-navbar))] top-editor-navbar w-full flex">
        <Sidebar />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="flex-1 editor-height bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
