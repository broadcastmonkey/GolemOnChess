const ChessGame = require("./chess-game");
const events = require("../sockets/event-emitter");
const toBool = require("to-bool");
events.setMaxListeners(100);
class GamesManager {
    constructor(chessServer) {
        this.currentGameId = 0;
        this.games = [];
        this.chessServer = chessServer;
        events.addListener("agreement_created", this.agreementCreated);
        events.addListener("offers_received", this.offersReceived);
        events.addListener("agreement_confirmed", this.agreementConfirmed);
        events.addListener("calculation_requested", this.calculationRequested);
        events.addListener("computation_started", this.computationStarted);
        events.addListener("calculation_started", this.calculationStarted);
        events.addListener("calculation_completed", this.calculationCompleted);
        events.addListener("computation_finished", this.computationFinished);
        events.addListener("invoice_received", this.invoiceReceived);
        events.addListener("provider_failed", this.providerFailed);
    }

    startSampleGame = () => {
        this.currentGameId++;
        this.addGame(this.currentGameId)?.start();
    };

    addGame = (id) => {
        if (this.getGame(id) !== undefined) return undefined;
        const game = new ChessGame(id, this.chessServer);
        this.games.push(game);
        //console.log(this.games);
        return game;
    };
    getGame = (id) => {
        return this.games.find((x) => x.gameId === id);
    };

    calculationCompleted = async (data) => {
        const { gameId } = data;
        this.debugLog("calculationCompleted", data);
        this.games.find((x) => x.gameId === gameId)?.calculationCompleted(data);
    };

    agreementCreated = (data) => {
        const { gameId } = data;
        this.debugLog("agreementCreated", data);
        this.games.find((x) => x.gameId === gameId)?.agreementCreated(data);
    };

    computationFinished = (data) => {
        const { gameId } = data;
        this.debugLog("computationFinished", data);
        this.games.find((x) => x.gameId === gameId)?.computationFinished(data);
    };

    agreementConfirmed = (data) => {
        const { gameId } = data;
        this.debugLog("agreementConfirmed", data);
        this.games.find((x) => x.gameId === gameId)?.agreementConfirmed(data);
    };

    calculationStarted = (data) => {
        const { gameId } = data;
        this.debugLog("calculationStarted", data);
        this.games.find((x) => x.gameId === gameId)?.calculationStarted(data);
    };

    calculationRequested = (data) => {
        const { gameId } = data;
        this.debugLog("calculationRequested", data);
        this.games.find((x) => x.gameId === gameId)?.calculationRequested(data);
    };

    providerFailed = (data) => {
        const { gameId } = data;
        this.debugLog("providerFailed", data);
        this.games.find((x) => x.gameId === gameId)?.providerFailed(data);
    };
    invoiceReceived = (data) => {
        const { gameId } = data;
        this.debugLog("invoiceReceived", data);
        this.games.find((x) => x.gameId === gameId)?.invoiceReceived(data);
    };
    computationStarted = (data) => {
        const { gameId } = data;
        this.debugLog("computationStarted", data);
        this.games.find((x) => x.gameId === gameId)?.computationStarted(data);
    };
    offersReceived = (data) => {
        const { gameId } = data;
        this.debugLog("offersReceived", data);
        this.games.find((x) => x.gameId === gameId)?.offersReceived(data);
    };

    debugLog = (functionName, data) => {
        if (toBool(process.env.LOG_ENABLED_GAMES_MANAGER))
            console.log(`>>GamesManager::${functionName} ` + JSON.stringify(data, null, 4));
    };
}

module.exports = GamesManager;
