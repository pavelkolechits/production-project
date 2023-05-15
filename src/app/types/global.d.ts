declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
  // eslint-disable-next-line no-undef
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __IS_DEV__ : boolean;
declare const __API__ : string;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
