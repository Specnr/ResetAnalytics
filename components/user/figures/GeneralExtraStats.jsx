import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"

const GeneralExtraStats = ({ data, isSess }) => {
  return (
    <>
      <h1 className="display-2">Additional Analytics</h1>
      <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
        <thead>
          <tr>
            <th>Nethers/Hr</th>
            <th>Blinds/Hr</th>
            <th>Resets</th>
            <th>Playtime</th>
            <th>Time Per Played</th>
            <th>Resets Per Enter</th>
            <th>Seeds Played</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
          <tr>
            <td>{roundToPerc(data.nph)}</td>
            <td>{roundToPerc(data.bph)}</td>
            <td>{data.rc}</td>
            <td>{msToStr(data.tp)}</td>
            <td>{msToStr(data.tp / data.pc, true)}</td>
            <td>{roundToPerc(data.rc / data.tl[2].total)}</td>
            <td>{roundToPerc(roundToPerc(data.pc / data.rc, 4) * 100)}%</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default GeneralExtraStats