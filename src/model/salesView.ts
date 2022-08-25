import View from "./view";

export default interface SalesView extends View {
    timestamp: number,
    buyerName?: string,
}