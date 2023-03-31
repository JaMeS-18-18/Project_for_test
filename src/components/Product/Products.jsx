import React, { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import { useNavigate } from 'react-router-dom';
import "./Product.css"
import Products from "../../Utils/Product";

const Product = () => {
  const token = JSON.parse(localStorage.getItem("Token"))
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);
  const [Start, setStart] = useState(0);
  const [End, setEnd] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await Products.GetProducts(token)
      setData(data.items)
      setData2(data.items)
    };
    fetchProducts();
  }, []);

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize)
    setStart(End);
    setEnd(End + 10)
  }

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return <button><i className="fa fa-angle-double-left"></i></button>;
    }
    if (type === 'next') {
      return <button><i className="fa fa-angle-double-right"></i></button>;
    }
    return originalElement;
  }

  function SearchItem(value) {
    let SearchResult = Data2.filter(item => {
      return item.name.toLowerCase().includes(value.toLowerCase())
    })
    setData([...SearchResult])
  }

  return (
    <>
      {
        (token) ?
          <div className="container-fluid mt-5 mb-5">
            <div className="row justify-content-center">
              <input onInput={(e) => SearchItem(e.target.value)} className="form-control my-2 w-50" type="search" placeholder="Search..." aria-label="Search"></input>
              <div className="col-md-10">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-text-small mb-0">
                        <thead className="thead-primary table-sorting">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>description</th>
                            <th>sku</th>
                            <th>lastUpdateTime</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            (Data && Data.length > 0) ? Data.map((data, index) => {
                              if (index > Start && index < End) {
                                return (
                                  <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data?.description || "no description"}</td>
                                    <td>{data.sku}</td>
                                    <td>{data.lastUpdateTime}</td>
                                  </tr>
                                )
                              }
                            })
                              :
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className="table-filter-info">

                      <Pagination
                        className="pagination-data"
                        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                        onChange={PaginationChange}
                        total={Data ? Data.length : 0}
                        current={current}
                        pageSize={size}
                        showSizeChanger={false}
                        itemRender={PrevNextArrow}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : navigate("/")
      }
    </>
  );
};

export default Product