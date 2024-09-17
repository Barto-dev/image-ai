'use client';

import { useEditor } from '@/features/editor/hooks/useEditor';
import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';
import { Footer } from './footer';
import { ShapeSidebar } from './shape-sidebar';
import { ActiveTool } from '../types';

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const { init, editor } = useEditor();
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

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool('select');
      }

      if (tool === 'draw') {
        // TODO: Implement draw tool
      }

      if (activeTool === 'draw') {
        // TODO: Disable draw tool
      }

      setActiveTool(tool);
    },
    [activeTool],
  );

  return (
    <div className="h-full flex flex-col">
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <div className="absolute h-[calc(100%-theme(space.editor-navbar))] top-editor-navbar w-full flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
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
