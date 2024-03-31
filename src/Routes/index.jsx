import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import PostLayout from "../Layouts/PostLayout";
import ProfileLayout from "../Layouts/ProfileLayout";
import CreatePostLayout from "../Layouts/CreatePostLayout";
import NotificationLayout from "../Layouts/NotificationLayout";
import SinglePostLayout from "../Layouts/SinglePostLayout";
import ChatHomeLayout from "../Layouts/ChatHomeLayout";
import Replies from "../Components/Replies";
import ChatHome from "../Pages/ChatHome";
import HomeMain from "../Pages/HomeMain";
import MrMineGame from "../Pages/MrMineGame";
import AssaultTimeGame from "../Pages/AssaultTime";
import AccelerationGame from "../Pages/Acceleration";
import FrayFightGame from "../Pages/FrayFight";
import Tanks from "../Pages/Tank";
import Gamesgrid from "../Pages/Games"
import PokerQuestGame from "../Pages/PokerQuest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/posts",
    element: <PostLayout />,
  },
  {
    path: "/chat-home/:receiverId",
    element: <ChatHome/>
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/create-post",
    element: <CreatePostLayout />,
  },
  {
    path: "/notifications",
    element: <NotificationLayout />,
  },
  {
    path: "/post-details",
    element: <SinglePostLayout />,
  },
  {
    path: "/replies",
    element: <Replies />,
  },
  {
    path: "/MrMine",
    element: <MrMineGame />,
  },
  {
    path: "/PokerQuest",
    element: <PokerQuestGame />,
  },
 
  {
    path: "/AssaultTime",
    element: <AssaultTimeGame />,
  },
  {
    path: "/Acceleration",
    element: <AccelerationGame />,
  },
  {
    path: "/FrayFight",
    element: <FrayFightGame />,
  },
  {
    path: "/Tank",
    element: <Tanks />,
  },
  {
    path: "/Games",
    element: <Gamesgrid />,
  },
]);
