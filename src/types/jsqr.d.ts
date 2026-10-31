declare module 'jsqr' {
  export interface QRCodeLocation {
    topLeftCorner: { x: number; y: number };
    topRightCorner: { x: number; y: number };
    bottomRightCorner: { x: number; y: number };
    bottomLeftCorner: { x: number; y: number };
    topLeftFinder: { x: number; y: number };
    topRightFinder: { x: number; y: number };
    bottomLeftFinder: { x: number; y: number };
  }

  export interface QRCode {
    data: string;
    binaryData: Uint8Array;
    chunks: any[];
    location: QRCodeLocation;
  }

  export default function jsQR(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options?: { inversionAttempts?: 'dontInvert' | 'onlyInvert' | 'attemptBoth' | 'invert' }
  ): QRCode | null;
}
