import React from "react";
import { Nav, NavItem, NavLink, TabContent } from "reactstrap";
import SectionTab from "./SectionTabs/SectionTab";

class SectionTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { docType: "CERTIFICATE", activeTab: "5" };
    this.toggle = this.toggle.bind(this);
  }


  isCertificate = file => {
    return file.DocType.trim() === "CERTIFICATE";
  };
  isSafetyReview = file => {
    return file.DocType.trim() === "Safety Reviews";
  };
  isLetters = file => {
    return file.DocType.trim() === "Letters";
  };

  toggle = (tab, docType) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        docType: docType
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ position: "absolute", top: "0", right: "30px" }}>
          {this.state.active !== "1" ? (
            <img
              onClick={() => {
                this.props.previousStep();
              }}
              className="img-responsive"
              src="/assets/img/Images/back2.png"
              onMouseOver={e =>
                (e.currentTarget.src = "/assets/img/Images/back3.png")
              }
              onMouseOut={e =>
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
          {this.state.active === "2" ? (
            <img
              id="following"
              onClick={() => {
                this.props.nextStep();
              }}
              style={{ marginLeft: "20px" }}
              className="img-responsive"
              src="/assets/img/Images/following2.png"
              onMouseOver={e =>
                (e.currentTarget.src = "/assets/img/Images/following3.png")
              }
              onMouseOut={e =>
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
              active={this.state.activeTab === "5"}
              onClick={() => {
                this.toggle("5", "CERTIFICATE");
              }}
            >
              CERTIFICATE
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink
              active={this.state.activeTab === "6"}
              onClick={() => {
                this.toggle("6", "Letters");
              }}
            >
              LETTERS
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink
              active={this.state.activeTab === "7"}
              onClick={() => {
                this.toggle("7", "Safety Reviews");
              }}
            >
              SAFETY REVIEWS
            </NavLink>
          </NavItem>
          <NavItem>

          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <SectionTab
            tabId={"5"}
            filter={this.isCertificate}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"6"}
            filter={this.isLetters}
            docType={this.state.docType}
          />
          <SectionTab
            tabId={"7"}
            filter={this.isSafetyReview}
            docType={this.state.docType}          
          />
        </TabContent>
      </React.Fragment>
    );
  }
}

export default SectionTwo;
