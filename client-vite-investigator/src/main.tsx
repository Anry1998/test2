
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider, 
} from 'react-router-dom'


// import Two from './components/two.tsx'
import EmployesPage from './pages/employes/EmployesPage.tsx'
import IncidentPage from './pages/incident/IncidentPage.tsx'
import MainPage from './pages/main-pages/MainPage.tsx'
import PersonalInfo from './components/personal-info/PersonalInfo.tsx'
import YDPage from './components/y-d/YD.tsx'
import ChatsPage from './pages/chats/ChatsPage.tsx'
import ChatMessagesPage from './pages/chats/ChatMessagesPage.tsx'
import ChatsListPage from './pages/chats/ChatsListPage.tsx'





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      {/* <Route  path="component-one" element={<div>component-one</div>} /> */}
      <Route path='/main' element={<MainPage/>}>
        <Route index element={<PersonalInfo/>} />
        <Route path="y-d" element={<YDPage/>} />
      {/* <Route  path="/personalI-info" element={<PersonalInfo/>}/> */}
      </Route>

      <Route  path="/chat" element={<ChatsPage/>}>
        <Route index element={<ChatsListPage/>} />
        <Route path="get-chat-messages/:id" element={<ChatMessagesPage/>} />

        {/* /chat/get-all-chat-messages/${item.id}?employeId=${employee?.id} */}
        
      </Route>

      

      <Route  path="/employes" element={<EmployesPage/>}>
        <Route  path="create" element={<div>create employee</div>} />
        <Route  index element={<div>search incident</div>} />
        {/* <Route path=":id" element={<div>:id</div>} /> */}
      </Route>


      <Route  path="/personalI-info" element={<PersonalInfo/>}>
        {/* <Route  path="three-based" element={<div>three-based</div>} /> */}
        {/* <Route path=":id" element={<div>:id</div>} /> */}
      </Route>
      
      




      <Route  path="/incident" element={<IncidentPage/>}>
        <Route  path="create" element={<div>create incident</div>} />
        <Route  path="search" element={<div>create incident</div>} />
        {/* <Route path=":id" element={<div>:id</div>} /> */}
      </Route>


      <Route path="*" element={<div>Все дороги ведут в рим</div>} />
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router}/>
  </>
)
