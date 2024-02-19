import Index from "views/Index.js";
import AddGameScreen from "views/pages/AddGame";
import GameRequestList from "views/pages/GameList";
import GameRequest from "views/pages/GameRequest";
import GameResultScreen from "views/pages/GameResult";
import Profile from "views/pages/Profile.js";
import TodayResultScreen from "views/pages/TodayResult";
import UserManagement from "views/pages/UserManagement";
import WithdrawalList from "views/pages/WithdrawalList";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/UserManagement",
    name: "user Management",
    icon: "ni ni-planet text-blue",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/GameRequest",
    name: "Game request",
    icon: "ni ni-curved-next text-orange",
    component: <GameRequest />,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/Add-Games",
    name: "Add Games",
    icon: "ni ni-controller text-green",
    component: <AddGameScreen />,
    layout: "/admin",
  },
  {
    path: "/Games-List",
    name: "Games List",
    icon: "ni ni-curved-next text-blue",
    component: <GameRequestList />,
    layout: "/admin",

  },
  {
    path: "/Payment-Withdrawal-List",
    name: "Withdrawal List",
    icon: "ni ni-curved-next text-danger",
    component: <WithdrawalList />,
    layout: "/admin",

  },
  {
    path: "/Games-Result",
    name: "Games Result",
    icon: "ni ni-controller text-green",
    component: <GameResultScreen />,
    layout: "/admin",
  },
  {
    path: "/Today-result",
    name: "Today Result",
    icon: "ni ni-controller text-green",
    component: <TodayResultScreen />,
    layout: "/admin",
  },

];


export default routes;




