// Wants:
// Graph session stats over time 

const timelines = ["Wood", "Iron Pickaxe", "Nether", "Bastion", "Fortress", "Nether Exit", "Stronghold", "End"]

const hmsToMs = (h, m, s) => h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000
const timeToMs = time => time.length > 0 ? hmsToMs(...time.split(":")) : 0
const isNewSession = (prev, curr, breakTime) => prev - curr - breakTime > (1000 * 60 * 60)
const isPncakeTracker = item => "Session Marker" in item

const processLinePlotData = (data, step) => {
  if (data.length === 0) {
    return []
  }
  const distData = []
  const sortedData = [...data].sort((a, b) => a - b);
  const start = 30000
  const end = sortedData[Math.trunc(sortedData.length * 0.98)]
  const dataRange = Array.from(Array(Math.ceil((end - start) / step)).keys(), (i) => start + i * step)
  dataRange.forEach((num, idx) => {
    const index = sortedData.findIndex((element) => element >= num)
    const count1 = index !== -1 ? index : sortedData.length
    distData.push({time: num, count: count1})
  })
  return distData
}

// Blinds per hour (preBlindCount / (preBlindRTA / 1000 / 60 / 60))
const bph = item => {
  const preBlindRTA = timeToMs(item["Nether Exit"].length > 0 ? item["Nether Exit"] : item["RTA"]) + timeToMs(item["RTA Since Prev"])
  const preBlindCount = item["Nether Exit"].length > 0
  return [preBlindRTA, preBlindCount]
}

// Total playtime
const tp = item => {
  return timeToMs(item["RTA Since Prev"]) + timeToMs(item["RTA"])
}

// Time spent in overworld
const owTime = item => {
  return timeToMs(item["Nether"].length > 0 ? item["Nether"] : item["RTA"]) + timeToMs(item["RTA Since Prev"])
}

// Time spent on wall
const wallTime = item => {
  if (isPncakeTracker(item)) {
    return timeToMs(item["Wall Time Since Prev"])
  } else {
    return null
  }
}

// Time spent in nether
const netherTime = item => {
  return tp(item) - owTime(item)
}

// Seeds played
const sp = item => {
  return parseInt(item["Played Since Prev"]) + 1
}

// Reset count
const rc = item => {
  return parseInt(item["Wall Resets Since Prev"]) + parseInt(item["Played Since Prev"]) + 1
}

// Enter type analysis
const et = (item, types) => {
  if (item["Enter Type"] !== "None" && item["Nether"]) {
    if (!types.hasOwnProperty(item["Enter Type"]))
      types[item["Enter Type"]] = {total: 0, sum: 0}
    types[item["Enter Type"]].total += 1
    types[item["Enter Type"]].sum += timeToMs(item["Nether"])
  }
}

// Biome Type nether enter analysis
const bt = (item, types) => {
  if (item["Nether"]) {
    for (let type in types) {
      if (item["Spawn Biome"].includes(type)) {
        types[type].total += 1
        types[type].sum += timeToMs(item["Nether"])
        return
      }
    }
    types["other"].total += 1
    types["other"].sum += timeToMs(item["Nether"])
  }
}

// Iron Type nether enter analysis
const it = (item, types) => {
  if (item["Nether"]) {
    for (let type in types) {
      if (item["Iron Source"] === type) {
        types[type].total += 1
        types[type].sum += timeToMs(item["Nether"])
        return
      }
    }
    types["other"].total += 1
    types["other"].sum += timeToMs(item["Nether"])
  }
}

const ei = (item, types) => {
  if (item["Nether"]) {
    for (let ironType in types) {
      if (item["Iron Source"] === ironType) {
        for (let enterType in types[ironType]) {
          if (item["Enter Type"] === enterType) {
            types[ironType][enterType].total += 1
            types[ironType][enterType].sum += timeToMs(item["Nether"])
            return
          }
        }
      }
    }
    for (let enterType in types["other"]) {
      if (item["Enter Type"] === enterType) {
        types["other"][enterType].total += 1
        types["other"][enterType].sum += timeToMs(item["Nether"])
        return
      }
    }
  }
}

// Does all operations
export const doAllOps = (data, keepSessions=[]) => {
  const currTimeline = {}
  // Initalize 
  let [enterTypes, enterDist, resetCount, timePlayed, seedsPlayed, owRTA, preBlindRTA, preBlindCount] = [{}, [], 0, 0, 0, 0, 0, 0]
  
  let biomeTypes = {
    "beach": {total: 0, sum: 0},
    "forest": {total: 0, sum: 0},
    "plains": {total: 0, sum: 0},
    "other": {total: 0, sum: 0}
  }

  let ironTypes = {
    "Buried Treasure w/ tnt": {total: 0, sum: 0},
    "Buried Treasure": {total: 0, sum: 0},
    "Full Shipwreck": {total: 0, sum: 0},
    "Half Shipwreck": {total: 0, sum: 0},
    "Village": {total: 0, sum: 0},
    "other": {total: 0, sum: 0},
  }

  let enterInfo = {
    "Buried Treasure w/ tnt": null,
    "Buried Treasure": null,
    "Full Shipwreck": null,
    "Half Shipwreck": null,
    "Village": null,
    "other": null,
  }

  for (let ironType in enterInfo) {
    enterInfo[ironType] = {
      "Magma Ravine": {total: 0, sum: 0},
      "Lava Pool": {total: 0, sum: 0},
      "Bucketless": {total: 0, sum: 0},
      "Obsidian": {total: 0, sum: 0}
    }
  }

  
  let [wallRTA, netherRTA] = [0, 0]
  
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    // Determine if this is valid for the session
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    
    let lastTime = 0
    timelines.forEach((tItem, idx) => {
      if (item[tItem].length > 0) {
        if (!currTimeline.hasOwnProperty(tItem))
          currTimeline[tItem] = {total: 0, sum: 0, relativeTotal: 0, relativeSum: 0}
        // Nether Dist Stuff
        if (tItem === "Nether") {
          if (timeToMs(item["Nether"]) > 0) {
            enterDist.push(timeToMs(item["Nether"]))
          }
        }
        // Do structure 1, structure 2
        if (tItem === "Bastion") {
          if (!currTimeline.hasOwnProperty("Bastion"))
            currTimeline["Bastion"] = {total: 0, sum: 0, relativeTotal: 0, relativeSum: 0}
          if (!currTimeline.hasOwnProperty("Fortress"))
            currTimeline["Fortress"] = {total: 0, sum: 0, relativeTotal: 0, relativeSum: 0}
          const bastTime = timeToMs(item["Bastion"])
          const fortTime = timeToMs(item["Fortress"])
          // For simplicity, bastion = structure 1, fortress = structure 2
          if (bastTime > 0 && fortTime > 0) {
            // Both structures
            currTimeline["Bastion"].total++
            currTimeline["Fortress"].total++
            currTimeline["Bastion"].sum += Math.min(bastTime, fortTime)
            currTimeline["Fortress"].sum += Math.max(bastTime, fortTime)
            currTimeline["Bastion"].relativeTotal++
            currTimeline["Fortress"].relativeTotal++
            currTimeline["Bastion"].relativeSum += Math.min(bastTime, fortTime) - lastTime
            currTimeline["Fortress"].relativeSum += Math.abs(fortTime - bastTime)
          } else if (bastTime > 0) {
            // Just bastion
            currTimeline["Bastion"].total++
            currTimeline["Bastion"].sum += bastTime
            currTimeline["Bastion"].relativeSum += bastTime - lastTime
            currTimeline["Bastion"].relativeTotal++
          } else if (fortTime > 0) {
            // Just fortress
            currTimeline["Bastion"].total++
            currTimeline["Bastion"].sum += fortTime
          }
        } else if (tItem != "Fortress") {
          currTimeline[tItem].total += 1
          currTimeline[tItem].sum += timeToMs(item[tItem])
          if (idx !== 0) {
            currTimeline[tItem].relativeSum += timeToMs(item[tItem]) - lastTime
            currTimeline[tItem].relativeTotal++
          }
        }
        lastTime = timeToMs(item[tItem])
      }
    })
    
    // Data operations
    et(item, enterTypes)
    bt(item, biomeTypes)
    it(item, ironTypes)
    ei(item, enterInfo)
    resetCount += rc(item)
    timePlayed += tp(item)
    seedsPlayed += sp(item)
    owRTA += owTime(item)
    netherRTA += netherTime(item)
    const bphData = bph(item)
    preBlindRTA += bphData[0]
    preBlindCount += bphData[1]
    if (isPncakeTracker(data[0])) {
      wallRTA += wallTime(item)
    }
  })

  // Average out all the data
  const finalTimeline = []
  timelines.forEach(tItem => {
    if (!currTimeline.hasOwnProperty(tItem))
      finalTimeline.push({time: 0, total: 0, tsp: 0})
    else
      finalTimeline.push({
        time: currTimeline[tItem].sum / currTimeline[tItem].total,
        total: currTimeline[tItem].total,
        tsp: currTimeline[tItem].relativeSum / currTimeline[tItem].relativeTotal
      })
  })

  const ops = {
    ot: owRTA,
    nt: netherRTA,
    nd: processLinePlotData(enterDist, 2000),
    tl: finalTimeline,
    rc: resetCount,
    pc: seedsPlayed,
    tp: timePlayed,
    nph: (currTimeline["Nether"] ? currTimeline["Nether"].total : 0) / (owRTA / 1000 / 60 / 60),
    bph: preBlindCount / (preBlindRTA / 1000 / 60 / 60),
    et: enterTypes,
    bt: biomeTypes,
    it: ironTypes,
    ei: enterInfo
  }

  if (isPncakeTracker(data[0])) {
    const ops1 = {
      wt: wallRTA,
      rnph: (currTimeline["Nether"] ? currTimeline["Nether"].total : 0) / ((owRTA + wallRTA) / 1000 / 60 / 60),
    }
    return { ...ops, ...ops1}
  } else {
    return ops
  }
}

// Session stats based off if time difference > like 1hr
export const splitIntoSessions = data => {
  const sessions = []
  let first = true;
  let prevTime = null;
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    if (!first) {
      let currTime = (new Date(item["Date and Time"])).getTime()
      // If there was more than 1hr of gap, start a new session

      if (idx > 0 && ((!isPncakeTracker(data[idx - 1]) && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"]))) || (isPncakeTracker(data[idx - 1]) && data[idx - 1]["Session Marker"].includes("$"))))
        sessions.push({time: prevTime, entries: [item]})
      else
        sessions[sessions.length - 1].entries.push(item)
      prevTime = currTime
    } else {
      prevTime = (new Date(item["Date and Time"])).getTime()
      sessions.push({time: prevTime, entries: [item]})
      first = false
    }
  })
  return sessions
}