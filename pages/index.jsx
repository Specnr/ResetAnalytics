import Router from "next/router"
import useSWR from "swr"
import { useState } from "react"
import { Col, Row, Button, Spinner } from "react-bootstrap"
import Select from "react-select"

import { fetcher } from '../public/helpers/frontend';
import BadSearchModal from "../components/homepage/BadSearchModal"
import Search from "../components/homepage/SearchBar"

const Home = () => {
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const { data, error } = useSWR("/api/allusers", fetcher);

  const doSearch = (toSearch) => {
    if (toSearch !== "")
      Router.push(`/sheet/${toSearch}`)
  }

  if (error) return "An error has occurred."
  if (!data) return (
    <div style={{ minHeight: "90vh", display: "flex" }}>
      <Spinner animation="border" style={{ minHeight: "2em", minWidth: "2em", fontSize: "2em", alignSelf: "center" }} />
    </div>
  )
  if (!data.success) return <h1>Something went wrong...</h1>

  return (
    <>
      <BadSearchModal show={showModal} onHide={() => setShowModal(false)} />
      <Row style={{ minHeight: "20vh" }} />
      <Row style={{ minHeight: "25vh" }}>
        <Col>
          <h1 style={{ fontSize: "12vh" }}>
            Reset Analytics
          </h1>
        </Col>
      </Row>
      <Row style={{ minHeight: "10vh", textAlign: "left" }}>
        <Col>
          <Select
            styles={{
              option: (provided) => ({
                ...provided,
                color: "black",
                fontSize: "1.2rem"
              }),
              placeholder: (provided) => ({
                ...provided,
                fontSize: "2rem",
                padding: "0.275rem 0"
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "2rem"
              }),
              input: (provided) => ({
                ...provided,
                fontSize: "2rem"
              }),
            }}
            options={data.data}
            placeholder="Select a runner..."
            onChange={item => doSearch(item.value)}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center flex-wrap" md={3} style={{ minHeight: "20vh" }}>
        <Col md={10}>
          <Search value={search} onChange={setSearch} />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={() => doSearch(search)} style={{ fontSize: "2rem" }}>
            Search
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Home
