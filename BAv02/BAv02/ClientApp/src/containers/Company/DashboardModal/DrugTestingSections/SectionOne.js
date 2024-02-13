import React from "react";
import { Nav, NavItem, NavLink, TabContent } from "reactstrap";
import SectionTab from "./SectionTabs/SectionTab";

class SectionOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = { docType: "Certificate of Enrollment", activeTab: "1" };
  }

  isCertificate = (file) => {
    return file.DocType.trim() === "Certificate of Enrollment";
  };
  isPolicy = (file) => {
    return file.DocType.trim() === "Company Policy";
  };
  isTraining = (file) => {
    return file.DocType.trim() === "Supervisor Training";
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
        <Nav tabs>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "1"}
              onClick={() => {
                this.toggle("1", "Certificate of Enrollment");
              }}
            >
              Certificate of Enrollment
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "2"}
              onClick={() => {
                this.toggle("2", "Company Policy");
              }}
            >
              Company Policy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={this.state.activeTab === "3"}
              onClick={() => {
                this.toggle("3", "Supervisor Training");
              }}
            >
              Supervisor Training
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <SectionTab
            tabId={"1"}
            filter={this.isCertificate}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"2"}
            filter={this.isPolicy}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"3"}
            filter={this.isTraining}
            docType={this.state.docType}
          />
        </TabContent>
      </React.Fragment>
    );
  }
}

export default SectionOne;
