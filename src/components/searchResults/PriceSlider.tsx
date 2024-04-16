import { useState } from "react";

import FilterHeader from "./FilterHeader";

import { priceSliderTypeProps } from "../../utils/data";

const PriceSlider = ({ minPrice, maxPrice }: priceSliderTypeProps) => {
  const [priceRange, setPriceRange] = useState(() => ({
    newMinPrice: minPrice,
    newMaxPrice: maxPrice,
  }));
  const [zIndex, setzIndex] = useState(() => "0");
  const [backgroundImage, setBackgroundImage] = useState("");

  const step = 1;
  const totalStepCount = Math.ceil((maxPrice - minPrice) / step);
  const { newMinPrice, newMaxPrice } = priceRange;
  const getSliderDistance = (biggerPrice: number, price: number): number => {
    const stepCount = Math.ceil((biggerPrice - price) / step);
    return (stepCount / totalStepCount) * 100;
  };
  const handleClick = () => {
    setPriceRange({ newMinPrice: minPrice, newMaxPrice: maxPrice });
    setBackgroundImage("");
    setzIndex("0");
  };
  return (
    <li className="d-flex flex-column gap-2 w-100 ">
      <FilterHeader filterType="Price" handleClick={handleClick} />
      <div className="d-flex flex-column gap-1">
        <div className="w-100 position-relative" style={{ height: "30px" }}>
          <input
            style={{ zIndex: "1", height: "0" }}
            onChange={(e) => {
              const newMinPrice = Number(e.target.value);
              const sliderDist = getSliderDistance(newMinPrice, minPrice);
              if (newMinPrice <= newMaxPrice) {
                setPriceRange((oldprice) => {
                  return { ...oldprice, newMinPrice };
                });
                if (newMaxPrice !== maxPrice) {
                  const _sliderDist = 100 - getSliderDistance(maxPrice, newMaxPrice);
                  setBackgroundImage(`linear-gradient(to right,var(--lightGrey) ${sliderDist}%,orange ${sliderDist}%,orange ${_sliderDist}%,var(--lightGrey) ${_sliderDist}%)`);
                } else {
                  setBackgroundImage(`linear-gradient(to right,var(--lightGrey) ${sliderDist}%,orange ${sliderDist}%)`);
                }
              }
            }}
            className="w-100"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={newMinPrice}
            step={step}
          />
          <input
            onChange={(e) => {
              const newMaxPrice = Number(e.target.value);
              const sliderDist = 100 - getSliderDistance(maxPrice, newMaxPrice);
              if (newMaxPrice >= newMinPrice) {
                setPriceRange((oldprice) => {
                  return { ...oldprice, newMaxPrice };
                });
                if (newMinPrice !== minPrice) {
                  const _sliderDist = getSliderDistance(newMinPrice, minPrice);
                  setBackgroundImage(`linear-gradient(to right,var(--lightGrey) ${_sliderDist}%,orange ${_sliderDist}%,orange ${sliderDist}%,var(--lightGrey) ${sliderDist}%)`);
                } else {
                  setBackgroundImage(`linear-gradient(to right,orange ${sliderDist}%,var(--lightGrey) ${sliderDist}%)`);
                }
                if (newMaxPrice == newMinPrice) setzIndex("2");
                else setzIndex("0");
              }
            }}
            style={{ zIndex, backgroundImage, backgroundColor: backgroundImage ? "" : "orange" }}
            className="w-100"
            type="range"
            step={step}
            value={newMaxPrice}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <div className="d-flex justify-content-between">
          <span className="fw-bold">&#8358; {minPrice}</span>
          {newMaxPrice !== maxPrice && <span className="fw-bold"> &#8358; {newMaxPrice}</span>}
          <span className="fw-bold">&#8358; {maxPrice}</span>
        </div>
      </div>
    </li>
  );
};

export default PriceSlider;

// php.ini - memory_limit = 300M

// <?php
// phpinfo();
// ?>

// define('WP_POST_REVISIONS',10);

// https://neophoenixlifescience.com/wp-admin/post.php?post=806&action=edit

// https://neophoenixlifescience.com
