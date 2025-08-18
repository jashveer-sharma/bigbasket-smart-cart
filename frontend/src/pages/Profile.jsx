import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'

export default function Profile(){
  const { user, logout } = useAuth()
  const { notify } = useToast()
  const nav = useNavigate()

  if(!user){
    nav('/login')
    return null
  }

  return (
    <div className="container" style={{padding:'18px 0'}}>
      <div className="section-title">Your Profile</div>
      <div className="panel">
        <div><b>Name:</b> {user.name}</div>
        <div><b>Phone:</b> {user.phone}</div>
        <div><b>Address:</b> {user.address}</div>
        <div style={{marginTop:10}}>
          <button className="btn btn-outline" onClick={()=>{logout(); notify('Logged out'); nav('/')}}>Logout</button>
        </div>
      </div>
    </div>
  )
}