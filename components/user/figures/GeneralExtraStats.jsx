import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"
import { GeneralExtraStatsTooltips } from "../../Tooltips"

const GeneralExtraStats = ({ data }) => {
  const names = (data.pn ? ["RNPH"] : []).concat([
    "LNPH",
    "Blinds/Hr",
    "Resets",
    "Playtime",
    "Time Per Played",
    "Resets Per Enter",
    "Seeds Played"
  ])

  return (
    <>
      <GeneralExtraStatsTooltips />
      <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
        <thead>
          <tr>
            {
              names.map((name, idx) => (
                <th key={idx} data-tip data-for={name}>
                  {name}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
          <tr>
            {
              !data.pn ? null : (
                <td>{roundToPerc(data.rnph)}</td>
              )
            }
            <td>{roundToPerc(data.fnph)}</td>
            <td>{roundToPerc(data.bph)}</td>
            <td>{data.rc}</td>
            <td>{msToStr(data.tp)}</td>
            <td>{msToStr(data.tp / data.pc)}</td>
            <td>{roundToPerc(data.rc / data.tl[3].total)}</td>
            <td>{roundToPerc(roundToPerc(data.pc / data.rc, 4) * 100)}%</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default GeneralExtraStats