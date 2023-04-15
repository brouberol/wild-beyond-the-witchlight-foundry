This repository defines a Foundry module providing utility functions for the Witchlight Carnival chapter of the Wild Beyond The Witchlight D&amp;D 5e adventure.

## Installation

You can install the module by specifying the manifest URL `https://raw.githubusercontent.com/brouberol/wild-beyond-the-witchlight-foundry/main/module.json` in the Foundry installation menu.

## What you get
### Map
The module includes a `Witchlight Carnival` scene, with preconfigured tokens to mark the time and current mood, a carnival ticket image that can be made visible to players once they enter, as well as ticket punches tokens that can be made visible to players once they visit a carnival stand.

### Macros
The module defines 4 macros:
- `Increase mood`: increase the mood by 1 by moving the mood tracker on the board
- `Decrease mood`: decrease the mood by 1 by moving the mood tracker on the board
- `Advance time`: advance the time marker by one on the board
- `Punch ticket`: punch the ticket by revealing the next invisible ticket punch token on the board

### Playlists
The module defines 4 playlists (:warn: these playlists do _not_ contain any sound! It is up to you to add the ambiances you like to each of the playlists)

- `Witchlight Carnival - Dangerous`: automatically played when the mood tracker goes to -4
- `Witchlight Carnival - Creepy`: automatically played when the mood tracker goes between -3 and -1 (included)
- `Witchlight Carnival - Neutral`: automatically played when the mood tracker goes between 0 and 1 (included)
- `Witchlight Carnival - Joyous`: automatically played when the mood tracker goes beyond 2
