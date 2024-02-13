import React, { Component, Fragment } from "react";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
// const range = (from, to, step = 1) => {
//   let i = from;
//   let random_range = [];

//   while (i <= to) {
//     random_range.push(i);
//     i += step;
//   }

//   return random_range;
// };

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { pageLimit = 30 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;

    this.state = { currentPage: 1, totalRecords: 1, totalPages: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.totalRecords !== this.props.totalRecords) {
      let totalPages = Math.ceil(this.props.totalRecords / this.pageLimit);
      this.setState({ totalRecords: this.props.totalRecords });
      this.setState({ totalPages: totalPages });
    }
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.state.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.state.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.state.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + 1);
  };

  render() {
    //if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    //const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Countries Pagination">
          <ul
            style={{ justifyContent: "center", alignContent: "center" }}
            className="pagination"
          >
            {currentPage !== 1 ? (
              <img
                onClick={this.handleMoveLeft}
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
                alt="data one"
              />
            ) : (
              <img
                className="img-responsive"
                src="/assets/img/Images/back1.png"
                height="20"
                width="20"
                alt="data 2"
              />
            )}
            <span style={{ marginLeft: "15px", fontWeight: "600" }}>
              {currentPage}
            </span>
            {currentPage < this.state.totalPages ? (
              <img
                id="following"
                onClick={this.handleMoveRight}
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
                alt="data 3"
              />
            ) : (
              <img
                className="img-responsive"
                style={{ marginLeft: "20px" }}
                src="/assets/img/Images/following1.png"
                height="20"
                width="20"
                alt="data 4"
              />
            )}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Pagination;
