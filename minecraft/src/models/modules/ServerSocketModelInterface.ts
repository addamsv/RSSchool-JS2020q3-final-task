/* eslint-disable no-unused-vars */

interface ServerSocketModelInterface {
  init(): void;

  sendMap(seed: String): void;

  sendCoordinates(x: String, z: String): void;
}

export default ServerSocketModelInterface;