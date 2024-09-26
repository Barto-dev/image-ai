'use client';

import { useEditor } from '../hooks/useEditor/useEditor';
import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';
import { Footer } from './footer';
import { ShapeSidebar } from './shape-sidebar';
import { ActiveTool } from '../types';
import { FillColorSidebar } from './fill-color-sidebar';
import { SELECTION_DEPENDENT_TOOLS } from '@/features/editor/constants';
import { StrokeColorSidebar } from './stroke-color-sidebar';
import { StrokeWidthSidebar } from './stroke-width-sidebar';
import { OpacitySidebar } from './opacity-sidebar';
import { TextSidebar } from './text-sidebar';
import { FontSidebar } from './font-sidebar';
import { ImageSidebar } from './image-sidebar';
import { FilterSidebar } from './filter-sidebar';
import { AiSidebar } from './ai-sidebar';
import { RemoveBgSidebar } from './remove-bg-sidebar';

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClearSelection = useCallback(() => {
    if (SELECTION_DEPENDENT_TOOLS.includes(activeTool)) {
      setActiveTool('select');
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      return;
    }
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      // to preserve the stacking order of objects when user selects them
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
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AiSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <RemoveBgSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            // we need to re-render the toolbar when the active object changes
            key={JSON.stringify(editor?.canvas?.getActiveObject())}
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
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
