/**
 * SpineFlow Tiny: Enhanced Node Content
 * 
 * Each node represents a spatial moment—a room, threshold, or material transition.
 * This file contains rich architectural specifications, design philosophy, and narrative
 * for each of the 8 views in the showcase.
 */

export interface NodeSpec {
  id: string;
  label: string;
  sublabel: string;
  prompt: string;
  atmosphere: string;
  palette: { bg: string; accent: string };
  designPhilosophy: string;
  spatialIntent: string;
  materials: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  specifications: {
    title: string;
    description: string;
  }[];
  contextualNarrative: string;
  interactivePrompts: string[];
}

export const ENHANCED_VIEWS: NodeSpec[] = [
  {
    id: "mosaic_portal",
    label: "Mosaic Portal",
    sublabel: "Geometry / Teal / Entry",
    prompt: `Architectural photography of a tiny house entrance with a massive stained-glass facade, geometric teal and blue mosaic patterns. Black steel vertical beams, river stone floor. Soft afternoon sun casting colored shadows --ar 16:9`,
    atmosphere: `Light breaks into fragments, painting the soul in teal geometry.`,
    palette: { bg: "#061a1d", accent: "#2dd4bf" },
    designPhilosophy: `The entry is not merely a threshold—it is a manifesto. Stained glass transforms light into language, each geometric fragment a syllable in an architectural poem. Here, the boundary between outside and inside dissolves into pure refraction. The portal announces that this is a space where precision and poetry coexist.`,
    spatialIntent: `To create a moment of pause and wonder. Visitors are meant to stop, look up, and feel the weight of intentional design. The geometric patterns echo natural tessellations found in nature—honeycomb, crystalline structures, the segmented eye of an insect. This is architecture that speaks to both the rational and the mystical mind.`,
    materials: {
      primary: "Optically Clear Casting Resin with high-gloss, mirror-polished surface finish for light reflection",
      secondary: "Structural steel I-beams (ASTM A992, matte black powder coat, welded connections)",
      tertiary: "River-tumbled stone flooring (locally sourced Michigan stone, sealed with matte polyurethane)",
    },
    specifications: [
      {
        title: "Hydrological Feature",
        description: "Optically Clear Casting Resin with a high-gloss, mirror-polished surface finish for maximum light reflection and color saturation. Resin is hand-poured in geometric molds, creating a seamless, non-yellowing optical clarity that maintains its teal-to-blue chromatic depth for decades.",
      },
      {
        title: "Structural Framework",
        description: "CNC-milled structural steel vertical beams (ASTM A992 Grade 50) with matte black powder coat finish. Beams are precisely spaced at 1.2-meter intervals to create visual rhythm while supporting the distributed weight of the resin facade.",
      },
      {
        title: "Foundation & Base",
        description: "River-tumbled stone flooring featuring locally sourced Michigan fieldstone. Each stone is hand-selected for color consistency and sealed with a matte polyurethane finish to prevent moisture infiltration while maintaining tactile warmth.",
      },
      {
        title: "Light Performance",
        description: "The resin facade is designed to perform optimally during golden hour (3–6 PM), when low-angle sunlight creates maximum color saturation and shadow play. At night, integrated LED strips (3000K color temperature) illuminate the resin from behind, creating a warm, inviting glow.",
      },
    ],
    contextualNarrative: `The Mosaic Portal is the first breath of SpineFlow Tiny. It announces that this is not a conventional dwelling. The stained glass was inspired by the geometric patterns found in Islamic tilework and the fractured light of Brutalist architecture. Every element—the resin, the steel, the stone—was chosen for its ability to transform light into experience. This is where the outside world is filtered, refracted, and reimagined.`,
    interactivePrompts: [
      "How does the light change throughout the day? Explore the color shifts from dawn to dusk.",
      "What patterns do you see in the geometric mosaic? Are they natural or constructed?",
      "How would you describe the emotional transition from outside to inside?",
    ],
  },
  {
    id: "cobmoosa_study",
    label: "The Heritage Study",
    sublabel: "Timber / Woven / History",
    prompt: `Interior tiny house office inspired by Ottawa tribe textures. Hand-hewn heavy timber beams, woven reed wall coverings, a large window looking into a Michigan forest. Modern desk, minimalist tech. Warm, respectful, earthy aesthetic --ar 16:9`,
    atmosphere: `A space for deep work, anchored by the weight of timber and the stories of the Odawa.`,
    palette: { bg: "#1c1917", accent: "#fb923c" },
    designPhilosophy: `This study honors the craftsmanship and wisdom of the Odawa people, whose ancestral lands surround this site. The design philosophy centers on respect, materiality, and the marriage of traditional craft with contemporary function. Heavy timber is not merely structural—it is a statement of permanence and connection to the land. Every beam tells a story of growth, seasons, and time.`,
    spatialIntent: `To create a sanctuary for deep intellectual work, grounded in cultural respect and natural materials. The large forest-facing window ensures that the work happening inside is always in dialogue with the living world outside. This is a space where ideas are born from contemplation, not distraction.`,
    materials: {
      primary: "Hand-hewn white oak timber beams (reclaimed from 100+ year-old barn structures, finished with natural tung oil)",
      secondary: "Woven reed wall panels (handcrafted by local artisans, inspired by traditional Odawa weaving patterns)",
      tertiary: "Walnut hardwood flooring (sustainably harvested, hand-finished with matte polyurethane)",
    },
    specifications: [
      {
        title: "Primary Structural Timber",
        description: "Hand-hewn white oak beams sourced from reclaimed 100+ year-old barn structures. Each beam is hand-finished with natural tung oil, which deepens the wood's natural color while allowing the grain and tool marks to remain visible. The hand-hewn texture is intentional—it speaks to human labor and craftsmanship.",
      },
      {
        title: "Woven Wall Covering",
        description: "Custom woven reed panels created by local Odawa artisans, using traditional weaving techniques passed down through generations. The pattern is inspired by natural water ripples and forest canopy shadows. Each panel is hand-finished with a clear matte sealant to preserve the tactile quality while ensuring durability.",
      },
      {
        title: "Flooring System",
        description: "Sustainably harvested walnut hardwood flooring, hand-finished with matte polyurethane. The walnut's warm chocolate tones create visual continuity with the timber beams while providing acoustic dampening for a quiet, contemplative environment.",
      },
      {
        title: "Fenestration",
        description: "Large triple-glazed window (2.4m × 1.8m) with thermally broken aluminum frame (matte black finish). The window is positioned to frame a specific view of the forest, creating a living artwork that changes with the seasons.",
      },
    ],
    contextualNarrative: `The Heritage Study is a meditation on place and respect. It was designed in close collaboration with Odawa cultural advisors to ensure that the use of traditional patterns and materials honored rather than appropriated their cultural heritage. The heavy timber beams are not just structural elements—they are a commitment to permanence and sustainability. The woven reed walls create acoustic warmth and visual texture that encourages focus and contemplation. This is a space where the past and present coexist, where technology serves human intention rather than the reverse.`,
    interactivePrompts: [
      "What stories do you imagine the reclaimed timber beams could tell?",
      "How does the woven texture affect the acoustics and atmosphere of the space?",
      "What role does the forest view play in your creative process?",
    ],
  },
  {
    id: "night_owl_kitchen",
    label: "3AM Kitchen",
    sublabel: "Amber / Slate / Circadian",
    prompt: `Modern tiny house kitchen at night. Under-cabinet amber LED lighting, dark slate countertops, minimalist black fixtures. No overhead lights. High-end, moody, night-owl aesthetic. View of a starry sky through a thin window --ar 16:9`,
    atmosphere: `Optimized for the midnight mind. Soft amber glows where the day used to be.`,
    palette: { bg: "#020617", accent: "#f59e0b" },
    designPhilosophy: `This kitchen rejects the tyranny of overhead lighting and the assumption that all spaces must be equally bright. Instead, it embraces the circadian rhythms of the night-dwelling human. Amber light (2200K color temperature) is scientifically proven to minimize melatonin suppression, allowing the body to remain in a state of calm alertness. This is a kitchen designed for the creative mind at 3 AM—for the writer, the musician, the insomniac philosopher.`,
    spatialIntent: `To create a space where nocturnal creativity is not just tolerated but celebrated. The under-cabinet lighting provides functional illumination for food preparation while maintaining the intimate, meditative quality of the night. The absence of overhead lights is intentional—it forces the user to be intentional about their movements, to slow down, to be present.`,
    materials: {
      primary: "Dark slate countertops (honed finish, locally quarried, sealed with food-grade polyurethane)",
      secondary: "Matte black powder-coated steel cabinetry (modular, minimalist design, integrated handles)",
      tertiary: "Amber LED strip lighting (2200K color temperature, dimmable, integrated into cabinet undersides)",
    },
    specifications: [
      {
        title: "Countertop Material",
        description: "Dark slate sourced from local quarries, honed to a matte finish (not polished). The honed finish provides superior grip and reduces light reflection, creating a non-glare work surface. The slate is sealed with food-grade polyurethane to prevent staining while maintaining the stone's natural texture.",
      },
      {
        title: "Cabinetry System",
        description: "Modular matte black powder-coated steel cabinetry with integrated handles (no protruding knobs). The minimalist design reduces visual clutter and creates a seamless, monolithic appearance. All storage is concealed, leaving the countertop clear for creative work.",
      },
      {
        title: "Lighting System",
        description: "Amber LED strip lighting (2200K color temperature, 95+ CRI) integrated into the underside of upper cabinets. The lighting is dimmable via a wireless remote, allowing the user to adjust intensity based on task and circadian state. No overhead lighting is present—all illumination comes from the under-cabinet strips.",
      },
      {
        title: "Fenestration",
        description: "Single large window (1.2m × 0.8m) positioned to frame the night sky and stars. The window is triple-glazed with a low-emissivity coating to minimize heat loss while maintaining optical clarity.",
      },
    ],
    contextualNarrative: `The 3AM Kitchen is a rebellion against the assumption that all spaces must be bright, energetic, and optimized for daytime productivity. This kitchen is designed for the night-dwelling human—the creative, the contemplative, the insomniac. The amber lighting is not just aesthetic; it is grounded in circadian biology. The absence of overhead lights is not a limitation; it is a feature. This space invites slowness, intention, and presence. It is where the midnight snack becomes a meditation, where the act of making tea becomes a ritual.`,
    interactivePrompts: [
      "How does the amber light affect your mood and energy at night?",
      "What creative work would you do in this space at 3 AM?",
      "How does the absence of overhead lighting change your relationship to the space?",
    ],
  },
  {
    id: "solar_walkway",
    label: "The Kinetic Path",
    sublabel: "Solar / Glow / Sustainable",
    prompt: `Exterior shot of a tiny house at dusk with a sidewalk made of hexagonal glass solar panels glowing softly from within. The path leads to a modern house with a river stone base and black steel accents. Cinematic night lighting --ar 16:9`,
    atmosphere: `The ground drinks the sun all day and breathes it back as light at night.`,
    palette: { bg: "#0f172a", accent: "#38bdf8" },
    designPhilosophy: `The Kinetic Path embodies a radical rethinking of infrastructure as poetry. Rather than hiding solar technology behind roof panels or in utility closets, it is celebrated as the primary architectural feature. The hexagonal geometry echoes natural patterns—honeycomb, basalt columns, the segmented eye. The path is not just functional; it is a statement about the integration of technology and nature, sustainability and beauty.`,
    spatialIntent: `To create a journey that is both practical and transcendent. As visitors walk the path, they are literally treading on captured sunlight. The glow beneath their feet is a constant reminder of the relationship between energy, time, and place. The path guides movement while generating power—a perfect marriage of form and function.`,
    materials: {
      primary: "Hexagonal photovoltaic glass panels (monocrystalline silicon, 22% efficiency, tempered safety glass, anti-reflective coating)",
      secondary: "River-tumbled stone base (locally sourced Michigan stone, set in permeable gravel substrate)",
      tertiary: "Integrated LED illumination (3000K color temperature, powered by the solar panels, dimmable based on ambient light)",
    },
    specifications: [
      {
        title: "Photovoltaic Surface",
        description: "Custom hexagonal photovoltaic glass panels featuring monocrystalline silicon cells with 22% efficiency. Each panel is 0.6 meters across and 12mm thick. The glass is tempered for safety and features an anti-reflective coating to maximize light transmission and reduce glare.",
      },
      {
        title: "Structural Foundation",
        description: "The solar panels are set into a permeable gravel substrate with a reinforced concrete base. The foundation is designed to accommodate thermal expansion and contraction while maintaining structural integrity. Drainage channels beneath the panels prevent water pooling.",
      },
      {
        title: "Illumination System",
        description: "Each hexagonal panel contains integrated LED strips (3000K color temperature, 95+ CRI) on the underside. The LEDs are powered by the solar panels themselves, creating a self-sustaining lighting system. A smart controller dims the lights based on ambient light levels, creating a responsive, organic glow.",
      },
      {
        title: "Energy Storage",
        description: "The solar panels feed into a battery storage system (lithium iron phosphate, 15 kWh capacity) located beneath the house. This allows the path to glow throughout the night, even on cloudy days. Excess energy is fed back to the grid or used to power the house.",
      },
    ],
    contextualNarrative: `The Kinetic Path is where sustainability becomes poetry. Rather than hiding solar technology, it is celebrated as the primary architectural feature. The hexagonal geometry is not arbitrary—it is inspired by natural patterns found in nature, from honeycomb to basalt columns. As visitors walk the path, they are literally treading on captured sunlight, a constant reminder of the relationship between energy, time, and place. This is architecture that generates its own power while generating wonder.`,
    interactivePrompts: [
      "How does it feel to walk on solar panels that are generating power beneath your feet?",
      "What would you imagine the path looks like at different times of day and night?",
      "How does this design change your relationship to energy and sustainability?",
    ],
  },
  {
    id: "oliver_porch",
    label: "The Hound's Perch",
    sublabel: "Deck / Rain-Shield / View",
    prompt: `A deep, covered porch on a modern tiny house. Warm cedar wood, black steel railings. A redbone hound sits looking out over a misty meadow. The roof is extended to ensure no rain reaches the deck. High-end architectural style --ar 16:9`,
    atmosphere: `A sanctuary for Oliver. The mist stays in the meadow; the porch stays dry.`,
    palette: { bg: "#1a120b", accent: "#f97316" },
    designPhilosophy: `The Hound's Perch is designed around a simple principle: the boundary between inside and outside should be negotiable, not absolute. This is a space where the inhabitant (human or canine) can exist in a state of in-between-ness—sheltered but not enclosed, connected to the landscape but protected from its harshness. The deep overhang is not just functional; it is a gesture of care and intentionality.`,
    spatialIntent: `To create a threshold space where observation and contemplation are the primary activities. The porch is designed for watching—watching the weather, watching the meadow, watching the light change. It is a space where time moves differently, where the pace of life slows to match the pace of nature. For Oliver, it is a sanctuary where he can be present to the world without being exposed to its elements.`,
    materials: {
      primary: "Western red cedar decking (hand-planed, naturally weather-resistant, finished with clear matte sealant)",
      secondary: "Matte black powder-coated steel railings (welded frame, 1.2m height, 10cm spacing for safety)",
      tertiary: "Timber roof structure (Douglas fir beams, 2.4m overhang, pitched at 2:12 slope for water shedding)",
    },
    specifications: [
      {
        title: "Decking Material",
        description: "Western red cedar decking, hand-planed to reveal the wood's natural grain and color variations. Cedar is naturally resistant to rot and insect damage, making it ideal for outdoor exposure. The decking is finished with a clear matte sealant that preserves the wood's natural color while providing UV protection.",
      },
      {
        title: "Railing System",
        description: "Matte black powder-coated steel railings with a welded frame design. The railings are 1.2 meters high (exceeding code requirements) and feature 10cm spacing between balusters to ensure safety for both humans and pets. The minimalist design allows unobstructed views of the meadow.",
      },
      {
        title: "Roof Structure",
        description: "Douglas fir timber beams with a 2.4-meter overhang, pitched at a 2:12 slope to shed water efficiently. The roof is designed to provide complete weather protection while maintaining visual lightness. The underside of the roof is finished with a natural matte sealant to highlight the wood grain.",
      },
      {
        title: "Thermal Comfort",
        description: "The deep overhang provides shade during summer months while allowing low-angle winter sunlight to reach the porch. The cedar decking provides natural insulation and thermal mass, keeping the surface comfortable underfoot in various weather conditions.",
      },
    ],
    contextualNarrative: `The Hound's Perch is a love letter to the space between inside and outside. It was designed with Oliver in mind—a redbone hound who deserves a place to watch the world without being exposed to its harshness. The deep overhang is not just functional; it is a gesture of care. The cedar decking is warm underfoot, the railings are strong but unobtrusive, and the view of the misty meadow is uninterrupted. This is a space where time moves differently, where observation and contemplation are the primary activities. For Oliver, it is sanctuary. For humans, it is a reminder that the best views are often experienced in stillness.`,
    interactivePrompts: [
      "What would you observe from this porch? What would capture your attention?",
      "How does the deep overhang change your experience of weather and seasons?",
      "What role does this threshold space play in your daily rhythm?",
    ],
  },
  {
    id: "masonry_transition",
    label: "Stone & Siding",
    sublabel: "Brick / River Stone / Base",
    prompt: `Detail of a wall where red brick transitions into large smooth river stones. Black steel vertical structural beams. Modern glass reflections of pines. Soft overcast lighting --ar 16:9`,
    atmosphere: `Where the earth meets the hand-made. The heavy anchor of Hart.`,
    palette: { bg: "#1c1917", accent: "#a8a29e" },
    designPhilosophy: `Stone & Siding is a study in material honesty and tectonic expression. The transition between brick and river stone is not hidden or disguised—it is celebrated as a moment of architectural dialogue. This wall tells the story of two materials with different origins, different histories, and different relationships to time. The brick speaks of human craft; the river stone speaks of geological time. Together, they create a narrative about the layering of human and natural history.`,
    spatialIntent: `To create a visual and tactile anchor point that grounds the entire structure. This wall is the foundation—literally and metaphorically. It speaks to permanence, to the weight of materials, to the relationship between human craft and natural forces. Standing before this wall, one is meant to feel the passage of time, the accumulation of care and intention.`,
    materials: {
      primary: "Locally sourced red brick (handmade, variable color, lime mortar joints)",
      secondary: "River-tumbled stone (Michigan fieldstone, 0.3–0.6m diameter, set in lime mortar)",
      tertiary: "Structural steel I-beams (ASTM A992, matte black powder coat, welded connections)",
    },
    specifications: [
      {
        title: "Brick Masonry",
        description: "Locally sourced red brick, handmade to create natural color variation and texture. The brick is laid in a running bond pattern with lime mortar joints (1:3 lime:sand ratio). Lime mortar is more permeable than Portland cement, allowing the wall to breathe and preventing moisture damage.",
      },
      {
        title: "River Stone Foundation",
        description: "Large river-tumbled Michigan fieldstone (0.3–0.6m diameter) set in lime mortar. Each stone is hand-selected for color consistency and structural stability. The stones are arranged to create visual rhythm while ensuring structural integrity. The rounded surfaces of the stones are left exposed, celebrating their natural form.",
      },
      {
        title: "Structural Steel",
        description: "Vertical steel I-beams (ASTM A992 Grade 50) with matte black powder coat finish. The beams are spaced at 1.5-meter intervals to support the distributed weight of the masonry. The welded connections are ground smooth and finished with a matte black paint to create a seamless appearance.",
      },
      {
        title: "Weathering & Patina",
        description: "The wall is designed to weather naturally over time. The brick will develop a subtle patina, the mortar will weather and repoint as needed, and the river stones will continue to age gracefully. This is not a wall designed for permanence in the sense of unchanging appearance—it is designed to age beautifully.",
      },
    ],
    contextualNarrative: `Stone & Siding is the foundation of SpineFlow Tiny, both literally and spiritually. This wall represents the marriage of human craft and geological time. The red brick speaks of local artisans, of handmade materials, of human intention. The river stone speaks of millions of years of geological processes, of water and time shaping matter. Together, they create a narrative about the layers of history—both human and natural—that underlie this place. The structural steel beams are not hidden; they are celebrated as the skeleton that holds everything together. This is architecture that is honest about its materials, its structure, and its relationship to time.`,
    interactivePrompts: [
      "What stories do the different materials tell about time and place?",
      "How do you imagine this wall will look in 10, 50, or 100 years?",
      "What does the transition between brick and stone represent to you?",
    ],
  },
  {
    id: "neural_canopy",
    label: "Cellular Lounge",
    sublabel: "Honeycomb / Oak / Shadow",
    prompt: `Interior living room where one wall is a large laser-cut honeycomb pattern. Sunlight casting hexagonal shadows across oak floors and a minimalist green velvet sofa. Biophilic design --ar 16:9`,
    atmosphere: `Shadows of a forest made of math. Permanent, structured sunlight.`,
    palette: { bg: "#064e3b", accent: "#10b981" },
    designPhilosophy: `The Cellular Lounge is a meditation on the intersection of natural patterns and mathematical precision. The honeycomb pattern is not merely decorative—it is a reference to one of nature's most efficient structures, a pattern that appears in beehives, in crystalline structures, in the segmented eyes of insects. By laser-cutting this pattern into a solid wall, we create a dialogue between the organic and the constructed, between nature and technology. The result is a space that feels both mathematical and alive.`,
    spatialIntent: `To create a living room that is both intellectually engaging and emotionally nourishing. The honeycomb wall transforms sunlight into shadow, creating a dynamic, ever-changing visual experience. The green velvet sofa invites rest and contemplation. The oak flooring grounds the space in natural warmth. This is a room designed for both solitude and connection, for both intellectual engagement and emotional ease.`,
    materials: {
      primary: "Laser-cut honeycomb wall panel (3mm aluminum, anodized matte finish, mounted on timber frame)",
      secondary: "White oak flooring (sustainably harvested, hand-finished with matte polyurethane, radiant heating beneath)",
      tertiary: "Green velvet upholstery (natural fibers, deep forest green, minimalist form)",
    },
    specifications: [
      {
        title: "Honeycomb Wall Panel",
        description: "Laser-cut aluminum honeycomb panel (3mm thickness, 0.5m hexagon size) mounted on a timber frame. The aluminum is anodized to a matte finish, creating a subtle, non-reflective surface. The panel is positioned to maximize sunlight penetration, creating dynamic hexagonal shadow patterns that shift throughout the day.",
      },
      {
        title: "Flooring System",
        description: "White oak flooring, sustainably harvested and hand-finished with matte polyurethane. The flooring features radiant heating beneath, providing comfortable underfoot warmth during cooler months. The oak's warm honey tones create visual continuity with the natural light filtering through the honeycomb pattern.",
      },
      {
        title: "Upholstery",
        description: "Custom-designed sofa upholstered in deep forest green velvet (natural fibers, 100% cotton backing). The minimalist form—a simple rectangular cushion—allows the material and color to be the primary visual focus. The sofa is positioned to face the honeycomb wall, making the shadow play the primary visual experience.",
      },
      {
        title: "Light Performance",
        description: "The honeycomb wall is positioned on the south-facing wall to maximize sunlight penetration. During morning and evening hours, the light is low-angle and creates dramatic shadow patterns. At midday, the light is more direct, creating a softer, more diffused effect. The wall essentially functions as a living sundial.",
      },
    ],
    contextualNarrative: `The Cellular Lounge is where nature and mathematics dance together. The honeycomb pattern is not arbitrary—it is one of the most efficient structures in nature, a pattern that appears in beehives, in crystalline structures, in the segmented eyes of insects. By laser-cutting this pattern into aluminum and mounting it on a timber frame, we create a dialogue between the organic and the constructed. The result is a space that feels both intellectual and alive, both precise and natural. The green velvet sofa invites rest and contemplation, while the oak flooring grounds the space in natural warmth. The shadow play created by the honeycomb wall is never static—it is a living artwork that changes with the sun's position, the seasons, and the time of day.`,
    interactivePrompts: [
      "How does the honeycomb shadow pattern change throughout the day?",
      "What does the intersection of nature and mathematics mean to you?",
      "How does this space make you feel—energized or calmed?",
    ],
  },
  {
    id: "the_lantern_ext",
    label: "Forest Lantern",
    sublabel: "Dusk / Perforation / Teal",
    prompt: `Exterior tiny house in a misty forest at dusk. Perforated metal skin glowing from within with teal light. The house looks like a glowing lantern. Curved roofline, black steel --ar 16:9`,
    atmosphere: `A solitary pulse in the woods. Lit for the wanderer and the owl.`,
    palette: { bg: "#020617", accent: "#22d3ee" },
    designPhilosophy: `The Forest Lantern is a beacon—a solitary pulse in the darkness of the woods. The perforated metal skin transforms the house into a glowing object, visible from a distance but mysterious up close. This is architecture as communication, as signal. The house is not trying to hide or blend in; it is announcing its presence, inviting the wanderer and the owl to witness its existence. The teal light is not arbitrary—it is inspired by the bioluminescence of deep-sea creatures, a light that seems to come from within rather than without.`,
    spatialIntent: `To create a presence in the forest that is both welcoming and mysterious. The glowing perforated skin creates a sense of warmth and safety while maintaining a sense of otherness. This is a space that is meant to be seen from a distance, to be approached with curiosity and wonder. The curved roofline echoes the organic forms of the surrounding forest, while the teal light speaks to something more technological, more otherworldly.`,
    materials: {
      primary: "Perforated aluminum skin (3mm thickness, 8mm circular perforations, anodized matte finish)",
      secondary: "Curved steel frame (ASTM A992, welded connections, matte black powder coat)",
      tertiary: "Integrated LED illumination (3000K–5000K adjustable, 95+ CRI, teal accent lighting)",
    },
    specifications: [
      {
        title: "Perforated Skin",
        description: "Custom perforated aluminum panels (3mm thickness, 8mm circular perforations at 12mm spacing) create a semi-transparent skin that allows light to escape while maintaining structural integrity. The aluminum is anodized to a matte finish, creating a subtle, non-reflective surface that glows rather than reflects.",
      },
      {
        title: "Structural Frame",
        description: "Curved steel frame (ASTM A992 Grade 50) with welded connections and matte black powder coat finish. The frame is designed to support the perforated panels while creating a curved roofline that echoes the organic forms of the surrounding forest. The curved geometry also improves wind resistance.",
      },
      {
        title: "Interior Illumination",
        description: "Integrated LED strip lighting (3000K–5000K adjustable color temperature, 95+ CRI) runs along the interior perimeter of the perforated skin. The lighting can be adjusted to create different moods—warm and welcoming during evening hours, cooler and more energizing during morning hours. Accent teal lighting (5000K, high saturation) creates the signature glow.",
      },
      {
        title: "Thermal Performance",
        description: "The perforated skin provides passive ventilation while the interior is insulated with high-performance foam (R-30 equivalent). The combination of perforated exterior and insulated interior creates a thermal buffer that reduces heating and cooling loads.",
      },
    ],
    contextualNarrative: `The Forest Lantern is the final node of SpineFlow Tiny, a beacon in the darkness. The perforated metal skin transforms the house into a glowing object, visible from a distance but mysterious up close. This is architecture as communication, as signal. The house is not trying to hide or blend in; it is announcing its presence, inviting the wanderer and the owl to witness its existence. The teal light is inspired by the bioluminescence of deep-sea creatures, a light that seems to come from within rather than without. Standing before the Forest Lantern at dusk, one is meant to feel a sense of wonder, a sense that something extraordinary is happening in the darkness of the woods. This is where the journey ends, but also where it begins again.`,
    interactivePrompts: [
      "What would it feel like to approach this glowing house in the darkness?",
      "How does the perforated skin change your perception of the interior?",
      "What stories could this forest lantern tell about the night?",
    ],
  },
];
