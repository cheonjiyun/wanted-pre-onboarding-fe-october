import { useEffect, useState } from "react";
import "./App.css";
import { getMockData } from "./util/GetMockData";
import { MockData } from "./type/MockDateType";

function App() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<MockData[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isEnded, setEnded] = useState(false);

    const getProducts = async () => {
        if (isEnded) return;

        setLoading(true);
        const { datas, isEnd } = await getMockData(page);

        setEnded(isEnd);
        const newInfo = datas.filter((data) => {
            return !products.some((product) => product.productId == data.productId);
        });

        setProducts([...products, ...newInfo]);
        setLoading(false);
    };

    const options = {
        rootMargin: "0px",
        threshold: 1,
    };

    const plusPage = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio <= 0) return;

            // 혹은 isIntersecting을 사용할 수 있습니다.
            if (!entry.isIntersecting) return;

            setPage((page) => page + 1);
        });
    };
    const observer = new IntersectionObserver(plusPage, options);

    useEffect(() => {
        //osberver
        const target = document.querySelector("#target");
        if (target) {
            observer.observe(target);
        }
    }, []);

    useEffect(() => {
        // get
        (async () => await getProducts())();
    }, [page]);

    return (
        <div className="container">
            {products.map((product, idx) => {
                return (
                    <div key={product.productId} className="product-container">
                        <p className="index">{idx + 1}</p>
                        <div className="content-container">
                            <p className="label">productId</p>
                            <p>{product.productId}</p>
                        </div>
                        <div className="content-container">
                            <p className="label">productName</p>
                            <p>{product.productName}</p>
                        </div>
                        <div className="content-container">
                            <p className="label">price</p>
                            <p>{product.price}</p>
                        </div>
                        <div className="content-container">
                            <p className="label">boughtDate</p>
                            <p>{product.boughtDate}</p>
                        </div>
                    </div>
                );
            })}
            {isLoading && (
                <div className="loading">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="16"
                            strokeDashoffset="16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3c4.97 0 9 4.03 9 9"
                        >
                            <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                dur="0.2s"
                                values="16;0"
                            />
                            <animateTransform
                                attributeName="transform"
                                dur="1.5s"
                                repeatCount="indefinite"
                                type="rotate"
                                values="0 12 12;360 12 12"
                            />
                        </path>
                    </svg>
                </div>
            )}
            <div id="target" style={{ height: "20px" }}></div>
        </div>
    );
}

export default App;
