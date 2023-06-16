"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import InfiniteScroll from 'react-infinite-scroller';

const INIT_URL = "https://openmarket.weniv.co.kr/products/"

const getProducts = async (pageParam) => {

    const response = await fetch(pageParam);

    const data = await response.json();

    return data;

}

export default function ProductList () {

    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ["products"],
        ({ pageParam = INIT_URL }) => getProducts(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        },
    );

    return (
        <ul>
            <InfiniteScroll
                loadMore={fetchNextPage}
                hasMore={hasNextPage}
            >
                {data ? (
                    data.pages.map((page) => {
                        return (
                            page &&
                            page.results.map(
                                (item, index) => {

                                    return (
                                        <li style={{height : "100px", border : "1px solid red"}} key={index}>{item.product_name}</li>
                                    )
                                },
                            )
                        );
                    })
                ) : (
                    <></>
                )}
            </InfiniteScroll>
        </ul>
    )
}