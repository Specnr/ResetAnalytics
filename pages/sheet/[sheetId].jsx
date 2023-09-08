import { useRouter } from 'next/router'
import { Spinner, Tabs, Tab } from 'react-bootstrap'
import useSWR from "swr"
import SessionStats from '../../components/user/SessionsStats';
import Stats from '../../components/user/Stats';
import { fetcher } from '../../public/helpers/frontend';

const UserView = () => {
  const router = useRouter()
  const { sheetId } = router.query
  const { data, error } = useSWR(sheetId ? `/api/sheet/${sheetId}` : null, fetcher);

  if (error) return "An error has occurred."
  if (!data) return (
    <div style={{ minHeight: "90vh", display: "flex" }}>
      <Spinner animation="border" style={{ minHeight: "2em", minWidth: "2em", fontSize: "2em", alignSelf: "center" }} />
    </div>
  )
  if (!data.success) return <h1>Invalid sheet :(</h1>
  return (
    <div style={{ paddingTop: "25px" }}>
      <Tabs transition={false} variant="pills">
        <Tab eventKey="lifetime" title="Lifetime">
          <h1 className="display-2">Lifetime Stats</h1>
          <Stats data={data.overall} />
        </Tab>
        <Tab eventKey="sessions" title="Sessions">
          <SessionStats data={data} sheet={sheetId} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default UserView