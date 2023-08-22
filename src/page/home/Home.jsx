import React from 'react';
import Products from "../../component/products/Products";
import Banner from "../../component/banner/Banner";

function Home(props) {
    return (
        <section>
            <Banner/>
            <Products/>
        </section>
    );
}

export default Home;