# Yum-Yum-Gimme-Sum

Länk till presentation av upgiften: https://youtu.be/M6h3a83oeqs?si=71YAigzdQ8-H-yAh
Individuell examination: Yum Yum Gimme Sum
Bakgrund

Ditt uppdrag är att bygga en frontend för foodtruck:en Yum Yum Gimme Sum som serverar wontons. Det finns en skiss på gränssnittet samt ett API att använda. Se nedan för länkar.
Krav

Följande funktionalitet ska finnas med:

    Det ska gå att hämta och visa menyn
    Det ska gå att kunna lägga till produkter i en varukorg
    Det ska gå att kunna ta bort produkter från en varukorg
    Det ska gå att kunna växla mellan vyer (menyn, till varukorgen, till se beställning, för VG till se kvitto)
    Det ska gå och kunna lägga en beställning och få tillbaka ett ordernummer och en ETA (Estimated Time of Arrival)
    VG: Det ska gå och kunna se sitt kvitto på sin beställning

Skiss

Skissen hittar du här.
API

API-dokumentation hittar du här. Observera att alla anrop kräver en API-nyckel som du får genom att göra ett fetch-anrop till /keys.

API-nyckel skickas sedan med i varje request på nedan sätt:

let resp = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
  method: "GET",
  headers: { "x-zocom": "<api-key-here>" },
});

Du kommer behöva skapa en "tenant" (ditt namn på din foodtruck) först med hjälp av endpoint:en /tenant som ska användas för orderläggning senare.
Betygskriterier

För Godkänt krävs:

    Gjort enligt Figma skissen (viss variation på färger, typsnitt etc är tillåtet) (Förutom kvitto sidan som gäller för VG nivå)
    Uppfyller alla krav på funktionalitet
    Använder sig av React router
    Använder sig av Redux Toolkit med en Redux store
    Använder sig av det bifogade API:et

För Väl Godkänt krävs:

    Allt i godkänt
    Det ska gå och kunna se sitt kvitto på sin beställning
    Att du använt dig av createAsyncThunk för api-anrop

Inlämning
Inlämning av examination sker på Azomo med länk till ditt Githubrepo senast torsdagen den 13/3 kl 23:59.
