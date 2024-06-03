// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0){
    buttonsChangeStatus.forEach(button => {
        const formChangeStatus = document.querySelector("#form-change-status");
        const path = formChangeStatus.getAttribute("data-path");


        button.addEventListener("click", ()=>{ 
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = (statusCurrent == "active" ? "inactive" : "active");

            console.log(statusCurrent);
            console.log(statusChange);
            // Khi nhấn vào thì thêm path mới
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}

//End Change Status

//Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0){ // Check xem nếu tồn tại buttonsDelete
    
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach(button => { // Lọc qua từng button bắt sự kiên click
        button.addEventListener("click", ()=>{
            const isConirm = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
            if(isConirm) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}