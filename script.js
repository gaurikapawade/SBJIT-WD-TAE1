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

function isExpired(expiryDateStr) {
    if (!expiryDateStr) return false;
    return expiryDateStr < getTodayStr();
}

function isExpiringSoon(expiryDateStr) {
    if (!expiryDateStr) return false;
    const todayStr = getTodayStr();
    if (expiryDateStr < todayStr) return false;

    const todayDate = new Date(todayStr);
    const expiryDate = new Date(expiryDateStr);
    const diffDays = Math.ceil((expiryDate - todayDate) / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= 7;
}

function isLowStock(quantity, minStock) {
    return Number(quantity) <= Number(minStock);
}

function getDaysRemaining(expiryDateStr) {
    if (!expiryDateStr) return 0;
    const todayDate = new Date(getTodayStr());
    const expiryDate = new Date(expiryDateStr);
    return Math.ceil((expiryDate - todayDate) / (1000 * 60 * 60 * 24));
}

function addFoodItem(item) {
    const pantry = getPantry();
    item.id = Date.now();
    item.quantity = Number(item.quantity);
    item.minStock = Number(item.minStock);
    pantry.unshift(item);
    savePantry(pantry);
    return item;
}

function deleteFoodItem(id) {
    let pantry = getPantry();
    pantry = pantry.filter(i => i.id !== Number(id));
    savePantry(pantry);
}

function adjustQuantity(id, delta) {
    const pantry = getPantry();
    const item = pantry.find(i => i.id === Number(id));
    if (item) {
        item.quantity = Math.max(0, item.quantity + delta);
        savePantry(pantry);
        return item.quantity;
    }
    return null;
}

function updateFoodItem(id, updatedData) {
    const pantry = getPantry();
    const index = pantry.findIndex(i => i.id === Number(id));
    if (index !== -1) {
        pantry[index] = {
            ...pantry[index],
            ...updatedData,
            id: Number(id),
            quantity: Number(updatedData.quantity),
            minStock: Number(updatedData.minStock)
        };
        savePantry(pantry);
        return pantry[index];
    }
    return null;
}



