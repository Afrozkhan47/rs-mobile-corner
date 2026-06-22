declare module 'animejs' {
  interface AnimeParams {
    targets?: unknown;
    translateY?: number | number[] | string;
    duration?: number;
    easing?: string;
    direction?: 'normal' | 'reverse' | 'alternate';
    loop?: boolean | number;
  }

  interface AnimeInstance {
    pause: () => void;
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    remove: (targets: unknown) => void;
  }

  const anime: AnimeStatic;
  export default anime;
}
