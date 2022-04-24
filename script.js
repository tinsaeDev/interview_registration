


// Event handler for the table search input, keypress
function search(event){
    let keyword = event.target.value;

    studentStore.search( keyword );
}

// Event handler for the save button on 'add new student modal'
function saveStudent(event) {

    event.preventDefault();

    let form = event.target;

    let name = form.querySelector("input[name=name]").value;
    let birth_date = form.querySelector("input[name=birth_date]").value;

    let gender = form.querySelector("select[name=gender]").value;

    // 
    let classes = [];
    form.querySelectorAll(".classes-group .form-check-input").forEach(option => {
        //   console.log( option );
        if (option.checked) {
            classes.push(option.value);
        }
    });
    // let birth_date = form,



    // Save the student to store
    let student = new Student(name, classes, gender, birth_date);
    studentStore.addStudent(student);

    //  hide/distroy the modal

    let modal = form.closest(".modal");

    $(modal).modal('hide');


}


function updateStudent( event ){
    event.preventDefault();

    let form = event.target;

    let name = form.querySelector("input[name=name]").value;
    let birth_date = form.querySelector("input[name=birth_date]").value;

    let gender = form.querySelector("select[name=gender]").value;

    // 
    let classes = [];
    form.querySelectorAll(".classes-group .form-check-input").forEach(option => {
        //   console.log( option );
        if (option.checked) {
            classes.push(option.value);
        }
    });
    // let birth_date = form,





    // Save the updated date to store

    let studentId = form.closest(".modal").dataset.student_id;


    studentStore.updateStudent(  studentId, {


        "name" : name ,
        "birth_date" : birth_date,
        "classes" : classes,
        "gender" : gender


       } );
    // studentStore.addStudent(student);

    //  hide/distroy the modal

    let modal = form.closest(".modal");

    $(modal).modal('hide');

}



//  Opens a new dialog for inserting a new student 
function openAddStudentDialog(event){
        console.log( "new.." );


        let studentEditorModalTemplate = document.querySelector("#student-editor-modal-template");

        let modal = studentEditorModalTemplate.content.firstElementChild.cloneNode(true);

         $(modal).find('form').on('submit', saveStudent );


   $(modal).modal('show');

    
    

}


//  Opens a new dialog for editing a new student 
function openEditDialog(event){

    let student = studentStore.getByIndex( event.target.dataset.id );

    let studentEditorModalTemplate = document.querySelector("#student-editor-modal-template");
    let modal = studentEditorModalTemplate.content.firstElementChild.cloneNode(true);
        modal.dataset.student_id = event.target.dataset.id;

    // 


    $(modal).find(".modal-header .title").text("Edit Student");
    $(modal).find(".modal-body input[name=name]").val( student.getName() );
    $(modal).find(".modal-body input[name=birth_date]").val( student.getBirthDate() );
    $(modal).find(".modal-body select[name=gender]").val( student.getGender() );


    // Set the selected checkboxes
    $(modal).find(".modal-body input[name=class]").each( function( index , element ){
      
            if( student.getClasses().includes( element.value ) ){
                console.log(  element.value );
                element.checked = true;
            }
    }  );


    // Register on form submit event

    $(modal).find('form').on('submit', updateStudent );
 
    // SHow the modal
   $(modal).modal('show');

}



// Open the delete comfirmation dialog
function openDeleteComfrimationDialog( event ){

    let modal = $("#delete_comfirm-student-modal")[0];
        modal.dataset.student_id =  event.target.dataset.id;


        // Add event listener for the final delete button
        modal.querySelector(".delete").addEventListener("click", function() {
            
            let studentId = modal.dataset.student_id;
            studentStore.delete( studentId )  ;

            $( modal  ).modal("toggle");

        } );

     

    $("#delete_comfirm-student-modal").modal('show');
}

