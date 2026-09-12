import { useState } from "react";

const inventory = [
  { location: "Dry Goods", item: "Basmati rice Chef's Delight", unit: "40 lb bag", min: 6, onHand: 4 },
  { location: "Dry Goods", item: "Salt", unit: "25 lb bag", min: 2, onHand: null },
  { location: "Dry Goods", item: "Thin spaghetti", unit: "case", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Penne regate pasta", unit: "case", min: 1, onHand: 0.5 },
  { location: "Dry Goods", item: "Lasagna pasta", unit: "case", min: 3, onHand: 1 },
  { location: "Dry Goods", item: "Small elbow pasta", unit: "case", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Black pepper", unit: "big jar", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Italian seasoning", unit: "big jar", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Basil", unit: "big jar", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Oregano", unit: "big jar", min: 1, onHand: null },
  { location: "Dry Goods", item: "Thyme", unit: "big jar", min: 1, onHand: null },
  { location: "Dry Goods", item: "Sage", unit: "small jar", min: 1, onHand: null },
  { location: "Dry Goods", item: "Marjoram", unit: "big jar", min: 1, onHand: null },
  { location: "Dry Goods", item: "Cinnamon powder", unit: "big jar", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Cinnamon sticks", unit: "big jar", min: 1, onHand: null },
  { location: "Dry Goods", item: "Crushed red pepper", unit: "big jar", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Paprika", unit: "small jar", min: 1, onHand: null },
  { location: "Dry Goods", item: "Bay leaf", unit: "big jar", min: 1, onHand: 1 },
  { location: "Dry Goods", item: "Coleman's mustard powder", unit: "tin", min: 1, onHand: 2 },

  { location: "Aisle 5", item: "Bread crumbs Panko", unit: "case", min: 1, onHand: 1 },
  { location: "Aisle 5", item: "Soy sauce Kikkoman", unit: "case of 4 gal", min: 1, onHand: 1 },
  { location: "Aisle 5", item: "Sambal oleek", unit: "case of 3 gal", min: 1, onHand: null },
  { location: "Aisle 5", item: "Sesame oil", unit: "can", min: 1, onHand: null },
  { location: "Aisle 5", item: "Chaokoh coconut milk", unit: "case of 6", min: 3, onHand: 1 },
  { location: "Aisle 5", item: "Kidney beans can", unit: "case of 6", min: 2, onHand: 2 / 6 },
  { location: "Aisle 5", item: "Garbanzo beans can", unit: "case of 6", min: 2, onHand: 0 },
  { location: "Aisle 5", item: "Black beans can", unit: "case of 6", min: 2, onHand: 1 / 6 },
  { location: "Aisle 5", item: "Pinto beans can", unit: "case of 6", min: 2, onHand: 1 },
  { location: "Aisle 5", item: "Pineapple tidbits can", unit: "case of 6", min: 1, onHand: 3 / 6 },
  { location: "Aisle 5", item: "Medium black olives", unit: "case of 6", min: 3, onHand: 7 / 6 },
  { location: "Aisle 5", item: "Tomato crushed", unit: "case of 6", min: 12, onHand: 7 },
  { location: "Aisle 5", item: "Tomato paste can", unit: "case of 6", min: 2, onHand: 1.5 },
  { location: "Aisle 5", item: "Sugar in the Raw packets", unit: "case", min: 0.25, onHand: null },

  { location: "Cold Storage", item: "Ricotta", unit: "case of 4", min: 2, onHand: null },
  { location: "Cold Storage", item: "Mozzarella shredded", unit: "case of 4", min: 3, onHand: 1 },
  { location: "Cold Storage", item: "Philadelphia cream cheese", unit: "case of 6", min: 3, onHand: 2 / 6 },
  { location: "Cold Storage", item: "Daisy sour cream", unit: "case of 4", min: 2, onHand: 2 },
  { location: "Cold Storage", item: "Butter salted", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Cold Storage", item: "Butter unsalted", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Cold Storage", item: "Whipped butter cups", unit: "case", min: 0.25, onHand: 1 },
  { location: "Cold Storage", item: "Kronos filo dough", unit: "case of 24", min: 3, onHand: 3 },
  { location: "Cold Storage", item: "Pillsbury puff pastry", unit: "case of 120", min: 0.5, onHand: 0 },
  { location: "Cold Storage", item: "Frozen peas", unit: "case of 12", min: 2, onHand: 1 },
  { location: "Cold Storage", item: "Frozen peas & carrots", unit: "case of 12", min: 1, onHand: 1 },
  { location: "Cold Storage", item: "Frozen chopped spinach", unit: "case of 12", min: 2, onHand: 0 },
  { location: "Cold Storage", item: "Frozen mixed veg 5-way", unit: "case of 12", min: 0, onHand: 3.5 },
  { location: "Cold Storage", item: "Fresh basil", unit: "1 lb bag", min: 1, onHand: 0 },
  { location: "Cold Storage", item: "Parsley", unit: "1 lb bag", min: 1, onHand: 1 },
  { location: "Cold Storage", item: "Cilantro", unit: "60-count case", min: 1, onHand: 1 },

  { location: "Sam's", item: "Spring mix", unit: "case of 9", min: 1, onHand: 0.67 },
  { location: "Sam's", item: "Cherub tomatoes", unit: "box", min: 6, onHand: 2 },
  { location: "Sam's", item: "Whole milk", unit: "case of 4 gal", min: 5, onHand: 1.5 },
  { location: "Sam's", item: "Heavy whipping cream", unit: "case of 6", min: 3, onHand: 3 },
  { location: "Sam's", item: "50 gal garbage bags", unit: "box", min: 2, onHand: 2 },
  { location: "Sam's", item: "Napkins 1/8 fold 2-ply", unit: "case", min: 2, onHand: null },
  { location: "Sam's", item: "Jumbo toilet paper", unit: "case", min: 1, onHand: 1 },
  { location: "Sam's", item: "Multifold paper towels", unit: "case", min: 1, onHand: 1 },
  { location: "Sam's", item: "T-shirt thank you bags", unit: "case", min: 0.25, onHand: 0.25 },
  { location: "Sam's", item: "Foil trays full size", unit: "pkg of 15", min: 2, onHand: 2 },
  { location: "Sam's", item: "Foil trays half size", unit: "pkg of 30", min: 1, onHand: 1 },
  { location: "Sam's", item: "Parmesan cheese", unit: "container", min: 2, onHand: 0 },
  { location: "Sam's", item: "Zulka sugar", unit: "case", min: 5, onHand: null },
  { location: "Sam's", item: "Walnuts halves", unit: "bag", min: 2, onHand: 1 },
  { location: "Sam's", item: "Almonds", unit: "bag", min: 2, onHand: 2 },

  { location: "Aisle 1", item: "Stash peppermint tea", unit: "case of 6", min: 2, onHand: 2 },
  { location: "Aisle 1", item: "Stash chamomile tea", unit: "case of 6", min: 2, onHand: 2 },
  { location: "Aisle 1", item: "Stash lemon-ginger tea", unit: "case of 6", min: 2, onHand: 2 },
  { location: "Aisle 1", item: "Stash raspberry-hibiscus tea", unit: "case of 6", min: 2, onHand: 2 },
  { location: "Aisle 1", item: "Stash green decaf tea", unit: "case of 6", min: 2, onHand: 2 },
  { location: "Aisle 1", item: "Sunset 12 oz cold drink cup", unit: "case", min: 1, onHand: 0.25 },
  { location: "Aisle 1", item: "Sunset flat slotted lid 12 oz", unit: "case", min: 1, onHand: 1 },
  { location: "Aisle 1", item: "Plastic spoons medium weight", unit: "case", min: 2, onHand: 1 },
  { location: "Aisle 1", item: "Plastic forks medium weight", unit: "bundle", min: 1, onHand: 1 },
  { location: "Aisle 1", item: "White paper bag #2", unit: "bundle", min: 1, onHand: 1 },
  { location: "Aisle 1", item: "White paper bag #4", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 1", item: "Real Lemon juice", unit: "case", min: 2, onHand: 2 },

  { location: "Aisle 2", item: "Element Quicknap napkins", unit: "case", min: 1, onHand: 1 },
  { location: "Aisle 2", item: "Sunset uncoated paper plates", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 2", item: "Dart CH16DEF salad box lid", unit: "case", min: 1, onHand: 1 },
  { location: "Aisle 2", item: "Sunset 16oz soup & deli container", unit: "case", min: 1, onHand: null },

  { location: "Aisle 3", item: "Bleach Classic/Pure Bright", unit: "case of 6 gal", min: 2, onHand: 2 },
  { location: "Aisle 3", item: "Skyline pine cleaner", unit: "case of 4 gal", min: 2, onHand: 2 },
  { location: "Aisle 3", item: "Skyline degreaser", unit: "case of 4 gal", min: 2, onHand: 2 },
  { location: "Aisle 3", item: "Black garbage bags 13 gal", unit: "case", min: 0.25, onHand: 0.25 },
  { location: "Aisle 3", item: "Dawn dish soap", unit: "case of 4", min: 1, onHand: 1 },
  { location: "Aisle 3", item: "Soft Touch GR-340 roll towel", unit: "case of 12", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "Satin handwashing soap", unit: "gallon", min: 1, onHand: null },
  { location: "Aisle 3", item: "Steel scrubbing balls", unit: "pack of 12", min: 0.5, onHand: null },
  { location: "Aisle 3", item: "Plastic wrap 18\"", unit: "box", min: 1, onHand: 1 },
  { location: "Aisle 3", item: "Foil buffet pans full size deep", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "Foil buffet pans half size deep", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "Foil pan lids full size", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "Foil pan lids half size", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "2 oz portion cup", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "2 oz portion cup lid", unit: "case", min: 0.5, onHand: 0.5 },
  { location: "Aisle 3", item: "1.5 oz portion cup", unit: "case", min: 1, onHand: 1 },
  { location: "Aisle 3", item: "1.5 oz portion cup lid", unit: "case", min: 1, onHand: 1 },
  { location: "Aisle 3", item: "Vinyl gloves large", unit: "case of 12 boxes", min: 3, onHand: 3 },
  { location: "Aisle 3", item: "Vinyl gloves medium", unit: "case of 12 boxes", min: 3, onHand: 3 },
  { location: "Aisle 3", item: "Hair nets black", unit: "box", min: 0.5, onHand: null },

  { location: "Store Rear", item: "Canola fry oil", unit: "5 gal container", min: 3, onHand: 2 },
  { location: "Store Rear", item: "Extra virgin olive oil", unit: "case of 4", min: 1, onHand: 0.5 },
  { location: "Store Rear", item: "Vinegar white", unit: "gallon", min: 1, onHand: 1 },
  { location: "Store Rear", item: "Vinegar red", unit: "gallon", min: 1, onHand: null },

  { location: "Aisle 4", item: "Molasses", unit: "gallon", min: 2, onHand: 1 },
  { location: "Aisle 4", item: "Honey", unit: "bottle", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Callebaut cocoa powder", unit: "bag", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Callebaut 811 dark callets", unit: "bag", min: 1, onHand: null },
  { location: "Aisle 4", item: "Bhogasian raisins", unit: "case of 12", min: 0.5, onHand: 0.5 },
  { location: "Aisle 4", item: "Whole wheat flour stone ground", unit: "50 lb bag", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Rice flour", unit: "50 lb bag", min: 1, onHand: null },
  { location: "Aisle 4", item: "Cornmeal", unit: "25 lb bag", min: 1, onHand: null },
  { location: "Aisle 4", item: "All Trumps flour", unit: "25 lb bag", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Argo cornstarch", unit: "case of 12", min: 3, onHand: 3 },
  { location: "Aisle 4", item: "Baking soda", unit: "tub", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Baking powder", unit: "tub", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Sweetened condensed milk", unit: "case of 24", min: 3, onHand: 3 },
  { location: "Aisle 4", item: "Yeast instant pkt", unit: "case of 12 pkg", min: 3, onHand: 3 },
  { location: "Aisle 4", item: "All purpose flour", unit: "25 lb bag", min: 4, onHand: 4 },
  { location: "Aisle 4", item: "Sugar light brown", unit: "25 lb bag", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Sugar powdered white", unit: "case of 12", min: 3, onHand: 3 },
  { location: "Aisle 4", item: "Kidney beans dry", unit: "25 lb bag", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Blackeye peas dry", unit: "25 lb bag", min: 1, onHand: 1 },
  { location: "Aisle 4", item: "Chickpeas dry", unit: "25 lb bag", min: 2, onHand: 0.5 },
  { location: "Aisle 4", item: "Brown rice", unit: "20 lb bag", min: 5, onHand: 2 },
];

function getStatus(item) {
  if (item.onHand === null) return "NOT CHECKED";
  if (item.onHand === 0) return "OUT OF STOCK";
  if (item.onHand < item.min) return "BELOW MINIMUM";
  return "OK";
}

function App() {
  const [screen, setScreen] = useState("dashboard");

  const counts = inventory.reduce(
    (result, item) => {
      const status = getStatus(item);
      result[status] += 1;
      return result;
    },
    {
      OK: 0,
      "BELOW MINIMUM": 0,
      "OUT OF STOCK": 0,
      "NOT CHECKED": 0,
    }
  );

  const needsAttention = inventory.filter(
    (item) =>
      getStatus(item) === "BELOW MINIMUM" ||
      getStatus(item) === "OUT OF STOCK"
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Kalachandji Inventory</h1>
          <p>Restaurant inventory management</p>
        </div>
      </header>

      <nav className="nav">
        <button
          className={screen === "dashboard" ? "active" : ""}
          onClick={() => setScreen("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={screen === "inventory" ? "active" : ""}
          onClick={() => setScreen("inventory")}
        >
          Weekly Inventory
        </button>

        <button
          className={screen === "orders" ? "active" : ""}
          onClick={() => setScreen("orders")}
        >
          Order List
        </button>
      </nav>

      <main className="content">
        {screen === "dashboard" && (
          <>
            <div className="welcome">
              <h2>Inventory Dashboard</h2>
              <p>Current inventory overview</p>
            </div>

            <div className="cards">
              <div className="card">
                <span>Total Items</span>
                <strong>{inventory.length}</strong>
              </div>

              <div className="card ok">
                <span>OK</span>
                <strong>{counts.OK}</strong>
              </div>

              <div className="card warning">
                <span>Below Minimum</span>
                <strong>{counts["BELOW MINIMUM"]}</strong>
              </div>

              <div className="card danger">
                <span>Out of Stock</span>
                <strong>{counts["OUT OF STOCK"]}</strong>
              </div>

              <div className="card neutral">
                <span>Not Checked</span>
                <strong>{counts["NOT CHECKED"]}</strong>
              </div>
            </div>

            <section className="section">
              <div className="section-header">
                <div>
                  <h2>Items Needing Attention</h2>
                  <p>Items currently below their minimum stock level</p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setScreen("orders")}
                >
                  View Order List
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Item</th>
                      <th>Minimum</th>
                      <th>On Hand</th>
                      <th>Status</th>
                      <th>Suggested Order</th>
                    </tr>
                  </thead>

                  <tbody>
                    {needsAttention.map((item) => {
                      const shortage =
                        item.onHand === null
                          ? "-"
                          : Math.max(item.min - item.onHand, 0);

                      return (
                        <tr key={`${item.location}-${item.item}`}>
                          <td>{item.location}</td>
                          <td>{item.item}</td>
                          <td>
                            {item.min} {item.unit}
                          </td>
                          <td>
                            {item.onHand === null
                              ? "Not checked"
                              : `${item.onHand} ${item.unit}`}
                          </td>
                          <td>
                            <span
                              className={`status ${getStatus(item)
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                            >
                              {getStatus(item)}
                            </span>
                          </td>
                          <td>
                            {shortage === "-"
                              ? "Check inventory"
                              : `${shortage} ${item.unit}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {screen === "inventory" && (
          <section className="section">
            <h2>Weekly Inventory</h2>
            <p>
              This is where we will build the fast weekly inventory entry
              screen next.
            </p>

            <button
              className="primary-button"
              onClick={() => setScreen("dashboard")}
            >
              Back to Dashboard
            </button>
          </section>
        )}

        {screen === "orders" && (
          <section className="section">
            <h2>Order List</h2>
            <p>
              This is where we will build editable suggested order quantities
              next.
            </p>

            <button
              className="primary-button"
              onClick={() => setScreen("dashboard")}
            >
              Back to Dashboard
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;