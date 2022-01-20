import WinnerManager from "../models/WinnerManager";
import Winners from "../views/Winners";

class WinnerPresenter {
  private readonly model: WinnerManager;
  private readonly view: Winners;
  constructor(winnerManager: WinnerManager, winnersView: Winners) {
    this.model = winnerManager;
    this.view = winnersView;
  }
  init() {
    //
  }
}

export default WinnerPresenter;
