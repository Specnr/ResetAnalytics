import { Col, Row } from "react-bootstrap"
import { BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis, ResponsiveContainer } from "recharts"
import { colourList } from "../../../public/helpers/frontend"
import { msToStr } from "../../../public/helpers/frontendConverters"

const CustomTick = ({ x, y, payload }) => {
  const imgPath = `/imgs/irons/${payload.value.replace("/", "")}.png`
  return (
    <>
      <image x={x - 15} y={y + 10} href={imgPath} width={30} height={30} />
    </>
  )
}

const IronSourceGraphs = ({ data }) => {
  const ironBarChartData = []
  for (const ironType in data.it) {
    const v = data.it[ironType].sum / data.it[ironType].total
    ironBarChartData.push({
      name: ironType,
      avg: v,
      label: msToStr(v)
    })
  }

  const ironPieChartData = []
  for (const ironType in data.it) {
    ironPieChartData.push({
      name: ironType,
      percOfTotal: data.it[ironType].total
    })
  }

  return (
    <>
      <Row style={{ width: "100%", margin: "0px" }}>
        <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Iron Source Enter Avg</h1>
          <ResponsiveContainer>
            <BarChart data={ironBarChartData} margin={{ top: 5, right: 5, bottom: 35, left: 5 }}>
              <XAxis dataKey="name" tick={<CustomTick />} stroke="#b2b2b2" interval={0} />
              <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
              <Bar dataKey="avg" fill="#ffffff">
                {ironBarChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 1) % colourList.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Iron Source Percentage</h1>
          <ResponsiveContainer>
            <PieChart className="mx-auto">
              <Pie
                dataKey="percOfTotal"
                isAnimationActive={true}
                data={ironPieChartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00d0ff"
              >
                {ironPieChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 1) % colourList.length]} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="right" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  )
}

export default IronSourceGraphs