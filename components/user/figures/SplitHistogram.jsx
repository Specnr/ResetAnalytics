import { Col, Row } from "react-bootstrap"
import { Label, Tooltip, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { msToStr } from "../../../public/helpers/frontendConverters"

const SplitHistogram = ({ distData }) => {

  return (
    <>
      <h1>Split Distribution</h1>
      <ResponsiveContainer>
        <LineChart width={500} height={250} data={distData} margin={{ top: 10, right: 10, bottom: 70, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ angle: 80, textAnchor: "start", dx: -1 }} tickFormatter={value => msToStr(value)} stroke="#b2b2b2" interval={4} >
            <Label value="X (time)" offset={-45} position="insideBottom" style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
          </XAxis>
          <YAxis stroke="#b2b2b2" >
            <Label value="Sub-X enter count" offset={0} position="insideLeft" angle={-90} style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default SplitHistogram