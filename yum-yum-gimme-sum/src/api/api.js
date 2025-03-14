// Huvudfokus på konfiguering och autentisering
const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

let cachedApiKey = null;
// Sparar apinyckel och sparar den, om det inte finns hämtar jag en ny
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
// Samma lika, skapar en tenant och sparar den
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
};

