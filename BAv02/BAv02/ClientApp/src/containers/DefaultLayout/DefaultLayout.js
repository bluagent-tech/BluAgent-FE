import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";

//const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

const idCompany = localStorage['idCompany'];

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      forward: "undefined", 
      testD: [],
      d: [],
    };
    this.back = this.back.bind(this);
    this.following = this.following.bind(this);
  }

  componentDidMount() {
    // show and display menu depends on Role
    this.state.d = document.querySelectorAll(".nav-link");
    this.state.testD = document.querySelectorAll(".nav-link");
    this.props.getAllGeneralAlerts(idCompany);
  
  }

  back(forward) {
    forward = "";
    if (window.location.hash !== "#/dashboard") {
      window.history.back();
    }
    this.setState((state, props) => {
      return { forward: state.forward };
    });
  }

  following() {
    if (window.history.go(+1) === "undefined") {
      this.setState({ forward: undefined });
    } else {
      this.setState({ forward: "" });
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push("/login");
    window.location.reload();
  }

  proFile(e) {
    e.preventDefault();
    this.props.history.push(
      "/Users/" + JSON.parse(localStorage.getItem("user")).Id
    );
  }

  render() {
    if(this.state.d.length !== 0) {
      if (
        JSON.parse(JSON.parse(localStorage.getItem("user")).Role === "SUPERADMIN")
      ) {
        this.state.d[1].style.display = "none";
        this.state.d[2].style.display = "none";
        this.state.d[3].style.display = "none";
        this.state.d[4].style.display = "none";
        this.state.d[5].style.display = "none";
        this.state.d[6].style.display = "none";
        this.state.d[7].style.display = "none";
        this.state.d[8].style.display = "none";
        this.state.d[9].style.display = "none";
        this.state.d[10].style.display = "none";
        this.state.d[11].style.display = "none";
        this.state.d[12].style.display = "none";
        this.state.d[13].style.display = "none";
        this.state.d[14].style.display = "none";
        this.state.d[15].style.display = "none";
        this.state.d[23].style.display = "none";

      }
      if (JSON.parse(localStorage.getItem("user")).Role === "ADMIN") {
        this.state.d[0].style.display = "none";
        this.props.countGAlerts != undefined ?  this.props.countGAlerts > 0 ? (this.state.d[2].style.display = "none") : (this.state.d[3].style.display = "none") : null;
        this.state.d[8].style.display = "none";
        this.state.d[13].style.display = "none";
        this.state.d[14].style.display = "none";
        this.state.d[15].style.display = "none";
        this.state.d[16].style.display = "none";
        this.state.d[17].style.display = "none";
        this.state.d[18].style.display = "none";
        this.state.d[19].style.display = "none";
        this.state.d[20].style.display = "none";
        this.state.d[21].style.display = "none";
        this.state.d[23].style.display = "none";
        this.state.d[24].style.display = "none";

        //d[21].style.display = "none";
      }
      if (JSON.parse(localStorage.getItem("user")).Role === "INSURANCE") {
        this.state.d[0].style.display = "none";
        this.state.d[1].style.display = "none";
        this.state.d[2].style.display = "none";
        this.state.d[3].style.display = "none";
        this.state.d[4].style.display = "none";
        this.state.d[5].style.display = "none";
        this.state.d[6].style.display = "none";
        this.state.d[7].style.display = "none";
        this.state.d[8].style.display = "none";
        this.state.d[9].style.display = "none";
        this.state.d[10].style.display = "none";
        this.state.d[11].style.display = "none";
        this.state.d[12].style.display = "none";
        this.state.d[13].style.display = "none";
        this.state.d[14].style.display = "none";
        this.state.d[15].style.display = "none";
        this.state.d[16].style.display = "none";
        this.state.d[17].style.display = "none";
        this.state.d[18].style.display = "none";
        this.state.d[19].style.display = "none";
        this.state.d[20].style.display = "none";
        this.state.d[21].style.display = "none";
        this.state.d[23].style.display = "none";
        this.state.d[24].style.display = "none";
      }
  
      if (JSON.parse(localStorage.getItem("user")).Role === "COLLECTOR") {
        this.state.d[0].style.display = "none";
        this.state.d[1].style.display = "none";
        this.state.d[2].style.display = "none";
        this.state.d[3].style.display = "none";
        this.state.d[4].style.display = "none";
        this.state.d[5].style.display = "none";
        this.state.d[6].style.display = "none";
        this.state.d[7].style.display = "none";
        this.state.d[8].style.display = "none";
        this.state.d[9].style.display = "none";
        this.state.d[10].style.display = "none";
        this.state.d[11].style.display = "none";
        this.state.d[12].style.display = "none";
        this.state.d[16].style.display = "none";
        this.state.d[17].style.display = "none";
        this.state.d[18].style.display = "none";
        this.state.d[19].style.display = "none";
        this.state.d[20].style.display = "none";
        this.state.d[21].style.display = "none";
        this.state.d[22].style.display = "none";
        this.state.d[24].style.display = "none";
      }
  
      if (JSON.parse(localStorage.getItem("user")).Role === "USER") {
        
        this.state.d[0].style.display = "none";
        this.state.d[1].style.display = "none";
        this.state.d[2].style.display = "none";
        this.state.d[3].style.display = "none";
        this.state.d[4].style.display = "none";
        this.state.d[8].style.display = "none";
        this.state.d[9].style.display = "none";
        this.state.d[10].style.display = "none";
        this.state.d[11].style.display = "none";
        this.state.d[12].style.display = "none";
        this.state.d[13].style.display = "none";
        this.state.d[14].style.display = "none";
        this.state.d[15].style.display = "none";
        this.state.d[16].style.display = "none";
        this.state.d[17].style.display = "none";
        this.state.d[18].style.display = "none";
        this.state.d[19].style.display = "none";
        this.state.d[20].style.display = "none";
        this.state.d[21].style.display = "none";
        this.state.d[22].style.display = "none";
        this.state.d[23].style.display = "none";
        this.state.d[24].style.display = "none";

        if (JSON.parse(localStorage.getItem('permits')).includes('HR') === false) {
          this.state.d[5].style.display = "none";
        }
        if (JSON.parse(localStorage.getItem('permits')).includes('Mechanical') === false) {
          this.state.d[6].style.display = "none";
        }
        if (JSON.parse(localStorage.getItem('permits')).includes('DER') === false) {
          this.state.d[7].style.display = "none";
        }

      } else if (JSON.parse(localStorage.getItem("user")).Role === "MECHANIC") {
      } else {
        if (JSON.parse(localStorage.getItem("user")).Role !== "DRIVER") {
          this.state.d[8].style.display = "none";
          this.state.d[9].classList.remove("active");
          this.state.d[10].classList.remove("active");
          this.state.d[12].classList.remove("active");
  
          this.state.d[9].target = "_blank";
          this.state.d[10].target = "_blank";
          this.state.d[12].target = "_blank";
        }
      }
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={(e) => this.signOut(e)}
              toProfile={(e) => this.proFile(e)}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {JSON.parse(localStorage.getItem("user")).Role !== "DRIVER" &&
          (JSON.parse(localStorage.getItem("permits")) === null ||
            JSON.parse(localStorage.getItem("permits")).length > 1) ? (
            <AppSidebar
              className="sidebar sidebar-dashboard"
              fixed
              display="lg"
            >
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter style={{ backgroundColor: "white" }}>
                <div
                  className="fa fa-headphones"
                  style={{ color: "var(--royal-blue)" }}
                >
                  <label
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      color: "var(--royal-blue)",
                      marginLeft: "2px",
                    }}
                  >
                    {" "}
                    Support
                  </label>
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "small",
                      fontWeight: "400",
                    }}
                  >
                    <label style={{ color: "black" }}>
                      support@bluagent.com
                    </label>
                    <label style={{ color: "black" }}>619-878-5852</label>
                    <label>
                      <a
                        href="https://www.bluagent.com"
                        target="_blank"
                        style={{ color: "var(--royal-blue)" }}
                        rel="noopener noreferrer"
                      >
                        www.bluagent.com
                      </a>
                    </label>
                  </div>
                </div>
              </AppSidebarFooter>
              <AppSidebarMinimizer />
            </AppSidebar>
          ) : (
            ""
          )}
          <main className="main">
            <div>
              {JSON.parse(localStorage.getItem("user")).Role !== "USER" ? (
                <AppBreadcrumb appRoutes={routes} />
              ) : (
                <label></label>
              )}
              <div style={{ position: "absolute", top: "65px", right: "30px" }}>
 
              </div>
            </div>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  {JSON.parse(localStorage.getItem("user")).Role ===
                  "SUPERADMIN" ? (
                    <Redirect from="/" to="/super-admin" />
                  ) : JSON.parse(localStorage.getItem("user")).Role ===
                  "INSURANCE" ? (
                    <Redirect from="/" to="/reports" />
                  )
                  : JSON.parse(localStorage.getItem("user")).Role ===
                    "COLLECTOR" ? (
                    <Redirect from="/" to="/DashboardCollector" />
                  ) : JSON.parse(localStorage.getItem("user")).Role !==
                      "DRIVER" &&
                    (JSON.parse(localStorage.getItem("permits")) === null ||
                      JSON.parse(localStorage.getItem("permits")).length >
                        1) ? (
                    <Redirect from="/" to="/dashboard" />
                  ) : JSON.parse(localStorage.getItem("user")).Role ===
                    "DRIVER" ? (
                    <Redirect
                      from="/"
                      to={
                        "/Drivers/" +
                        JSON.parse(localStorage.getItem("user")).Id
                      }
                    />
                  ) : JSON.parse(localStorage.getItem("permits"))[0] ===
                    "HR" ? (
                    <Redirect from="/" to={"/QualificationFile"} />
                  ) : JSON.parse(localStorage.getItem("permits"))[0] ===
                    "DER" ? (
                    <Redirect from="/" to={"/DashboardTest"} />
                  ) : (
                    /*JSON.parse(localStorage.getItem("permits"))[0] ==
                        "Mechanical" ?*/ <Redirect
                      from="/"
                      to={"/Maintenance"}
                    />
                  )}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}></Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}
export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(DefaultLayout);

//{
//JSON.parse(localStorage.getItem('user')).Role !== 'DRIVER' && (JSON.parse(localStorage.getItem('permits')) > 0 JSON.parse(localStorage.getItem('permits')) === null) ?
//    <Redirect from="/" to="/dashboard" /> : JSON.parse(localStorage.getItem('user')).Role !== 'DRIVER' && JSON.parse(localStorage.getItem('permits')) === "HR"?
//<Redirect from="/" to={"/Drivers/" + JSON.parse(localStorage.getItem('user')).Id} />
//}
