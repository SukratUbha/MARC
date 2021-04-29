function TableRender(){
    const fetchPromise = fetch('https://localhost:8080/courses',
    {
        headers : {
            "Accept": "application/json",
        },
    });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => {
        //htmlString parsed as JSON?
        htmlString = <tr>{data}</tr>
    });

    return(<table className="tableRender">{htmlString}</table>);
    //Have it loop the JSON data between html tags?

}

export default TableRender;