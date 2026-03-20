interface HubSpotContactProperties {
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
}

interface HubSpotContactResponse {
  id: string;
  properties: Record<string, string>;
}

const HUBSPOT_BASE = "https://api.hubapi.com";

export async function createOrUpdateContact(
  properties: HubSpotContactProperties
): Promise<string> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error("HUBSPOT_ACCESS_TOKEN not configured");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Try to create first
  const createRes = await fetch(`${HUBSPOT_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const data: HubSpotContactResponse = await createRes.json();
    return data.id;
  }

  // If 409 conflict (contact exists), update by email
  if (createRes.status === 409) {
    const updateRes = await fetch(
      `${HUBSPOT_BASE}/crm/v3/objects/contacts/${encodeURIComponent(properties.email)}?idProperty=email`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ properties }),
      }
    );
    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`HubSpot update failed: ${updateRes.status} ${err}`);
    }
    const data: HubSpotContactResponse = await updateRes.json();
    return data.id;
  }

  const errText = await createRes.text();
  throw new Error(`HubSpot create failed: ${createRes.status} ${errText}`);
}
