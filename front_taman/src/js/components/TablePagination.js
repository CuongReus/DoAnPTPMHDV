import React from 'react';

let createArray = (start, end) => {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}
let getCandidatePagingGroups = (totalPages, currentPage) => {
    if (totalPages <= 20) {
        return [createArray(1, totalPages)];
    }

    if (currentPage <= 7) {
        return [createArray(1, 7), [totalPages - 1, totalPages]];
    } else if (currentPage > (totalPages - 7)) {
        return [[1, 2], createArray(totalPages - 7, totalPages)]
    } else  { // (currentNumber > 7 && currentNumber <= (totalPages - 7))
        return [[1,2], createArray(currentPage - 2, currentPage + 2), [totalPages - 1, totalPages]];
    }

}
const TablePagination = (props) => {
    const {data, baseUrl} = props;
    var baseUrlWithPage = baseUrl + (baseUrl.indexOf("?") > -1 ? "&page=" : "?page=");
    var currentPage = data.number + 1; // service counts from 0, screen counts from 1.
    var navigationRows = [];
    var pagingGroups = getCandidatePagingGroups(data.totalPages, currentPage);
    for (var i = 0; i < pagingGroups.length; i++ ) {
        var group = pagingGroups[i];
        for (var j = 0; j < group.length; j++) {
            if (currentPage == group[j]) {
                navigationRows.push(<li key={group[j]} className="active"><span>{currentPage}</span></li>);
            } else {
                navigationRows.push(<li key={group[j]}><a href={baseUrlWithPage + group[j]}>{group[j]}</a></li>);
            }
        }

        // TODO: Find out why we need to add these rows?
        if (i != pagingGroups.length - 1) {
            navigationRows.push(<li key={10000 + i} className="disabled"><span>...</span></li>);
        }
    }

    return <div style={{textAlign: 'center'}}>
        <ul className="pagination">
            {data.first ? <li key={-2} className="disabled"><span>«</span></li> : <li key={-2}><a href={baseUrlWithPage + (currentPage - 1)} rel="next">«</a></li> }
            {navigationRows}
            {data.last ? <li key={-1} className="disabled"><span>»</span></li> : <li key={-1}><a href={baseUrlWithPage + (currentPage + 1)} rel="next">»</a></li>}
        </ul>
    </div>
}

export default TablePagination;