import { dehydrate, Hydrate } from "@tanstack/react-query";
import ProductList from "../components/product_list";
import getQueryClient from "../getQueryClient";

const URL = "https://openmarket.weniv.co.kr/products/"

const getProducts = async () => {

    const response = await fetch(URL);

    const data = await response.json();

    return data;

}

export default async function ProductPage () {

    const queryClient = getQueryClient();
    // await queryClient.prefetchQuery(["products", 1], getProducts);
    await queryClient.prefetchInfiniteQuery(["products"], getProducts)
    const dehydrateState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydrateState}>

            <ProductList />

        </Hydrate>
    )
}