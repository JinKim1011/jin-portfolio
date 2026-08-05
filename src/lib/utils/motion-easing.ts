// What kind of animation is this?
// │
// ├── Entering or exiting the viewport?
// │   │
// │   ├── Yes → ease-out
// │   │   ├── Subtle (tooltip, small popover, fade)
// │   │   │   └── var(--ease-out-quad)
// │   │   ├── Standard (dropdown, modal, sidebar, toast)
// │   │   │   └── var(--ease-out-quart)
// │   │   ├── Dramatic (hero section, marketing intro, page transition)
// │   │   │   └── var(--ease-out-expo)
// │   │   └── Snappy / elastic feel
// │   │       └── var(--ease-out-circ)
// │   │
// │   └── No ↓
// │
// ├── Moving or morphing while staying on screen?
// │   │
// │   ├── Yes → ease-in-out
// │   │   ├── Gentle (list reorder, subtle layout shift)
// │   │   │   └── var(--ease-in-out-quad)
// │   │   ├── Standard (tab switch, accordion, resize, carousel)
// │   │   │   └── var(--ease-in-out-quart)
// │   │   ├── Dramatic (page morph, Dynamic Island-style shape shift)
// │   │   │   └── var(--ease-in-out-expo)
// │   │   └── Organic / circular motion
// │   │       └── var(--ease-in-out-circ)
// │   │
// │   └── No ↓
// │
// ├── Hover or micro-interaction? (color, background, opacity)
// │   └── Yes → ease (CSS built-in, no custom variable needed)
// │
// ├── Constant motion? (marquee, hold-to-delete timer, spinning coin)
// │   └── Yes → linear
// │
// └── Not sure?
//     └── Default → var(--ease-out-quad)

export const easings = {
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],

  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeOutCirc: [0.075, 0.82, 0.165, 1],

  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
} as const;
