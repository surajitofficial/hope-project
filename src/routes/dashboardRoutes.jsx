import Intro from "views/privatepages/dashboard";
import Users from "views/privatepages/users";
import UserForm from "views/privatepages/users/form";
import Volunteers from "views/privatepages/volunteers";
import VolunteerDetail from "views/privatepages/volunteers/detail";
import VolunteerApplication from "views/privatepages/volunteers/application";
import Payments from "views/privatepages/payments";
import PaymentDetail from "views/privatepages/payments/detail";
import VolunteerSites from "views/privatepages/volunteersites";
import VolunteerSiteForm from "views/privatepages/volunteersites/form";
import VolunteerSitedetForm from "views/privatepages/volunteersites/formdet";

const dashboardRoutes = [
  { path: "/intro", component: Intro },
  { path: "/users", component: Users },
  { path: "/users/:id", component: UserForm },
  { path: "/volunteers", component: Volunteers },
  { path: "/volunteers/:id", component: VolunteerDetail },
  { path: "/payments", component: Payments },
  { path: "/payments/:id", component: PaymentDetail },
  { path: "/volunteersites", component: VolunteerSites },
  { path: "/volunteersites/:id", component: VolunteerSiteForm },
  { path: "/volunteersitesdet/:id", component: VolunteerSitedetForm },
  { path: "/volunteers/:id/:aid", component: VolunteerApplication }
];

export default dashboardRoutes;
