const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

let cachedApiKey = null;

export const getApiKey = async () => {
  if (cachedApiKey) {
    console.log("🔄 Återanvänder API-nyckel:", cachedApiKey);
    return cachedApiKey;
  }

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
    console.log("Ny API-nyckel hämtad:", cachedApiKey);
    return cachedApiKey;
  } catch (error) {
    console.error("🚨 Fel vid hämtning av API-nyckel:", error);
    throw error;
  }
};

export async function createTenant(apiKey) {
  let storedTenant = localStorage.getItem("tenantId");

  if (storedTenant) {
    console.log("🔄 Återanvänder befintlig tenant:", storedTenant);
    return storedTenant;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tenants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify({ name: "SimonFoodTruck" }),
    });

    if (!response.ok) {
      console.warn("⚠️ Tenant existerar redan eller felaktig request.");
      return null;
    }

    const data = await response.json();
    const tenantId = data.id;
    localStorage.setItem("tenantId", tenantId);
    console.log("✅ Ny tenant skapad och sparad:", tenantId);

    return tenantId;
  } catch (error) {
    console.error("🚨 Fel vid skapande av tenant:", error);
    throw error;
  }
}


export const fetchMenu = async () => {
  try {
    const apiKey = await getApiKey();

    
    let tenantId = localStorage.getItem("tenantId");

    
    if (!tenantId) {
      tenantId = "SimonsFoodTruck";
    }

    console.log("📥 Hämtar meny för tenant:", tenantId);

    const categories = ["wonton", "dip"];
    const menuRequests = categories.map((category) =>
      fetch(`${API_BASE_URL}/menu?tenant=${tenantId}&type=${category}`, {
        headers: { "x-zocom": apiKey },
      }).then((res) => res.json())
    );

    const menuData = await Promise.all(menuRequests);

    
    const allItems = menuData.flatMap((data) => data.items || []);

    console.log("✅ Menydata hämtad:", allItems);
    return allItems;
  } catch (error) {
    console.error("🚨 Fel vid hämtning av meny:", error);
    throw error;
  }
};