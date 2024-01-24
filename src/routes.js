import Index from "views/Index.js";
import GameScreen from "views/examples/Game";
import GameRequest from "views/examples/GameRequest";
import GameRequestList from "views/examples/GameRequestList";
import Profile from "views/examples/Profile.js";
import UserManagement from "views/examples/UserManagement";

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
    component: <GameScreen />,
    layout: "/admin",
  },
  {
    path: "/Add-Games-List",
    name: "Games List",
    icon: "ni ni-curved-next text-blue",
    component: <GameRequestList />,
    layout: "/admin",

  },

];


export default routes;




