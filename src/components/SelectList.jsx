import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectList = ({ api, onSelect, multiple }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios
      .get(api)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [api]);

  const handleItemClick = (item) => {
    if (multiple) {
      const updatedSelectedItems = selectedItems.includes(item)
        ? selectedItems.filter((selectedItem) => selectedItem !== item)
        : [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
      onSelect(updatedSelectedItems);
    } else {
      setSelectedItems([item]);
      onSelect(item);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          style={{
            fontWeight: selectedItems.includes(item) ? "bold" : "normal",
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SelectList;
