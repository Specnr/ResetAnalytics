import { Col, Row } from "react-bootstrap"
import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"
import { MainStatsToolTips } from "../../Tooltips"

const TimelineTable = ({ data }) => {
  return (
    <>
      <MainStatsToolTips />
      <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
        <thead>
          <tr>
            <th>Wood</th>
            <th>Iron Pickaxe</th>
            <th>Nether</th>
            <th>Structure #1</th>
            <th>Structure #2</th>
            <th>Nether Exit</th>
            <th>Stronghold</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
          <tr data-tip data-for="totals-tip" style={{ fontSize: "0.9em" }}>
            {data.tl.map((val, idx) => <td key={idx}>{val.total}</td>)}
          </tr>
          <tr data-tip data-for="avgs-tip">
            {data.tl.map((val, idx) => <td key={idx}>{msToStr(val.time)}</td>)}
          </tr>
          <tr data-tip data-for="tsp-tip">
            {
              data.tl.map((val, idx) => (
                <td key={idx}>{idx > 0 && val.time > 0 ? msToStr(val.tsp) : "-----"}</td>
              ))
            }
          </tr>
          <tr data-tip data-for="conv-r-tip">
            <td>{roundToPerc(data.tl[0].total / data.rc * 100)}%</td>
            {data.tl.map((val, idx) => {
              if (idx === 0)
                return
              const perc = roundToPerc(val.total / data.tl[idx - 1].total * 100)
              return <td key={idx}>{!isNaN(perc) ? perc : 0}%</td>
            })}
          </tr>
          <tr data-tip data-for="conv-g-tip">
            {data.tl.map((val, idx) => <td key={idx}>{roundToPerc(val.total / data.rc * 100)}%</td>)}
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default TimelineTable