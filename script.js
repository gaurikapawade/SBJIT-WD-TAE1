const STORAGE_KEY = "pantry";

function getFutureDateStr(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
}

const DEFAULT_PANTRY = [
    {
        id: 1700000001000,
        name: "Basmati Rice",
        category: "Grains",
        quantity: 5,
        unit: "kg",
        expiry: getFutureDateStr(60),
        minStock: 2
    },
    {
        id: 1700000002000,
        name: "Whole Milk",
        category: "Dairy",
        quantity: 1,
        unit: "liters",
        expiry: getFutureDateStr(2),
        minStock: 2
    },
    {
        id: 1700000003000,
        name: "Fresh Eggs",
        category: "Dairy",
        quantity: 12,
        unit: "pcs",
        expiry: getFutureDateStr(14),
        minStock: 6
    },
    {
        id: 1700000004000,
        name: "Strawberries",
        category: "Vegetables & Fruits",
        quantity: 1,
        unit: "pack",
        expiry: getFutureDateStr(-2),
        minStock: 2
    },
    {
        id: 1700000005000,
        name: "Chicken Breast",
        category: "Meat",
        quantity: 3,
        unit: "packs",
        expiry: getFutureDateStr(4),
        minStock: 2
    },
    {
        id: 1700000006000,
        name: "Extra Virgin Olive Oil",
        category: "Condiments",
        quantity: 1,
        unit: "bottles",
        expiry: getFutureDateStr(180),
        minStock: 2
    }
];

function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getPantry() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        savePantry(DEFAULT_PANTRY);
        return DEFAULT_PANTRY;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Error parsing pantry data", e);
        return [];
    }
}

function savePantry(pantryArray) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pantryArray));
}

