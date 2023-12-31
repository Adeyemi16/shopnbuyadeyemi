import { useEffect, useState } from "react";
import { PageLayout, ProductCard } from "../components";
import { searchProduct } from "../config/api";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../config/store";

export default function Search() {
  const query = new URLSearchParams(location.search);
  const queryParams = query.get("q");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    document.title = `Search result for ${queryParams}`;
    const delayDebounceFn = setTimeout(() => {
      const searchRequest = async () => {
        setLoading(true);
        try {
          const res = await searchProduct(queryParams);
          setSearchResult(res.data);
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      searchRequest();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [queryParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (params) {
      params.append("q", queryParams);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() });
  }, [queryParams, navigate]);
  error && <p className="mt-5 fs-5">{error.message}</p>;
  return (
    <PageLayout>
      <div className="d-flex flex-wrap align-items-center justify-content-between mt-4 mb-4">
              <span className="fw-bold fs-4">Products ({searchResult.length})</span>
        <span className="fs-5 align-baseline">
          showing result(s) for &quot;<b>{searchResult.length}&quot;</b>
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {searchResult.length > 0 ? (
            <>
              {searchResult.map((product) => (
                <Col key={product._id} xs={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </>
          ) : (
            <h1>We could not find anything matching your search query.</h1>
          )}
        </Row>
      )}
    </PageLayout>
  );
}
