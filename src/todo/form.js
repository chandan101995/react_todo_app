import { useEffect, useState } from "react";

const getData = JSON.parse(localStorage.getItem('AllData') || []);
    
function Form() {
    const [todo_text ,setTodoText] = useState('');
    const [addData , setAddData] = useState(getData);
    const [submitBtn, setSubmitBtn] = useState(true);
    const [editData , setEditData] = useState(null);
    
    // set data in localstrorage 
    useEffect(() => {
        localStorage.setItem('AllData', JSON.stringify(addData));
    },[addData]);

    // add data 
    const handleSubmit = ((e) => {
        e.preventDefault();
        if(todo_text === '')
        {
            alert('add todo item!');
        } else if(todo_text && !submitBtn){
            setAddData(
                addData.map((elem) => {
                    if(elem.id === editData)
                    {
                        return { ...elem, textVal: todo_text}
                    }
                    return elem;
                })
            )
            setTodoText('');
            setSubmitBtn(true);
            setEditData(null);
        } else {
            const objData = {id:new Date().getTime().toString(), textVal:todo_text};
            setAddData([...addData, objData]);
            setTodoText('');
        }
    });

    // edit data
    const onEdit = ((id) => {
        let newEditData = addData.find((elem) => {
            return elem.id === id; 
        });
        setTodoText(newEditData.textVal);
        setSubmitBtn(false);

        setEditData(id);
    });

    // delete data
    const onDelete = ((id) => {
        const updateData = addData.filter((elem) => {
            return id !== elem.id; 
        });
        setAddData(updateData);
    });

    
    return (
        <>
            <h4>Todo App</h4>
            <input type="text" name="todo_text" value={todo_text}  onChange={(e) => setTodoText(e.target.value)} /><br/>
            {
                submitBtn ? 
                <input type="submit" onClick={handleSubmit} value="add" />
                :
                <input type="submit" onClick={handleSubmit} value="update" />
            }
            

            <br />
            <ul>
                {
                   addData.length > 0 ? 
                   addData.map((el) => 
                   {
                        return (
                            <li key={el.id}>{el.textVal} <a onClick={() => {onEdit(el.id)}} >Edit</a> <a onClick={() => {onDelete(el.id)}} >Delete</a></li>
                        );
                   })

                   : 
                   'no data'
                }
            </ul>
        </>
    );
}

export default Form;
