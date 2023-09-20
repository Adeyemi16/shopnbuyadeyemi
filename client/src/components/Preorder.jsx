import {Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
export default function Preorder({ data }) {
  const flattenDataArray = data.flatMap((item) => item);
  const filterByNew = flattenDataArray?.filter(
    (product) => product.condition === "Preorder"
  );

  return (

      <Col className="justify-content-center align-items-center gy-4 w-100 mx-auto">
        <Col className="text-center mb-4">
          <h1 className="fw-bold">Preorder</h1>
          <a
            href="#"
            className="text-secondary fs-7 fw-bold text-decoration-"
          >
            View All
          </a>
        </Col>
            <div className="d-flex gap-4 overflow-x-auto overflow-y-hidden px-3">
              {filterByNew.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
      </Col>
  );
}
