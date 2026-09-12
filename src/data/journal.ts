import { IMG } from "@/lib/images";
import type { JournalPost } from "@/types";

/**
 * THE JOURNAL
 * Market intelligence published under the house name. Strings in `body`
 * beginning with "## " are rendered as subheadings.
 */
export const journalPosts: JournalPost[] = [
  {
    id: "j-1",
    slug: "the-scarcity-premium-is-not-a-market-cycle",
    title: "The Scarcity Premium Is Not a Market Cycle",
    excerpt:
      "Grandfathered moorings, expired consents, protected sightlines. A growing share of prime value now sits in permissions that current regulation would refuse to grant.",
    category: "Market Intelligence",
    readMinutes: 7,
    publishedAt: "2026-07-22",
    author: "Anneke de Vries",
    image: { src: IMG.oceanCliff, alt: "Private shoreline beneath a cliffside property" },
    body: [
      "There is a category of value in prime property that does not appear in any comparable analysis, does not respond to interest rates, and cannot be created by capital. It is the value of a permission that would not be issued today.",
      "We have been tracking it deliberately since 2019, and across our own book it now accounts for a materially larger share of price than it did a decade ago.",
      "## What the category contains",
      "A deep-water mooring on a coastline that has since been designated. A ninety-metre private beach in a jurisdiction that now mandates public access above the high-water line. A rental licence in the Balearics, where new tourist permits have been effectively frozen since 2022. A jetty on Lake Geneva built in 1948 under zoning that was rewritten in 1974.",
      "None of these can be replicated at any price. A buyer with unlimited capital cannot acquire the right to build them, because the right no longer exists to be sold.",
      "## Why it behaves differently",
      "Ordinary prime property is cyclical. It responds to credit conditions, currency movement, and the general appetite for risk assets, and it draws down accordingly. What we might call permission-backed value does not behave this way, because its supply curve is not merely inelastic — it is fixed and, in most jurisdictions, declining.",
      "Across the eleven transactions on our book carrying a non-replicable permission between 2019 and 2025, the average drawdown during the 2022–23 correction was 4.1 per cent. The comparable figure for our wider prime residential book was 11.8 per cent.",
      "## The diligence implication",
      "This changes what diligence has to look for. A structural survey and a title search will confirm that a mooring exists and that it is owned. Neither will tell you whether it could be rebuilt if a storm removed it, and that is frequently the more consequential question.",
      "We now instruct a planning opinion on any property where a material part of the value sits in a physical asset outside the building envelope. In roughly one case in five, the opinion returns something the seller did not know — occasionally in the buyer's favour.",
      "## What we tell clients",
      "Where a property carries a permission that could not be reissued, we say so explicitly in the underwriting model and we assign it a value. Where a property's permissions are ordinary and replicable, we say that too. The distinction is not a marketing device; it is the single most reliable predictor of downside behaviour we have found.",
    ],
  },
  {
    id: "j-2",
    slug: "orientation-is-the-only-specification-you-cannot-renovate",
    title: "Orientation Is the Only Specification You Cannot Renovate",
    excerpt:
      "Kitchens are replaceable. Bathrooms are replaceable. The direction a house faces is fixed for its entire life, and it is the specification buyers examine least.",
    category: "Architecture",
    readMinutes: 5,
    publishedAt: "2026-06-30",
    author: "Éloise Marchetti",
    image: { src: IMG.interiorLight, alt: "Interior room in low afternoon light" },
    body: [
      "A client once asked me to value two houses on the same Sardinian hillside, four hundred metres apart, built in the same decade to almost identical specification. One was worth roughly thirty per cent more than the other. The difference was thirty-one degrees of rotation.",
      "## The thing that cannot be changed",
      "Almost everything in a house is a decision that can be revisited. Kitchens are replaced on a fifteen-year cycle. Bathrooms similarly. Roofs, services, glazing, insulation, layout, and in many jurisdictions the envelope itself — all of it can be altered by a sufficiently determined owner with sufficient capital.",
      "Orientation cannot. A house that faces north-east at completion faces north-east when it is demolished. It is the one specification that is genuinely permanent, and in my experience it is the one buyers spend the least time on.",
      "## What it actually governs",
      "Orientation determines when a room is usable. A west-facing terrace in the Mediterranean is unusable between one and four in the afternoon for five months of the year, and is the best room in the house for the two hours after that. An east-facing bedroom is awake at five in June whether its occupant is or not.",
      "It also governs running cost. Thermal load on a south-west elevation in Andalusia is roughly double that of a north-east one, which translates directly into cooling plant, cooling cost, and the frequency with which that plant is replaced.",
      "## How we record it",
      "We note the aspect of every principal room on our book, and for coastal and alpine properties we record the sun angle at the equinox and both solstices. Where the decision between two properties is close, we will ask a client to return at a different hour before they commit. Roughly one client in six changes their preference after doing so.",
      "## A short test",
      "Stand in the room you would use most and ask what time it is. If the answer is the time you would actually be in it, the house is oriented for you. If the light is arriving three hours before or after you would want it, no renovation will fix that, and no photograph will have told you.",
    ],
  },
  {
    id: "j-3",
    slug: "why-we-declined-eleven-acquisitions",
    title: "Why We Declined Eleven Acquisitions Last Year",
    excerpt:
      "Our fee does not depend on which property a client buys. That single structural fact is what allows us to say the answer is none of them.",
    category: "The House",
    readMinutes: 6,
    publishedAt: "2026-05-18",
    author: "Tobias Lindqvist",
    image: { src: IMG.archMonolith, alt: "Monolithic architectural facade" },
    body: [
      "In 2025 we were instructed on acquisitions that we subsequently advised our own clients not to complete on eleven occasions. Nine of those clients took the advice. Two did not, and one of those two has since told me they wish they had.",
      "## The conflict nobody discusses",
      "A selling agent is paid when a property sells. A buying agent paid on completion is in exactly the same position — the fee arrives only if a transaction occurs, which means the incentive to find a reason to proceed is structural rather than personal.",
      "We charge buy-side mandates on a retained basis. The fee is the same whether a client buys the first property we show them, the fortieth, or none at all. This is not a moral position; it is an engineering one. Remove the incentive and the advice changes.",
      "## What the eleven had in common",
      "Four failed on title — undisclosed easements, an unregistered right of way, and in one case a boundary that had been informally moved in the 1980s and never regularised. Three failed on structure, all three concerning substrate rather than the building.",
      "Two failed on the model. Both were presented with rental figures that assumed occupancy rates the local market had not achieved in any of the preceding six years. One failed on planning: a neighbouring plot held a live consent for a building that would have removed the entire sightline.",
      "The eleventh failed because the client, on the third viewing, could not answer what they would do there on an ordinary Tuesday. That is a legitimate reason to stop.",
      "## The cost of saying no",
      "Declining eleven transactions cost us a meaningful amount of revenue we would otherwise have recognised. It is worth being explicit that this is a real cost and not a rhetorical one.",
      "What it purchased was the ability to say, credibly, that when we do recommend a property, the recommendation means something. Six of those nine clients subsequently completed on an alternative through us. The other three are still looking, and we are still retained.",
    ],
  },
  {
    id: "j-4",
    slug: "underwriting-a-private-island",
    title: "Underwriting a Private Island",
    excerpt:
      "Desalination, generation capacity, dock depth, medical evacuation time. The building is the last thing that should be assessed, and usually the first thing that is.",
    category: "Investment",
    readMinutes: 8,
    publishedAt: "2026-04-11",
    author: "Rashid Al-Mansouri",
    image: { src: IMG.beachAerialTurquoise, alt: "Private island seen from the air" },
    body: [
      "Every private island we have been asked to assess has been presented to us photographically. Every one we have recommended has been recommended on a spreadsheet.",
      "## Water first",
      "An island's carrying capacity is set by its fresh water, and nothing else matters until that number is established. Desalination capacity, storage volume, and — critically — redundancy. A single reverse-osmosis unit serving a ten-bedroom house is not an amenity; it is a single point of failure that renders the property uninhabitable within about seventy-two hours of a fault.",
      "We look for two independent units, storage of at least fourteen days at full occupancy, and a maintenance record showing the units have actually been serviced rather than merely installed.",
      "## Then power",
      "Generation, storage, and autonomy. Solar with four days of battery reserve and a diesel backup is a serious specification. Solar with no reserve and a generator that has not been load-tested since commissioning is a liability that will present itself during the first storm.",
      "## Then access",
      "Dock depth at low water, not at high. Airstrip length, surface, and — the question that is almost never asked — whether the permit is current and whether it transfers on sale. We have seen two islands where it did not.",
      "Medical evacuation time to a facility capable of receiving a cardiac patient. On one Caribbean island we assessed, the honest figure was four hours and eleven minutes. The client bought a different island.",
      "## Then, finally, the house",
      "Hurricane rating, salt tolerance of the specified materials, and the practical question of who maintains it. An island house is only as good as the staffing arrangement that keeps it, and staff arrangements on remote properties are considerably harder to sustain than owners anticipate.",
      "## What the numbers looked like",
      "On the last island we recommended, infrastructure represented sixty-two per cent of replacement cost and the buildings thirty-eight. The particulars had devoted one line to the former and eleven photographs to the latter. Our model inverted that ratio, and the price we advised was nineteen per cent below asking. It was accepted.",
    ],
  },
  {
    id: "j-5",
    slug: "the-return-of-the-single-floor-plate",
    title: "The Return of the Single Floor Plate",
    excerpt:
      "Developers have spent a decade subdividing upper floors into four. The buyers who matter most at that height are now asking for one.",
    category: "Market Intelligence",
    readMinutes: 5,
    publishedAt: "2026-03-09",
    author: "Rashid Al-Mansouri",
    image: { src: IMG.cityDubaiNight, alt: "City skyline at night from a tower residence" },
    body: [
      "Between 2012 and 2022, the prevailing logic in tall residential development was that four apartments on a floor produced more revenue than one. Across most of the price curve this remains true. At the top of it, it has stopped being true.",
      "## What changed",
      "A subdivided upper floor produces four units with single or dual aspect. A full plate produces one unit with 360 degrees. The premium buyers at this level are paying for is not square metres — it is the absence of a shared corridor, a neighbouring wall, and a lift lobby they do not control.",
      "In the eleven markets we track, full-plate residences transacted at an average of 2.3 times the per-square-metre rate of subdivided units in the same building. In Dubai and Hong Kong the multiple was higher.",
      "## The supply problem",
      "Almost nobody is building them. A developer must commit to the full-plate configuration at structural design stage, because the core, the lift strategy, and the service risers all differ. That decision is taken five to seven years before the unit is sold, under financing conditions that reward unit count.",
      "The consequence is a category where demand has grown and supply has been fixed by decisions taken half a decade ago. We currently have four full-plate mandates across nine offices and enquiries from considerably more than four qualified acquirers.",
      "## What we advise",
      "For buyers: shell purchases at structural stage remain the only reliable route, and they require a five-year horizon and tolerance for construction risk. For owners of existing full plates: the scarcity is structural rather than cyclical, and there is no supply response arriving before 2031.",
    ],
  },
  {
    id: "j-6",
    slug: "a-house-is-a-fifty-year-relationship",
    title: "A House Is a Fifty-Year Relationship",
    excerpt:
      "We hold management oversight on 214 properties we previously placed. What that has taught us about the second decade of ownership.",
    category: "Lifestyle",
    readMinutes: 6,
    publishedAt: "2026-02-14",
    author: "Clara Whitmore",
    image: { src: IMG.exteriorCourtyard, alt: "Courtyard of a private estate" },
    body: [
      "The transaction takes between four and fourteen months. The ownership takes between fifteen and fifty years. Almost the entire property industry is organised around the former.",
      "## What the second decade looks like",
      "Years one to three are straightforward: the house is new to its owner, the systems are under warranty, and the enthusiasm is high. Years four to nine are the plateau. It is years ten to fifteen where properties are either sustained or quietly lost.",
      "This is when the first major plant replacement falls due, when the original staff arrangement reaches its natural end, and when the family circumstances that justified the purchase have frequently changed. We see more properties come back to market in year twelve than in any other year, and the great majority of those sales are avoidable.",
      "## What sustains a house",
      "Three things, in our experience. A staffing arrangement that survives the departure of any single individual. A maintenance schedule that is written down and funded rather than reactive. And an honest annual conversation about whether the property still fits the life it was bought for.",
      "We conduct that last one formally on every property we manage. Occasionally it results in a sale, which is a legitimate outcome and considerably better than the alternative — a house that is retained out of inertia and deteriorates for four years before anyone admits it.",
      "## Why we do it",
      "Partly because clients ask. Mostly because a property we placed and then watched decline reflects on the recommendation we made, and the recommendation is the only thing this house actually sells.",
    ],
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

export function formatJournalDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month, day);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getRelatedPosts(slug: string, limit = 3): JournalPost[] {
  const current = getJournalPostBySlug(slug);
  if (!current) return journalPosts.slice(0, limit);

  return journalPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const catA = a.category === current.category ? 0 : 1;
      const catB = b.category === current.category ? 0 : 1;
      if (catA !== catB) return catA - catB;
      return +new Date(b.publishedAt) - +new Date(a.publishedAt);
    })
    .slice(0, limit);
}

