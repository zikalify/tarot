// Sola Busca tarot (Venice, c. 1490-91) — earliest fully extant 78-card deck.
// Scans: Wikimedia Commons, public domain. Meanings follow traditional
// tarot interpretation (the Sola Busca iconography inspired the
// Rider-Waite-Smith deck and shares its Strength-at-VIII ordering).
// yesNo: 2 = strong yes, 1 = leans yes, 0 = neutral/uncertain, -1 = leans no, -2 = strong no

const CARDS = [
  // ── Major Arcana (Trionfi) ──────────────────────────────────────────
  {
    id: 0, name: "The Fool", figure: "Mato", arcana: "major", rank: 0, element: "Air", astro: "Uranus",
    keywords: { up: ["beginnings", "leap of faith", "innocence"], rev: ["recklessness", "hesitation", "naivety"] },
    up: "The Fool steps to the edge of the unknown with nothing but a bundle of experience and an open heart. This card marks a genuine new beginning — a decision made on trust rather than proof. Say yes to the journey, but look where you plant your feet.",
    rev: "Reversed, the leap becomes a stumble: recklessness, a refusal to heed wise counsel, or the opposite trap — standing frozen at the cliff's edge when life asks you to move. Check whether fear or foolishness is writing your next step.",
    yesNo: 1
  },
  {
    id: 1, name: "The Magician", figure: "Panfilio", arcana: "major", rank: 1, element: "Air", astro: "Mercury",
    keywords: { up: ["skill", "willpower", "manifestation"], rev: ["manipulation", "scattered energy", "unused gifts"] },
    up: "The Magician stands with every tool on the table: wand, cup, sword, coin. All the resources the situation requires are already in your hands — what is missing is focused will. Channel your skill deliberately and the answer becomes yes.",
    rev: "Reversed, talent is squandered or turned to manipulation. Energy scatters, promises outrun ability, or someone near you is performing rather than producing. Reclaim your attention before you commit to the act.",
    yesNo: 2
  },
  {
    id: 2, name: "The High Priestess", figure: "Postumio", arcana: "major", rank: 2, element: "Water", astro: "Moon",
    keywords: { up: ["intuition", "secrets", "the inner voice"], rev: ["repressed insight", "surface noise", "withdrawal"] },
    up: "The Priestess sits between the pillars of what is spoken and what is withheld. The answer you seek already exists in you, beneath analysis — in the dream, the flinch, the quiet knowing. Listen before you ask anyone else.",
    rev: "Reversed, inner knowledge is drowned out by noise, or secrecy hardens into isolation. You may be ignoring a truth your body already accepts, or someone is not telling you the whole of it.",
    yesNo: 0
  },
  {
    id: 3, name: "The Empress", figure: "Lenpio", arcana: "major", rank: 3, element: "Earth", astro: "Venus",
    keywords: { up: ["abundance", "nurture", "creation"], rev: ["stagnation", "smothering", "depletion"] },
    up: "The Empress reigns over harvest and growth. What you plant now will feed you — projects, relationships, the body itself. Choose creation over criticism; the ground is fertile and the season favors care.",
    rev: "Reversed, the garden suffers: creative blocks, overgiving until empty, or a situation that has grown unruly from neglect. Tend to your own soil first.",
    yesNo: 2
  },
  {
    id: 4, name: "The Emperor", figure: "Mario", arcana: "major", rank: 4, element: "Fire", astro: "Aries",
    keywords: { up: ["authority", "structure", "order"], rev: ["rigidity", "control issues", "weak foundations"] },
    up: "The Emperor builds the frame that lets things stand: rules, boundaries, a plan with bones. Success here comes through discipline and clear hierarchy of priorities, not through charm. Decide, then hold the line.",
    rev: "Reversed, authority curdles into domination or collapses into absence. Structures are either too rigid to live in or too weak to lean on. Rebuild the foundation before adding more weight.",
    yesNo: 1
  },
  {
    id: 5, name: "The Hierophant", figure: "Catulo", arcana: "major", rank: 5, element: "Earth", astro: "Taurus",
    keywords: { up: ["tradition", "teaching", "shared belief"], rev: ["dogma", "unexamined rules", "rebellion without cause"] },
    up: "The Hierophant transmits what has been proven across generations. Seek a teacher, honor the ritual, accept the helping hand of established practice. There is wisdom in the well-worn path today.",
    rev: "Reversed, tradition becomes a cage: dogma worn as armor, or rules followed long past the point of meaning. Question inherited assumptions — but know which ones are actually holding the roof up.",
    yesNo: 1
  },
  {
    id: 6, name: "The Lovers", figure: "Sesto", arcana: "major", rank: 6, element: "Air", astro: "Gemini",
    keywords: { up: ["union", "choice", "values alignment"], rev: ["discord", "indecision", "misalignment"] },
    up: "The Lovers is a card of sacred choice as much as sacred union. Two paths, two people, two selves — the test is whether what you choose matches what you actually believe. Decide with the whole heart, not the negotiating one.",
    rev: "Reversed, values pull in different directions: a relationship out of alignment, a choice avoided, or harmony kept at the price of honesty. The rift closes only when the truth is spoken.",
    yesNo: 2
  },
  {
    id: 7, name: "The Chariot", figure: "Deo Tauro", arcana: "major", rank: 7, element: "Water", astro: "Cancer",
    keywords: { up: ["drive", "victory", "willpower"], rev: ["runaway force", "no direction", "defeatism"] },
    up: "The Charioteer holds two opposing steeds with a single focused will. Victory is available — not to the passive, but to the one who aims and does not look away. Grip the reins: momentum answers direction.",
    rev: "Reversed, the horses pull apart: aggression without aim, exhaustion, or the sense of being driven rather than driving. Stop the chariot and choose the road before applying more force.",
    yesNo: 2
  },
  {
    id: 8, name: "Strength", figure: "Nerone", arcana: "major", rank: 8, element: "Fire", astro: "Leo",
    keywords: { up: ["courage", "gentle mastery", "patience"], rev: ["self-doubt", "raw impulse", "force"] },
    up: "True strength here is not the fist but the hand that closes the lion's mouth with patience. Meet ferocity — in others or in yourself — with calm, sustained courage. Gentle mastery outlasts brute force.",
    rev: "Reversed, confidence erodes: harsh self-judgment, impulses running the show, or force applied where patience was needed. Befriend the lion before trying to lead it.",
    yesNo: 1
  },
  {
    id: 9, name: "The Hermit", figure: "Falco", arcana: "major", rank: 9, element: "Earth", astro: "Virgo",
    keywords: { up: ["solitude", "inner light", "search"], rev: ["isolation", "avoidance", "lost purpose"] },
    up: "The Hermit climbs alone with a single lantern — the answer will not be found in company or noise. Withdraw deliberately, examine the question in silence, and bring the light back down when it is found.",
    rev: "Reversed, solitude curdles into lonely avoidance, or the lantern is lowered until the path disappears. Know the difference between sacred retreat and hiding.",
    yesNo: 0
  },
  {
    id: 10, name: "Wheel of Fortune", figure: "Venturio", arcana: "major", rank: 10, element: "Fire", astro: "Jupiter",
    keywords: { up: ["turning point", "fate", "cycle"], rev: ["resistance to change", "bad timing", "downward spin"] },
    up: "The Wheel turns and the position reverses: what was rising begins to fall, what fell begins to rise. This is the hand of fortune, larger than planning. Ride the upswing; do not mourn the down — it always turns.",
    rev: "Reversed, you grip a spoke while the wheel insists on turning: clashing with timing, repeating a cycle unlearned, or blaming fate for a pattern you keep feeding.",
    yesNo: 1
  },
  {
    id: 11, name: "Justice", figure: "Tulio", arcana: "major", rank: 11, element: "Air", astro: "Libra",
    keywords: { up: ["truth", "consequence", "fairness"], rev: ["imbalance", "evasion", "unfair judgment"] },
    up: "Justice — here the advocate Cicero, who argued cases in truth's name — weighs the matter without flattery. Cause and effect are being balanced now. Tell the truth, keep your agreements, and the scales settle in your favor.",
    rev: "Reversed, the scales tilt: accountability avoided, judgment rushed, or an outcome skewed by what was left unsaid. Correct the imbalance at its root, not its appearance.",
    yesNo: 1
  },
  {
    id: 12, name: "The Hanged Man", figure: "Carbone", arcana: "major", rank: 12, element: "Water", astro: "Neptune",
    keywords: { up: ["suspension", "new perspective", "surrender"], rev: ["stalling", "martyrdom", "needless sacrifice"] },
    up: "Hung between heaven and earth, the Hanged Man sees the world upside down and understands. A voluntary pause — a sacrifice of the urgent for the important — yields a perspective effort could not. Stop pushing; look again.",
    rev: "Reversed, the pause is no longer sacred: empty waiting, martyrdom for its own sake, or resistance to a surrender that would set you free. Hang up or come down.",
    yesNo: -1
  },
  {
    id: 13, name: "Death", figure: "Catone", arcana: "major", rank: 13, element: "Water", astro: "Scorpio",
    keywords: { up: ["ending", "transformation", "clearance"], rev: ["clinging", "fear of change", "stagnation"] },
    up: "Cato the Younger walks here as the card of necessary endings. What has completed its season is being cleared — cleanly, without malice. Grieve it, then let the field go fallow; something new is already taking root in the emptied ground.",
    rev: "Reversed, an ending is resisted: a relationship, role, or self that must die but is kept on life support. Prolonging it does not soften the loss; it only delays the life waiting behind it.",
    yesNo: -1
  },
  {
    id: 14, name: "Temperance", figure: "Bocho", arcana: "major", rank: 14, element: "Fire", astro: "Sagittarius",
    keywords: { up: ["balance", "moderation", "alchemy"], rev: ["excess", "imbalance", "impatience"] },
    up: "The angel pours water between two cups, finding the blend no formula could. Temperance is the middle way with purpose: neither indulgence nor denial, but the measured mix that makes healing possible. Slow, deliberate adjustment wins now.",
    rev: "Reversed, the pour spills: extremes replace blend, impatience ruins work that needed time, or two parts of your life refuse to mix. Recalibrate before adding more of anything.",
    yesNo: 1
  },
  {
    id: 15, name: "The Devil", figure: "Metelo", arcana: "major", rank: 15, element: "Earth", astro: "Capricorn",
    keywords: { up: ["bondage", "shadow", "materialism"], rev: ["release", "honesty", "reclaiming power"] },
    up: "The chains around the Devil's acolytes are loose enough to lift off — the bondage is chosen, invisible, and named desire: addiction, envy, a bargain made with the lesser self. See the chain clearly and it half-removes itself.",
    rev: "Reversed, the chain drops. Honest admission breaks a spell: a habit named, a shadow owned, a dark bargain ended. Freedom is closer than the old story admitted.",
    yesNo: -2
  },
  {
    id: 16, name: "The Tower", figure: "Olivo", arcana: "major", rank: 16, element: "Fire", astro: "Mars",
    keywords: { up: ["sudden upheaval", "revelation", "collapse"], rev: ["delayed disaster", "fear of change", "slow rebuild"] },
    up: "Lightning takes the tower that pride built. Sudden, shocking, and — though it never feels so at the time — clarifying: what falls was already false. Do not rebuild the same wall on the same crack.",
    rev: "Reversed, the strike is delayed or internalized: a crisis avoided but not averted, upheaval survived by numbness, or the slow demolition of a truth you keep bracing against. The wall is coming down regardless; choose how.",
    yesNo: -2
  },
  {
    id: 17, name: "The Star", figure: "Ipeo", arcana: "major", rank: 17, element: "Air", astro: "Aquarius",
    keywords: { up: ["hope", "healing", "inspiration"], rev: ["discouragement", "disconnection", "lost faith"] },
    up: "After the Tower, the Star: quiet water under an open sky. Healing arrives without spectacle — a wish renewed, an inspiration fed, a sense of being quietly guided. Pour out what was, drink from what comes.",
    rev: "Reversed, the star dims: faith worn thin, inspiration drying, or healing refused because grief has become familiar. Look up; the light has not moved, only your looking.",
    yesNo: 2
  },
  {
    id: 18, name: "The Moon", figure: "Lentulo", arcana: "major", rank: 18, element: "Water", astro: "Pisces",
    keywords: { up: ["illusion", "fear", "the unconscious"], rev: ["clarity emerging", "fear released", "truth surfacing"] },
    up: "The Moon shows the path only in pieces, between towers, past the dogs that howl at what they cannot name. Not everything here is what it seems. Move carefully through uncertainty; do not sign what you cannot read in daylight.",
    rev: "Reversed, the fog lifts: a deception exposed, a fear deflated, a truth surfacing from deep water. What confused you yesterday begins to name itself.",
    yesNo: -1
  },
  {
    id: 19, name: "The Sun", figure: "Sabino", arcana: "major", rank: 19, element: "Fire", astro: "Sun",
    keywords: { up: ["joy", "success", "vitality"], rev: ["dimmed joy", "delay", "overconfidence"] },
    up: "The Sun returns everything the Moon borrowed: clarity, warmth, success without ambiguity, a child's plain delight. Celebrate openly. This is the card of things working — of light with nothing hidden behind it.",
    rev: "Reversed, the light is present but filtered: success delayed, joy muted by private doubt, or optimism running ahead of reality. The sun has not set; put down whatever is shading your eyes.",
    yesNo: 2
  },
  {
    id: 20, name: "Judgement", figure: "Nenbroto", arcana: "major", rank: 20, element: "Fire", astro: "Pluto",
    keywords: { up: ["awakening", "reckoning", "calling"], rev: ["self-judgment", "refusal of the call", "indecision"] },
    up: "Nimrod hears the trumpet and rises. A summons from the deepest self — to account for the past, forgive it, and stand up into a larger life. Answer the call; the old self has already served its term.",
    rev: "Reversed, the call is heard and refused, or turned inward as harsh self-criticism. Doubt keeps you in the tomb. The pardon has already been issued — accept it.",
    yesNo: 2
  },
  {
    id: 21, name: "The World", figure: "Nabucho-denasor", arcana: "major", rank: 21, element: "Earth", astro: "Saturn",
    keywords: { up: ["completion", "wholeness", "arrival"], rev: ["incompletion", "delay", "loose ends"] },
    up: "Nebuchadnezzar — empire at its zenith — crowns the final trump. A long cycle completes; the dance is whole. You have arrived where the work was aimed. Celebrate, integrate, and know the next spiral begins from here.",
    rev: "Reversed, the circle nearly closes but not quite: one loose end, one lesson unlearned, one celebration postponed. Finish what remains before starting the next thing.",
    yesNo: 2
  },

  // ── Cups (Water) ────────────────────────────────────────────────────
  {
    id: 22, name: "Ace of Cups", figure: null, arcana: "cups", rank: 1, element: "Water",
    keywords: { up: ["new love", "overflow", "compassion"], rev: ["blocked feeling", "emptiness", "held-back emotion"] },
    up: "A cup overflows — the purest Ace of the deck. New feeling arrives: love offered, compassion born, an emotional beginning uncorrupted by past hurt. Accept the water; there is more where it came from.",
    rev: "Reversed, the cup tilts or stays covered: emotions suppressed, joy deferred, a heart keeping score. The feeling is still there — it needs permission to spill.",
    yesNo: 2
  },
  {
    id: 23, name: "Two of Cups", figure: null, arcana: "cups", rank: 2, element: "Water",
    keywords: { up: ["partnership", "mutual attraction", "truce"], rev: ["imbalance", "rupture", "one-sided bond"] },
    up: "Two figures exchange cups under a shared emblem — partnership in its first golden hour. Mutual regard, attraction, reconciliation after quarrel. Meet the other halfway; the feeling is returned.",
    rev: "Reversed, the exchange breaks: promises unkept, a see-saw of give and take, or a bond where one carries the vessel alone. Repair requires both hands.",
    yesNo: 2
  },
  {
    id: 24, name: "Three of Cups", figure: null, arcana: "cups", rank: 3, element: "Water",
    keywords: { up: ["friendship", "celebration", "community"], rev: ["gossip", "excess", "social friction"] },
    up: "Three companions raise their cups — toast, harvest, the joy that multiplies when shared. Good news travels in company now. Celebrate with your people; the community itself is the blessing.",
    rev: "Reversed, the toast sours: gossip at the table, celebration tipping into excess, or friends who take more than they pour. Choose your circle with care tonight.",
    yesNo: 2
  },
  {
    id: 25, name: "Four of Cups", figure: null, arcana: "cups", rank: 4, element: "Water",
    keywords: { up: ["apathy", "contemplation", "repletion"], rev: ["stirring", "awareness", "accepting the offer"] },
    up: "Seated in shadow with three cups ignored and a fourth offered unseen: satiation tipping into apathy. The heart is full to the point of boredom. Before rejecting everything, notice what is actually being extended to you.",
    rev: "Reversed, the gaze lifts: a slump ends, appetite returns, a previously invisible offer is finally accepted. Waking up to what is already around you.",
    yesNo: -1
  },
  {
    id: 26, name: "Five of Cups", figure: null, arcana: "cups", rank: 5, element: "Water",
    keywords: { up: ["grief", "regret", "loss"], rev: ["acceptance", "moving on", "recovered perspective"] },
    up: "Three cups spilled, two still standing — the mourner sees only what is lost. Grief is real here and deserves its seat. But the two full cups remain behind your cloak; turn around when you are ready.",
    rev: "Reversed, acceptance dawns: the worst of the grief has passed, lessons are being gathered from the spill, and the living cups are finally picked up.",
    yesNo: -1
  },
  {
    id: 27, name: "Six of Cups", figure: null, arcana: "cups", rank: 6, element: "Water",
    keywords: { up: ["memory", "nostalgia", "innocence"], rev: ["living in the past", "unrealistic nostalgia", "moving forward"] },
    up: "Children exchange cups of flowers in a garden of memory. The past returns kindly: old friends, childhood places, innocence briefly recovered. Draw sweetness from memory — then bring it into the present as nourishment, not escape.",
    rev: "Reversed, nostalgia hardens into a trap: the past idealized past recognition, or a memory that must finally be laid down. Return, but do not remain.",
    yesNo: 1
  },
  {
    id: 28, name: "Seven of Cups", figure: null, arcana: "cups", rank: 7, element: "Water",
    keywords: { up: ["fantasy", "many options", "illusion"], rev: ["clarity", "choosing", "grounding"] },
    up: "Seven cups, seven visions — treasure, dragon, glory, smoke. A smorgasbord of desire and fantasy. Tempting, dazzling, and mostly vapor: pick one real cup and pour yourself into it.",
    rev: "Reversed, the mirage thins: illusions collapse, fantasy yields to a single workable choice, the fog of options lifts. What remains standing is real.",
    yesNo: 0
  },
  {
    id: 29, name: "Eight of Cups", figure: null, arcana: "cups", rank: 8, element: "Water",
    keywords: { up: ["departure", "seeking deeper", "walking away"], rev: ["fear of leaving", "aimless drifting", "returning"] },
    up: "Eight cups stacked neatly and left behind under a waning moon. Not abandonment but seeking: what you built is complete but no longer nourishing. Walk toward deeper water; the leaving is done with respect.",
    rev: "Reversed, the departure stalls: fear of the unknown keeps you among cups that no longer feed, or drifting without direction replaces the search. Decide — leaving and staying both require honesty.",
    yesNo: -1
  },
  {
    id: 30, name: "Nine of Cups", figure: null, arcana: "cups", rank: 9, element: "Water",
    keywords: { up: ["wish granted", "satisfaction", "contentment"], rev: ["smugness", "delayed wish", "hollow plenty"] },
    up: "The wish card: nine cups arranged in an arc behind a contented figure. Emotional and material satisfaction — a desire fulfilled without remainder. Enjoy it fully; this is the good day earned.",
    rev: "Reversed, satisfaction curdles: a wish granted that disappoints, pleasure without depth, or contentment withheld a little longer. Examine what you actually wanted.",
    yesNo: 2
  },
  {
    id: 31, name: "Ten of Cups", figure: null, arcana: "cups", rank: 10, element: "Water",
    keywords: { up: ["bliss", "family", "alignment"], rev: ["strained home", "misaligned values", "fleeting joy"] },
    up: "Ten cups arc like a rainbow over a household at peace — the fullest emotional completion in the suit. Belonging, shared joy, values aligned across a family or chosen family. This is home, however you spell it.",
    rev: "Reversed, the rainbow wobbles: a home strained by unspoken mismatch, joy that will not stick, or appearances kept while the feeling drains. Realignment, not performance.",
    yesNo: 2
  },
  {
    id: 32, name: "Knave of Cups", figure: null, arcana: "cups", rank: 11, element: "Water",
    keywords: { up: ["tender offer", "curiosity", "romantic message"], rev: ["moodiness", "immature feelings", "empty gesture"] },
    up: "The youth offers a cup like a held-out secret — an emotional message, an invitation to feel, the arrival of a gentle soul. Say yes to vulnerability. News of the heart is on its way.",
    rev: "Reversed, the offer wavers: an emotionally immature messenger, moodiness, or a gesture that promises more depth than it contains. Feel it out slowly.",
    yesNo: 1
  },
  {
    id: 33, name: "Knight of Cups", figure: "Natanabo", arcana: "cups", rank: 12, element: "Water",
    keywords: { up: ["romance", "following the heart", "proposal"], rev: ["moodiness", "empty charm", "detour"] },
    up: "Natanabo — the Egyptian priest-mage — rides slow, cup raised like a chalice. The quest is for meaning, not conquest: a proposal, an invitation, the heart given the reins. Follow the feeling that has beauty in it.",
    rev: "Reversed, the knight gallops in circles: charm without substance, moods mistaken for messages, a quest abandoned when romance fades. Test the golden cup for what is actually inside.",
    yesNo: 1
  },
  {
    id: 34, name: "Queen of Cups", figure: "Polisena", arcana: "cups", rank: 13, element: "Water",
    keywords: { up: ["deep empathy", "intuition", "emotional security"], rev: ["overwhelm", "codependency", "swamped feelings"] },
    up: "Polyxena — who knew both sacrifice and devotion — holds the closed cup with both hands: feeling made sovereign. Deep empathy, steady emotional security, intuition that reads the room before words start. Trust the one who feels with you.",
    rev: "Reversed, the waters rise: absorbing others' moods until drowning, empathy curdled into codependency, or intuition ignored until it screams. Dry land first, then help.",
    yesNo: 1
  },
  {
    id: 35, name: "King of Cups", figure: "Lucio Cecilio R.", arcana: "cups", rank: 14, element: "Water",
    keywords: { up: ["emotional mastery", "diplomacy", "calm counsel"], rev: ["emotional manipulation", "volatility behind calm"] },
    up: "The King sits steady on a throne tossed by waves — feeling fully experienced and fully ruled. Diplomacy, mature counsel, compassion with a backbone. The sea does not rock him because he does not rock the sea.",
    rev: "Reversed, the calm is a mask: emotional manipulation, charm concealing demand, or eruptions breaking through maintained composure. Look beneath the level surface.",
    yesNo: 1
  },

  // ── Coins / Denari (Earth) ──────────────────────────────────────────
  {
    id: 36, name: "Ace of Coins", figure: null, arcana: "coins", rank: 1, element: "Earth",
    keywords: { up: ["seed of prosperity", "opportunity", "health"], rev: ["missed chance", "instability", "greed"] },
    up: "A single coin offered from the cloud — the seed of every kind of abundance: money, work, body, home. A tangible opportunity is being placed in your hand. Plant it deliberately; this seed grows slowly and surely.",
    rev: "Reversed, the seed is dropped or hoarded: a grounded opportunity missed, instability at the root, or gold pursued past the point of need. Secure the foundation before sowing.",
    yesNo: 2
  },
  {
    id: 37, name: "Two of Coins", figure: null, arcana: "coins", rank: 2, element: "Earth",
    keywords: { up: ["balance", "adaptability", "juggling"], rev: ["overload", "dropped balls", "rigidity"] },
    up: "A dancer juggles two coins in an endless loop — money, duties, two lives held in motion. Flexibility keeps the coins airborne. Adapt, prioritize, and trust your rhythm; you have done harder balances.",
    rev: "Reversed, coins start hitting the floor: overcommitment, financial wobble, an inability to bend. Put one coin down before both fall.",
    yesNo: 0
  },
  {
    id: 38, name: "Three of Coins", figure: null, arcana: "coins", rank: 3, element: "Earth",
    keywords: { up: ["craft", "collaboration", "skill building"], rev: ["mediocrity", "poor teamwork", "unrecognized work"] },
    up: "Architect, mason, and patron consult over the stone: skilled work made better by collaboration. Teamwork, apprenticeship, professional respect. Bring your craft to others who can match it.",
    rev: "Reversed, the build suffers: shoddy workmanship, a team that will not align, or skill going unacknowledged. Quality over speed; or find collaborators who share the standard.",
    yesNo: 1
  },
  {
    id: 39, name: "Four of Coins", figure: null, arcana: "coins", rank: 4, element: "Earth",
    keywords: { up: ["holding on", "security", "control"], rev: ["release", "generosity", "loosened grip"] },
    up: "Four coins clutched tight — one under each foot, one at the heart, one crowned. Security has been achieved and then frozen into fear. Some holding protects; this much holding calcifies. Know what you are protecting.",
    rev: "Reversed, the fists open — sometimes willingly, sometimes pried: money released, control relaxed, the tight story of 'mine' rewritten. Generosity returns circulation to a stalled system.",
    yesNo: -1
  },
  {
    id: 40, name: "Five of Coins", figure: null, arcana: "coins", rank: 5, element: "Earth",
    keywords: { up: ["hardship", "worry", "exclusion"], rev: ["recovery", "help accepted", "returning to the fold"] },
    up: "Two figures pass a lit window in the snow — hardship felt, sometimes more than truly had. Poverty, illness, or the ache of standing outside. The help exists; pride is the only locked door.",
    rev: "Reversed, the thaw comes: recovery begins, aid is finally accepted, the cold chapter ends. You were never as alone as the weather made it feel.",
    yesNo: -1
  },
  {
    id: 41, name: "Six of Coins", figure: null, arcana: "coins", rank: 6, element: "Earth",
    keywords: { up: ["generosity", "giving and receiving", "fair exchange"], rev: ["strings attached", "one-way flow", "dependency"] },
    up: "The merchant weighs coins into open hands — charity with scales, fair exchange, the healthy circulation of resources. Give from surplus; receive without shame. Both directions keep the river moving.",
    rev: "Reversed, the scales lie: generosity with strings, uneven exchange, or charity that purchases obligation. Check who is actually being served.",
    yesNo: 1
  },
  {
    id: 42, name: "Seven of Coins", figure: null, arcana: "coins", rank: 7, element: "Earth",
    keywords: { up: ["patience", "investment", "midpoint assessment"], rev: ["impatience", "poor ROI", "abandoning the field"] },
    up: "The gardener leans on his tool and surveys seven coins on the vine — the long middle of any worthy work. Assess, rest, wait for ripeness. What you planted is growing; harvesting now would cost the harvest.",
    rev: "Reversed, patience snaps: frustration at slow returns, work abandoned a season early, or effort poured into ground that will not pay. Reassess the field itself, not just your pace.",
    yesNo: 0
  },
  {
    id: 43, name: "Eight of Coins", figure: null, arcana: "coins", rank: 8, element: "Earth",
    keywords: { up: ["diligence", "apprenticeship", "refinement"], rev: ["perfectionism", "slack craft", "tunnel vision"] },
    up: "Coin after coin, struck with identical care: mastery built one repetition at a time. Diligence, study, skill refined through practice. Keep hammering — excellence is this exact motion, done again.",
    rev: "Reversed, the craft slips: shortcuts replace practice, perfectionism stalls progress, or tunnel vision blinds you to the wider trade. Return to the bench with fresh eyes.",
    yesNo: 1
  },
  {
    id: 44, name: "Nine of Coins", figure: null, arcana: "coins", rank: 9, element: "Earth",
    keywords: { up: ["self-sufficiency", "refinement", "earned luxury"], rev: ["dependence", "overinvestment in status", "isolation in plenty"] },
    up: "The cultivated garden, the falcon on the wrist: abundance enjoyed alone because it was earned alone. Self-sufficiency, refined taste, the quiet luxury of independence. Enjoy what your discipline grew.",
    rev: "Reversed, plenty hollows out: dependence on another's purse, status purchased at self-cost, or riches that isolate. Recalibrate what 'enough' means.",
    yesNo: 2
  },
  {
    id: 45, name: "Ten of Coins", figure: null, arcana: "coins", rank: 10, element: "Earth",
    keywords: { up: ["legacy", "inheritance", "lasting foundation"], rev: ["family conflict over money", "unstable foundation", "short-term focus"] },
    up: "Ten coins arranged as a family crest across generations: wealth that outlives the maker. Legacy, inheritance, the deep root of home and clan. Build what will still stand when you are a story told at the table.",
    rev: "Reversed, the legacy fractures: disputes over inheritance, roots that were never stable, or a future mortgaged to the present's appetites. Repair the foundation, not the facade.",
    yesNo: 2
  },
  {
    id: 46, name: "Knave of Coins", figure: null, arcana: "coins", rank: 11, element: "Earth",
    keywords: { up: ["student", "first steps", "practical news"], rev: ["daydreaming", "poor planning", "stalled progress"] },
    up: "A figure studies one coin as if it were the world's first: the student of the material realm. A practical offer arrives — a job lead, a course, the first honest step of a long project. Begin seriously, even small.",
    rev: "Reversed, the step stalls: plans made and unmade, study without application, or ambition outrunning patience. Stop redesigning; pick up one coin.",
    yesNo: 1
  },
  {
    id: 47, name: "Knight of Coins", figure: "Sarafino", arcana: "coins", rank: 12, element: "Earth",
    keywords: { up: ["perseverance", "routine", "deliberate progress"], rev: ["stubbornness", "stagnation", "work without purpose"] },
    up: "Serapion's knight moves at the pace of harvest: slowly, and therefore reliably. Method, perseverance, a promise kept through sheer consistency. There is no shortcut and none is needed.",
    rev: "Reversed, steadiness becomes stuckness: stubborn routine outliving its use, work reduced to mere motion, or progress so cautious it is indistinguishable from stalling.",
    yesNo: 1
  },
  {
    id: 48, name: "Queen of Coins", figure: "Elena", arcana: "coins", rank: 13, element: "Earth",
    keywords: { up: ["nurturing provider", "practical care", "abundance"], rev: ["self-neglect", "smothering care", "financial anxiety"] },
    up: "Helen of Troy — whose face launched a thousand ships — here tends a single garden: beauty made practical, care made material. The nurturing provider: she feeds bodies, budgets, and households. Ask her counsel on anything real.",
    rev: "Reversed, the garden suffers from the gardener's neglect: giving until empty, beauty pursued past means, money worried into stagnation. Fill your own cup and the coins circulate again.",
    yesNo: 2
  },
  {
    id: 49, name: "King of Coins", figure: "R. Filipo", arcana: "coins", rank: 14, element: "Earth",
    keywords: { up: ["mastery", "wealth", "reliable power"], rev: ["greed", "rigidity", "status obsession"] },
    up: "Philip II of Macedon — father of Alexander, builder of an empire on solid coin — embodies material mastery: steady wealth, dependable authority, the Midas who also farms. Build to last. Provide as naturally as you breathe.",
    rev: "Reversed, mastery rots into greed: wealth hoarded past purpose, rigidity mistaken for strength, identity fused to net worth. The kingdom is not the king.",
    yesNo: 2
  },

  // ── Batons / Bastoni (Fire) ─────────────────────────────────────────
  {
    id: 50, name: "Ace of Batons", figure: null, arcana: "batons", rank: 1, element: "Fire",
    keywords: { up: ["spark", "initiative", "potential"], rev: ["delay", "false start", "diminished drive"] },
    up: "A hand from the cloud grips a flowering staff — raw creative fire, the idea that refuses to be ignored, the green shoot of a new venture. Seize the spark. It is meant to be handled.",
    rev: "Reversed, the spark smokes instead of catching: delays, false starts, energy spent announcing rather than building. Strike again — the flint is good, the timing was not.",
    yesNo: 1
  },
  {
    id: 51, name: "Two of Batons", figure: null, arcana: "batons", rank: 2, element: "Fire",
    keywords: { up: ["planning", "world in hand", "future vision"], rev: ["fear of the unknown", "poor planning", "limited scope"] },
    up: "The explorer stands with the world in one hand and a staff in the other, already mapping the voyage beyond the harbor. Planning, ambition, the first horizon chosen. Decide where you are going before you go.",
    rev: "Reversed, the map stays rolled: fear dressed as 'more research', plans too small for the actual world, or a voyage abandoned before the harbor wall. Expand the vision.",
    yesNo: 1
  },
  {
    id: 52, name: "Three of Batons", figure: null, arcana: "batons", rank: 3, element: "Fire",
    keywords: { up: ["foresight", "expansion", "ships coming in"], rev: ["delays abroad", "short-sightedness", "frustrated growth"] },
    up: "The merchant watches his ships round the far cape: foresight rewarded, expansion underway, the first returns on a bold venture. Look far and wait confidently — the effort you sent out is answering.",
    rev: "Reversed, the ships lag: overseas delays, growth frustrated by walls you cannot see past, or vision too timid to reach the horizon. Patience plus a wider scope.",
    yesNo: 1
  },
  {
    id: 53, name: "Four of Batons", figure: null, arcana: "batons", rank: 4, element: "Fire",
    keywords: { up: ["homecoming", "celebration", "stability"], rev: ["transition", "tension at home", "unfinished foundation"] },
    up: "Four staves crowned with garlands — a gate of celebration: homecoming, milestone, the stable hearth that lets joy gather. Mark the moment with the people who helped build it.",
    rev: "Reversed, the gate wobbles: a celebration postponed, harmony at home strained, or a foundation still curing. Secure the beams before hanging more garlands.",
    yesNo: 2
  },
  {
    id: 54, name: "Five of Batons", figure: null, arcana: "batons", rank: 5, element: "Fire",
    keywords: { up: ["conflict", "competition", "clashing agendas"], rev: ["avoided conflict", "resolution", "inner discord"] },
    up: "Five staffs clash in an unordered tangle — competition, argument, five agendas with no conductor. Some friction forges; this kind exhausts. Compete cleanly or step out of the brawl.",
    rev: "Reversed, the clash settles — or goes underground: conflict avoided until it festers, differences resolved, or outer peace maintained while inner discord rages. Name the real argument.",
    yesNo: -1
  },
  {
    id: 55, name: "Six of Batons", figure: null, arcana: "batons", rank: 6, element: "Fire",
    keywords: { up: ["victory", "recognition", "pride"], rev: ["hollow win", "ego", "fall from grace"] },
    up: "The laurel-crowned rider passes a crowd of raised staves: public victory, earned recognition, the win shared with witnesses. Accept the applause with grace — you fought for this.",
    rev: "Reversed, the laurel wilts: a victory that tastes of nothing, recognition sought rather than earned, or pride preceding a tumble. Check whether you won the right battle.",
    yesNo: 2
  },
  {
    id: 56, name: "Seven of Batons", figure: null, arcana: "batons", rank: 7, element: "Fire",
    keywords: { up: ["standing ground", "conviction", "defending position"], rev: ["overwhelmed", "giving up ground", "paranoid defense"] },
    up: "One figure holds the high ground against six descending staves: conviction under pressure, the willingness to defend what was earned. Hold your position — the height is yours for the holding.",
    rev: "Reversed, the ground slips: overwhelmed by opposition, positions abandoned mid-fight, or defense turning paranoid. Choose which hills truly deserve you.",
    yesNo: 1
  },
  {
    id: 57, name: "Eight of Batons", figure: null, arcana: "batons", rank: 8, element: "Fire",
    keywords: { up: ["speed", "alignment", "messages in flight"], rev: ["delays", "scatter", "misaligned timing"] },
    up: "Eight staves fly in perfect parallel — everything accelerating at once, aligned and airborne. News arrives, travel snaps forward, the stuck thing unsticks. Act while the wind holds.",
    rev: "Reversed, the flight scatters: delays, misaligned timing, too many projectiles at once. Slow the barrage; aim one staff properly.",
    yesNo: 1
  },
  {
    id: 58, name: "Nine of Batons", figure: null, arcana: "batons", rank: 9, element: "Fire",
    keywords: { up: ["resilience", "last stand", "guardian stance"], rev: ["exhaustion", "unnecessary defense", "walls too high"] },
    up: "Wounded but standing, staff in hand, eight more behind him: the guardian of the final stretch. Resilience forged in prior battles. Hold on — you are sturdier than the siege.",
    rev: "Reversed, the guard collapses into exhaustion: battle fatigue mistaken for identity, defenses that now imprison, or the last stretch broken by stubborn pride. Rest is not surrender.",
    yesNo: 1
  },
  {
    id: 59, name: "Ten of Batons", figure: null, arcana: "batons", rank: 10, element: "Fire",
    keywords: { up: ["burden", "overload", "duty carried alone"], rev: ["letting go", "delegation", "dropped load"] },
    up: "Ten heavy staves carried alone toward a distant town: duty, overload, the load doubled by refusing help. The end is in sight — but put some staves down before you arrive, or you will reach it broken.",
    rev: "Reversed, the load is dropped or shared: burdens released, responsibility properly delegated, the exhausting 'shoulds' finally set down. You were never meant to carry all ten.",
    yesNo: -1
  },
  {
    id: 60, name: "Knave of Batons", figure: null, arcana: "batons", rank: 11, element: "Fire",
    keywords: { up: ["enthusiasm", "explorer", "sudden impulse"], rev: ["impulsiveness", "hot air", "abandoned projects"] },
    up: "A figure strides forward gripping a green staff, already looking ahead: enthusiasm in motion, the explorer's sudden 'let's go'. Follow the creative impulse — but carry it past the first excitement.",
    rev: "Reversed, the fire peters out: impulsiveness without follow-through, grand announcements, projects abandoned when novelty fades. Finish one thing before announcing the next.",
    yesNo: 1
  },
  {
    id: 61, name: "Knight of Batons", figure: "Apolino", arcana: "batons", rank: 12, element: "Fire",
    keywords: { up: ["passion", "adventure", "restless drive"], rev: ["scattered pursuit", "impatience", "burnout"] },
    up: "Apollonius rides where the wind points: passion, adventure, the appetite for the next horizon. The quest is genuine — but arrival will always bore this knight. Enjoy the ride without burning the map.",
    rev: "Reversed, the gallop scatters: projects started in flames and abandoned in ash, impatience, the fire consuming its own fuel. One quest. Finish it.",
    yesNo: 1
  },
  {
    id: 62, name: "Queen of Batons", figure: "Palas", arcana: "batons", rank: 13, element: "Fire",
    keywords: { up: ["warmth", "confidence", "fierce loyalty"], rev: ["jealousy", "domineering", "self-absorbed fire"] },
    up: "Pallas Athena — goddess of wise warfare — holds a sunflower like a torch: warmth, confidence, a fire that warms rather than burns. Fiercely loyal, magnetically alive, honest to the bone. Her counsel is direct and true.",
    rev: "Reversed, the flame scorches: jealousy, domineering heat, charisma weaponized, or confidence collapsing inward. Cool the forge before striking.",
    yesNo: 1
  },
  {
    id: 63, name: "King of Batons", figure: "Levio Plauto R.", arcana: "batons", rank: 14, element: "Fire",
    keywords: { up: ["visionary leader", "entrepreneur", "magnetic will"], rev: ["tyrannical will", "impatient mastery", "unfinished empire"] },
    up: "The king of fire rules by sheer force of vision: the entrepreneur, the commander, the one whose will bends rooms. Lead boldly — your enthusiasm is genuinely contagious. Vision first, then the campaign.",
    rev: "Reversed, vision turns tyrannical: will bulldozing others, impatience with human pace, an empire of ambition outpacing its foundations. The crown is heavy; rule with consent.",
    yesNo: 1
  },

  // ── Swords / Spade (Air) ────────────────────────────────────────────
  {
    id: 64, name: "Ace of Swords", figure: null, arcana: "swords", rank: 1, element: "Air",
    keywords: { up: ["clarity", "truth", "breakthrough"], rev: ["confusion", "misused intellect", "clouded judgment"] },
    up: "A sword crowned and raised from the cloud: the clean cut of clarity, truth grasped, a decision finally made. One sharp idea outweighs a hundred foggy ones. Cut through it.",
    rev: "Reversed, the blade turns dull: confusion dressed as argument, intellect used to defend rather than discover, a truth avoided. Sharpen the question before the answer.",
    yesNo: 1
  },
  {
    id: 65, name: "Two of Swords", figure: null, arcana: "swords", rank: 2, element: "Air",
    keywords: { up: ["stalemate", "blocked decision", "truce"], rev: ["information overload", "decision forced", "stalemate breaking"] },
    up: "Blindfolded, arms crossed, two swords held in perfect stalemate: a decision avoided by refusing to look. The stalemate is comfortable and costly. Remove the blindfold; one cut ends this.",
    rev: "Reversed, the deadlock breaks — often violently: pressure forces a choice long avoided, or information arrives that makes the decision trivial. Open your eyes; it was never truly balanced.",
    yesNo: 0
  },
  {
    id: 66, name: "Three of Swords", figure: null, arcana: "swords", rank: 3, element: "Air",
    keywords: { up: ["heartbreak", "truth that hurts", "sorrow"], rev: ["healing pain", "forgiveness", "pain released"] },
    up: "Three swords through a heart beneath a storm: the plain, unadorned card of sorrow. Betrayal, loss, a truth that wounds on its way in. It rains, it hurts, it passes. Do not pretend otherwise.",
    rev: "Reversed, the storm moves off: pain finally processed rather than clenched, forgiveness — of them or of yourself — becoming possible, scars turning to wisdom.",
    yesNo: -1
  },
  {
    id: 67, name: "Four of Swords", figure: null, arcana: "swords", rank: 4, element: "Air",
    keywords: { up: ["rest", "recovery", "strategic pause"], rev: ["restlessness", "burnout", "premature return"] },
    up: "The knight lies in repose, swords hung above: deliberate rest after battle, recovery as strategy. Stillness is not death — it is maintenance of the blade. Rest deliberately, with intent to return.",
    rev: "Reversed, rest refused: burnout disguised as dedication, a mind that cannot stop circling, or recovery cut short by impatience. The body keeps its own ledger.",
    yesNo: -1
  },
  {
    id: 68, name: "Five of Swords", figure: null, arcana: "swords", rank: 5, element: "Air",
    keywords: { up: ["hollow victory", "conflict", "self-interest"], rev: ["reconciliation", "walking away", "regret"] },
    up: "The smirking victor collects swords while the defeated walk away under a jagged sky: a win purchased at the wrong price. Choose your battles; some victories are losses wearing costumes.",
    rev: "Reversed, the war ends: reconciliation attempted, the grudge dropped, or the hollow victory finally admitted for what it was. Walking away is its own strength.",
    yesNo: -1
  },
  {
    id: 69, name: "Six of Swords", figure: null, arcana: "swords", rank: 6, element: "Air",
    keywords: { up: ["passage", "leaving trouble", "transition"], rev: ["stuck transition", "unfinished business", "resistance to change"] },
    up: "The ferryman poles toward calmer water, six swords standing in the boat: transition, rite of passage, the necessary crossing away from what hurt. The fare is grief; the destination is quieter water.",
    rev: "Reversed, the boat circles the dock: a transition stalled, baggage too heavy to leave, or movement without inner change. Decide to actually go.",
    yesNo: -1
  },
  {
    id: 70, name: "Seven of Swords", figure: null, arcana: "swords", rank: 7, element: "Air",
    keywords: { up: ["strategy", "deception", "the lone fox"], rev: ["exposure", "conscience", "returning what was taken"] },
    up: "The fox slips from the camp with five swords, leaving two: strategy, cunning, or outright theft — the card keeps its counsel. Act cleverly, but know whether you are strategist or thief. Sooner or later the count is done.",
    rev: "Reversed, the trickster trips: deception exposed, conscience returning, a scheme collapsing under its own cleverness. Come clean before someone counts for you.",
    yesNo: -1
  },
  {
    id: 71, name: "Eight of Swords", figure: null, arcana: "swords", rank: 8, element: "Air",
    keywords: { up: ["restriction", "mental trap", "powerlessness"], rev: ["release", "new perspective", "reclaiming agency"] },
    up: "Blindfolded and bound among eight standing swords, water at her feet: the prison is mostly made of story. Restriction is real; permanent entrapment is optional. The swords have gaps. So does the fear.",
    rev: "Reversed, the blindfold falls: the trap's construction becomes visible, agency reclaimed, a solution that was there all along finally seen. Free yourself with the first small act.",
    yesNo: -1
  },
  {
    id: 72, name: "Nine of Swords", figure: null, arcana: "swords", rank: 9, element: "Air",
    keywords: { up: ["anguish", "nightmare", "sleepless worry"], rev: ["dawn", "help accepted", "fear defused"] },
    up: "The sitter wakes at 3 a.m. with nine swords hung on the wall: anxiety at full volume, dread rehearsed past the point of use. The nightmare is real; the monster is almost always smaller than the dark made it.",
    rev: "Reversed, morning comes: the anxiety breaks, perspective returns, professional or friendly help finally accepted. What kept you awake was fear of the fear.",
    yesNo: -1
  },
  {
    id: 73, name: "Ten of Swords", figure: null, arcana: "swords", rank: 10, element: "Air",
    keywords: { up: ["rock bottom", "betrayal", "dramatic ending"], rev: ["slow recovery", "refusing the victim story", "regeneration"] },
    up: "Face down, ten swords in the back, dawn already lighting the horizon: the absolute end, the worst that was going to happen having happened. It cannot get darker than this — and the light in the card proves it. The only way is up.",
    rev: "Reversed, the recovery begins: rising from the wreckage, refusing the permanent victim story, regeneration after total collapse. Surviving is its own victory.",
    yesNo: -2
  },
  {
    id: 74, name: "Knave of Swords", figure: null, arcana: "swords", rank: 11, element: "Air",
    keywords: { up: ["curious mind", "quick study", "sharp speech"], rev: ["gossip", "hasty judgment", "unfocused mind"] },
    up: "A youthful figure strides into wind with a raised sword: the hungry mind, sharp-tongued and quick to learn. Ask the impertinent question. Cut through what the adults have agreed not to notice.",
    rev: "Reversed, the blade nips: gossip, hasty verdicts, opinions issued before facts arrive, a mind too scattered to finish a thought. Think once more before speaking once.",
    yesNo: 0
  },
  {
    id: 75, name: "Knight of Swords", figure: "Amone", arcana: "swords", rank: 12, element: "Air",
    keywords: { up: ["headlong action", "intellectual fury", "crusade"], rev: ["reckless words", "brutish force", "burned bridges"] },
    up: "Amun's knight charges into the clouds, sword first: the crusader of pure intellect and untempered speed. Brilliant, necessary — in short bursts. Charge, but leave a line of retreat.",
    rev: "Reversed, the charge becomes a wreck: words used as weapons, crusades against phantoms, bridges burned for the pleasure of the burn. Aim before charging.",
    yesNo: -1
  },
  {
    id: 76, name: "Queen of Swords", figure: "Olinpia", arcana: "swords", rank: 13, element: "Air",
    keywords: { up: ["clear judgment", "honesty", "independence"], rev: ["coldness", "bitterness", "overcritical mind"] },
    up: "Olympias — mother of Alexander, sorceress and survivor — raises her sword with one open hand: clear judgment born of hard experience. Honesty without cruelty, boundaries without apology. She sees through it. Ask her.",
    rev: "Reversed, the blade ices over: bitterness mistaken for honesty, criticism wielded instead of truth, independence hardened into isolation. The sword was for cutting truth, not people.",
    yesNo: 1
  },
  {
    id: 77, name: "King of Swords", figure: "Alecxandro M.", arcana: "swords", rank: 14, element: "Air",
    keywords: { up: ["authority of mind", "law", "ethical power"], rev: ["tyranny of logic", "corruption", "cold decree"] },
    up: "Alexander the Great — philosopher-king, student of Aristotle, initiator of empires — sits as mastery of the mind: just authority, strategic brilliance, power bound to principle. Rule by reason; let wisdom hold the sword.",
    rev: "Reversed, reason corrupts: power without ethics, logic used to justify cruelty, an intellect that has lost its humanity. The mind without a heart builds cold empires.",
    yesNo: 1
  }
];

// Position framings for multi-card spreads
const POSITIONS = {
  past: {
    label: "I · The Past",
    title: "Roots of the Matter",
    frame: "What shaped this situation before you noticed it — the soil, the inheritance, the thing still quietly at work:"
  },
  present: {
    label: "II · The Present",
    title: "Where You Stand",
    frame: "The living heart of the matter right now — the energy to meet head-on:"
  },
  future: {
    label: "III · The Future",
    title: "Where This Leads",
    frame: "The direction things are moving if the present course holds — a tendency, not a sentence:"
  },
  daily: {
    label: "Your Card for Today",
    title: "Today's Arcanum",
    frame: "The single arcanum the deck offers for this day — carry it as a lens on whatever arrives:"
  },
  yesno: {
    label: "The Verdict",
    title: "The Cards Speak",
    frame: "One card drawn in answer — read it plainly:"
  }
};

if (typeof window !== "undefined") {
  window.CARDS = CARDS;
  window.POSITIONS = POSITIONS;
}
