
import React from 'react';

// paginationData = {numberOfPage: 4, currentPage: 0}
const CalendarPagination = (props) => {
    const {paginationData, goToPage} = props;
    var currentPage = paginationData.currentPage;
    var numberOfPage = paginationData.numberOfPage;

    var navigationRows = [];
    for (var i = 1; i <= numberOfPage; i++) {
        if (currentPage == i) {
            navigationRows.push(<li key={i} className="active"><span>{currentPage}</span></li>);
        } else {
            const page = i; // use constant, avoid using i, it's updated on the fly.
            navigationRows.push(<li key={i}><a onClick={() => goToPage(page)}>{i}</a></li>);
        }
    }
    
    return <div style={{textAlign: 'center'}}>
        <ul className="pagination">
            {currentPage == 1 ? <li key={-2} className="disabled"><span>« HĐ trước</span></li> : <li key={-4}><a onClick={() => goToPage(currentPage - 1)} rel="previous">« HĐ trước</a></li> }
            {navigationRows}
            {currentPage == numberOfPage ? <li key={-1} className="disabled"><span>HĐ tiếp theo »</span></li> : <li key={-3}><a onClick={() => goToPage(currentPage + 1)} rel="next">HĐ tiếp theo »</a></li>}
        </ul>
    </div>
}

export default CalendarPagination;