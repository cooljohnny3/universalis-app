import World from "./world";

export default interface View {
    hq: boolean,
    pricePerUnit: number,
    quantity: number,
    worldName?: World,
    total: number,
}