
const Flight = require("../models/Flight");
const escapeRx = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const toUpperOrUndef = (v) =>
  typeof v === "string" ? v.toUpperCase() : (v == null ? undefined : String(v).toUpperCase());

// Normalize trip type into consistent labels (stored values)
const normalizeTypeLabel = (input) => {
  if (!input) return input;
  const t = String(input).toLowerCase().trim();
  if (/(one\s*-?\s*way)/i.test(t)) return "One Way";
  if (/(round(\s*-?\s*trip)?|return)/i.test(t)) return "Round";
  return input; 
};
const rxEq = (s) => new RegExp(`^${escapeRx(String(s).trim())}$`, "i");

// Convert incoming tripType (query) to a regex that matches stored labels
const tripTypeToRegex = (tripType) => {
  if (!tripType) return undefined;
  const t = String(tripType).toLowerCase().trim();

  if (t === "one-way") {
   
    return /(one\s*-?\s*way)/i;
  }
  if (t === "round-trip") {
    
    return /(round(\s*-?\s*trip)?|return)/i;
  }
  return new RegExp(`^${escapeRx(tripType.replace(/-/g, " ").trim())}$`, "i");
};

exports.createFlight = async (req, res) => {
  try {
   
    const logoPath = req.file ? `/uploads/${req.file.filename}` : (req.body.logo || "");

   
    let typeNorm = normalizeTypeLabel(req.body.type);

    
    const newFlight = new Flight({
      ...req.body,
      type: typeNorm || req.body.type,
      // NOTE: DB fields are lax/laf (from/to)
      lax: req.body.lax ? toUpperOrUndef(req.body.lax) : undefined,
      laf: req.body.laf ? toUpperOrUndef(req.body.laf) : undefined,
      price: Number(req.body.price),
      logo: logoPath,
    });

    await newFlight.save();//data save

    res.status(201).json(newFlight);
  } catch (error) {
    console.error("Error creating flight:", error);
    res.status(500).json({ message: "Error creating flight" });
  }
};


exports.updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    
    if (typeof updateData.lax !== "undefined") {
      updateData.lax = toUpperOrUndef(updateData.lax);
    }
    if (typeof updateData.laf !== "undefined") {
      updateData.laf = toUpperOrUndef(updateData.laf);
    }

   
    if (typeof updateData.type !== "undefined") {
      updateData.type = normalizeTypeLabel(updateData.type);
    }


    if (req.file) updateData.logo = `/uploads/${req.file.filename}`;

  
    if (typeof updateData.price !== "undefined") {
      updateData.price = Number(updateData.price);
    }

    const updatedFlight = await Flight.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedFlight) return res.status(404).json({ message: "Flight not found" });

    res.json(updatedFlight);
  } catch (error) {
    console.error("Error updating flight:", error);
    res.status(500).json({ message: "Error updating flight" });
  }
};


exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Error fetching flights" });
  }
};


exports.getFlightById = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findById(id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (error) {
    console.error("Error fetching flight by ID:", error);
    res.status(500).json({ message: "Error fetching flight" });
  }
};


exports.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlight = await Flight.findByIdAndDelete(id);
    if (!deletedFlight) return res.status(404).json({ message: "Flight not found" });
    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error("Error deleting flight:", error);
    res.status(500).json({ message: "Error deleting flight" });
  }
};


exports.searchFlights = async (req, res) => {
  try {
    const { from, to, tripType, q } = req.query;

    
    const filter = {};

    
    if (from) filter.lax = rxEq(from);
    if (to)   filter.laf = rxEq(to);

    
    if (tripType) {
      filter.type = tripTypeToRegex(tripType);
    }

    
    if (q) {
      filter.$or = [
        { airline:    { $regex: q, $options: "i" } },
        { flightCode: { $regex: q, $options: "i" } },
      ];
    }

   
    const flights = await Flight.find(filter).sort({ price: 1, _id: -1 });

    res.json(flights);
  } catch (err) {
    console.error("Error searching flights:", err);
    res.status(500).json({ message: "Error searching flights" });
  }
};
