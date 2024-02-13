import React from "react";
import { Nav, NavItem, NavLink, TabContent } from "reactstrap";
import SectionTab from "./SectionTabs/SectionTab";

class SectionOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = { docType: "Pin Number", activeTab: "1" };
  }
  isPspReport = (file) => {
    return file.DocType.trim() === "PSP REPORT";
  };
  isMCS150 = (file) => {
    return file.DocType.trim() === "MCS-150";
  };
  isCsaOverview = (file) => {
    return file.DocType.trim() === "CSA OVERVIEW";
  };
  isPinNumber = (file) => {
    return file.DocType.trim() === "Pin Number";
  };

  toggle = (tab, docType) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        docType: docType,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ position: "absolute", top: "0", right: "30px" }}>
          {this.state.active === "1" ? (
            <img
              onClick={() => {
                this.props.previousStep();
              }}
              className="img-responsive"
              src="/assets/img/Images/back2.png"
              onMouseOver={(e) =>
                (e.currentTarget.src = "/assets/img/Images/back3.png")
              }
              onMouseOut={(e) =>
                (e.currentTarget.src = "/assets/img/Images/back2.png")
              }
              height="20"
              width="20"
              alt="back two"
            />
          ) : (
            <img
              className="img-responsive"
              src="/assets/img/Images/back1.png"
              height="20"
              width="20"
              alt="back one"
            />
          )}
          {this.state.active !== "2" ? (
            <img
              id="following"
              onClick={() => {
                this.props.nextStep();
              }}
              style={{ marginLeft: "20px" }}
              className="img-responsive"
              src="/assets/img/Images/following2.png"
              onMouseOver={(e) =>
                (e.currentTarget.src = "/assets/img/Images/following3.png")
              }
              onMouseOut={(e) =>
                (e.currentTarget.src = "/assets/img/Images/following2.png")
              }
              height="20"
              width="20"
              alt="following two"
            />
          ) : (
            <img
              className="img-responsive"
              style={{ marginLeft: "20px" }}
              src="/assets/img/Images/following1.png"
              height="20"
              width="20"
              alt="following one"
            />
          )}
        </div>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "1"}
              onClick={() => {
                this.toggle("1", "Pin Number");
              }}
            >
              PIN NUMBER
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "2"}
              onClick={() => {
                this.toggle("2", "CSA OVERVIEW");
              }}
            >
              CSA OVERVIEW
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "3"}
              onClick={() => {
                this.toggle("3", "MCS-150");
              }}
            >
              MCS-150
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "4"}
              onClick={() => {
                this.toggle("4", "PSP REPORT");
              }}
            >
              PSP REPORT
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <SectionTab
            tabId={"1"}
            filter={this.isPinNumber}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"2"}
            filter={this.isCsaOverview}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"3"}
            filter={this.isMCS150}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"4"}
            filter={this.isPspReport}
            docType={this.state.docType}
          />
        </TabContent>
      </React.Fragment>
    );
  }
}

export default SectionOne;
