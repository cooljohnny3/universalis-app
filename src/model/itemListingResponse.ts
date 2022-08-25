import ItemListing from "./listingView";
import SalesView from "./salesView";

export default interface ItemListingResponse {
    itemId: number,
    lastUploadTime: number,
    listings: ItemListing[],
    recentHistory: SalesView[],
    nqSaleVelocity: number,
    hqSaleVelocity: number,
    stackSizeHistogramNQ: Object,
    stackSizeHistogramHQ: Object,
}