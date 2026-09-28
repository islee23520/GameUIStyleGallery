const row = (id, label, surface, summary, regions, actions, status = "ready") => ({ id, label, surface, summary, regions, actions, status });

export const strategyGames = {
  "crusader-kings-iii": {
    title: "Crusader Kings III",
    short: "Dynasty and character-led grand strategy",
    intro: "A locally authored PC-first interface study: the realm stays in view while a character, council, event, or war task owns the detail pane.",
    initial: "realm",
    sources: [
      ["Crusader Kings III official overview", "https://www.paradoxinteractive.com/games/crusader-kings-iii/about"],
      ["CK3 console UI design diary (contrast to PC)", "https://www.paradoxinteractive.com/games/crusader-kings-iii/news/ck3-console-dev-diary-3-uiux-and-controls"],
    ],
    states: [
      row("realm", "Realm overview", "campaign", "Review domain, succession risks, decisions, and current resources without covering the map.", ["Time and resource strip", "Political map", "Realm status", "Outliner", "Alerts"], ["Inspect character", "Open council", "Open dynasty"]),
      row("character", "Character selected", "campaign", "Inspect traits, relationships, claims, and possible interactions for one selected ruler.", ["Political map", "Character portrait placeholder", "Traits and relations", "Claims", "Action list"], ["Inspect realm", "Start scheme", "Close selection"]),
      row("council", "Council management", "management", "Assign a task while retaining geographic context and seeing progress and tradeoffs.", ["Political map", "Council role list", "Assigned task", "Progress", "Expected effect"], ["Change task", "Inspect character", "Return to map"]),
      row("scheme", "Scheme progress", "management", "Compare the proposed action, participants, progress, risk, and cancellation path.", ["Political map", "Target summary", "Participant list", "Progress", "Risk notes"], ["Confirm plan", "Review risk", "Cancel"]),
      row("dynasty", "Dynasty and succession", "management", "Trace heir order and title distribution before a decision changes succession.", ["Lineage diagram", "Current ruler", "Heir sequence", "Title outcomes", "Warnings"], ["Inspect heir", "Review title", "Return"]),
      row("event", "Event decision", "modal", "Present a narrative choice above the paused campaign with consequences visible before confirmation.", ["Dimmed campaign map", "Narrative text", "Choice A", "Choice B", "Outcome preview"], ["Choose A", "Choose B", "Back"]),
      row("war", "War planning", "management", "Compare claim, target, army readiness, cost, and likely consequences.", ["Political map", "Target realm", "War goal", "Army readiness", "Cost and risk"], ["Review claim", "Declare war", "Cancel"]),
      row("confirm", "War confirmation", "modal", "Make the irreversible action explicit with a safe cancel and a clear scope of change.", ["Dimmed campaign map", "War goal summary", "Risk summary", "Cancel", "Confirm declaration"], ["Cancel", "Confirm declaration"]),
      row("loading", "Loading realm", "system", "Signal that the campaign context is changing without showing stale decision controls.", ["Campaign silhouette", "Loading label", "Progress indicator"], ["Wait"], "loading"),
      row("empty", "No available council task", "management", "Explain why the filtered task list is empty and offer a path back.", ["Council role list", "Empty explanation", "Reset filters"], ["Reset filters", "Return to map"], "empty"),
      row("error", "Action unavailable", "system", "Keep the last valid campaign state and show a recoverable explanation.", ["Campaign silhouette", "Error explanation", "Retry", "Return"], ["Retry", "Return"], "error"),
    ],
  },
  "total-war-warhammer-iii": {
    title: "Total War: WARHAMMER III",
    short: "Turn-based campaign and real-time battle",
    intro: "A locally authored PC-first split between campaign management and the separate battle command shell; neither is a tracing of shipped art or coordinates.",
    initial: "campaign",
    sources: [
      ["Total War: WARHAMMER III official game", "https://www.totalwar.com/games/total-war-warhammer-iii/total-war-warhammer-iii"],
      ["Total War: PHARAOH campaign and battle overview", "https://www.totalwar.com/games/total-war-pharaoh/total-war-pharaoh"],
    ],
    states: [
      row("campaign", "Campaign overview", "campaign", "Review faction resources, territory, armies, turn order, and alerts without losing the map.", ["Faction resource strip", "Campaign map", "Army outliner", "Event alerts", "End turn"], ["Select settlement", "Select army", "End turn"]),
      row("settlement", "Settlement selected", "campaign", "Inspect province effects, building choices, construction queue, and growth tradeoffs.", ["Campaign map", "Settlement summary", "Building slots", "Construction queue", "Cost preview"], ["Choose building", "Review province", "Close"]),
      row("army", "Army selected", "campaign", "Keep the army position visible while inspecting unit composition, movement, and recruitment.", ["Campaign map", "Commander summary", "Unit roster", "Movement", "Recruitment queue"], ["Recruit unit", "Inspect unit", "Close"]),
      row("diplomacy", "Diplomacy negotiation", "management", "Compare the terms of an offer and the response before applying it.", ["Faction list", "Relationship context", "Offer terms", "Response preview", "Confirm"], ["Edit offer", "Confirm", "Back"]),
      row("recruitment", "Recruitment queue", "management", "Compare unit role, upkeep, turn cost, capacity, and the queue before committing.", ["Campaign map", "Available units", "Unit details", "Queue", "Cost and turns"], ["Add unit", "Remove unit", "Return"]),
      row("end-turn", "End-turn processing", "system", "Hold the last valid campaign view, mark progress, and prevent duplicate turn submission.", ["Campaign silhouette", "Turn progress", "Processing faction", "Cancel disabled"], ["Wait"], "loading"),
      row("deployment", "Battle deployment", "battle", "Stage army positions, unit roles, formations, and a deliberate start action.", ["Battlefield", "Deployment boundary", "Unit cards", "Formation tools", "Start battle"], ["Select unit", "Change formation", "Start battle"]),
      row("battle", "Live battle", "battle", "Keep battlefield movement visible with unit cards and a compact command/ability strip.", ["Battlefield", "Unit roster", "Selected unit", "Ability strip", "Battle clock"], ["Select unit", "Open ability", "Pause battle"]),
      row("ability", "Ability targeting", "battle", "Show the target area and cost without losing the selected unit or command context.", ["Battlefield", "Selected unit", "Target preview", "Ability detail", "Cancel target"], ["Confirm target", "Cancel target"]),
      row("pause", "Tactical pause", "modal", "Make the halted simulation and the safe resume action obvious.", ["Dimmed battlefield", "Pause status", "Controls", "Resume"], ["Resume", "Settings", "Quit battle"]),
      row("result", "Battle result", "result", "Summarize losses, unit status, rewards, and the return to campaign.", ["Outcome heading", "Loss summary", "Unit roster", "Rewards", "Return"], ["Inspect losses", "Return to campaign"]),
      row("confirm", "Quit battle confirmation", "modal", "State what leaving loses and make cancel the safe initial choice.", ["Dimmed battlefield", "Consequence", "Cancel", "Quit battle"], ["Cancel", "Quit battle"]),
      row("loading", "Loading battle", "system", "Show the campaign-to-battle handoff and prevent stale campaign clicks.", ["Campaign silhouette", "Loading label", "Progress indicator"], ["Wait"], "loading"),
      row("empty", "No recruitment available", "management", "Explain unavailable unit choices and provide the requirement to unlock them.", ["Recruitment list", "Empty explanation", "Requirements", "Return"], ["View requirements", "Return"], "empty"),
      row("error", "Command unavailable", "system", "Retain the last valid battle or campaign selection with an actionable message.", ["Last valid shell", "Error explanation", "Retry", "Return"], ["Retry", "Return"], "error"),
    ],
  },
};

export const strategyGameSlugs = Object.keys(strategyGames);
