function Submission() {
    return(
    <div Classname="Submission">
    <h1>A simple file upload</h1>
    <form method = "POST" action = "/submit" enctype="multipart/form-data">
        <input type = "file" name = "studentCV"/>
        <input type = "submit" value = "Upload"/>
    </form>
    </div>
    )
}

export default Submission;