/* eslint-disable no-unused-vars */

interface MainModelInterface {
  handshake: Boolean;

  auth(login: String, password: String): void;

  sendMap(seed: String): void;

  checkStrings(name: string, password: string, type: string): void;

  sendHeroCoordinates(x: String, z: String): void;
}

export default MainModelInterface;