import {
  ICircleOptions,
  IRectOptions,
  ITriangleOptions,
} from 'fabric/fabric-impl';

import * as material from 'material-colors';

export const MATERIAL_COLORS = [
  material.red['500'],
  material.pink['500'],
  material.purple['500'],
  material.deepPurple['500'],
  material.indigo['500'],
  material.blue['500'],
  material.lightBlue['500'],
  material.cyan['500'],
  material.teal['500'],
  material.green['500'],
  material.lightGreen['500'],
  material.lime['500'],
  material.yellow['500'],
  material.amber['500'],
  material.orange['500'],
  material.deepOrange['500'],
  material.brown['500'],
  material.blueGrey['500'],
  'transparent',
];

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
} as const satisfies ICircleOptions;

export const RECTANGLE_OPTIONS = {
  width: DEFAULT_SHAPE_WIDTH,
  height: DEFAULT_SHAPE_HEIGHT,
  angle: 0,
} as const satisfies IRectOptions;

export const TRIANGLE_OPTIONS = {
  width: DEFAULT_SHAPE_WIDTH,
  height: DEFAULT_SHAPE_HEIGHT,
  angle: 0,
} as const satisfies ITriangleOptions;

export const DIAMOND_OPTIONS = {
  width: 200,
  height: 200,
} as const satisfies IRectOptions;
