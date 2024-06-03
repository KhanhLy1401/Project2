// button status
const buttonsStatus = document.querySelectorAll("[button-status]");
console.log(buttonsStatus)

if(buttonsStatus.length > 0){
    let url = new URL(window.location.href);
    
    buttonsStatus.forEach(button =>{
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("button-status");
            // nếu có status thì set lại biến status thành biến status nếu 
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}

// end button status

//form search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value
        
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}
//end form search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")
console.log(buttonsPagination);
if(buttonsPagination) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", ()=> {
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    console.log(inputCheckAll);
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    
    inputCheckAll.addEventListener("click", ()=>{
        console.log(inputCheckAll.checked);
        if(inputCheckAll.checked){
            inputsId.forEach(input => {
                input.checked=true;
            })
        }else {
            inputsId.forEach(input => {
                input.checked=false;
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            console.log(inputsId.length);
            if(countChecked == inputsId.length) {
                inputCheckAll.checked= true;
            } else {
                inputCheckAll.checked= false;

            }
        });
    });
}   
// end checkbox multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e)=> {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        const typeChange = e.target.elements.type.value;
        
        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?")

            if(!isConfirm){
                return;
            }
        }

        if(inputsChecked.length > 0){
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(input => {
                const id = input.value;

                if(typeChange=="change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }


            })
            // console.log(ids.join(", "));
            inputIds.value=ids.join(", ")
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi")
        }
    })
}
// End Form change multi