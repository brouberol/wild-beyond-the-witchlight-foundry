

const MODULE_ID = 'witchlight-carnival-utils'

// We assume the carnival scene is using https://5e.tools/img/adventure/WBtW/015-map-1.1.jpg
// as background image, in its original size.

// x/y coordinates, in px, of the 9 mood tracker circles, on which we will
// move the mood marker tile when increasing/decreasing the carnival mood.
const moodTokenCoordinates = {
  '-4': [5227, 4513],
  '-3': [5278, 4258],
  '-2': [5364, 4016],
  '-1': [5497, 3792],
  '0':  [5660, 3596],
  '1':  [5858, 3430],
  '2':  [6085, 3302],
  '3':  [6327, 3211],
  '4':  [6581, 3169],
};

// x/y coordinates, in px, of the 8 time tracker circles, on which we will
// move the time marker tile when advancing the time.
const timeTokenCoordinates = {
  '1': [175, 1467],
  '2': [455, 1410],
  '3': [722, 1304],
  '4': [955, 1148],
  '5': [1160, 946],
  '6': [1320, 706],
  '7': [1427, 445],
  '8': [1483, 168],
};


const DANGEROUS_MOOD_PLAYLIST = 'Witchlight Carnival - Dangerous';
const CREEPY_MOOD_PLAYLIST = 'Witchlight Carnival - Creepy';
const NEUTRAL_MOOD_PLAYLIST = 'Witchlight Carnival - Neutral';
const HYPE_MOOD_PLAYLIST = 'Witchlight Carnival - Joyous';
const TIME_AND_MOOD_MARKER_TILE_NAME = "token_circle.png"
const TICKET_PUNCH_TILE_NAME = "black-circle.png"


// the time tracker tile is the one located on the top left of the sceene
function findTimeTrackerTile(scene) {
  var minTileXCoordinate = 10000;
  var timeTrackerTile = null;
  scene.collections.tiles.filter((tile) => tile.texture.src.endsWith(TIME_AND_MOOD_MARKER_TILE_NAME)).forEach((tile) => {
      if (tile.x < minTileXCoordinate) {
          minTileXCoordinate = tile.x;
          timeTrackerTile = tile;
      }
  });
  return timeTrackerTile;
}

function updateTimeTrackerTilePosition(timeTrackerTile, time) {
  const timeCoordinates = timeTokenCoordinates[time.toString()];
  timeTrackerTile.update({x: timeCoordinates[0], y: timeCoordinates[1]});
}

function getTime(scene) {
  if (scene.flags.time === undefined){
      setTime(scene, 0);
      return 0;

  }
  return scene.flags.time;
}

function setTime(scene, time) {
  scene.update({flags: {"time": time}});
}

function advanceTime(scene) {
  var time = getTime(scene);
  var timeTrackerTile = findTimeTrackerTile(scene);
  if (time == 8) {
      time = 1
  } else {
      time = time + 1;
  }
  updateTimeTrackerTilePosition(timeTrackerTile, time);
  setTime(scene, time);
}

// the mood tracker tile is the one located on the bottom right of the sceene
function findMoodTrackerTile(scene) {
  var maxTileXCoordinate = 0;
  var moodTrackerTile = null;
  scene.collections.tiles.filter((tile) => tile.texture.src.endsWith(TIME_AND_MOOD_MARKER_TILE_NAME)).forEach((tile) => {
      if (tile.x > maxTileXCoordinate) {
          maxTileXCoordinate = tile.x;
          moodTrackerTile = tile;
      }
  });
  return moodTrackerTile;
}

function updateMoodTrackerTilePosition(moodTrackerTile, mood) {
  const moodCoordinates = moodTokenCoordinates[mood.toString()];
  moodTrackerTile.update({x: moodCoordinates[0], y: moodCoordinates[1]});
}

function getMood(scene) {
  if (scene.flags.mood === undefined){
      setMood(scene, 0);
      return 0;

  }
  return scene.flags.mood;
}

function setMood(scene, mood) {
  scene.update({flags: {"mood": mood}});
  startPlaylistForMood(mood);
}

function fadeInPlaylist(playlist, fadeDuration) {
  playlist.playAll().then(function(p) {
      let globalVol = game.settings.get("core", "globalPlaylistVolume");
      p.sounds.filter(s => s.playing).find(_ => true)
          .sound
          .fade(globalVol, { duration: fadeDuration, from: 0});
  });
}

function fadeOutPlaylist(playlist, fadeDuration) {
  if (!playlist.playing) return;
  let playingSound = playlist.sounds.filter(s => s.playing).find(_ => true).sound;
  if (!!!playingSound) return; // should not happen
  let currVol = playingSound.volume;
  let globalVol = game.settings.get("core", "globalPlaylistVolume");
  if (currVol == 0) return;
  playingSound.fade(0, { duration: fadeDuration, from: currVol})
  setTimeout(() => playlist.stopAll(), fadeDuration);
  return;
}

function startPlaylist(name) {
  if (game.playlists.playing.length > 0) {
      var playingPlaylist = game.playlists.playing[0];
      if (playingPlaylist.name == name) {
          return
      } else {
          fadeOutPlaylist(playingPlaylist, 5000);
      }
  }
  var playlistToStart = game.playlists.find((p) => p.name === name);
  fadeInPlaylist(playlistToStart, 5000);
}

function startPlaylistForMood(mood) {
  if (mood == -4) {
      startPlaylist(DANGEROUS_MOOD_PLAYLIST);
  } else if (mood < -1) {
      startPlaylist(CREEPY_MOOD_PLAYLIST);
  } else if (mood < 2) {
      startPlaylist(NEUTRAL_MOOD_PLAYLIST);
  } else {
      startPlaylist(HYPE_MOOD_PLAYLIST);
  }
}

function increaseMood(scene) {
  var mood = getMood(scene);
  var moodTrackerTile = findMoodTrackerTile(scene);
  if (mood < 4) {
      mood = mood + 1;
      updateMoodTrackerTilePosition(moodTrackerTile, mood);
      setMood(scene, mood);
  }
}

function decreaseMood(scene) {
  var mood = getMood(scene);
  var moodTrackerTile = findMoodTrackerTile(scene);
  if (mood > -4) {
      mood = mood - 1;
      updateMoodTrackerTilePosition(moodTrackerTile, mood);
      setMood(scene, mood);
  }
}

function findNextInvisibleTicketPunchTile(scene) {
  var hiddenTiles = [];
  var tiles = scene.tiles.filter((tile) => tile.texture.src.endsWith(TICKET_PUNCH_TILE_NAME));
  tiles.forEach((tile) => {
    if (tile.hidden) {
      hiddenTiles.push(tile);
    }
  })
  if (!hiddenTiles) {
    return;
  }
  var hiddenTilesByAscendingX = hiddenTiles.sort((a, b) => {
    return b.x < a.x ? 1 :
      b.x > a.x ? -1 :
      0;
  });
  return hiddenTilesByAscendingX[0];
}

function punchTicket(scene) {
  var tile = findNextInvisibleTicketPunchTile(scene);
  if (tile) {
    tile.update({
      hidden: false
    });
  }
}

class WildBeyondTheWitchLightCarnival {

  static increaseCarnivalMood(scene) {
    increaseMood(scene);
  }

  static decreaseCarnivalMood(scene) {
    decreaseMood(scene);
  }

  static advanceTime(scene) {
    advanceTime(scene);
  }

  static punchTicket(scene) {
    punchTicket(scene);
  }
}

Hooks.on('init', function () {
  game.modules.get(MODULE_ID).api = {
    increaseCarnivalMood: WildBeyondTheWitchLightCarnival.increaseCarnivalMood,
    decreaseCarnivalMood: WildBeyondTheWitchLightCarnival.decreaseCarnivalMood,
    advanceTime: WildBeyondTheWitchLightCarnival.advanceTime,
    punchTicket: WildBeyondTheWitchLightCarnival.punchTicket,
  };
  Hooks.callAll('witchLightCarnivalUtilsReady', game.modules.get(MODULE_ID).api);
})
