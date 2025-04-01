export const handleSubmitNewListing = async (listingData) => {
    console.log("Submitting new listing", listingData);

    const listing = {
        ...listingData, 
        createdAt: new Date().toISOString()
    }

    console.log("llisting to be submited:", listing)
  
    try {
      const api = "http://localhost:5001/api/listings/newListing";
  
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ Listing created:", data);
      } else {
        console.error("❌ Failed to create listing:", data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting listing:", error);
    }
  };
  