import {
  ICircleOptions,
  IRectOptions,
  ITriangleOptions,
} from 'fabric/fabric-impl';

export const WORKSPACE_NAME = 'clip';

export const DEFAULT_SHAPE_WIDTH = 150;
export const DEFAULT_SHAPE_HEIGHT = 150;

export const FILL_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_WIDTH = 2;

export const CIRCLE_OPTIONS = {
  radius: 75,
  width: DEFAULT_SHAPE_WIDTH,
  height: DEFAULT_SHAPE_HEIGHT,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
} as const satisfies ICircleOptions;

export const RECTANGLE_OPTIONS = {
  width: DEFAULT_SHAPE_WIDTH,
  height: DEFAULT_SHAPE_HEIGHT,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
} as const satisfies IRectOptions;

export const TRIANGLE_OPTIONS = {
  width: DEFAULT_SHAPE_WIDTH,
  height: DEFAULT_SHAPE_HEIGHT,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
} as const satisfies ITriangleOptions;

export const DIAMOND_OPTIONS = {
  width: 200,
  height: 200,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
} as const satisfies IRectOptions;
