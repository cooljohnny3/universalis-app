import ItemListingResponse from "../model/itemListingResponse";

const BASE_URL = "https://universalis.app/api/v2";

async function getData(itemId: number | string, limit: number | string) {
    const url = `${BASE_URL}/primal/${itemId}?listings=${limit}&entries=${limit=10}`
    return await fetch(url).then((response) => {
        if (response.ok) {
            return response.json().then((json: ItemListingResponse) => {
                return json;
            })
        }
    });
}

export {getData};