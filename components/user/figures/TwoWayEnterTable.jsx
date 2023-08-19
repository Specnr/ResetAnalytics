import { Table } from "react-bootstrap"

const TwoWayEnterTable = ({ data }) => {

  return (
    <>
      <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
        <tbody>
          <tr style={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>
            <td style={{ borderRight: '2px solid #000' }}></td>
            <td>Magma Ravine</td>
            <td>Lava Pool</td>
            <td>Bucketless</td>
            <td>Obsidian</td>
          </tr>
          {
            Object.keys(data.ei).map((key1, idx1) => (
              <tr>
                <td style={{ borderRight: '2px solid #000', fontWeight: 'bold' }}>{key1}</td>
                {
                  Object.keys(data.ei[key1]).map((key2, idx2) => (
                    <td style={{ fontFamily: "Roboto", fontSize: "1em", backgroundColor: `rgb(${127 + Math.round(data.ei[key1][key2].total / data.tl[3].total * 127)}, ${127 - Math.round(data.ei[key1][key2].total / data.tl[3].total * 127)}, ${127 - Math.round(data.ei[key1][key2].total / data.tl[3].total * 127)})` }} key={idx2}>{data.ei[key1][key2].total}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}

export default TwoWayEnterTable