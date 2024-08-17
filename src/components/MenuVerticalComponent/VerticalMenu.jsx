import { useEffect, useState } from "react";
import "./VerticalMenu.css";
import callApi from "../../utlis/request";
import PropTypes from "prop-types";

const VerticalMenu = ({ selectedCateDetailId }) => {
  const [lstCate, setLstCate] = useState([]);
  const [lstCateDetail, setLstCateDetail] = useState([]);

  useEffect(() => {
    const getLstCate = async () => {
      const response = await callApi("Cate/List-Category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.isSuccess === true) {
        setLstCate(result.data);
      } else {
        console.log(result.error);
      }
    };
    getLstCate();
  }, []);

  useEffect(() => {
    const getLstCateDetail = async () => {
      const response = await callApi("Cate/List-Category-Product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.isSuccess === true) {
        setLstCateDetail(result.data);
      }
    };
    getLstCateDetail();
  }, []);

  const toggleSubMenu = (index) => {
    setLstCate((prevLstCate) =>
      prevLstCate.map((cate, i) => ({
        ...cate,
        isActive: i === index ? !cate.isActive : false, // Chuyển đổi isActive cho cate được nhấp
      }))
    );
  };

  return (
    <div className="style_for">
      {lstCate.map((cate, index) => (
        <ul
          key={index}
          onClick={() => toggleSubMenu(index)}
          className={cate.isActive ? "active" : ""}
        >
          <span>❤️</span> {cate.name}
          {lstCateDetail
            .filter((fill) => fill.categoryId === cate.id)
            .map((cateD, index) => (
              <li key={index} className="mt-2" onClick={() => selectedCateDetailId(cateD.id)}>
                <span>♥</span> {cateD.name}
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
};

VerticalMenu.propTypes = {
  selectedCateDetailId: PropTypes.func,
};

export default VerticalMenu;
