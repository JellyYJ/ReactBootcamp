import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  // lift up  state
  const [friends, setFriends] = useState(initialFriends);
  const [selected, setSelected] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function addNewFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelection(selectFriend) {
    // setSelected(selectFriend);
    setSelected((cur) => (cur?.id === selectFriend.id ? null : selectFriend));
    setShowAddFriend(false);
  }

  function handleSplit(newBalance) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selected.id
          ? { ...friend, balance: friend.balance + newBalance }
          : friend
      )
    );

    setSelected(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelection}
          selected={selected}
        />

        {showAddFriend && <FormAddFriend onAddNewFriend={addNewFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selected && (
        <FormSplitBill
          selected={selected}
          onSplit={handleSplit}
          key={selected.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelect, selected }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelect, selected }) {
  const isSelected = selected?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} £{Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owns you £{Math.abs(friend.balance)}
        </p>
      )}
      <Button onClick={(e) => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddNewFriend }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("https://i.pravatar.cc/48");

  function handleSumbit(e) {
    e.preventDefault();

    if (!name || !url) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${url}?=${id}`,
      balance: 0,
    };

    onAddNewFriend(newFriend);
    // console.log(newFriend);

    // Reset
    setName("");
    setUrl("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSumbit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>Image URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selected, onSplit }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [paidUser, setPaidUser] = useState("user");

  // Calcualte how much friend needs to pay
  const friendExpense = bill ? bill - myExpense : "";

  function handleSumbit(e) {
    e.preventDefault();

    if (!bill || !myExpense) return;

    onSplit(paidUser === "user" ? friendExpense : -friendExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSumbit}>
      <h2>Split with {selected.name}</h2>

      <label>💰 Total Spend:</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🧍‍♀️ Your expense: </label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? bill : Number(e.target.value)
          )
        }
      ></input>

      <label>👫 {selected.name}'s expense: </label>
      <input type="text" disabled value={friendExpense}></input>

      <label>🤑 Who is paying the bill</label>
      <select value={paidUser} onChange={(e) => setPaidUser(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selected.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
