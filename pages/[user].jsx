import { useRouter } from 'next/router'
import Router from "next/router"
import { Spinner } from 'react-bootstrap'

const UserRedirect = () => {
  const router = useRouter()
  const { user } = router.query
  if (!user)
    return (
      <div style={{ minHeight: "90vh", display: "flex" }}>
        <Spinner animation="border" style={{ minHeight: "2em", minWidth: "2em", fontSize: "2em", alignSelf: "center" }} />
      </div>
    )
  // Make sure guy exists in db
  fetch(`/api/user/${user.toLowerCase()}`)
    .then(res => res.json())
    .then(res => {
      if (res.sheetId.length > 0)
        Router.push(`/sheet/${res.sheetId}`)
      else
        Router.push(`/`)
    })
  return (
    <div style={{ minHeight: "90vh", display: "flex" }}>
      <Spinner animation="border" style={{ minHeight: "2em", minWidth: "2em", fontSize: "2em", alignSelf: "center" }} />
    </div>
  )
}

export default UserRedirect