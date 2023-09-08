import { Col, Row } from "react-bootstrap"
import { Label, Tooltip, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { msToStr } from "../../../public/helpers/frontendConverters"

const CustomTooltip = ({ active, payload, label, total }) => {
  if (active && payload && payload.length) {
    // Customize the tooltip content here
    const data = payload[0].payload
    const percentage = ((data.count / total) * 100).toFixed(2)
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#222222", border: "1px solid #ccc", padding: "10px" }}>
        <p>{`Time: ${msToStr(data.time, false)}`}</p>
        <p>{`Count: ${data.count}`}</p>
        <p>{`Percentage: ${percentage}%`}</p>
      </div>
    )
  }
  return null
}

const SplitHistogram = ({ data1 }) => {
  const distData = data1.dist
  const yTicks = data1.yTicks
  const total = data1.total

  return (
    <>
      <h1>Split Distribution</h1>
      <ResponsiveContainer>
        <LineChart data={distData} margin={{ top: 0, right: 10, bottom: 40, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ angle: 80, textAnchor: "start", dx: 0 }} stroke="#b2b2b2" tickFormatter={value => msToStr(value, false)} interval={Math.floor(distData.length / 8) - 1} >
            <Label value="Time" offset={-25} position="insideBottom" style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
          </XAxis>
          <YAxis stroke="#b2b2b2" ticks={yTicks} domain={[yTicks[0], yTicks[yTicks.length - 1]]} >
            <Label value="Cumulative Count" offset={15} position="insideLeft" angle={-90} style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip total={total} />} />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default SplitHistogram