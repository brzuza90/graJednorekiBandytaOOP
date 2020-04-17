class Game {
    constructor(startMoney) {
        this.stats = new Statistics();
        this.wallet = new Wallet(startMoney);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.divs = document.querySelectorAll('div.color');
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanNumber = document.querySelector('.score span.number');
        this.spanWin = document.querySelector('.score span.win');
        this.spanLoss = document.querySelector('.score span.loss');
        this.render();
    }
    render(colors = ["gray", 'gray', 'gray'], money = this.wallet.getWalletValue(), result = "", stats = [0, 0, 0], bid = 0, wonMoney = 0) {
        this.divs.forEach((div, index) => {
            div.style.backgroundColor = colors[index];
        })
        this.spanWallet.textContent = money + " $";
        if (result) {
            result = `Wygrałeś ${wonMoney}$.`;
        } else if (!result && result !== "") {
            result = `Przegrałeś ${bid}$.`;
        }
        this.spanResult.textContent = result;
        this.spanNumber.textContent = stats[0];
        this.spanWin.textContent = stats[1];
        this.spanLoss.textContent = stats[2];
        this.inputBid.value = "";
    }
    startGame() {
        if (this.inputBid.value < 1) return alert('Zakład nie może być mniejszy od 1!');
        const bid = Math.floor(this.inputBid.value);
        if (!this.wallet.checkCanPlay(bid)) {
            return alert("Masz za mało środków lub podana została nieprawidłowa wartość");
        }
        this.wallet.changeWallet(bid, "-");
        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.chechWinner(colors);
        const wonMoney = Result.moneyWinInGame(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid);
        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney)
    }
}