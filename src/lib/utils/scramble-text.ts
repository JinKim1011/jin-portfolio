"use client";

import { useScramble, type UseScrambleProps } from "use-scramble";

const SCRAMBLE_DEFAULTS = {
  speed: 0.75, // base framerate (0–1)
  tick: 1, // frames before the scrambler walks forward
  step: 1, // positions revealed per tick (1 is right for short text)
  scramble: 6, // random cycles per position before locking in
  range: [65, 125], // A–z + punctuation
  ignore: [" "], // never scramble spaces — keeps final shape readable
} satisfies Partial<UseScrambleProps>;

export type UseScrambleCustomOptions = UseScrambleProps;

export function useScrambleCustom(options: UseScrambleCustomOptions) {
  return useScramble({
    ...SCRAMBLE_DEFAULTS,
    ...options,
  });
}
