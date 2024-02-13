const getCurrentDate = () => {
    var d = new Date();
    var m = ''; var day = '';
    if (d.getMonth() < 10) { m = '0' + (d.getMonth() + 1); } else { m = (d.getMonth() + 1); }
    if (d.getDate() < 10) { day = '0' + d.getDate(); } else { day =  d.getDate(); }
    var f = d.getFullYear() + '-' + m + '-' + day;
    return f;
}

export default getCurrentDate;