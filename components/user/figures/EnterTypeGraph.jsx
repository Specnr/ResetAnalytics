import { Col, Row } from "react-bootstrap"
import { BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis, ResponsiveContainer } from "recharts"
import { colourList } from "../../../public/helpers/frontend"
import { msToStr } from "../../../public/helpers/frontendConverters"

const CustomTick = ({ x, y, payload }) => {
  const imgPath = `/imgs/enters/${payload.value.replace("/", "")}.png`
  return (
    <>
      <image x={x - 15} y={y + 10} href={imgPath} width={30} height={30} />
    </>
  )
}

const EnterTypeGraphs = ({ data }) => {
  const enterTypeBarChartData = []
  for (const enterType in data.et) {
    const v = data.et[enterType].sum / data.et[enterType].total
    enterTypeBarChartData.push({
      name: enterType,
      avg: v,
      label: msToStr(v)
    })
  }

  const enterTypePieChartData = []
  for (const enterType in data.et) {
    enterTypePieChartData.push({
      name: enterType,
      percOfTotal: data.et[enterType].total
    })
  }

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Enter Type Average</h1>
          <ResponsiveContainer>
            <BarChart data={enterTypeBarChartData} margin={{ top: 5, right: 5, bottom: 35, left: 5 }}>
              <XAxis dataKey="name" tick={<CustomTick />} stroke="#b2b2b2"  interval={0} />
              <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
              <Bar dataKey="avg" fill="#ffffff">
                {enterTypeBarChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Enter Type Percentage</h1>
          <ResponsiveContainer>
            <PieChart className="mx-auto">
              <Pie
                dataKey="percOfTotal"
                isAnimationActive={true}
                data={enterTypePieChartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00d0ff"
              >
                {enterTypePieChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[idx]} />
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

export default EnterTypeGraphs