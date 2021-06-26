import { Main } from './main';

class NodeMain extends Main {
  constructor() {
    super(require('node-fetch'));
  }
}

export default new NodeMain();
