import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  {
    id: 1,
    description: "Passports",
    quantity: 2,
    packed: false,
  },
  {
    id: 2,
    description: "Shoes",
    quantity: 3,
    packed: false,
  },
  {
    id: 3,
    description: "Chargers",
    quantity: 2,
    packed: false,
  },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  // Add a new item to the current items array
  function handleAddItems(item) {
    // Due to immutability, we cannot
    // setItems((items) => ietms.push(item));
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handelClearList() {
    const confirmed = window.confirm("Proceed to clear all your items?");
    if (confirmed) setItems([]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggle={handleTogglePacked}
        onClearList={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}
