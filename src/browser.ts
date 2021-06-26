import { Main } from './main';

class BrowserMain extends Main {
  constructor() {
    super(window.fetch.bind(window));
  }
}

export default new BrowserMain();
