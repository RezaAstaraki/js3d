
declare module 'three/examples/jsm/*'

declare module 'three/examples/jsm/controls/OrbitControls.js' {
    import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement: HTMLElement);
  
      object: Camera;
      domElement: HTMLElement;
  
      // Just some useful properties/methods
      enabled: boolean;
      target: Vector3;
      update(): boolean;
      dispose(): void;
  
      enableDamping: boolean;
      dampingFactor: number;
      rotateSpeed: number;
      zoomSpeed: number;
      panSpeed: number;
      minDistance: number;
      maxDistance: number;
      keys: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string; };
  
      mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE; };
      touches: { ONE: TOUCH; TWO: TOUCH; };
    }
  }
  