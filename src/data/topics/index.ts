import type { Topic } from '../../types';
import { TIER1 } from './tier1';
import { TIER2 } from './tier2';
import { TIER3 } from './tier3';
import { TIER4 } from './tier4';
import { TIER5 } from './tier5';
import { TIER6 } from './tier6';
import { TIER7 } from './tier7';
import { TIER8 } from './tier8';
import { TIER9 } from './tier9';
import { TIER10 } from './tier10';
import { TIER11 } from './tier11';
import { TIER12 } from './tier12';
import { TIER13 } from './tier13';
import { TIER14 } from './tier14';
import { TIER15 } from './tier15';

// active な全トピックを集約。
export const ALL_TOPICS: Topic[] = [
  ...TIER1,
  ...TIER2,
  ...TIER3,
  ...TIER4,
  ...TIER5,
  ...TIER6,
  ...TIER7,
  ...TIER8,
  ...TIER9,
  ...TIER10,
  ...TIER11,
  ...TIER12,
  ...TIER13,
  ...TIER14,
  ...TIER15,
];
