This repository defines a Foundry module providing utility functions for the Witchlight Carnival chapter of the Wild Beyond The Witchlight D&amp;D 5e adventure.

## Installation


You can install the module by specifying the manifest URL `https://raw.githubusercontent.com/brouberol/wild-beyond-the-witchlight-foundry/main/module.json` in the Foundry installation menu.

<img width="722" alt="Screenshot 2023-04-15 at 19 55 57" src="https://user-images.githubusercontent.com/480131/232245540-1ffbc082-04cb-4a99-84d2-f638d022610a.png">

## What you get


This module defines Compendium packs that can be added to the appropriate Foundry menu by dragging and dropping the from the Compendium list.

### Scene
The module includes a `Witchlight Carnival` scene, with preconfigured tokens to mark the time and current mood, a carnival ticket image that can be made visible to players once they enter, as well as ticket punches tokens that can be made visible to players once they visit a carnival stand.

| Time tracker | Mood tracker |
|--------------|--------------|
| <img width="100%" alt="Screenshot 2023-04-15 at 19 35 27" src="https://user-images.githubusercontent.com/480131/232245026-249b0965-32e7-4711-9aa9-ec962b30921b.png">|  <img width="100%" alt="Screenshot 2023-04-15 at 19 36 03" src="https://user-images.githubusercontent.com/480131/232245034-152b65d9-fa46-496a-bb37-fc66faaad3d3.png"> |


### Macros
The module defines 4 macros:
- `Increase mood`: increase the mood by 1 by moving the mood tracker on the board
- `Decrease mood`: decrease the mood by 1 by moving the mood tracker on the board
- `Advance time`: advance the time marker by one on the board
- `Punch ticket`: punch the ticket by revealing the next invisible ticket punch token on the board

<img width="100%" alt="Screenshot 2023-04-15 at 19 34 56" src="https://user-images.githubusercontent.com/480131/232245137-67377aea-b7f2-49f9-b63e-9aad9e84aaa7.png">


### Playlists
The module defines 4 playlists (⚠️ these playlists do _not_ contain any sound! It is up to you to add the ambiances you like to each of the playlists). The main idea behind these playlists is that they get automatically played when the mood changes.

- `Witchlight Carnival - Dangerous`: automatically played when the mood tracker goes to -4
- `Witchlight Carnival - Creepy`: automatically played when the mood tracker goes between -3 and -1 (included)
- `Witchlight Carnival - Neutral`: automatically played when the mood tracker goes between 0 and 1 (included)
- `Witchlight Carnival - Joyous`: automatically played when the mood tracker goes beyond 2
