import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import Select, { components } from "react-select";
import Stats from '../../components/user/Stats';
const axios = require('axios');

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={e => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

const MultiValue = props => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

const SessionStats = ({ data, sheet }) => {
  const formatData = (_, idx) => ({ label: `Session #${data.session.length - idx}`, value: idx })
  const [multi, setMulti] = useState(data ? data.session.filter((_, idx) => idx < 5).map(formatData) : [])
  const [sessData, setSessData] = useState(null)

  useEffect(() => {
    axios.post(`/api/sheet/${sheet}`, { keepSessions: multi.map(m => m.value) })
      .then(res => setSessData(res.data.overall))
  }, [])

  return (
    <>
      <Row>
        <Col md={6}>
          <h1 className="display-2">Session Stats</h1>
        </Col>
        <Col md={4} className="align-self-center">
          <Select
            placeholder="Select sessions..."
            options={data.session.map(formatData)}
            value={multi}
            onChange={setMulti}
            defaultValue={data.session.filter(sess => sess.selected).map(formatData)}
            isMulti
            closeMenuOnSelect={false}
            controlShouldRenderValue={false}
            components={{ Option, MultiValue }}
            hideSelectedOptions={false}
            backspaceRemovesValue={false}
            styles={{
              option: styles => ({ ...styles, color: "black", textAlign: "left" })
            }}
          />
        </Col>
        <Col md={1} className="align-self-center">
          <Button variant="success" onClick={() => {
            axios.post(`/api/sheet/${sheet}`, { keepSessions: multi.map(m => m.value) })
              .then(res => setSessData(res.data.overall))
          }}>
            Update
          </Button>
        </Col>
      </Row>
      {sessData && <Stats data={sessData} />}
    </>
  )
}

export default SessionStats