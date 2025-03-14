// Hanterar alla anrop 	
// fetchMenu → Hämtar menyn från API:et. 
// placeOrderApi → Skickar en beställning till API:et. 
// fetchReceipt → Hämtar kvittot för en order.
// getApiKey → Hämtar en API-nyckel för autentisering.

const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

let cachedApiKey = null;

// Hämta API-nyckel
export const getApiKey = async () => {
  if (cachedApiKey) return cachedApiKey;

  try {
    const response = await fetch(`${API_BASE_URL}/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Fel vid hämtning av API-nyckel: ${response.statusText}`);
    }

    const data = await response.json();
    cachedApiKey = data.key;
    return cachedApiKey;
  } catch (error) {
    console.error("🚨 Fel vid hämtning av API-nyckel:", error);
    throw error;
  }
};

// Hämta menu från API efter skapandet av nyckel och tenant.
export const fetchMenu = async () => {
  try {
    const apiKey = await getApiKey();
    let tenantId = localStorage.getItem("tenantId") || "SimonsFoodTruck";

    console.log("📥 Hämtar meny för tenant:", tenantId);

    const categories = ["wonton", "dip", "drink"];
    const menuRequests = categories.map((category) =>
      fetch(`${API_BASE_URL}/menu?tenant=${tenantId}&type=${category}`, {
        headers: { "x-zocom": apiKey },
      }).then((res) => res.json())
    );

    const menuData = await Promise.all(menuRequests);
    const allItems = menuData.flatMap((data) => data.items || []);

    return allItems;
  } catch (error) {
    console.error("🚨 Fel vid hämtning av meny:", error);
    throw error;
  }
};

// 🔹 Lägg en order
export const placeOrderApi = async (orderData) => {
  try {
    const apiKey = await getApiKey();
    const tenantId = localStorage.getItem("tenantId") || "SimonFoodTruck";

    const itemIds = orderData.items.flatMap(item =>
      Array(item.quantity).fill(item.id)
    );

    const response = await fetch(`${API_BASE_URL}/${tenantId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify({ items: itemIds }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Status code:", response.status);
      console.log("Error text from server:", errorText);
      throw new Error("Order kunde inte läggas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🚨 Fel vid orderläggning:", error);
    throw error;
  }
};

// 🔹 Hämta kvitto för en specifik order
export const fetchReceipt = async (orderId) => {
  try {
    if (!orderId) {
      console.error("🚨 Ingen orderId skickades till fetchReceipt!");
      return null;
    }

    const apiKey = await getApiKey();
    console.log(`📤 Skickar API-anrop till: ${API_BASE_URL}/receipts/${orderId}`);

    const response = await fetch(`${API_BASE_URL}/receipts/${orderId}`, {
      headers: { "x-zocom": apiKey },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 API-fel: ${errorText}`);
      throw new Error("Kunde inte hämta kvittot");
    }

    const receiptData = await response.json();
    console.log("✅ Kvittodata mottagen:", receiptData);
    return receiptData;
  } catch (error) {
    console.error("🚨 Fel vid hämtning av kvitto:", error);
    throw error;
  }
};