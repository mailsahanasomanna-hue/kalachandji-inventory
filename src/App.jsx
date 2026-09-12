import React, { useState, useEffect, useMemo } from 'react';

const INITIAL_DATA = [
  { id: 1, location: "Dry Goods", item: "Basmati rice Chef's Delight", unit: "40 lb bag", minStock: "6", onHand: "4", status: "Below Min", action: "Order 2 bags" },
  { id: 2, location: "Dry Goods", item: "Salt", unit: "25 lb bag", minStock: "2", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 3, location: "Dry Goods", item: "Thin spaghetti", unit: "case", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 4, location: "Dry Goods", item: "Penne regate pasta", unit: "case", minStock: "1", onHand: "0.5", status: "Below Min", action: "Order 0.5 case" },
  { id: 5, location: "Dry Goods", item: "Lasagna pasta", unit: "case", minStock: "3", onHand: "1", status: "Below Min", action: "Order 2 cases" },
  { id: 6, location: "Dry Goods", item: "Small elbow pasta", unit: "case", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 7, location: "Dry Goods", item: "Black pepper", unit: "big jar", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 8, location: "Dry Goods", item: "Italian seasoning", unit: "big jar", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 9, location: "Dry Goods", item: "Basil", unit: "big jar", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 10, location: "Dry Goods", item: "Oregano", unit: "big jar", minStock: "1", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 11, location: "Dry Goods", item: "Thyme", unit: "big jar", minStock: "1", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 12, location: "Dry Goods", item: "Sage", unit: "small jar", minStock: "1", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 13, location: "Dry Goods", item: "Marjoram", unit: "big jar", minStock: "1", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 14, location: "Dry Goods", item: "Cinnamon powder", unit: "big jar", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 15, location: "Dry Goods", item: "Cinnamon sticks", unit: "big jar", minStock: "1", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 16, location: "Dry Goods", item: "Crushed red pepper", unit: "big jar", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 17, location: "Dry Goods", item: "Paprika", unit: "small jar", minStock: "1", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 18, location: "Dry Goods", item: "Bay leaf", unit: "big jar", minStock: "1", onHand: "1", status: "OK", action: "" },
  { id: 19, location: "Dry Goods", item: "Coleman's mustard powder", unit: "tin", minStock: "1", onHand: "2", status: "OK", action: "" },
  { id: 20, location: "Aisle 5", item: "Bread crumbs Panko", unit: "case", minStock: "1 bag", onHand: "1", status: "OK", action: "" },
  { id: 21, location: "Aisle 5", item: "Soy sauce Kikkoman", unit: "case of 4 gal", minStock: "1 gallon", onHand: "1", status: "OK", action: "" },
  { id: 22, location: "Aisle 5", item: "Sambal oleek", unit: "case of 3 gal", minStock: "1 gallon", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 23, location: "Aisle 5", item: "Sesame oil", unit: "can", minStock: "1 can", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 24, location: "Aisle 5", item: "Chaokoh coconut milk", unit: "case of 6", minStock: "3 cases", onHand: "1 can", status: "Below Min", action: "Order ~2+ cases" },
  { id: 25, location: "Aisle 5", item: "Toyo GF soy sauce", unit: "gallon", minStock: "0", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 26, location: "Aisle 5", item: "Kidney beans can", unit: "case of 6", minStock: "2 cases", onHand: "2 cans", status: "Below Min", action: "Order ~1.5+ cases" },
  { id: 27, location: "Aisle 5", item: "Garbanzo beans can", unit: "case of 6", minStock: "2 cases", onHand: "0", status: "Out of Stock", action: "Order 2 cases" },
  { id: 28, location: "Aisle 5", item: "Black beans can", unit: "case of 6", minStock: "2 cases", onHand: "1 can", status: "Below Min", action: "Order ~1.5+ cases" },
  { id: 29, location: "Aisle 5", item: "Pinto beans can", unit: "case of 6", minStock: "2 cases", onHand: "1 case", status: "Below Min", action: "Order 1 case" },
  { id: 30, location: "Aisle 5", item: "Pineapple tidbits can", unit: "case of 6", minStock: "1 case", onHand: "3 cans", status: "Below Min", action: "Order ~3 cans" },
  { id: 31, location: "Aisle 5", item: "Medium black olives", unit: "case of 6", minStock: "3 cans", onHand: "7 cans", status: "OK", action: "Above minimum" },
  { id: 32, location: "Aisle 5", item: "Tomato crushed", unit: "case of 6", minStock: "12 cases", onHand: "7 cases", status: "Below Min", action: "Order 5 cases" },
  { id: 33, location: "Aisle 5", item: "Tomato paste can", unit: "case of 6", minStock: "2 cases", onHand: "1.5 cases", status: "Below Min", action: "Order 0.5 case" },
  { id: 34, location: "Aisle 5", item: "Sugar in the Raw packets", unit: "case", minStock: "0.25 case", onHand: "—", status: "Not Checked", action: "Complete count" },
  { id: 35, location: "Cold Storage", item: "Ricotta", unit: "case of 4", minStock: "2 cases", onHand: "3 containers", status: "Below Min", action: "Verify units; likely reorder" },
  { id: 36, location: "Cold Storage", item: "Mozzarella shredded", unit: "case of 4", minStock: "3 cases", onHand: "1 case", status: "Below Min", action: "Order 2 cases" },
  { id: 37, location: "Cold Storage", item: "Philadelphia cream cheese", unit: "case of 6", minStock: "3 pkg", onHand: "2 pkgs", status: "Below Min", action: "Order 1 pkg" },
  { id: 38, location: "Cold Storage", item: "Daisy sour cream", unit: "case of 4", minStock: "2 tubs", onHand: "2 tubs", status: "OK", action: "" },
  { id: 39, location: "Cold Storage", item: "Butter salted", unit: "case", minStock: "0.5 case", onHand: "0.5 case", status: "OK", action: "" },
  { id: 40, location: "Cold Storage", item: "Butter unsalted", unit: "case", minStock: "0.5 case", onHand: "0.5 case", status: "OK", action: "" },
  { id: 41, location: "Cold Storage", item: "Whipped butter cups", unit: "case", minStock: "0.25 case", onHand: "1 tub", status: "OK", action: "" },
  { id: 42, location: "Cold Storage", item: "Kronos filo dough", unit: "case of 24", minStock: "3 pkgs", onHand: "3 pkg", status: "OK", action: "" },
  { id: 43, location: "Cold Storage", item: "Pillsbury puff pastry", unit: "case of 120", minStock: "0.5 case", onHand: "0", status: "Out of Stock", action: "Order 0.5 case" },
  { id: 44, location: "Cold Storage", item: "Frozen peas", unit: "case of 12", minStock: "2 cases", onHand: "1 case", status: "Below Min", action: "Order 1 case" },
  { id: 45, location: "Cold Storage", item: "Frozen peas & carrots", unit: "case of 12", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 46, location: "Cold Storage", item: "Frozen chopped spinach", unit: "case of 12", minStock: "2 cases", onHand: "0", status: "Out of Stock", action: "Order 2 cases" },
  { id: 47, location: "Cold Storage", item: "Frozen mixed veg 5-way", unit: "case of 12", minStock: "0", onHand: "3.5 cases", status: "OK", action: "" },
  { id: 48, location: "Cold Storage", item: "Fresh basil", unit: "1 lb bag", minStock: "1 bag", onHand: "0", status: "Out of Stock", action: "Order 1 bag" },
  { id: 49, location: "Cold Storage", item: "Parsley", unit: "1 lb bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 50, location: "Cold Storage", item: "Cilantro", unit: "60-count case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 51, location: "Sam's", item: "Spring mix", unit: "case of 9", minStock: "1 case", onHand: "0.67 case", status: "Below Min", action: "Order 0.33 case; verify ?" },
  { id: 52, location: "Sam's", item: "Cherub tomatoes", unit: "box", minStock: "6 boxes", onHand: "2 boxes", status: "Below Min", action: "Order 4 boxes" },
  { id: 53, location: "Sam's", item: "Whole milk", unit: "case of 4 gal", minStock: "5 cases", onHand: "1.5 cases", status: "Below Min", action: "Order 3.5 cases" },
  { id: 54, location: "Sam's", item: "Heavy whipping cream", unit: "case of 6", minStock: "3 cases", onHand: "3 cases", status: "OK", action: "" },
  { id: 55, location: "Sam's", item: "50 gal garbage bags", unit: "box", minStock: "2 boxes", onHand: "2 boxes", status: "OK", action: "" },
  { id: 56, location: "Sam's", item: "Napkins 1/8 fold 2-ply", unit: "case", minStock: "2 cases", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 57, location: "Sam's", item: "Jumbo toilet paper", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 58, location: "Sam's", item: "Multifold paper towels", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 59, location: "Sam's", item: "T-shirt thank you bags", unit: "case", minStock: "0.25 case", onHand: "0.25 case", status: "OK", action: "" },
  { id: 60, location: "Sam's", item: "Foil trays full size", unit: "pkg of 15", minStock: "2 pkg", onHand: "2 pkg", status: "OK", action: "" },
  { id: 61, location: "Sam's", item: "Foil trays half size", unit: "pkg of 30", minStock: "1 pkg", onHand: "1 pkg", status: "OK", action: "" },
  { id: 62, location: "Sam's", item: "Parmesan cheese", unit: "container", minStock: "2 big / 3 sm", onHand: "0", status: "Out of Stock", action: "Order 2 big or 3 sm" },
  { id: 63, location: "Sam's", item: "Zulka sugar", unit: "case", minStock: "5 cases", onHand: "", status: "Not Found", action: "Locate or reorder" },
  { id: 64, location: "Sam's", item: "Walnuts halves", unit: "bag", minStock: "2 bags", onHand: "1 bag", status: "Below Min", action: "Order 1 bag" },
  { id: 65, location: "Sam's", item: "Almonds", unit: "bag", minStock: "2 bags", onHand: "2 bags", status: "OK", action: "" },
  { id: 66, location: "Aisle 1", item: "Stash peppermint tea", unit: "case of 6", minStock: "2 box", onHand: "2 box", status: "OK", action: "" },
  { id: 67, location: "Aisle 1", item: "Stash chamomile tea", unit: "case of 6", minStock: "2 box", onHand: "2 box", status: "OK", action: "" },
  { id: 68, location: "Aisle 1", item: "Stash lemon-ginger tea", unit: "case of 6", minStock: "2 box", onHand: "2 box", status: "OK", action: "" },
  { id: 69, location: "Aisle 1", item: "Stash raspberry-hibiscus tea", unit: "case of 6", minStock: "2 box", onHand: "2 box", status: "OK", action: "" },
  { id: 70, location: "Aisle 1", item: "Stash green decaf tea", unit: "case of 6", minStock: "2 box", onHand: "2 box", status: "OK", action: "" },
  { id: 71, location: "Aisle 1", item: "Sunset 12 oz cold drink cup", unit: "case", minStock: "1 case", onHand: "0.25 case", status: "Below Min", action: "Order 0.75 case" },
  { id: 72, location: "Aisle 1", item: "Sunset flat slotted lid 12 oz", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 73, location: "Aisle 1", item: "Plastic spoons medium weight", unit: "case", minStock: "2 cases", onHand: "1 case", status: "Below Min", action: "Order 1 case" },
  { id: 74, location: "Aisle 1", item: "Plastic forks medium weight", unit: "bundle", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 75, location: "Aisle 1", item: "White paper bag #2", unit: "bundle", minStock: "1 bundle", onHand: "1 bundle", status: "OK", action: "" },
  { id: 76, location: "Aisle 1", item: "White paper bag #4", unit: "case", minStock: "1/2 bundle", onHand: "1/2 bundle", status: "OK", action: "" },
  { id: 77, location: "Aisle 1", item: "Real Lemon juice", unit: "case", minStock: "2 case", onHand: "2 case", status: "OK", action: "" },
  { id: 78, location: "Aisle 2", item: "Element Quicknap napkins", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 79, location: "Aisle 2", item: "Sunset uncoated paper plates", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 80, location: "Aisle 2", item: "Dart CH16DEF salad box lid", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 81, location: "Aisle 2", item: "Sunset 16oz soup & deli container", unit: "case", minStock: "1 case", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 82, location: "Aisle 3", item: "Bleach Classic/Pure Bright", unit: "case of 6 gal", minStock: "2 gallon", onHand: "2 gallon", status: "OK", action: "" },
  { id: 83, location: "Aisle 3", item: "Skyline pine cleaner", unit: "case of 4 gal", minStock: "2 gallon", onHand: "2 gallon", status: "OK", action: "" },
  { id: 84, location: "Aisle 3", item: "Skyline degreaser", unit: "case of 4 gal", minStock: "2 gallon", onHand: "2 gallon", status: "OK", action: "" },
  { id: 85, location: "Aisle 3", item: "Black garbage bags 13 gal", unit: "case", minStock: "1/4 case", onHand: "1/4 case", status: "OK", action: "" },
  { id: 86, location: "Aisle 3", item: "Dawn dish soap", unit: "case of 4", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 87, location: "Aisle 3", item: "Soft Touch GR-340 roll towel", unit: "case of 12", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 88, location: "Aisle 3", item: "Satin handwashing soap", unit: "gallon", minStock: "1 gallon", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 89, location: "Aisle 3", item: "Steel scrubbing balls", unit: "pack of 12", minStock: "1/2 pack", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 90, location: "Aisle 3", item: "Plastic wrap 18\"", unit: "box", minStock: "1 box", onHand: "1 box", status: "OK", action: "" },
  { id: 91, location: "Aisle 3", item: "Foil buffet pans full size deep", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 92, location: "Aisle 3", item: "Foil buffet pans half size deep", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 93, location: "Aisle 3", item: "Foil pan lids full size", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 94, location: "Aisle 3", item: "Foil pan lids half size", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 95, location: "Aisle 3", item: "2 oz portion cup", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 96, location: "Aisle 3", item: "2 oz portion cup lid", unit: "case", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 97, location: "Aisle 3", item: "1.5 oz portion cup", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 98, location: "Aisle 3", item: "1.5 oz portion cup lid", unit: "case", minStock: "1 case", onHand: "1 case", status: "OK", action: "" },
  { id: 99, location: "Aisle 3", item: "Vinyl gloves large", unit: "case of 12 boxes", minStock: "3 boxes", onHand: "3 boxes", status: "OK", action: "" },
  { id: 100, location: "Aisle 3", item: "Vinyl gloves medium", unit: "case of 12 boxes", minStock: "3 boxes", onHand: "3 boxes", status: "OK", action: "" },
  { id: 101, location: "Aisle 3", item: "Hair nets black", unit: "box", minStock: "1/2 box", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 102, location: "Store Rear", item: "Canola fry oil", unit: "5 gal container", minStock: "3 container", onHand: "2", status: "Below Min", action: "Order 1 container" },
  { id: 103, location: "Store Rear", item: "Extra virgin olive oil", unit: "case of 4", minStock: "1 case", onHand: "0.5 case", status: "Below Min", action: "Order 0.5 case" },
  { id: 104, location: "Store Rear", item: "Vinegar white", unit: "gallon", minStock: "1 gallon", onHand: "1 gallon", status: "OK", action: "" },
  { id: 105, location: "Store Rear", item: "Vinegar red", unit: "gallon", minStock: "1 gallon", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 106, location: "Aisle 4", item: "Molasses", unit: "gallon", minStock: "2 gallons", onHand: "1", status: "Below Min", action: "Order 1 gallon" },
  { id: 107, location: "Aisle 4", item: "Honey", unit: "bottle", minStock: "1 bottle", onHand: "1 bottle", status: "OK", action: "" },
  { id: 108, location: "Aisle 4", item: "Callebaut cocoa powder", unit: "bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 109, location: "Aisle 4", item: "Callebaut 811 dark callets", unit: "bag", minStock: "1 bag", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 110, location: "Aisle 4", item: "Bhogasian raisins", unit: "case of 12", minStock: "1/2 case", onHand: "1/2 case", status: "OK", action: "" },
  { id: 111, location: "Aisle 4", item: "Whole wheat flour stone ground", unit: "50 lb bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 112, location: "Aisle 4", item: "Rice flour", unit: "50 lb bag", minStock: "1 bag", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 113, location: "Aisle 4", item: "Cornmeal", unit: "25 lb bag", minStock: "1 bag", onHand: "?", status: "Not Found", action: "Locate or reorder" },
  { id: 114, location: "Aisle 4", item: "All Trumps flour", unit: "25 lb bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 115, location: "Aisle 4", item: "Argo cornstarch", unit: "case of 12", minStock: "3 box", onHand: "3 box", status: "OK", action: "" },
  { id: 116, location: "Aisle 4", item: "Baking soda", unit: "tub", minStock: "1 tub", onHand: "1 tub", status: "OK", action: "" },
  { id: 117, location: "Aisle 4", item: "Baking powder", unit: "tub", minStock: "1 tub", onHand: "1 tub", status: "OK", action: "" },
  { id: 118, location: "Aisle 4", item: "Sweetened condensed milk", unit: "case of 24", minStock: "3 cans", onHand: "3 cans", status: "OK", action: "" },
  { id: 119, location: "Aisle 4", item: "Yeast instant pkt", unit: "case of 12 pkg", minStock: "3 pkg", onHand: "3 pkg", status: "OK", action: "" },
  { id: 120, location: "Aisle 4", item: "All purpose flour", unit: "25 lb bag", minStock: "4 bags", onHand: "4 bags", status: "OK", action: "" },
  { id: 121, location: "Aisle 4", item: "Sugar light brown", unit: "25 lb bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 122, location: "Aisle 4", item: "Sugar powdered white", unit: "case of 12", minStock: "3 bags", onHand: "3 bags", status: "OK", action: "" },
  { id: 123, location: "Aisle 4", item: "Kidney beans dry", unit: "25 lb bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 124, location: "Aisle 4", item: "Blackeye peas dry", unit: "25 lb bag", minStock: "1 bag", onHand: "1 bag", status: "OK", action: "" },
  { id: 125, location: "Aisle 4", item: "Chickpeas dry", unit: "25 lb bag", minStock: "2 bags", onHand: "0.5 bag", status: "Below Min", action: "Order 1.5 bags" },
  { id: 126, location: "Aisle 4", item: "Brown rice", unit: "20 lb bag", minStock: "5 bags", onHand: "2 bags", status: "Below Min", action: "Order 3 bags" }
];

const autoCalculateStatus = (item) => {
  const newItem = { ...item };
  const val = newItem.onHand ? newItem.onHand.toString().trim() : "";
  const minVal = parseFloat(newItem.minStock) || 0;
  const numVal = parseFloat(val);

  if (val === "?" || val === "—" || val === "") return newItem;

  if (!isNaN(numVal)) {
    if (numVal === 0) {
      newItem.status = "Out of Stock";
      newItem.action = `Order ${minVal > 0 ? minVal : 1} ${newItem.unit}`;
    } else if (numVal < minVal) {
      newItem.status = "Below Min";
      const diff = minVal - numVal;
      newItem.action = `Order ${diff} ${newItem.unit}`;
    } else {
      newItem.status = "OK";
      newItem.action = "";
    }
  }
  return newItem;
};

export default function App() {
  const CORRECT_PIN = "1234";
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('kalachandji_auth') === 'true';
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('kalachandji_831_inventory_v3');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [historyLogs, setHistoryLogs] = useState(() => {
    const savedHistory = localStorage.getItem('kalachandji_831_history_v3');
    return savedHistory ? JSON.parse(savedHistory) : {};
  });

  const [trackingDate, setTrackingDate] = useState(() => {
    const savedDate = localStorage.getItem('kalachandji_831_date_v3');
    return savedDate || "2026-08-31";
  });

  const [selectedSnapshotKey, setSelectedSnapshotKey] = useState('current');
  const [viewingHistory, setViewingHistory] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortCol, setSortCol] = useState('location');
  const [sortAsc, setSortAsc] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [newItemForm, setNewItemForm] = useState({ location: '', item: '', unit: '', minStock: '', onHand: '' });

  useEffect(() => {
    if (!viewingHistory && isAuthenticated) {
      localStorage.setItem('kalachandji_831_inventory_v3', JSON.stringify(inventory));
    }
  }, [inventory, viewingHistory, isAuthenticated]);

  useEffect(() => {
    if (!viewingHistory && isAuthenticated) {
      localStorage.setItem('kalachandji_831_date_v3', trackingDate);
    }
  }, [trackingDate, viewingHistory, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('kalachandji_831_history_v3', JSON.stringify(historyLogs));
    }
  }, [historyLogs, isAuthenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === CORRECT_PIN) {
      sessionStorage.setItem('kalachandji_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect PIN');
      setPinInput('');
    }
  };

  const handleSnapshotChange = (key) => {
    setSelectedSnapshotKey(key);
    if (key === 'current') {
      setViewingHistory(false);
      const saved = localStorage.getItem('kalachandji_831_inventory_v3');
      setInventory(saved ? JSON.parse(saved) : INITIAL_DATA);
      const savedDate = localStorage.getItem('kalachandji_831_date_v3');
      setTrackingDate(savedDate || "2026-08-31");
    } else {
      setViewingHistory(true);
      const log = historyLogs[key];
      if (log) {
        setInventory(JSON.parse(JSON.stringify(log.items)));
        setTrackingDate(log.date || key.replace('Log: ', ''));
      }
    }
  };

  const calculateBurnRate = (item) => {
    const historyKeys = Object.keys(historyLogs).sort();
    if (historyKeys.length < 1) return { text: '—', class: 'burn-none' };

    const lastLogKey = historyKeys[historyKeys.length - 1];
    const prevItem = historyLogs[lastLogKey]?.items?.find(i => i.id === item.id || i.item === item.item);

    if (!prevItem) return { text: 'New Item', class: 'burn-none' };

    const prevHand = parseFloat(prevItem.onHand);
    const currHand = parseFloat(item.onHand);

    if (isNaN(prevHand) || isNaN(currHand)) return { text: 'Uncounted', class: 'burn-none' };

    const burned = prevHand - currHand;
    if (burned > 0) return { text: `↓ ${burned.toFixed(1)}`, class: 'burn-down' };
    if (burned < 0) return { text: `↑ ${Math.abs(burned).toFixed(1)}`, class: 'burn-up' };
    return { text: '→ 0', class: 'burn-none' };
  };

  const handleMinStockChange = (id, value) => {
    if (viewingHistory) return;
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return autoCalculateStatus({ ...item, minStock: value });
      }
      return item;
    }));
  };

  const handleOnHandChange = (id, value) => {
    if (viewingHistory) return;
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return autoCalculateStatus({ ...item, onHand: value });
      }
      return item;
    }));
  };

  const handleDeleteItem = (id) => {
    if (viewingHistory) return;
    if (window.confirm("Delete this item from inventory?")) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSaveSnapshot = () => {
    const dateStr = trackingDate || new Date().toISOString().slice(0, 10);
    const key = `Log: ${dateStr}`;
    setHistoryLogs(prev => ({
      ...prev,
      [key]: { date: dateStr, items: JSON.parse(JSON.stringify(inventory)) }
    }));
    alert(`Snapshot successfully saved: "${key}"`);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all inventory counts to default values?")) {
      localStorage.removeItem('kalachandji_831_inventory_v3');
      setInventory(INITIAL_DATA);
      setTrackingDate("2026-08-31");
      setSelectedSnapshotKey('current');
      setViewingHistory(false);
    }
  };

  const handleAddNewItem = () => {
    if (!newItemForm.location.trim() || !newItemForm.item.trim()) {
      alert("Location and Item description required.");
      return;
    }

    const newItemObj = autoCalculateStatus({
      id: Date.now(),
      location: newItemForm.location.trim(),
      item: newItemForm.item.trim(),
      unit: newItemForm.unit.trim() || "unit",
      minStock: newItemForm.minStock.trim() || "1",
      onHand: newItemForm.onHand.trim() || "0",
      status: "OK",
      action: ""
    });

    setInventory(prev => [...prev, newItemObj]);
    setNewItemForm({ location: '', item: '', unit: '', minStock: '', onHand: '' });
    setIsAddModalOpen(false);
  };

  const exportCSV = () => {
    let csv = `Kalachandji Inventory Export - ${trackingDate}\n`;
    csv += "Location,Item,Unit,Min Stock,On Hand,Weekly Burn,Status,Action Needed\n";

    inventory.forEach(i => {
      const burn = calculateBurnRate(i);
      csv += `"${i.location}","${i.item}","${i.unit}","${i.minStock}","${i.onHand}","${burn.text}","${i.status}","${i.action}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kalachandji_inventory_${trackingDate}.csv`;
    a.click();
  };

  const handleSort = (colKey) => {
    if (sortCol === colKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(colKey);
      setSortAsc(true);
    }
  };

  const locationsList = useMemo(() => {
    const locs = new Set(inventory.map(i => i.location));
    return Array.from(locs).sort();
  }, [inventory]);

  const sortedAndFilteredInventory = useMemo(() => {
    let list = [...inventory];

    list = list.filter(item => {
      const fullText = `${item.location} ${item.item} ${item.unit}`.toLowerCase();
      const matchesSearch = fullText.includes(searchQuery.toLowerCase());
      const matchesLocation = !locationFilter || item.location === locationFilter;
      
      let matchesStatus = true;
      if (statusFilter === "Action Needed") {
        matchesStatus = Boolean(item.action && item.action.trim() !== "");
      } else if (statusFilter) {
        matchesStatus = item.status.includes(statusFilter);
      }

      return matchesSearch && matchesLocation && matchesStatus;
    });

    list.sort((a, b) => {
      let valA = a[sortCol] ?? '';
      let valB = b[sortCol] ?? '';

      if (sortCol === 'burnRate') {
        valA = calculateBurnRate(a).text;
        valB = calculateBurnRate(b).text;
      }

      const numA = parseFloat(valA);
      const numB = parseFloat(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortAsc ? numA - numB : numB - numA;
      }

      return sortAsc 
        ? valA.toString().localeCompare(valB.toString()) 
        : valB.toString().localeCompare(valA.toString());
    });

    return list;
  }, [inventory, searchQuery, locationFilter, statusFilter, sortCol, sortAsc, historyLogs]);

  const stats = useMemo(() => {
    const total = inventory.length;
    let action = 0, out = 0, below = 0, ok = 0;

    inventory.forEach(item => {
      if (item.action && item.action.trim() !== "") action++;
      if (item.status.includes("Out")) out++;
      else if (item.status.includes("Below")) below++;
      else ok++;
    });

    const okPct = (ok / total) * 100 || 0;
    const belowPct = (below / total) * 100 || 0;
    const outPct = (out / total) * 100 || 0;

    return {
      total,
      action,
      out,
      below,
      okPct: Math.round(okPct),
      belowPct: Math.round(belowPct),
      outPct: Math.round(outPct),
      actionPct: Math.round((action / total) * 100 || 0)
    };
  }, [inventory]);

  const poText = useMemo(() => {
    const actionItems = inventory.filter(i => i.action && i.action.trim() !== "");
    if (actionItems.length === 0) return "All inventory stock levels healthy! No orders needed.";
    
    let text = `KALACHANDJI'S REORDER SHEET\nAudit Date: ${trackingDate}\n========================================\n\n`;
    actionItems.forEach(i => {
      text += `• [${i.location}] ${i.item} (${i.unit}) -> ${i.action}\n`;
    });
    return text;
  }, [inventory, trackingDate]);

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc', padding: '20px' }}>
        <form onSubmit={handlePinSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '360px', width: '100%' }}>
          <h2 style={{ marginTop: 0 }}>Kalachandji's Inventory</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter team PIN to access</p>
          <input 
            type="password" 
            pattern="[0-9]*" 
            inputMode="numeric"
            maxLength={6}
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN"
            style={{ width: '100%', padding: '12px', fontSize: '1.2rem', textAlign: 'center', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px', boxSizing: 'border-box' }}
            autoFocus
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <div className="header-card">
          <div className="brand-title">
            <h1>Kalachandji's Inventory Tracker</h1>
            <div className="subtitle">Weekly Kitchen Operations & Admin Control Dashboard</div>
          </div>
          <div className="audit-date-box">
            <span>Audit Date:</span>
            <input 
              type="date" 
              value={trackingDate} 
              disabled={viewingHistory}
              onChange={(e) => setTrackingDate(e.target.value)} 
            />
          </div>
        </div>

        <div className="toolbar">
          <div className="action-btns">
            <button className="btn btn-warning" onClick={() => {
              if (viewingHistory) return alert("Switch back to 'Current Active Inventory' first.");
              setIsAddModalOpen(true);
            }}>➕ Add Item</button>
            <button className="btn btn-primary" onClick={() => setIsPOModalOpen(true)}>📋 Order Sheet</button>
            <button className="btn btn-success" onClick={handleSaveSnapshot}>📸 Save Snapshot</button>
            <button className="btn btn-dark" onClick={() => window.print()}>🖨️ Print Sheet</button>
            <button className="btn btn-secondary" onClick={exportCSV}>📥 Export CSV</button>
          </div>
          <div className="action-btns">
            <button 
              className={`btn btn-admin ${adminMode ? 'active' : ''}`} 
              onClick={() => setAdminMode(!adminMode)}
            >
              {adminMode ? "🔓 Admin Edits Active" : "🔒 Enable Admin Edits"}
            </button>
            <button className="btn btn-danger" onClick={handleReset}>🔄 Reset Baseline</button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card" onClick={() => setStatusFilter('')}>
            <div className="label">Total Items</div>
            <div className="value">{stats.total}</div>
            <div className="sub-value">Showing {sortedAndFilteredInventory.length} of {stats.total} items</div>
          </div>
          <div className="stat-card" onClick={() => setStatusFilter('Action Needed')}>
            <div className="label" style={{ color: '#d97706' }}>Action Needed</div>
            <div className="value" style={{ color: '#d97706' }}>{stats.action}</div>
            <div className="sub-value">{stats.actionPct}% of total inventory</div>
          </div>
          <div className="stat-card" onClick={() => setStatusFilter('Out of Stock')}>
            <div className="label" style={{ color: '#dc2626' }}>Out of Stock</div>
            <div className="value" style={{ color: '#dc2626' }}>{stats.out}</div>
            <div className="sub-value">{stats.outPct}% of total inventory</div>
          </div>
          <div className="stat-card" onClick={() => setStatusFilter('Below Min')}>
            <div className="label" style={{ color: '#b45309' }}>Below Threshold</div>
            <div className="value" style={{ color: '#b45309' }}>{stats.below}</div>
            <div className="sub-value">{stats.belowPct}% of total inventory</div>
          </div>
        </div>

        <div className="health-card">
          <div className="health-header">
            <span>Inventory Health Score</span>
            <span>{stats.okPct}% Healthy</span>
          </div>
          <div className="progress-track">
            <div className="progress-ok" style={{ width: `${stats.okPct}%` }} title="Healthy Stock"></div>
            <div className="progress-below" style={{ width: `${stats.belowPct}%` }} title="Below Minimum"></div>
            <div className="progress-out" style={{ width: `${stats.outPct}%` }} title="Out of Stock"></div>
          </div>
        </div>

        <div className="filter-card">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search items or storage locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            {locationsList.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Action Needed">Action Needed</option>
            <option value="Below Min">Below Min</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Not Found">Not Found</option>
            <option value="Not Checked">Not Checked</option>
            <option value="Mixed">Mixed</option>
            <option value="OK">OK</option>
          </select>
          <select value={selectedSnapshotKey} onChange={(e) => handleSnapshotChange(e.target.value)}>
            <option value="current">Current Active Inventory</option>
            {Object.keys(historyLogs).reverse().map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('location')}>Location</th>
              <th onClick={() => handleSort('item')}>Item</th>
              <th onClick={() => handleSort('unit')}>Unit</th>
              <th onClick={() => handleSort('minStock')}>Min Stock</th>
              <th onClick={() => handleSort('onHand')}>On Hand (8/31)</th>
              <th onClick={() => handleSort('burnRate')}>Weekly Burn</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th onClick={() => handleSort('action')}>Action Needed</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredInventory.map(item => {
              const burn = calculateBurnRate(item);
              const sanitizedStatus = item.status.toLowerCase().replace(/[^a-z]/g, '');

              return (
                <tr key={item.id}>
                  <td><strong>{item.location}</strong></td>
                  <td>{item.item}</td>
                  <td><span style={{ color: 'var(--text-muted)' }}>{item.unit}</span></td>
                  <td>
                    {adminMode && !viewingHistory ? (
                      <input 
                        type="text" 
                        className="cell-input min-editable" 
                        value={item.minStock ?? ''} 
                        onChange={(e) => handleMinStockChange(item.id, e.target.value)}
                      />
                    ) : (
                      <span className="min-stock-text">{item.minStock}</span>
                    )}
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="cell-input" 
                      value={item.onHand ?? ''} 
                      disabled={viewingHistory}
                      onChange={(e) => handleOnHandChange(item.id, e.target.value)}
                    />
                  </td>
                  <td><span className={`burn-indicator ${burn.class}`}>{burn.text}</span></td>
                  <td><span className={`badge status-${sanitizedStatus}`}>{item.status}</span></td>
                  <td>{item.action}</td>
                  <td>
                    {!viewingHistory ? (
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        🗑️
                      </button>
                    ) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-card">
            <h2>Add Inventory Item</h2>
            <div className="form-group">
              <label>Storage Location</label>
              <input 
                type="text" 
                placeholder="e.g., Cold Storage" 
                value={newItemForm.location}
                onChange={(e) => setNewItemForm({ ...newItemForm, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Item Description</label>
              <input 
                type="text" 
                placeholder="e.g., Organic Ghee" 
                value={newItemForm.item}
                onChange={(e) => setNewItemForm({ ...newItemForm, item: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Packaging Unit</label>
              <input 
                type="text" 
                placeholder="e.g., 5 lb tub" 
                value={newItemForm.unit}
                onChange={(e) => setNewItemForm({ ...newItemForm, unit: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min Threshold</label>
                <input 
                  type="text" 
                  placeholder="e.g., 2" 
                  value={newItemForm.minStock}
                  onChange={(e) => setNewItemForm({ ...newItemForm, minStock: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>On Hand</label>
                <input 
                  type="text" 
                  placeholder="e.g., 1" 
                  value={newItemForm.onHand}
                  onChange={(e) => setNewItemForm({ ...newItemForm, onHand: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddNewItem}>Save Item</button>
            </div>
          </div>
        </div>
      )}

      {/* Reorder Sheet Modal */}
      {isPOModalOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-card" style={{ width: '650px' }}>
            <h2>Weekly Reorder Sheet</h2>
            <div className="reorder-sheet-box">{poText}</div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setIsPOModalOpen(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => {
                navigator.clipboard.writeText(poText);
                alert("Reorder sheet copied to clipboard!");
              }}>📋 Copy to Clipboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}