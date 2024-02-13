const convertDate = (data) => {
    if (data !== undefined & data !== null) { return data.replace('T00:00:00', ''); } else { return ''; }
};
export default convertDate;