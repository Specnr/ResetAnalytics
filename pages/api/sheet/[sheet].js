import { splitIntoSessions, doAllOps } from "../../../public/helpers/dataOperations"

const reader = require("g-sheets-api");
export const maxDuration = 60;

export default function handler(req, res) {
  let keepSessions = new Set()
  if (req.method === "POST") {
    if (req.body.hasOwnProperty('keepSessions'))
      keepSessions = new Set(req.body.keepSessions)
  }
  const readerOptions = {
    apiKey: process.env.SHEETS_API_KEY,
    sheetId: req.query.sheet,
    returnAllResults: false,
    sheetName: 'Raw Data'
  };
  return new Promise(resolve => {
    reader(readerOptions, data => {
      // Check to make sure its a valid sheet 
      if (data.length === 0 || !("Break RTA Since Prev" in data[0])) {
        res.status(400).json({success: false})
        return resolve()
      }
      // Do some operations
      const sessionData = []
      if (keepSessions.size === 0) {
        const sessions = splitIntoSessions(data)
        sessions.forEach(session => {
          sessionData.push({time: session.time, ops: doAllOps(session.entries)})
        })
      }
      res.status(200).json({success: true, session: sessionData, overall: doAllOps(data, keepSessions)})
    }, err => {
      console.log(err)
      res.status(400).json({success: false})
      return resolve()
    })
  })
}