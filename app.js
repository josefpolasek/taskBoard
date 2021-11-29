
$(document).ready(function () {
    // initial
    let todos = [];
    $("#overlay").hide();

    /* //////////////////////// GENERAL //////////////////////// */

    // useful functions
    function saveStorage(todos) {
        localStorage.setItem("todos", JSON.stringify(todos));
        display(todos);
    };


    function display(todos) {
        // $("#taskBoard").html("");
        // .html("");

        todos.forEach(item => {
            let c = document.createElement("div");
            c.setAttribute("class", "card");
            c.setAttribute('id', item.id);
            c.innerHTML = `
                <div class="cardTop">
                    <div class="binContainer">
                        <div class="binImage"></div>
                    </div>
                </div>
                <img src="${item.imageUrl}" alt="task image">
                <h2>${item.title}<h2>
                <p>${item.description}</p>
                <div class="cardType">${item.type}</div>
            `;

            $("#taskBoard").append(c);
            // end 
        });
    };

    /* //////////////////////// CREATING NEW TASK //////////////////////// */
    $("#addNew").click(() => {
        $("#overlay").show();
    });

    $("#taskCancel").click(() => {
        $("#overlay").hide();
    });

    $("#taskClose").click(() => {
        $("#overlay").hide();
    });

    $("#taskSave").click(() => {
        if( $("#imageInput").val() === "" || $("#titleInput").val() === "" || $("#descriptionInput").val() === "" || $("#typeInput").val() === "") {
            alert("Please complete the form!");
            return;
        }

        const task = {
            id: Date.now(),
            imageUrl: $("#imageInput").val(),
            title: $("#titleInput").val(),
            description: $("#descriptionInput").val(),
            type: $("#typeInput").val(),
        };

        $("#overlay").hide();
        todos.push(task);
        saveStorage(todos);

        // reset input values
        $("#imageInput").val("");
        $("#titleInput").val("");
        $("#descriptionInput").val("");
        $("#typeInput").val("");
    });

    /* //////////////////////// DELETE TASK //////////////////////// */
    function deleteID(id) {
        // console.log(id);

        todos = todos.filter(item => {
            return item.id != id;
        });

        saveStorage(todos);
    }

    // $(".binContainer")
    $("#taskBoard").click(item => {
        if (item.target.classList.contains("binImage")) {
            const idShort = item.target.parentElement.parentElement.parentElement.getAttribute("id");
            deleteID(idShort);
        };
    });

    /* //////////////////////// SHOW TODOS //////////////////////// */
    const data = localStorage.getItem("todos");
    // if data exists
    if (data) {
        // converts back to array and store it in todos array
        todos = JSON.parse(data);
        display(todos);
    }
});