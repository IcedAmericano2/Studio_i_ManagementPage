import logo from "./logo.svg";
import "./App.css";
import InternalMainpage from "./Pages/InternalPage/InternalMainpage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EditNoticeMainpage from "./Pages/NoticeBoardPage/EditNoticePage/EditNoticeMainpage";
import MakingNoticeMainpage from "./Pages/NoticeBoardPage/MakingNoticePage/MakingNoticeMainpage";
import PlanNoticeMainpage from "./Pages/NoticeBoardPage/PlanNoticePage/PlanNoticeMainpage";
import LoginPage from "./Pages/Login/LoginPage";
import SignInPage from "./Pages/Login/SignInPage";
import ProjectMain from "./Pages/ProjectPage/ProjectMain";
import Project from "./Pages/ProjectPage/Project";
import Manage from "./Pages/InternalPage/Dashboard/Manage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectMain />} />
        <Route path="/Manage/:id" element={<InternalMainpage />} />
        <Route path="/EditMain" element={<EditNoticeMainpage />} />
        <Route path="/MakingMain" element={<MakingNoticeMainpage />} />
        <Route path="/PlanMain" element={<PlanNoticeMainpage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
