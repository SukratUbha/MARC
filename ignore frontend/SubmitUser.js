function SubmitUser() {
    const submitUser = () => {
        constfetchPromise = fetch('https://localhost:8080',
            {
                headers : {
                    "Accept": "application/json",
            },
        });
    conststreamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => alert(data));
    } 

    return (
        <div Classname="SubmitUser">
            <Button Classname="submitUser" onclick={submitUser}>submit</Button>
        </div>
    )
}

export default SubmitUser;