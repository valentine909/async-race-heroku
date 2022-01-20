import WinnerManager from '../models/WinnerManager';
import Winners from '../views/Winners';

class WinnerPresenter {
  private readonly model: WinnerManager;

  private readonly view: Winners;

  constructor(winnerManager: WinnerManager, winnersView: Winners) {
    this.model = winnerManager;
    this.view = winnersView;
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    //
  }
}

export default WinnerPresenter;
