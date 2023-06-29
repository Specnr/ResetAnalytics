import { Col, Row } from "react-bootstrap"
import { Tooltip, Pie, PieChart, Cell, Legend, ResponsiveContainer } from "recharts"
import { colourList } from "../../../public/helpers/frontend"
import { msToStr } from "../../../public/helpers/frontendConverters"

const PlaytimePieChart = ({ data }) => {
  const playtimePieChartData = []
  playtimePieChartData.push({
    name: "OW",
    percOfTotal: data.ot
  })
  playtimePieChartData.push({
    name: "Nether",
    percOfTotal: data.nt
  })
  playtimePieChartData.push({
    name: "Wall",
    percOfTotal: data.wt
  })

  return (
    <>
      <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
        <h1>Playtime Breakdown</h1>
        <ResponsiveContainer>
          <PieChart width={300} height={250} className="mx-auto">
            <Pie
              dataKey="percOfTotal"
              isAnimationActive={true}
              data={playtimePieChartData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#00d0ff"
            >
              {playtimePieChartData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" align="right" />
            <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
          </PieChart>
        </ResponsiveContainer>
      </Col>
    </>
  )
}

export default PlaytimePieChart