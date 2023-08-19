import { Col, Row } from "react-bootstrap"
import { timelines } from "../../public/helpers/frontend"
import { Tab, Tabs } from 'react-bootstrap'
import CollapsibleContainer from "./custom/CollapsibleContainer"
import SplitInfo from "./figures/SplitInfo"
import TimelineTable from "./figures/TimelineTable"
import GeneralExtraStats from "./figures/GeneralExtraStats"
import EnterTypeGraph from "./figures/EnterTypeGraph"
import BiomeTypeGraph from "./figures/BiomeTypeGraph"
import IronSourceGraph from "./figures/IronSourceGraph"
import SplitHistogram from "./figures/SplitHistogram"
import PlaytimePieChart from "./figures/PlaytimePieChart"
import TwoWayEnterTable from "./figures/TwoWayEnterTable"
import NetherTree from "./figures/NetherTree"
import IronSourceMosaic from "./figures/IronSourceMosaic"

const Stats = ({ data }) => {
  return (
    <>
      <Tabs transition={false} style={{ width: "1000px" }}>
        <Tab eventKey="overview" title="Overview">
          <Row style={{ width: "100%" }}>
            <Col style={{ height: "200px" }} className="d-flex flex-column col-md-12 col-sm-12">
              <TimelineTable data={data} />
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col style={{ height: "150px" }} className="d-flex flex-column col-md-12 col-sm-12">
              <GeneralExtraStats data={data} />
            </Col>
          </Row>
          {
            (
              data.pn ? (
                <Row style={{ width: "100%" }}>
                  <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                    <PlaytimePieChart data={data} />
                  </Col>
                </Row>
              ) : null
            )
          }
        </Tab>
        <Tab eventKey="overworld" title="Overworld">
          <div>
            {
              (
                data.tl[3].total !== 0 ? (
                  data.pn ? (
                    <div>
                      <Row style={{ width: "100%" }}>
                        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-12 col-sm-12">
                          <IronSourceMosaic data={data.imd} />
                        </Col>
                      </Row>
                      <EnterTypeGraph data={data} />
                      <BiomeTypeGraph data={data} />
                      <IronSourceGraph data={data} />
                      <TwoWayEnterTable data={data} />
                    </div>
                  ) : (
                    <div>
                      <EnterTypeGraph data={data} />
                      <BiomeTypeGraph data={data} />
                    </div>
                  )
                ) : null
              )
            }
            {
              data.tl.slice(0, 4).map((val, idx) =>
                val.total > 0 ? (
                  <Row style={{ width: "100%" }}>
                    <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                      <SplitInfo splitData={val} splitName={timelines[idx]} />
                    </Col>
                    <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                      <SplitHistogram data1={val.cDist} />
                    </Col>
                  </Row>
                ) : null
              )
            }
          </div>
        </Tab>
        {
          (
            data.tl[3].total !== 0 ? (
              <Tab eventKey="nether" title="Nether">
                <div>
                  {
                    <Row style={{ width: "100%" }}>
                      <Col style={{ height: "300px" }} className="d-flex flex-column col-md-12 col-sm-12">
                        <NetherTree netherTreeData={data.ntd} />
                      </Col>
                    </Row>
                  }
                  {
                    data.tl.slice(4, 7).map((val, idx) =>
                      val.total > 0 ? (
                        <Row style={{ width: "100%" }}>
                          <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitInfo splitData={val} splitName={timelines[idx + 4]} />
                          </Col>
                          <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitHistogram data1={val.cDist} />
                          </Col>
                        </Row>
                      ) : null
                    )
                  }
                </div>
              </Tab>
            ) : null
          )
        }
        {
          (
            data.tl[6].total !== 0 ? (
              <Tab eventKey="endgame" title="End-game">
                <div>
                  {
                    data.tl.slice(7, 9).map((val, idx) =>
                      val.total > 0 ? (
                        <Row style={{ width: "100%" }}>
                          <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitInfo splitData={val} splitName={timelines[idx + 7]} />
                          </Col>
                          <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitHistogram data1={val.cDist} />
                          </Col>
                        </Row>
                      ) : null
                    )
                  }
                </div>
              </Tab>
            ) : null
          )
        }
      </Tabs>
    </>
  )
}

export default Stats