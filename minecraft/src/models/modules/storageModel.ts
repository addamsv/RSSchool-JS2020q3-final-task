/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import StorageModelInterface from './storageModelInterface';
import ServerSocketModelInterface from './ServerSocketModelInterface';
import MainControllerInterface from '../../controllers/mainControllerInterface';

class StorageModel implements StorageModelInterface {
  private controller: MainControllerInterface;

  private serverSocket: ServerSocketModelInterface;

  constructor(controller: MainControllerInterface) {
    this.controller = controller;
    this.serverSocket = null;
  }

  public init(serverSocket: ServerSocketModelInterface) {
    this.serverSocket = serverSocket;
  }

  public sendStatQueryToServer(stat: string) {
    if (this.serverSocket) {
      this.serverSocket.sendMessage(stat, 'stat');
    }
  }

  public sendStatToLocalStorage(stat: String) {
  }

  public getStatFromLocalStorage(requiredStat: String) {
    return requiredStat;
  }

  public sendSettsQueryToServer(setts: string) {
    if (this.serverSocket) {
      this.serverSocket.sendMessage(setts, 'setts');
    }
  }

  public sendSettsToLocalStorage(setts: String) {
  }

  public getSettsFromLocalStorage(requiredSetts: String) {
    return requiredSetts;
  }
}

export { StorageModelInterface, StorageModel };
