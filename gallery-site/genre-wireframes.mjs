const box = (label, x, y, w, h, kind = "panel") => ({ label, x, y, w, h, kind });

export const genreWireframes = {
  fps: [box("Clear aim", 42, 38, 16, 24, "aim"), box("Boss / encounter", 20, 5, 60, 5, "bar"), box("Health", 4, 82, 23, 7, "bar"), box("Weapon", 4, 91, 23, 5), box("Score / style", 75, 30, 21, 25)],
  strategy: [box("Turn / wave", 38, 4, 24, 7), box("Board", 19, 14, 62, 66, "world"), box("Context action", 77, 28, 20, 28), box("Resources", 20, 86, 60, 9, "bar")],
  rpg: [box("Narrative / objective", 5, 5, 32, 14), box("World / character", 27, 24, 46, 48, "world"), box("Status", 4, 82, 22, 8, "bar"), box("Actions", 32, 84, 40, 10), box("Optional dialog", 75, 30, 22, 40)],
  racing: [box("Timer", 4, 5, 20, 8), box("Track and vehicle", 19, 15, 62, 64, "world"), box("Position / lap", 77, 5, 20, 13), box("Progress", 25, 88, 50, 5, "bar")],
  platformer: [box("Stage", 38, 4, 24, 8), box("Playfield", 5, 16, 90, 70, "world"), box("Dialogue when needed", 18, 64, 64, 19)],
  fighting: [box("Player 1", 4, 5, 37, 7, "bar"), box("Round", 44, 4, 12, 9), box("Player 2", 59, 5, 37, 7, "bar"), box("Arena", 8, 21, 84, 65, "world"), box("Result state", 35, 38, 30, 15)],
  "card-game": [box("Opponent", 35, 4, 30, 12), box("Board", 15, 20, 70, 48, "world"), box("Status", 3, 38, 12, 18), box("Turn action", 85, 38, 12, 18), box("Hand", 19, 77, 62, 18)],
  simulation: [box("World", 7, 12, 64, 75, "world"), box("Context tools", 73, 12, 23, 55), box("Status", 30, 3, 40, 7), box("Action rail", 25, 88, 50, 9)],
  adventure: [box("Environment", 5, 8, 90, 76, "world"), box("Context prompt", 39, 61, 22, 8), box("Dialogue state", 17, 78, 66, 17)],
  music: [box("Judgement", 38, 6, 24, 9), box("Note lane", 30, 18, 40, 73, "world"), box("Performance", 13, 86, 74, 7, "bar")],
  sport: [box("Score", 34, 4, 32, 9), box("Playfield", 5, 19, 90, 68, "world"), box("Event state", 35, 41, 30, 12)],
  mmo: [box("Quest / party", 3, 10, 25, 38), box("World", 30, 12, 48, 62, "world"), box("Communication", 4, 70, 33, 22), box("Status / actions", 39, 82, 40, 12), box("Optional detail", 80, 15, 17, 46)],
  action: [box("Arena / world", 7, 14, 86, 65, "world"), box("Status if needed", 4, 81, 27, 8, "bar"), box("Context action", 70, 79, 26, 12)],
  indie: [box("Choose a genre grammar first", 19, 21, 62, 59, "world")],
  survival: [box("Environment", 5, 9, 90, 78, "world"), box("Optional need / resource", 4, 86, 34, 7, "bar")],
  "visual-novel": [box("Character / scene", 16, 8, 68, 56, "world"), box("Speaker and dialogue", 6, 68, 88, 25), box("Choice state", 63, 27, 28, 30)],
};

export const inputTargetWireframes = {
  "mouse-keyboard": [box("World or primary task", 3, 8, 70, 77, "world"), box("Pointer detail", 76, 10, 21, 57), box("Hotkeys", 18, 87, 64, 9)],
  "controller-tv": [box("Readable task", 9, 11, 82, 66, "world"), box("Focused action", 32, 79, 36, 9), box("Confirm / back", 15, 91, 70, 5)],
  handheld: [box("Reflowed task", 14, 12, 72, 64, "world"), box("Focused action", 25, 78, 50, 10), box("Text input / controls", 18, 91, 64, 6)],
  "touch-mobile": [box("Safe play area", 18, 8, 64, 57, "world"), box("Left thumb", 5, 66, 30, 29), box("Right thumb", 65, 66, 30, 29)],
};
