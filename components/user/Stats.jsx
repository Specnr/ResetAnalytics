import { Col, Row } from "react-bootstrap"
import TimelineTable from "./figures/TimelineTable"
import GeneralExtraStats from "./figures/GeneralExtraStats"
import EnterTypeGraph from "./figures/EnterTypeGraph"
import BiomeTypeGraph from "./figures/BiomeTypeGraph"
import IronSourceGraph from "./figures/IronSourceGraph"
import NetherHistogram from "./figures/NetherHistogram"
import PlaytimePieChart from "./figures/PlaytimePieChart"
import TwoWayEnterTable from "./figures/TwoWayEnterTable"

const Stats = ({ data, isSess }) => {
  return (
    <>
      <TimelineTable data={data} />
      <GeneralExtraStats data={data} isSess={isSess} />
      <EnterTypeGraph data={data} />
      <BiomeTypeGraph data={data} />
      <IronSourceGraph data={data} />
      <Row style={{ width: "100%" }}>
        <NetherHistogram data={data} />
        <PlaytimePieChart data={data} />
      </Row>
      <TwoWayEnterTable data={data} />
    </>
  )
}

export default Stats