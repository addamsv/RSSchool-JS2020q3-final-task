import languageConfig from '../../configs/languageConfig';
import MainControllerInterface from '../../controllers/mainControllerInterface';
import MainModelInterface from '../../models/mainModelInterface';
import ViewsInterface from '../viewsInterface';

class ServerMenu implements ViewsInterface {
  private controller: MainControllerInterface;

  private model: MainModelInterface;

  private serverScreen: HTMLDivElement;

  private nickname: HTMLInputElement;

  private password: HTMLInputElement;

  private errorMessage: HTMLDivElement;

  private logIn: HTMLButtonElement;

  private or: HTMLSpanElement;

  private signUp: HTMLButtonElement;

  private backToMainMenu: HTMLButtonElement;

  private parseMessage: string;

  private failMessage: string;

  private readInputs: any;

  private checkStrings: any;

  private closeServerMenu: any;

  constructor(controller: MainControllerInterface, model: MainModelInterface) {
    this.controller = controller;
    this.model = model;
    this.createMenu();
  }

  public attachMenu() {
    document.body.append(this.serverScreen);
    this.addEventListeners();
  }

  public removeMenu() {
    this.serverScreen.remove();
    this.removeEventListeners();
  }

  public addTextContent(language: string) {
    let languageData;
    switch (language) {
      case 'en': languageData = languageConfig.en.serverMenu; break;
      case 'ru': languageData = languageConfig.ru.serverMenu; break;
      default: break;
    }
    this.nickname.placeholder = languageData.nickname;
    this.password.placeholder = languageData.password;
    this.logIn.textContent = languageData.logIn;
    this.or.textContent = languageData.or;
    this.signUp.textContent = languageData.signUp;
    this.backToMainMenu.textContent = languageData.backToMainMenu;
    this.parseMessage = languageData.parseMessage;
    this.failMessage = languageData.failMessage;
    this.errorMessage.textContent = '';
  }

  private createMenu() {
    this.serverScreen = document.createElement('div');
    const serverWrapper = document.createElement('div');
    this.nickname = document.createElement('input');
    this.password = document.createElement('input');
    this.errorMessage = document.createElement('div');
    const buttonsWrapper = document.createElement('div');
    this.logIn = document.createElement('button');
    this.or = document.createElement('span');
    this.signUp = document.createElement('button');
    this.backToMainMenu = document.createElement('button');

    this.serverScreen.classList.add('server-screen');
    this.serverScreen.id = 'server-menu-id';
    serverWrapper.classList.add('server-wrapper');
    this.nickname.classList.add('nickname');
    this.password.classList.add('password');
    this.errorMessage.classList.add('error-message');
    buttonsWrapper.classList.add('buttons-wrapper');
    this.logIn.classList.add('server-btn');
    this.logIn.id = 'login';
    this.or.classList.add('or');
    this.signUp.classList.add('server-btn');
    this.signUp.id = 'signup';
    this.backToMainMenu.classList.add('server-btn', 'back-to-main-menu');

    buttonsWrapper.append(this.logIn, this.or, this.signUp);
    serverWrapper.append(
      this.nickname,
      this.password,
      this.errorMessage,
      buttonsWrapper,
      this.backToMainMenu,
    );
    this.serverScreen.append(serverWrapper);

    this.readInputs = this.readViewInputs.bind(this);
    this.checkStrings = this.model.checkStrings.bind(this.model);
    this.closeServerMenu = this.controller.closeServerMenu.bind(this.controller);
    this.getChanges();
  }

  private getChanges() {
    this.serverScreen.addEventListener('input-error', () => {
      this.errorMessage.textContent = this.parseMessage;
    });
    this.serverScreen.addEventListener('success', () => {
      this.removeMenu();
    });
    this.serverScreen.addEventListener('fail', () => {
      this.errorMessage.textContent = this.failMessage;
    });
  }

  private readViewInputs(event: any) {
    this.checkStrings(this.nickname.value, this.password.value, event.target.id);
  }

  private addEventListeners() {
    this.logIn.addEventListener('click', this.readInputs);
    this.signUp.addEventListener('click', this.readInputs);
    this.backToMainMenu.addEventListener('click', this.closeServerMenu);
  }

  private removeEventListeners() {
    this.logIn.removeEventListener('click', this.readViewInputs);
    this.signUp.removeEventListener('click', this.readViewInputs);
    this.backToMainMenu.removeEventListener('click', this.closeServerMenu);
  }
}

export default ServerMenu;
